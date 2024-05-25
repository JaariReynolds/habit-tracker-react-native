import {
  CustomFrequency,
  Frequency,
  FrequencyNames,
  Habit,
  HabitForm,
  WeeklyFrequency,
} from "../interfaces/habit";

// return nothing if valid, otherwise return error string
export function handleHabitValidation(newHabit: HabitForm): string | undefined {
  if (newHabit.habitName.trim().length == 0) return "Please enter a habit name";
  else if (!FrequencyNames.includes(newHabit.frequencyString))
    return "Invalid frequency type";
  else if (
    newHabit.frequencyString == "Weekly" &&
    newHabit.selectedDays.length == 0
  ) {
    return "Please selected which days";
  } else if (
    newHabit.frequencyString == "Custom" &&
    newHabit.customFrequency == 0
  ) {
    return "Please select a valid frequency";
  }
}

// based on the habitForm properties, return a Frequency type from the Frequency union type
export function getFrequencyType(habitForm: HabitForm): Frequency {
  if (habitForm.frequencyString == "Weekly")
    return { days: habitForm.selectedDays } as WeeklyFrequency;
  else if (habitForm.frequencyString == "Custom")
    return {
      customFrequency: habitForm.customFrequency,
    } as CustomFrequency;
  else if (habitForm.frequencyString == "Daily") {
    return "Daily";
  } else {
    throw new Error(
      `frequency option ${habitForm.frequencyString} not yet handled`
    );
  }
}

// based on the existing Habit, destructure "Frequency" down to the properties it was created from in the habitForm
function getFrequencyProperties(habit: Habit): {
  frequencyString: string;
  selectedDays: number[];
  customFrequency: number;
} {
  if (habit.frequency == "Daily")
    return { frequencyString: "Daily", selectedDays: [], customFrequency: 0 };

  // this currently only works with 3 frequency types (daily, weekly, custom). If more are added, this needs to be refactored
  const castedFrequency = habit.frequency as WeeklyFrequency;

  if (castedFrequency.days)
    return {
      frequencyString: "Weekly",
      selectedDays: (habit.frequency as WeeklyFrequency).days,
      customFrequency: 0,
    };
  else
    return {
      frequencyString: "Custom",
      selectedDays: [],
      customFrequency: (habit.frequency as CustomFrequency).customFrequency,
    };
}

// based on the existing Habit, convert to a habitForm
export function habitObjectToForm(habit: Habit): HabitForm {
  return {
    habitId: habit.id,
    habitName: habit.habitName,
    lastUpdateDate: habit.lastUpdateDate,
    ...getFrequencyProperties(habit),
  };
}