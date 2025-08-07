import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import React from "react";
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  Text,
  View,
} from "react-native";

interface TabIconProps {
  focused: boolean;
  title: string;
  icon: ImageSourcePropType;
}

const TabIcon = ({ focused, title, icon }: TabIconProps) =>
  focused ? (
    <ImageBackground
      className="flex flex-row flex-1  w-full overflow-hidden min-h-16 min-w-[112px]  justify-center items-center rounded-full mt-4"
      source={images.highlight}
    >
      <Image source={icon} className="size-5" tintColor="#151312" />
      <Text className="ml-2 text-base font-semibold text-secondary">
        {title}
      </Text>
    </ImageBackground>
  ) : (
    <View className="flex items-center justify-center mt-4 rounded-full size-full">
      <Image source={icon} className="size-5" tintColor="#A8B5DB" />
    </View>
  );

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0f0d23",
          borderRadius: 50,
          marginHorizontal: 10,
          marginBottom: 36,
          borderColor: "0f0d23",
          borderWidth: 1,
          overflow: "hidden",
          height: 52,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Name",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Name" icon={icons.home} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          title: "search",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="search" icon={icons.search} />
          ),
        }}
      />

      <Tabs.Screen
        name="saved"
        options={{
          headerShown: false,
          title: "saved",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="saved" icon={icons.save} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "profile",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="profile" icon={icons.person} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
