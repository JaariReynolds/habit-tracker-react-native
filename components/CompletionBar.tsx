import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useHabitContext } from "../contexts/habitContext";
import { useWidthPercentageAnimation } from "../hooks/animations/useWidthPercentageAnimation";
import Animated from "react-native-reanimated";
import { colours, constants } from "../styles/constants";
import { getOverallDayCompletion } from "../logic/reportLogic/getHabitCompletion";

const CompletionBar = () => {
  const { dateShown, habits } = useHabitContext();
  const [dateShownCompletion, setDateShownCompletion] = useState<number>(0);

  useEffect(() => {
    setDateShownCompletion(getOverallDayCompletion(habits, dateShown));
  }, [habits, dateShown]);

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
    elevation: constants.elevation,
  },

  progressBar: {
    backgroundColor: colours.accent,
    height: "100%",
  },
});
