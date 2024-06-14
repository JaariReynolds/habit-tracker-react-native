import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useHabitContext } from "../../contexts/habitContext";
import { router } from "expo-router";
import ConfirmationModal from "../interactive-fields/ConfirmationModal";
import { useModalVisibility } from "../../hooks/useModalVisibility";
import handleDeleteHabit from "../../logic/habitCRUD/handleDeleteHabit";
import { constants } from "../../styles/constants";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

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
        <FontAwesomeIcon icon={faTrashCan} size={constants.iconSize} />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  backButton: {
    height: constants.buttonHeight,
    justifyContent: "center",
    backgroundColor: "red",
    paddingHorizontal: 70,
    alignItems: "center",
    marginVertical: 10,
  },
});
