import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const MovieCard = ({ title, poster_path, vote_average, release_date, id }) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%] mb-5">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.co/600×400/1a1a1a/ffffff.png",
          }}
          className="w-full rounded-lg h-52"
          resizeMode="cover"
        />
        <Text className="mt-2 text-xs font-bold text-white" numberOfLines={1}>
          {title}
        </Text>
        <View className="flex-row items-center justify-start mt-1 gap-x-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-xs font-bold text-white ">
            {Math.round(vote_average / 2)}
          </Text>
        </View>
        <Text className="mt-1 text-xs text-white">
          {release_date.split("-")[0]}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
