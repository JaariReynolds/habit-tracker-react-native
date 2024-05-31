import {
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React, { useMemo } from "react";
import { Habit } from "../interfaces/habit";
import { constants } from "../styles/constants";
import { useHabitContext } from "../contexts/habitContext";
import { router } from "expo-router";
import SubmissionModal from "./interactive-fields/SubmissionModal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useModalVisibility } from "../hooks/useModalVisibility";
import handleHabitSubmission from "../logic/habitCRUD/handleHabitSubmission";

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
      {openedHabit == arrayIndex && <OpenedPreview habit={habit} />}
    </View>
  );
};

const OpenedPreview = ({ habit }: { habit: Habit }) => {
  const { habits, setHabits, dateShown } = useHabitContext();
  const { modalVisibility, setModalVisibility } = useModalVisibility();

  const submitIcon = () => {
    const specificSubmission = habit.submissions.find(
      (submission) =>
        submission.submissionDate.toLocaleDateString() == dateShown.toLocaleDateString()
    );

    if (!specificSubmission) return <FontAwesomeIcon icon={faCircleXmark} />;

    if (specificSubmission.completionPercentage == 1)
      return <FontAwesomeIcon icon={faCircleCheck} />;

    return <FontAwesomeIcon icon={faCircleXmark} />;
  };

  return (
    <>
      <SubmissionModal
        modalText={"submission for " + habit.habitName}
        modalVisibility={modalVisibility}
        setModalVisibility={setModalVisibility}
        leftButtonAction={() => setHabits(handleHabitSubmission(habit.id, 1, dateShown, habits))}
        rightButtonAction={() => setHabits(handleHabitSubmission(habit.id, 0, dateShown, habits))}
      />
      <View style={openedPreview.container}>
        <TouchableOpacity
          style={[openedPreview.button, openedPreview.first, { flexGrow: 2 }]}
          onPress={() => setModalVisibility(true)}
        >
          {submitIcon()}
          <Text>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[openedPreview.button, openedPreview.last, { flexGrow: 1 }]}
          onPress={() => router.push("./EditHabit")}
        >
          <Text>Edit</Text>
        </TouchableOpacity>
      </View>
    </>
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
