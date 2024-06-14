import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useHabitContext } from "../contexts/habitContext";

const CompletionBar = () => {
  const { dateShownCompletion } = useHabitContext();

  return (
    <View style={{ backgroundColor: "blue" }}>
      <Text>{dateShownCompletion}</Text>
    </View>
  );
};

export default CompletionBar;

const styles = StyleSheet.create({});
