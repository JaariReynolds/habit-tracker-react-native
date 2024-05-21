import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { router } from "expo-router";

interface PrimaryButtonProps {
  buttonText: string;
  pageLink: string;
}

export default function RouterPushButton({
  buttonText,
  pageLink,
}: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      style={styles.primaryButton}
      onPress={() => router.push(pageLink)}
    >
      <Text>{buttonText}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  primaryButton: {
    padding: 20,
    backgroundColor: "orange",
    alignSelf: "stretch",
    alignItems: "center",
    marginVertical: 10,
  },
});
