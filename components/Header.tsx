import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colours, constants } from "../styles/constants";
import { robotoFonts } from "../styles/base-styles";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <View
      style={{
        backgroundColor: colours.primary,
        height: constants.headerHeight,
        alignItems: "center",
        justifyContent: "center",
        elevation: constants.headerElevation,
      }}
    >
      <Text style={[{ fontSize: constants.headerFontSize }, robotoFonts.regular]}>{title}</Text>
    </View>
  );
};

export default Header;
