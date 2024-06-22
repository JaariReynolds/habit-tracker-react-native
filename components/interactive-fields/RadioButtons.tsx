import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { getButtonStyle, buttonStyles, robotoFonts, containers } from "../../styles/base-styles";

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
  const selectedButtonStyle = (button: string) => {
    if (button == selectedButton) return buttonStyles.selectedIndicator;
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
    <View style={[containers.viewContainer]}>
      <Text style={[buttonStyles.title, robotoFonts.regular]}>{title}</Text>
      <View style={containers.buttons}>
        {buttonNameList.map((button, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleSelectedButton(button)}
            style={[
              buttonStyles.touchableButton,
              getButtonStyle(index, buttonNameList.length),
              selectedButtonStyle(button),
            ]}
          >
            <Text style={[robotoFonts.regular, { fontSize: 15 }]}>{button}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default RadioButtons;
