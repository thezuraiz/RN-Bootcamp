/// Track the searches made by the user
import { Client, Databases, ID, Query } from "appwrite";
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  /// Check if the record already exists
  /// if the record exists, update the count
  /// if the record does not exist, create a new record
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);
    console.log("Search Result: ", result);
    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
          movie_id: movie.id,
          //   movieTitle: movie.title,
          //   moviePoster: movie.poster_path,
          //   searchTerm: query,
        }
      );
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        count: 1,
        movie_id: movie.id,
        title: movie.title,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        searchTerm: query,
      });
    }
  } catch (error) {
    console.error("Error fetching search records: ", error);
    return;
  }
};

export const getTrendingMovie = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);
    console.log("Trending Movie Result: ", result);
    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.error("Error fetching trending movie: ", error);
    return undefined;
  }
};
