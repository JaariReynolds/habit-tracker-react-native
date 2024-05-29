import { Text, Button } from "react-native";
import React from "react";
import FullPageView from "../../components/FullPageView";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDatePicker } from "../../hooks/useDatePicker";
import DatePicker from "../../components/interactive-fields/DatePicker";

const Journal = () => {
  return <DatePicker />;
};

export default Journal;
