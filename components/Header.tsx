import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { constants } from "../styles/constants";
import { robotoFonts } from "../styles/base-styles";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <View style={styles.header}>
      <Text style={[styles.headerText, robotoFonts.regular]}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "orange",
    height: constants.headerHeight,
    alignItems: "center",
    justifyContent: "center",
  },

  headerText: {
    fontSize: constants.headerFontSize,
  },
});
