import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import { robotoFonts } from "../../styles/base-styles";
import { constants } from "../../styles/constants";

export default function BackButton() {
  return (
    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
      <Text style={robotoFonts.regular}>Back</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    height: constants.buttonHeight,
    borderRadius: constants.componentBorderRadius,
    flexShrink: 1,
    flexBasis: 0,
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "orange",
  },
});
