import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useHabitContext } from "../../contexts/habitContext";
import { router } from "expo-router";
import ConfirmationModal from "../interactive-fields/ConfirmationModal";
import { useModalVisibility } from "../../hooks/useModalVisibility";
import handleDeleteHabit from "../../logic/habitCRUD/handleDeleteHabit";

interface DeleteHabitButtonProps {
  habitId: string;
}

export default function DeleteHabitButton({ habitId }: DeleteHabitButtonProps) {
  const { habits, setHabits } = useHabitContext();
  const { modalVisibility, setModalVisibility } = useModalVisibility();

  const deleteHabit = () => {
    setHabits(handleDeleteHabit(habitId, habits));
    router.navigate("./(tabs)");
  };

  return (
    <>
      <ConfirmationModal
        modalVisibility={modalVisibility}
        setModalVisibility={setModalVisibility}
        modalText="delete habit?"
        confirmButtonText="Confirm"
        confirmationAction={deleteHabit}
      />
      <TouchableOpacity style={styles.backButton} onPress={() => setModalVisibility(true)}>
        <Text>DeleteHabitButton</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  backButton: {
    padding: 20,
    backgroundColor: "red",
    // alignSelf: "stretch",
    alignItems: "center",
    marginVertical: 10,
  },
});
