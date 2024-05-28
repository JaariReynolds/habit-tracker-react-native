import { Modal, Pressable, Text, View, ViewStyle } from "react-native";
import React from "react";
import { baseModal } from "../../styles/base-styles";

interface ConfirmationModalProps {
  modalVisibility: boolean;
  setModalVisibility: (bool: boolean) => void;
  modalText: string;
  confirmButtonText: string;
  confirmationAction: () => void;
}

const ConfirmationModal = ({
  modalText,
  modalVisibility,
  setModalVisibility,
  confirmButtonText,
  confirmationAction,
}: ConfirmationModalProps) => {
  const handleConfirmationAction = () => {
    confirmationAction();
    setModalVisibility(false);
  };
  return (
    <Modal
      visible={modalVisibility}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setModalVisibility(false)}
    >
      <View style={baseModal.container}>
        <View style={baseModal.text as ViewStyle}>
          <Text>{modalText}</Text>
        </View>
        <View style={baseModal.buttonRow}>
          <Pressable
            onPress={() => setModalVisibility(false)}
            style={[baseModal.button, { backgroundColor: "red" }]}
          >
            <Text>Cancel</Text>
          </Pressable>
          <Pressable
            onPress={handleConfirmationAction}
            style={[baseModal.button, { backgroundColor: "green" }]}
          >
            <Text>{confirmButtonText}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;
