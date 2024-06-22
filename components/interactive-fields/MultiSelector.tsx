import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { getButtonStyle, buttonStyles, robotoFonts, containers } from "../../styles/base-styles";

interface MultiSelectorProps {
  title: string;
  buttonNameList: string[];
  selectedButtons: number[];
  setSelectedButtons: (buttons: number[]) => void;
}

const MultiSelector = ({
  title,
  buttonNameList,
  selectedButtons,
  setSelectedButtons,
}: MultiSelectorProps) => {
  function selectedButtonStyle(selectedIndex: number) {
    if (selectedButtons.includes(selectedIndex)) {
      return buttonStyles.selectedIndicator;
    }
  }

  const handleSelectedButtons = (newButtonIndex: number) => {
    Keyboard.dismiss();

    if (selectedButtons.includes(newButtonIndex)) {
      const newSelectedButtons = selectedButtons.filter(
        (buttonIndex) => buttonIndex != newButtonIndex
      );
      setSelectedButtons(newSelectedButtons);
    } else {
      setSelectedButtons([...selectedButtons, newButtonIndex]);
    }
  };

  return (
    <View style={containers.viewContainer}>
      <Text style={[buttonStyles.title, robotoFonts.regular]}>{title}</Text>
      <View style={containers.buttons}>
        {buttonNameList.map((button, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleSelectedButtons(index)}
            style={[
              buttonStyles.touchableButton,
              getButtonStyle(index, buttonNameList.length),
              selectedButtonStyle(index),
            ]}
          >
            <Text style={[robotoFonts.regular, { fontSize: 15 }]}>{button}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default MultiSelector;
