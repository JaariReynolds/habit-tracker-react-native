import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { inputButtonStyles } from "../../styles/base-styles";

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

  const indicatorStyling = (buttonIndex: number) => {
    if (selectedButtons.includes(buttonIndex))
      return inputButtonStyles.selectedIndicator;
  };

  return (
    <View style={inputButtonStyles.viewContainer}>
      <Text style={inputButtonStyles.title}>{title}</Text>
      <View style={inputButtonStyles.radioButtonsContainer}>
        {buttonNameList.map((button, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleSelectedButtons(index)}
            style={inputButtonStyles.touchableButton}
          >
            <View
              style={[inputButtonStyles.indicator, indicatorStyling(index)]}
            ></View>
            <Text>{button}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default MultiSelector;
