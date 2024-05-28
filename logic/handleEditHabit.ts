import { Handle } from "react-native";
import {
  CustomFrequency,
  Habit,
  HabitForm,
  WeeklyFrequency,
} from "../interfaces/habit";
import { getFrequencyType, handleHabitValidation } from "./baseHabitLogic";

export default function handleEditHabit(
  updatedHabitForm: HabitForm,
  originalHabit: Habit
): Habit | string {
  const errorString = handleHabitValidation(updatedHabitForm);
  if (errorString) return errorString;

  return handleEditHabitObject(updatedHabitForm, originalHabit);
}

function handleEditHabitObject(
  updatedHabitForm: HabitForm,
  originalHabit: Habit
): Habit {
  const frequencyType = getFrequencyType(updatedHabitForm);

  return {
    id: updatedHabitForm.habitId!,
    habitName: updatedHabitForm.habitName,
    frequency: frequencyType,
    lastUpdateDate: new Date(),
    creationDate: originalHabit.creationDate,
    submissions: originalHabit.submissions,
    currentStreak: originalHabit.currentStreak,
  };
}

export function updateHabitsArray(
  updatedHabit: Habit,
  habitsArray: Habit[]
): Habit[] {
  return habitsArray.map((habit) =>
    habit.id === updatedHabit.id ? { ...updatedHabit } : habit
  );
}
