import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { SetStateAction } from "react";
import { HabitForm, emptyForm } from "../../interfaces/habit";
import { router } from "expo-router";
import { useHabitContext } from "../../contexts/habitContext";
import handleNewHabit from "../../logic/habitCRUD/handleNewHabit";

interface SubmitButtonProps {
  title: string;
  habitForm: HabitForm;
  setForm: React.Dispatch<SetStateAction<HabitForm>>;
  setErrorString: React.Dispatch<SetStateAction<string>>;
  pageLink: string;
}

export default function NewHabitSubmitButton({
  title,
  habitForm,
  setForm,
  setErrorString,
  pageLink,
}: SubmitButtonProps) {
  const { setHabits } = useHabitContext();

  const handleSubmit = () => {
    const result = handleNewHabit(habitForm);

    if (typeof result === "string") {
      setErrorString(result);
    } else {
      setForm(emptyForm);
      setHabits((prev) => [...prev, result]);
      setErrorString("");
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
