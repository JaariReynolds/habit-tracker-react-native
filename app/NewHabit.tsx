import React, { useEffect, useState } from "react";
import FullPageView from "../components/FullPageView";
import FormField from "../components/interactive-fields/FormField";
import BackButton from "../components/buttons/BackButton";
import { FrequencyNames, HabitForm, dayNames, emptyForm } from "../interfaces/habit";
import RadioButtons from "../components/interactive-fields/RadioButtons";
import MultiSelector from "../components/interactive-fields/MultiSelector";
import Counter from "../components/interactive-fields/Counter";
import { View, Text } from "react-native";
import FullHeightScrollView from "../components/FullHeightScrollView";
import Header from "../components/Header";
import { buttonStyles } from "../styles/base-styles";
import DatePicker from "../components/interactive-fields/DatePicker";
import { useDatePicker } from "../hooks/useDatePicker";
import { MidnightDate } from "../interfaces/date";
import handleNewHabit from "../logic/habitCRUD/handleNewHabit";
import { useHabitContext } from "../contexts/habitContext";
import { router } from "expo-router";
import HabitSubmitButton from "../components/buttons/HabitSubmitButton";

const NewHabit = () => {
  const { setHabits, handleSetDateShown } = useHabitContext();
  const [showDays, setShowDays] = useState<boolean>(false);
  const [showCustom, setShowCustom] = useState<boolean>(false);
  const [errorString, setErrorString] = useState<string>("");
  const [form, setForm] = useState<HabitForm>(emptyForm);
  const { date, datePickerVisible, showDatePicker, changeDate } = useDatePicker(new MidnightDate());

  useEffect(() => {
    setForm((prev) => ({ ...prev, customFrequencyStartDate: date } as HabitForm));
  }, [date]);

  const handleSubmit = () => {
    const result = handleNewHabit(form);

    if (typeof result === "string") {
      setErrorString(result);
    } else {
      setForm(emptyForm);
      setHabits((prev) => [...prev, result]);
      setErrorString("");
      handleSetDateShown(0); // always reset back to current day after habit edit/creation
      router.navigate("/(tabs)");
    }
  };

  return (
    <FullHeightScrollView>
      <Header title="new habit" />
      <FullPageView>
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
          <>
            <Counter
              title="Num of days"
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
          </>
        )}

        <View style={buttonStyles.dualButtonContainer}>
          <BackButton />
          <HabitSubmitButton title="Submit" handleSubmit={handleSubmit} />
        </View>
      </FullPageView>
    </FullHeightScrollView>
  );
};

export default NewHabit;
