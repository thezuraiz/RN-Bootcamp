import MovieInfo from "@/components/movie_info";
import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const Movies = () => {
  let { id } = useLocalSearchParams();
  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );
  return (
    <View className="flex-1 bg-primary">
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View>
          <Image
            className="h-[550px] w-full"
            resizeMode="stretch"
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
          />
        </View>
        <View className="flex-col items-start justify-center mx-5 mt-5">
          <Text className="text-xl font-bold text-white">{movie?.title}</Text>
          <View className="flex-row items-center mt-2 gap-x-1">
            <Text className="text-sm text-light-200">
              {movie?.release_date.split("-")[0]}
            </Text>
            <Text className="text-sm text-light-200">{movie?.runtime}m</Text>
          </View>
          <View className="flex-row items-center px-2 py-1 mt-2 rounded-md bg-dark-100 gap-x-1">
            <Image source={icons.star} />
            <Text className="text-sm font-bold text-light-200">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className="text-sm text-light-200">
              ({movie?.vote_count} votes)
            </Text>
          </View>
          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres.map((e) => e.name).join(" - ") || "N/A"}
          />
        </View>
      </ScrollView>
      <View className="mx-5">
        <TouchableOpacity
          className="absolute flex-row py-3.5 items-center justify-center w-full bg-white rounded-lg bottom-6"
          onPress={() => router.back()}
        >
          <Image className="rotate-180 " source={icons.arrow} />
          <Text className="mx-1 font-bold">Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Movies;
