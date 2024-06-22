import { Text, TouchableOpacity } from "react-native";
import React, { isValidElement } from "react";
import { router } from "expo-router";
import { robotoFonts } from "../../styles/base-styles";
import { colours, constants } from "../../styles/constants";

interface RouterPushButtonProps {
  buttonLabel: JSX.Element | string; // either a string or FontAwesomeIcon
  pageLink: string;
}

export default function RouterPushButton({ buttonLabel, pageLink }: RouterPushButtonProps) {
  function handlePress() {
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
        elevation: constants.elevation,
      }}
      onPress={handlePress}
    >
      {isValidElement(buttonLabel) ? (
        buttonLabel
      ) : (
        <Text style={[robotoFonts.regular, { fontSize: 20 }]}>{buttonLabel}</Text>
      )}
    </TouchableOpacity>
  );
}
