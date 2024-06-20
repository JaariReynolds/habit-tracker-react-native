import { View, Text, StyleSheet, Keyboard } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { constants } from "../../styles/constants";
import { containers } from "../../styles/base-styles";

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
    <View style={containers.viewContainer}>
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
  pickerContainer: {
    borderColor: "black",
    borderWidth: 2,
    borderRadius: constants.componentBorderRadius,
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
