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
  //   console.log(`ENV: ${process.env.API_Read_Access_Token}`);
  const url = query
    ? `${TBDB.BASE_URL}/discover/movie?query=${encodeURIComponent(query)}`
    : `${TBDB.BASE_URL}/discover/movie?sort_by=popularity.desc`;
  const options = {
    method: "GET",
    headers: TBDB.headers,
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // console.log("Fetched movies:", data.results);
    return data.results;
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
