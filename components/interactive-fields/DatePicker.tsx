import { Text, View, StyleSheet, Pressable } from "react-native";
import React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDatePicker } from "../../hooks/useDatePicker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { MidnightDate } from "../../interfaces/date";

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
  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.container}>
        <Pressable style={styles.button} onPress={showDatePicker}>
          <Text style={styles.selectedDate}>{date.toLocaleDateString("en-GB")}</Text>
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
    </>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
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
    backgroundColor: "orange",
  },
  selectedDate: {
    textAlignVertical: "center",
    backgroundColor: "white",
    height: "100%",
    paddingHorizontal: 10,
  },
  icon: {
    width: 50,
    alignItems: "center",
  },
});
