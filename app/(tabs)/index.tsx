import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import FullPageView from "../../components/FullPageView";
import RouterPushButton from "../../components/buttons/RouterPushButton";
import { Habit } from "../../interfaces/habit";
import { useHabitContext } from "../../contexts/habitContext";
import FullHeightScrollView from "../../components/FullHeightScrollView";
import Header from "../../components/Header";
import HabitPreview from "../../components/HabitPreview";

const Habits = () => {
  const { habits } = useHabitContext();

  return (
    <FullHeightScrollView>
      <Header title="habits" />
      <FullPageView>
        <View style={styles.habitContainer}>
          {habits.map((habit, index) => (
            <HabitPreview key={index} arrayIndex={index} habit={habit} />
          ))}
        </View>
        <RouterPushButton buttonText="New Habit :3" pageLink="./../NewHabit" />
      </FullPageView>
    </FullHeightScrollView>
  );
};

export default Habits;

const styles = StyleSheet.create({
  habitContainer: {
    alignSelf: "stretch",
    gap: 15,
  },
});