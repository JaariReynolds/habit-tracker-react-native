import { StyleSheet } from "react-native";

export const inputButtonStyles = StyleSheet.create({
  viewContainer: {
    alignSelf: "stretch",
    marginBottom: 15,
  },

  radioButtonsContainer: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-around",
    borderRadius: 10,
    height: 60,
  },

  touchableButton: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: 60,
  },

  indicator: {
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    height: 30,
    width: 30,
    marginHorizontal: "auto",
  },

  selectedIndicator: {
    backgroundColor: "green",
  },

  title: {
    textAlign: "center",
    fontSize: 20,
    paddingBottom: 3,
  },
});

export const buttonStyles = StyleSheet.create({
  dualButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    marginBottom: 15,
    marginTop: "auto",
    width: "100%",
  },
});
