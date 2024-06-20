import { StyleSheet, View } from "react-native";
import React from "react";
import { useHabitContext } from "../contexts/habitContext";
import { useWidthPercentageAnimation } from "../hooks/animations/useWidthPercentageAnimation";
import Animated from "react-native-reanimated";
import { colours, constants } from "../styles/constants";

const CompletionBar = () => {
  const { dateShownCompletion } = useHabitContext();
  const { animatedWidthPercentage } = useWidthPercentageAnimation(0, dateShownCompletion);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.progressBar, animatedWidthPercentage]}></Animated.View>
    </View>
  );
};

export default CompletionBar;

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    backgroundColor: colours.inputField,
    height: 20,
    overflow: "hidden",
    borderRadius: constants.componentBorderRadius,
    marginBottom: 10,
  },

  progressBar: {
    backgroundColor: colours.accent,
    height: "100%",
  },
});
