import CustomSearchBar from "@/components/searchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  let router = useRouter();
  const {
    data: movies,
    loading: movieLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute z-0 w-full" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 px-5"
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mx-auto mt-20 mb-5" />

        {movieLoading ? (
          <ActivityIndicator
            size={"large"}
            color="#0000ff"
            className="self-center mt-10"
          />
        ) : moviesError ? (
          <Text>Error: {moviesError.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <CustomSearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a movie"
            />
            <View>
              <Text className="mt-5 mb-3 text-lg font-bold text-white">
                Latest Movies ({movies?.total_results})
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
