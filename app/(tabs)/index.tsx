import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center dark:bg-[#2b2b2b]">
      <Text className="text-3xl dark:text-white ">
        Hello Zuraiz, here us our Screens
      </Text>
      <Link
        href="./onBoarding"
        className="px-5 py-3 mt-5 text-lg bg-yellow-400 rounded-md dark:text-white"
      >
        On Boarding
      </Link>
      <Link
        href="./movies/avengers"
        className="px-5 py-3 mt-5 text-lg bg-blue-400 rounded-md dark:text-white"
      >
        Avengers
      </Link>
    </View>
  );
}
