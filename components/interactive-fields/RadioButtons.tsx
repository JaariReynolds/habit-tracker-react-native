import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { inputButtonStyles } from "../../styles/base-styles";

interface RadioButtonsProps {
  title: string;
  buttonNameList: string[];
  selectedButton: string;
  setSelectedButton: (button: string) => void;
  setShowDays: (bool: boolean) => void;
  setShowCustom: (bool: boolean) => void;
}

const RadioButtons = ({
  title,
  buttonNameList,
  selectedButton,
  setSelectedButton,
  setShowDays,
  setShowCustom,
}: RadioButtonsProps) => {
  const indicatorStyling = (button: string) => {
    if (button == selectedButton) return inputButtonStyles.selectedIndicator;
  };

  useEffect(() => {
    selectedButton == "Weekly" ? setShowDays(true) : setShowDays(false);
    selectedButton == "Custom" ? setShowCustom(true) : setShowCustom(false);
  }, [selectedButton]);

  const handleSelectedButton = (button: string) => {
    Keyboard.dismiss();
    setSelectedButton(button);
  };

  return (
    <View style={inputButtonStyles.viewContainer}>
      <Text style={inputButtonStyles.title}>{title}</Text>
      <View style={inputButtonStyles.radioButtonsContainer}>
        {buttonNameList.map((button, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleSelectedButton(button)}
            style={inputButtonStyles.touchableButton}
          >
            <View
              style={[inputButtonStyles.indicator, indicatorStyling(button)]}
            ></View>
            <Text>{button}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default RadioButtons;
