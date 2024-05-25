import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useHabitContext } from "../../contexts/habitContext";
import { constants } from "../../styles/constants";

interface ConfirmationModalProps {
  modalText: string;
  confirmButtonText: string;
  confirmationAction: () => void;
}

const ConfirmationModal = ({
  modalText,
  confirmButtonText,
  confirmationAction,
}: ConfirmationModalProps) => {
  const { modalVisible, setModalVisible } = useHabitContext();

  const handleConfirmationAction = () => {
    confirmationAction();
    setModalVisible(false);
  };
  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View style={modal.container}>
        <View style={modal.text}>
          <Text>{modalText}</Text>
        </View>
        <View style={modal.buttonRow}>
          <Pressable
            onPress={() => setModalVisible(false)}
            style={cancelButton}
          >
            <Text>Cancel</Text>
          </Pressable>
          <Pressable onPress={handleConfirmationAction} style={confirmButton}>
            <Text>{confirmButtonText}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;

const modal = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginVertical: "auto",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: constants.componentBorderRadius,
    paddingVertical: 15,
    paddingHorizontal: 30,
    maxWidth: "80%",
  },
  text: {
    textAlign: "right",
  },
  buttonRow: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-around",
    gap: 30,
  },

  button: {
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: constants.componentBorderRadius,
  },

  cancel: {
    backgroundColor: "red",
  },
  confirm: {
    backgroundColor: "green",
  },
});

const cancelButton = StyleSheet.compose(modal.button, modal.cancel);
const confirmButton = StyleSheet.compose(modal.button, modal.confirm);
