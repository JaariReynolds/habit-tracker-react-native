import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import handleDeleteHabit from "../../logic/handleDeleteHabit";
import { useHabitContext } from "../../contexts/habitContext";
import { router } from "expo-router";
import ConfirmationModal from "../interactive-fields/ConfirmationModal";

interface DeleteHabitButtonProps {
  habitId: string;
}

export default function DeleteHabitButton({ habitId }: DeleteHabitButtonProps) {
  const { habits, setHabits, setModalVisible } = useHabitContext();

  const deleteHabit = () => {
    setHabits(handleDeleteHabit(habitId, habits));
    router.navigate("./(tabs)");
  };

  return (
    <>
      <ConfirmationModal
        modalText="Are you sure you want to delete this Habitasada sodasjdklasj dasldkjasdlkasjda slkdjasdlkj?"
        confirmButtonText="Confirm"
        confirmationAction={deleteHabit}
      />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => setModalVisible(true)}
      >
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