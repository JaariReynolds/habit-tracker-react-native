import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { useHabitContext } from "../../contexts/habitContext";
import { baseModal } from "../../styles/base-styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

interface SubmissionModalProps {
  modalText: string;
  leftButtonAction: () => void;
  rightButtonAction: () => void;
}

const SubmissionModal = ({
  modalText,
  leftButtonAction,
  rightButtonAction,
}: SubmissionModalProps) => {
  const { modalVisible, setModalVisible } = useHabitContext();

  const handleLeftButton = () => {
    leftButtonAction();
    setModalVisible(false);
  };

  const handleRightButton = () => {
    rightButtonAction();
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
