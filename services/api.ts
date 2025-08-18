import { MovieDetailResponse, MoviesResponse } from "@/interface/interfaces";

export const TBDB = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_API_Key,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_Read_Access_Token}`,
  },
};

export const fetchMovies = async ({
  query,
}: {
  query: string;
}): Promise<MoviesResponse> => {
  console.log(`query: ${query}`);
  const url =
    query != ""
      ? `${TBDB.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${TBDB.BASE_URL}/discover/movie?sort_by=popularity.desc`;
  const options = {
    method: "GET",
    headers: TBDB.headers,
  };
  console.log(`url: ${url}`);

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

// const url =
//   "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
// const options = {
//   method: "GET",
//   headers: { accept: "application/json", Authorization: "Bearer Auu" },
// };

// fetch(url, options)
//   .then((res) => res.json())
//   .then((json) => console.log(json))
//   .catch((err) => console.error(err));

export const fetchMovieDetails = async (
  movieId: string
): Promise<MovieDetailResponse> => {
  try {
    let response = await fetch(
      `${TBDB.BASE_URL}/movie/${movieId}?api_key=${TBDB.API_KEY}`,
      {
        method: "GET",
        headers: TBDB.headers,
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch the api: ${response.status}`);
    }
    let data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching movie details:", error);
    throw error;
  }
};
