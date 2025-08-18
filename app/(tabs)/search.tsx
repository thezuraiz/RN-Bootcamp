import MovieCard from "@/components/movie_card";
import CustomSearchBar from "@/components/searchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

const Search = () => {
  const [searchBar, setSearchBar] = useState("");

  const {
    data: movies,
    loading: movieLoading,
    error: moviesError,
    fetchData: refreshData,
    reset,
  } = useFetch(() => fetchMovies({ query: searchBar }));

  useEffect(() => {
    if (searchBar.trim()) {
      const timeoutId = setTimeout(async () => {
        await refreshData();

        if (movies?.results.length! > 0 && movies?.results[0]) {
          await updateSearchCount(searchBar, movies!.results[0]);
        }
      }, 500);
      return () => clearTimeout(timeoutId);
    } else {
      reset();
    }
  }, [searchBar]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute z-0 flex-1 w-full"
        resizeMode="cover"
      />

      <FlatList
        data={movies?.results ?? []}
        className="px-5"
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard {...item} />}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 20,
          paddingRight: 5,
          marginBottom: 10,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="flex-row justify-center w-full mt-20">
              <Image
                source={icons.logo}
                className="items-center w-12 h-10"
                resizeMode="contain"
              />
            </View>
            <View className="my-5">
              <CustomSearchBar
                onPress={() => {}}
                onChangeText={(text) => setSearchBar(text)}
                value={searchBar}
                placeholder="Search for movies..."
              />
            </View>
            {movieLoading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}
            {moviesError && (
              <Text className="px-5 my-3 text-red-500">
                Error: {moviesError.message}
              </Text>
            )}

            {searchBar && movies?.results.length! > 0 && (
              <Text className="mt-5 mb-3 text-lg font-bold text-white">
                Search Results for {searchBar}
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !movieLoading &&
          !moviesError &&
          searchBar.trim() &&
          movies?.results == null ? (
            <Text className="px-5 my-3 text-white">
              {searchBar.trim() ? "No Movie Found" : "Search"}
            </Text>
          ) : null
        }
      />
    </View>
  );
};
export default Search;
