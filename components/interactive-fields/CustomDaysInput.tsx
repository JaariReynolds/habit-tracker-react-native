import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { containers, robotoFonts } from "../../styles/base-styles";
import { colours, constants } from "../../styles/constants";

interface CounterProps {
  number: number;
  setNumber: (number: number) => void;
}

const CustomDaysInput = ({ number, setNumber }: CounterProps) => {
  const [text, setText] = useState<string>(number.toString());
  const handleSetText = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, "");

    setText(numericValue);
    setNumber(parseInt(numericValue));
  };

  return (
    <View style={containers.viewContainer}>
      <View style={styles.textContainer}>
        <Text style={robotoFonts.regular}>Every</Text>
        <TextInput
          style={[
            robotoFonts.regular,
            styles.displayedNumber,
            { backgroundColor: colours.inputField },
          ]}
          value={text}
          onChangeText={handleSetText}
          keyboardType="numeric"
          maxLength={3}
        />
        <Text style={robotoFonts.regular}>days</Text>
      </View>
    </View>
  );
};

export default CustomDaysInput;

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexBasis: 0,
    flexGrow: 1,
    paddingBottom: 10,
    flexWrap: "wrap",
  },
  displayedNumber: {
    marginHorizontal: 15,
    paddingHorizontal: 10,
    fontSize: 40,
    height: 60,
    borderRadius: constants.componentBorderRadius,
    elevation: 5,
  },
});
