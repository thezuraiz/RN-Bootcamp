import { toTitleCase } from "@/utility/textFormator";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const Movies = () => {
  let { name } = useLocalSearchParams();
  return (
    <View>
      <Text>Movie Name: {toTitleCase(name)}</Text>
    </View>
  );
};

export default Movies;
