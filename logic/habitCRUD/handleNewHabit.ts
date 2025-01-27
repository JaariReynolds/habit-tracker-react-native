import { MidnightDate } from "../../interfaces/date";
import { FrequencyString, Habit, HabitForm } from "../../interfaces/habit";
import { getFrequencyType, handleHabitValidation } from "../baseHabitLogic";
import uuid from "react-native-uuid";

export default function handleNewHabit(newHabit: HabitForm): Habit | string {
  const errorString = handleHabitValidation(newHabit);

  if (errorString) return errorString;

  return handleNewHabitObject(newHabit);
}

// turn the habitForm into a valid Habit object
function handleNewHabitObject(newHabit: HabitForm): Habit {
  const frequencyType = getFrequencyType({
    type: newHabit.frequencyString as FrequencyString,
    days: newHabit.selectedDays,
    startDate: newHabit.customFrequencyStartDate,
    customFrequency: newHabit.customFrequency,
  });

  return {
    id: uuid.v4() as string,
    habitName: newHabit.habitName,
    creationDate: new MidnightDate(),
    lastUpdateDate: new Date(),
    submissions: [],
    frequency: frequencyType,
    currentStreak: 0,
  };
}
