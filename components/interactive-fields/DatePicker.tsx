import { Text, View, StyleSheet, Pressable, Keyboard } from "react-native";
import React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDatePicker } from "../../hooks/useDatePicker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { MidnightDate } from "../../interfaces/date";
import { robotoFonts } from "../../styles/base-styles";
import { colours, constants } from "../../styles/constants";

interface DatePickerProps {
  title: string;
  date: Date;
  datePickerVisible: boolean;
  showDatePicker: () => void;
  changeDate: (selectedDate: Date | undefined) => void;
}
const DatePicker = ({
  title,
  date,
  datePickerVisible,
  showDatePicker,
  changeDate,
}: DatePickerProps) => {
  const handlePress = () => {
    Keyboard.dismiss();
    showDatePicker();
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, robotoFonts.regular]}>{title}</Text>
      <View style={styles.inputContainer}>
        <Pressable style={styles.button} onPress={handlePress}>
          <Text style={[styles.selectedDate, robotoFonts.regular]}>
            {date.toLocaleDateString("en-GB")}
          </Text>
          <View style={styles.icon}>
            <FontAwesomeIcon icon={faCalendarDays} />
          </View>
        </Pressable>

        {datePickerVisible && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={"date"}
            minimumDate={new MidnightDate()}
            is24Hour={true}
            onChange={(e, d) => changeDate(d)}
          />
        )}
      </View>
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  inputContainer: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    padding: 10,
    paddingBottom: 3,
    fontSize: 20,
  },
  button: {
    alignItems: "center",
    flexDirection: "row",
    height: "100%",
    backgroundColor: colours.primary,
    borderRadius: constants.componentBorderRadius,
    overflow: "hidden",
    elevation: 5,
  },
  selectedDate: {
    textAlignVertical: "center",
    backgroundColor: colours.inputField,
    height: "100%",
    paddingHorizontal: 10,
  },
  icon: {
    width: 50,
    alignItems: "center",
  },
});
