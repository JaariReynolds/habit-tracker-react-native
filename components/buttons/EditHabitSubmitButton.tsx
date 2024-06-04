import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { SetStateAction } from "react";
import { Habit, HabitForm, emptyForm } from "../../interfaces/habit";
import { router } from "expo-router";
import { useHabitContext } from "../../contexts/habitContext";
import handleEditHabit, { updateHabitsArray } from "../../logic/habitCRUD/handleEditHabit";

interface SubmitButtonProps {
  title: string;
  habitForm: HabitForm;
  originalHabit: Habit;
  setForm: React.Dispatch<SetStateAction<HabitForm>>;
  setErrorString: React.Dispatch<SetStateAction<string>>;
  pageLink: string;
}

export default function EditHabitSubmitButton({
  title,
  habitForm,
  originalHabit,
  setForm,
  setErrorString,
  pageLink,
}: SubmitButtonProps) {
  const { setHabits, handleSetDateShown } = useHabitContext();

  const handleSubmit = () => {
    const result = handleEditHabit(habitForm, originalHabit);

    if (typeof result === "string") {
      setErrorString(result);
    } else {
      setForm(emptyForm);
      setHabits((prev) => updateHabitsArray(result, prev));
      setErrorString("");
      handleSetDateShown(0); // always reset back to current day after habit edit/creation
      router.navigate(pageLink); // unwinds back to most recent homescreen (index) in stack
    }
  };

  return (
    <TouchableOpacity style={styles.backButton} onPress={() => handleSubmit()}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    alignItems: "center",
    padding: 20,
    flexGrow: 1,
    backgroundColor: "orange",
    marginTop: "auto",
  },
});
