import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  FrequencyNames,
  Habit,
  HabitForm,
  dayNames,
} from "../interfaces/habit";
import FullHeightScrollView from "../components/FullHeightScrollView";
import Header from "../components/Header";
import FullPageView from "../components/FullPageView";
import FormField from "../components/interactive-fields/FormField";
import RadioButtons from "../components/interactive-fields/RadioButtons";
import MultiSelector from "../components/interactive-fields/MultiSelector";
import Counter from "../components/interactive-fields/Counter";
import { buttonStyles } from "../styles/base-styles";
import BackButton from "../components/buttons/BackButton";
import { habitObjectToForm } from "../logic/baseHabitLogic";
import { useHabitContext } from "../contexts/habitContext";
import EditHabitSubmitButton from "../components/buttons/EditHabitSubmitButton";

const EditHabit = () => {
  const { openedHabit, habits } = useHabitContext();
  const [showDays, setShowDays] = useState<boolean>(false);
  const [showCustom, setShowCustom] = useState<boolean>(false);
  const [errorString, setErrorString] = useState<string>("");

  const [form, setForm] = useState<HabitForm>(
    habitObjectToForm(habits[openedHabit])
  );

  return (
    <FullHeightScrollView>
      <Header title="edit habit" />
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
          <EditHabitSubmitButton
            title="Update"
            habitForm={form}
            originalHabit={habits[openedHabit]}
            setErrorString={setErrorString}
            setForm={setForm}
            pageLink="/(tabs)" // no file name assumes index page of (tabs) i think?
          />
        </View>
      </FullPageView>
    </FullHeightScrollView>
  );
};

export default EditHabit;

const styles = StyleSheet.create({});
