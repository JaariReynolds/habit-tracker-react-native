import { Modal, Pressable, Text, View, ViewStyle } from "react-native";
import React from "react";
import { useHabitContext } from "../../contexts/habitContext";
import { baseModal } from "../../styles/base-styles";

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
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={baseModal.container}>
        <View style={baseModal.text as ViewStyle}>
          <Text>{modalText}</Text>
        </View>
        <View style={baseModal.buttonRow}>
          <Pressable
            onPress={() => setModalVisible(false)}
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
