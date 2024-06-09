import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import { robotoFonts } from "../../styles/base-styles";

interface RouterPushButtonProps {
  buttonLabel: string | JSX.Element; // either a string or FontAwesomeIcon
  pageLink: string;
}

export default function RouterPushButton({ buttonLabel, pageLink }: RouterPushButtonProps) {
  return (
    <TouchableOpacity
      style={{
        padding: 20,
        backgroundColor: "orange",
        alignSelf: "stretch",
        alignItems: "center",
        marginVertical: 10,
      }}
      onPress={() => router.push(pageLink)}
    >
      <Text style={robotoFonts.bold}>{buttonLabel}</Text>
    </TouchableOpacity>
  );
}
