import { View, Text, StyleSheet, Keyboard } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";

interface PickerFieldProps {
  title: string;
  selectedValue: string;
  handleSelectedValue: (value: string) => void;
  listValues: string[];
  placeholder?: string;
}

const PickerField = ({
  title,
  selectedValue,
  handleSelectedValue,
  listValues,
  placeholder,
}: PickerFieldProps) => {
  return (
    <View style={styles.viewContainer}>
      <Text style={styles.title}>{title}</Text>
      <View style={[styles.pickerContainer]}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(value, index) => handleSelectedValue(value)}
          style={[styles.pickerField]}
          onFocus={() => Keyboard.dismiss()}
        >
          {listValues.map((listItem, index) => (
            <Picker.Item key={index} label={listItem} value={listItem} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default PickerField;

const styles = StyleSheet.create({
  viewContainer: {
    alignSelf: "stretch",
    marginBottom: 15,
  },
  pickerContainer: {
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    height: 60,
  },
  pickerField: {
    flex: 1,
    borderColor: "black",
    borderWidth: 1,
  },

  title: {
    fontSize: 20,
    paddingBottom: 3,
  },
});