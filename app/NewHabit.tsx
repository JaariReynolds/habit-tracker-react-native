import React, { useState } from "react";
import FullPageView from "../components/FullPageView";
import FormField from "../components/interactive-fields/FormField";
import BackButton from "../components/buttons/BackButton";
import PickerField from "../components/interactive-fields/PickerField";
import {
  FrequencyNames,
  HabitEntry,
  HabitEntryNames,
  HabitForm,
  dayNames,
  emptyForm,
} from "../interfaces/habit";
import RadioButtons from "../components/interactive-fields/RadioButtons";
import MultiSelector from "../components/interactive-fields/MultiSelector";
import { SafeAreaView } from "react-native-safe-area-context";
import Counter from "../components/interactive-fields/Counter";
import { Platform, StatusBar, View, Text, StyleSheet } from "react-native";
import NewHabitSubmitButton from "../components/buttons/NewHabitSubmitButton";
import FullHeightScrollView from "../components/FullHeightScrollView";
import Header from "../components/Header";
import { buttonStyles } from "../styles/base-styles";

const NewHabit = () => {
  const [showDays, setShowDays] = useState<boolean>(false);
  const [showCustom, setShowCustom] = useState<boolean>(false);
  const [errorString, setErrorString] = useState<string>("");

  const [form, setForm] = useState<HabitForm>(emptyForm);

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
          <Counter
            title="Num of days"
            number={form.customFrequency}
            setNumber={(e) => setForm({ ...form, customFrequency: e })}
          />
        )}

        <View style={buttonStyles.dualButtonContainer}>
          <BackButton />
          <NewHabitSubmitButton
            title="Submit"
            habitForm={form}
            setErrorString={setErrorString}
            setForm={setForm}
            pageLink="/(tabs)" // no file name assumes index page of (tabs) i think?
          />
        </View>
      </FullPageView>
    </FullHeightScrollView>
  );
};

export default NewHabit;
