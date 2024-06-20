import { Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { FrequencyNames, Habit, HabitForm, dayNames, emptyForm } from "../interfaces/habit";
import FullHeightScrollView from "../components/FullHeightScrollView";
import Header from "../components/Header";
import FullPageView from "../components/FullPageView";
import FormField from "../components/interactive-fields/FormField";
import RadioButtons from "../components/interactive-fields/RadioButtons";
import MultiSelector from "../components/interactive-fields/MultiSelector";
import CustomDaysInput from "../components/interactive-fields/CustomDaysInput";
import { buttonStyles, containers } from "../styles/base-styles";
import BackButton from "../components/buttons/BackButton";
import { habitObjectToForm } from "../logic/baseHabitLogic";
import { useHabitContext } from "../contexts/habitContext";
import DeleteHabitButton from "../components/buttons/DeleteHabitButton";
import { useDatePicker } from "../hooks/useDatePicker";
import DatePicker from "../components/interactive-fields/DatePicker";
import handleEditHabit, { updateHabitsArray } from "../logic/habitCRUD/handleEditHabit";
import { router } from "expo-router";
import HabitSubmitButton from "../components/buttons/HabitSubmitButton";

const EditHabit = () => {
  const { openedHabit, habits, setHabits, handleSetDateShown } = useHabitContext();
  const originalHabit = useRef<Habit>(habits[openedHabit]);
  const [form, setForm] = useState<HabitForm>(habitObjectToForm(originalHabit.current));
  const { date, datePickerVisible, showDatePicker, changeDate } = useDatePicker(
    form.customFrequencyStartDate
  );

  const [showDays, setShowDays] = useState<boolean>(false);
  const [showCustom, setShowCustom] = useState<boolean>(false);
  const [errorString, setErrorString] = useState<string>("");

  useEffect(() => {
    setForm((prev) => ({ ...prev, customFrequencyStartDate: date } as HabitForm));
  }, [date]);

  function handleSubmit() {
    const result = handleEditHabit(form, originalHabit.current);

    if (typeof result === "string") {
      setErrorString(result);
    } else {
      setForm(emptyForm);
      setHabits((prev) => updateHabitsArray(result, prev));
      setErrorString("");
      handleSetDateShown(0); // always reset back to current day after habit edit/creation
      router.navigate("/(tabs)");
    }
  }

  return (
    <FullHeightScrollView>
      <Header title="edit habit" />
      <FullPageView>
        <View style={{ marginBottom: 50, alignSelf: "stretch" }}>
          {errorString.length != 0 && (
            <View>
              <Text style={{ color: "red" }}>{errorString} </Text>
            </View>
          )}
          <FormField
            title="Habit Name"
            handleChangeText={(e) => setForm({ ...form, habitName: e })}
            value={form.habitName}
          />
          <RadioButtons
            title="Frequency"
            buttonNameList={FrequencyNames}
            selectedButton={form.frequencyString}
            setSelectedButton={(e) => setForm({ ...form, frequencyString: e })}
            setShowDays={setShowDays}
            setShowCustom={setShowCustom}
          />
          {showDays && (
            <MultiSelector
              title="Days"
              buttonNameList={dayNames}
              selectedButtons={form.selectedDays}
              setSelectedButtons={(e) => setForm({ ...form, selectedDays: e })}
            />
          )}
          {showCustom && (
            <View style={containers.customFields}>
              <CustomDaysInput
                number={form.customFrequency}
                setNumber={(e) => setForm({ ...form, customFrequency: e })}
              />
              <DatePicker
                title="Start Date"
                date={date}
                datePickerVisible={datePickerVisible}
                showDatePicker={showDatePicker}
                changeDate={changeDate}
              />
            </View>
          )}
        </View>
        <View style={{ marginTop: "auto", gap: 10 }}>
          <DeleteHabitButton habitId={form.habitId!} />
          <View style={containers.dualButtonRow}>
            <BackButton />
            <HabitSubmitButton title="Update" handleSubmit={handleSubmit} />
          </View>
        </View>
      </FullPageView>
    </FullHeightScrollView>
  );
};

export default EditHabit;
