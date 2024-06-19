import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useRef } from "react";
import { constants } from "../../styles/constants";

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
      <Text style={styles.title}>{title}</Text>
      <TextInput
        onChangeText={handleChangeText}
        style={[styles.inputField]}
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
    borderColor: "black",
    borderWidth: 2,
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
