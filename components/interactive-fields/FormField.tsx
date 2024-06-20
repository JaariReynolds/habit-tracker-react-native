import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useRef } from "react";
import { constants } from "../../styles/constants";
import { robotoFonts } from "../../styles/base-styles";

interface FormFieldProps {
  title: string;
  value: string;
  handleChangeText: (value: string) => void;
  placeholder?: string;
  percentageWidth?: string;
  alignment?: "left" | "right";
}

const FormField = ({ title, value, handleChangeText, placeholder }: FormFieldProps) => {
  const textInputRef = useRef<TextInput>(null);

  return (
    <View style={styles.formFieldContainer}>
      <Text style={[styles.title, robotoFonts.regular]}>{title}</Text>
      <TextInput
        onChangeText={handleChangeText}
        style={[styles.inputField, robotoFonts.regular]}
        value={value}
        placeholder={placeholder}
        ref={textInputRef}
      />
    </View>
  );
};

export default FormField;

const styles = StyleSheet.create({
  formFieldContainer: {
    alignSelf: "stretch",
    marginBottom: 15,
  },

  inputField: {
    borderWidth: 1.5,
    fontSize: 20,
    borderRadius: constants.componentBorderRadius,
    padding: 15,
    height: 60,
  },

  title: {
    fontSize: 20,
    paddingBottom: 3,
  },
});
