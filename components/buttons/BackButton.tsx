import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { router } from "expo-router";

export default function BackButton() {
  return (
    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
      <Text>Back</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    padding: 20,
    alignItems: "center",
    flexGrow: 1,
    backgroundColor: "orange",
    marginTop: "auto",
  },
});
