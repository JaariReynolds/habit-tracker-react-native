import { View, Text } from "react-native";
import React from "react";
import FullPageView from "../../components/FullPageView";
import { useHabitContext } from "../../contexts/habitContext";
import getHabitCompletion from "../../logic/reportLogic/getHabitCompletion";
import { MidnightDate } from "../../interfaces/date";

const HabitReports = () => {
  const { habits } = useHabitContext();
  const tenth = new MidnightDate(2024, 5, 10);
  const completionArray = habits.map((habit) => {
    return {
      habitName: habit.habitName,
      completion: getHabitCompletion(habit, new MidnightDate(2024, 5, 1), tenth),
    };
  });
  return (
    <FullPageView>
      <View>
        {completionArray.map((habit, index) => (
          <View key={index}>
            <Text>{tenth.toLocaleDateString("en-GB")}</Text>
            <Text>name: {habit.habitName}</Text>
            <Text>percentage: {habit.completion}</Text>
          </View>
        ))}
      </View>
    </FullPageView>
  );
};

export default HabitReports;
