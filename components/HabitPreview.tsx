import {
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { Habit } from "../interfaces/habit";
import { constants } from "../styles/constants";
import { useHabitContext } from "../contexts/habitContext";
import { router } from "expo-router";
import handleHabitSubmission from "../logic/handleHabitSubmission";

interface HabitPreviewProps {
  habit: Habit;
  arrayIndex: number;
}

const HabitPreview = ({ habit, arrayIndex }: HabitPreviewProps) => {
  const { openedHabit, setOpenedHabit } = useHabitContext();

  const handleHabitOpen = () => {
    openedHabit == arrayIndex ? setOpenedHabit(-1) : setOpenedHabit(arrayIndex);
  };

  const openedPreviewStyle = () => {
    if (openedHabit == arrayIndex) {
      return {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      } as ViewStyle;
    }
  };

  return (
    <View>
      <Pressable
        style={[styles.habitPreviewContainer, openedPreviewStyle()]}
        onPress={handleHabitOpen}
      >
        <View style={styles.habitRow}>
          <Text>{habit.habitName}</Text>
          <Text>streak: {habit.currentStreak}</Text>
        </View>
      </Pressable>
      {openedHabit == arrayIndex && <OpenedPreview />}
    </View>
  );
};

const OpenedPreview = () => {
  return (
    <View style={openedPreview.container}>
      <TouchableOpacity
        style={[openedPreview.button, openedPreview.first, { flexGrow: 2 }]}
      >
        <Text>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[openedPreview.button, openedPreview.last, { flexGrow: 1 }]}
        onPress={() => router.push("./EditHabit")}
      >
        <Text>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};
export default HabitPreview;

const styles = StyleSheet.create({
  habitPreviewContainer: {
    padding: 5,
    backgroundColor: "lavender",
    justifyContent: "center",
    borderRadius: constants.componentBorderRadius,
    height: 60,
    borderWidth: 1,
    borderColor: "black",
  },

  habitRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
});

const openedPreview = StyleSheet.create({
  container: {
    backgroundColor: "lavender",
    borderBottomLeftRadius: constants.componentBorderRadius,
    borderBottomRightRadius: constants.componentBorderRadius,
    height: 60,
    flexDirection: "row",
    overflow: "hidden",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 0,
    borderColor: "black",
    borderWidth: 1,
  },
  first: {
    borderBottomLeftRadius: constants.componentBorderRadius,
  },
  last: {
    borderBottomRightRadius: constants.componentBorderRadius,
    borderLeftWidth: 0,
  },
});
