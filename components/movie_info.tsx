import React from "react";
import { Text, View } from "react-native";

interface MovieInfoProps {
  label?: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => {
  return (
    <View className="flex-col items-start justify-center mt-5">
      <Text className="text-sm font-normal text-light-200">{label}</Text>
      <Text className="mt-2 text-sm font-bold text-light-100">
        {value ?? "N/A"}
      </Text>
    </View>
  );
};

export default MovieInfo;
