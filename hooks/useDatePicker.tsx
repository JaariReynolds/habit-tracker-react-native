import { useState } from "react";

export function useDatePicker() {
  const [datePickerVisibile, setDatePickerVisibile] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());

  const changeDate = (selectedDate: Date | undefined) => {
    const date = selectedDate;
    setDatePickerVisibile(false);

    if (!date) return;
    setDate(date);
  };

  const showDatePicker = () => {
    setDatePickerVisibile(true);
  };

  return {
    date,
    datePickerVisibile,
    showDatePicker,
    changeDate,
  };
}
