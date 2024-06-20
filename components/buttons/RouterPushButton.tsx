import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import { robotoFonts } from "../../styles/base-styles";
import { useFontSizePulseAnimation } from "../../hooks/animations/useFontSizePulseAnimation";
import Animated from "react-native-reanimated";
import { colours, constants } from "../../styles/constants";

interface RouterPushButtonProps {
  buttonLabel: string; // either a string or FontAwesomeIcon
  pageLink: string;
}

export default function RouterPushButton({ buttonLabel, pageLink }: RouterPushButtonProps) {
  const { animatedFontSize, handleAnimation } = useFontSizePulseAnimation(25);

  function handlePress() {
    handleAnimation();
    router.push(pageLink);
  }

  return (
    <TouchableOpacity
      style={{
        height: constants.buttonHeight,
        backgroundColor: colours.primary,
        alignSelf: "stretch",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 15,
        borderRadius: constants.componentBorderRadius,
        elevation: 5,
      }}
      onPress={handlePress}
    >
      <Animated.Text style={[animatedFontSize, robotoFonts.bold]}>{buttonLabel}</Animated.Text>
    </TouchableOpacity>
  );
}
