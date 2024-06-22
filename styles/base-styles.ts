import { StyleSheet } from "react-native";
import { colours, constants } from "./constants";

export function getButtonStyle(index: number, arrayLength: number) {
  let style = {};
  if (index === 0) {
    style = { ...style, ...buttonStyles.buttonFirst };
  } else if (index === arrayLength - 1) {
    style = { ...style, ...buttonStyles.buttonLast };
  }

  return style;
}

export const buttonStyles = StyleSheet.create({
  touchableButton: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    flexBasis: 0,
    backgroundColor: colours.inputField,
    elevation: constants.elevation,
  },

  buttonFirst: {
    borderTopLeftRadius: constants.componentBorderRadius,
    borderBottomLeftRadius: constants.componentBorderRadius,
  },

  buttonLast: {
    borderTopRightRadius: constants.componentBorderRadius,
    borderBottomRightRadius: constants.componentBorderRadius,
  },

  indicator: {
    borderWidth: 2,
    height: 30,
  },

  selectedIndicator: {
    backgroundColor: colours.secondary,
  },

  title: {
    fontSize: 20,
    paddingBottom: 3,
  },
});

export const containers = StyleSheet.create({
  customFields: {
    alignSelf: "stretch",
    paddingVertical: 30,
  },

  viewContainer: {
    alignSelf: "stretch",
    marginBottom: 15,
  },

  dualButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 10,
    marginTop: "auto",
    width: "100%",
  },

  buttons: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-evenly",
    borderRadius: constants.componentBorderRadius,
    height: 60,
    gap: 5,
  },
});

export const robotoFonts = StyleSheet.create({
  light: {
    fontFamily: "RobotoMono-Light",
    fontSize: 20,
  },
  regular: {
    fontFamily: "RobotoMono-Regular",
    fontSize: 20,
  },
  bold: {
    fontFamily: "RobotoMono-Bold",
    fontSize: 20,
  },
});
