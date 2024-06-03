import { useState } from "react";

export function useDatePicker(startDate: Date) {
  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(startDate);

  const changeDate = (selectedDate: Date | undefined) => {
    const date = selectedDate;
    console.log("new date = " + date);
    setDatePickerVisible(false);

    if (!date) return;
    setDate(date);
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  return {
    date,
    datePickerVisible,
    showDatePicker,
    changeDate,
  };
}
