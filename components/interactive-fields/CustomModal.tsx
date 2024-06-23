import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { robotoFonts } from "../../styles/base-styles";
import { colours, constants } from "../../styles/constants";

interface ModalProps {
  modalText: string;
  modalVisibility: boolean;
  setModalVisibility: (bool: boolean) => void;
  leftButton: ButtonProps;
  rightButton: ButtonProps;
}

interface ButtonProps {
  JSXElement: JSX.Element;
  backgroundColour: string;
  action: () => void;
}

const CustomModal = ({
  modalText,
  modalVisibility,
  setModalVisibility,
  leftButton,
  rightButton,
}: ModalProps) => {
  const handleLeftButton = () => {
    leftButton.action();
    setModalVisibility(false);
  };

  const handleRightButton = () => {
    rightButton.action();
    setModalVisibility(false);
  };

  return (
    <Modal
      visible={modalVisibility}
      transparent={true}
      onRequestClose={() => setModalVisibility(false)}
    >
      <Pressable style={styles.outsideModal} onPress={() => setModalVisibility(false)}>
        <Pressable style={styles.modalCard}>
          <View style={styles.mainText}>
            <Text style={[robotoFonts.regular, { fontSize: 15 }]}>{modalText}</Text>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              onPress={handleLeftButton}
              style={[
                styles.button,
                { borderRightWidth: 1, backgroundColor: leftButton.backgroundColour },
              ]}
            >
              {leftButton.JSXElement}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleRightButton}
              style={[
                styles.button,
                { borderLeftWidth: 1, backgroundColor: rightButton.backgroundColour },
              ]}
            >
              {rightButton.JSXElement}
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
export default CustomModal;

const styles = StyleSheet.create({
  outsideModal: {
    height: "100%",
    backgroundColor: "rgba(60, 60, 60, 0.7)",
  },

  modalCard: {
    maxWidth: "80%",
    minWidth: "70%",
    top: "40%",
    backgroundColor: colours.light,
    alignSelf: "center",
    borderRadius: constants.componentBorderRadius,
    overflow: "hidden",
    shadowColor: colours.dark,
    elevation: 10, // android only, need shadow___ for ios
  },

  mainText: {
    padding: 25,
    alignItems: "center",
  },

  buttonRow: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderColor: colours.border,
  },

  button: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    borderColor: colours.border,
    borderTopWidth: 1,
  },
});
