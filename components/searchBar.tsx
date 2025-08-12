import { icons } from "@/constants/icons";

import React from "react";
import { Image, TextInput, View } from "react-native";

interface Prop {
  placeholder: string;
  onPress: () => void;
  onChangeText: (text: string) => void;
  value?: string;
}

const CustomSearchBar = ({
  placeholder,
  onPress,
  onChangeText,
  value,
}: Prop) => {
  return (
    <View className="flex-row items-center px-5 py-4 rounded-full bg-dark-200">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#ab8bff"
      />
      <TextInput
        className="flex-1 ml-2 text-white"
        placeholderTextColor="#a8b5db"
        cursorColor="#fff"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        // style={{ flex: 1, color: "#fff" }}
        onPress={onPress}
      />
    </View>
  );
};

export default CustomSearchBar;
