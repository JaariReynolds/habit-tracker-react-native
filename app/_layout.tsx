import React from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import HabitContextProvider from "../contexts/habitContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const RootLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <HabitContextProvider>
          <SafeAreaView style={{ height: "100%" }}>
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
