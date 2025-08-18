import MovieCard from "@/components/movie_card";
import CustomSearchBar from "@/components/searchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { MoviesResponse } from "@/interface/interfaces";

import { fetchMovies } from "@/services/api";
import { getTrendingMovie } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function Index() {
  let router = useRouter();
  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(() => getTrendingMovie());
  const {
    data: movies,
    loading: movieLoading,
    error: moviesError,
  } = useFetch<MoviesResponse>(() => fetchMovies({ query: "" }));

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0s" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 px-5"
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mx-auto mt-20 mb-5" />

        {movieLoading || trendingLoading ? (
          <ActivityIndicator
            size={"large"}
            color="#0000ff"
            className="self-center mt-10"
          />
        ) : moviesError || trendingError ? (
          <Text>Error: {moviesError?.message || trendingError?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <CustomSearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a movie"
              onChangeText={() => {}}
            />

            {trendingMovies && (
              <>
                <Text className="mt-5 mb-3 text-lg font-bold text-white">
                  Treding Movies
                </Text>
                <FlatList
                  data={trendingMovies}
                  // keyExtractor={(item) => item.movie_id.toString()}
                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} />
                  )}
                  ItemSeparatorComponent={() => <View className="w-6" />}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
              </>
            )}
            <Text className="mt-5 mb-3 text-lg font-bold text-white">
              Latest Movies
            </Text>

            <FlatList
              data={movies?.results}
              scrollEnabled={false}
              className="pb-32 mt-2"
              numColumns={3}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <MovieCard {...item} />}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap: 20,
                paddingRight: 5,
                marginBottom: 10,
              }}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
