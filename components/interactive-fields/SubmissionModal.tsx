import { Modal, Pressable, Text, View, ViewStyle } from "react-native";
import React from "react";
import { baseModal } from "../../styles/base-styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

interface SubmissionModalProps {
  modalVisibility: boolean;
  setModalVisibility: (bool: boolean) => void;
  modalText: string;
  leftButtonAction: () => void;
  rightButtonAction: () => void;
}

const SubmissionModal = ({
  modalText,
  modalVisibility,
  setModalVisibility,
  leftButtonAction,
  rightButtonAction,
}: SubmissionModalProps) => {
  const handleLeftButton = () => {
    leftButtonAction();
    setModalVisibility(false);
  };

  const handleRightButton = () => {
    rightButtonAction();
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
          <Pressable onPress={handleRightButton} style={baseModal.button}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </Pressable>
          <Pressable onPress={handleLeftButton} style={baseModal.button}>
            <FontAwesomeIcon icon={faCircleCheck} />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default SubmissionModal;
