import { router } from "expo-router";
import React from "react";
import { View, ImageBackground, Image, TouchableOpacity } from "react-native";

export default function HomeScreen() {

  return (
    <ImageBackground
      source={require('../../assets/images/home-background.png')}
      className="flex-1"
      resizeMode="cover"
    >
      <View className="flex-1 items-center">
        <Image
          source={require('../../assets/images/logo.png')}
          className="w-[304px] h-[132px] top-[303px] "
        />
        <TouchableOpacity onPress={() => router.replace('/(tabs)/gamePlay')}>
          <Image
            source={require('../../assets/images/tap-to-play.png')}
            className="w-[240px] h-[36px] top-[400px]"
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}


