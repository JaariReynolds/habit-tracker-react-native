import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useHabitContext } from "../../contexts/habitContext";
import { router } from "expo-router";
import { useModalVisibility } from "../../hooks/useModalVisibility";
import handleDeleteHabit from "../../logic/habitCRUD/handleDeleteHabit";
import { constants } from "../../styles/constants";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import CustomModal from "../interactive-fields/CustomModal";

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
      <CustomModal
        modalText="delete habit?"
        modalVisibility={modalVisibility}
        setModalVisibility={setModalVisibility}
        leftButton={{
          JSXElement: <Text>Cancel</Text>,
          backgroundColour: "grey",
          action: () => setModalVisibility(false),
        }}
        rightButton={{
          JSXElement: <Text>Confirm</Text>,
          backgroundColour: "red",
          action: deleteHabit,
        }}
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
    borderRadius: constants.componentBorderRadius,
    backgroundColor: "red",
    justifyContent: "center",
    alignSelf: "stretch",
    alignItems: "center",
  },
});
