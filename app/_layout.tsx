import React, { useCallback, useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import HabitContextProvider from "../contexts/habitContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { colours } from "../styles/constants";
import * as NavigationBar from "expo-navigation-bar";

SplashScreen.preventAutoHideAsync();
NavigationBar.setBackgroundColorAsync(colours.light);

const RootLayout = () => {
  const [fontsLoaded, fontError] = useFonts({
    "RobotoMono-Light": require("../assets/fonts/RobotoMono-Light.ttf"),
    "RobotoMono-Regular": require("../assets/fonts/RobotoMono-Regular.ttf"),
    "RobotoMono-Bold": require("../assets/fonts/RobotoMono-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <SafeAreaProvider>
        <HabitContextProvider>
          <SafeAreaView style={{ height: "100%" }}>
            <StatusBar backgroundColor={colours.primary} />
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="NewHabit" options={{ headerShown: false }} />
              <Stack.Screen name="EditHabit" options={{ headerShown: false }} />
            </Stack>
          </SafeAreaView>
        </HabitContextProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
