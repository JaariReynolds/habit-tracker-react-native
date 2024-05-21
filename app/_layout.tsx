import React from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import HabitContextProvider from "../contexts/habitContext";

const RootLayout = () => {
  return (
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
  );
};

export default RootLayout;
