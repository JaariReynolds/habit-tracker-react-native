import {
  CustomFrequency,
  DailyFrequency,
  Frequency,
  FrequencyNames,
  FrequencyString,
  Habit,
  HabitForm,
  WeeklyFrequency,
} from "../interfaces/habit";

// return nothing if valid, otherwise return error string
export function handleHabitValidation(newHabit: HabitForm): string | undefined {
  if (newHabit.habitName.trim().length == 0) return "Please enter a habit name";
  else if (!FrequencyNames.includes(newHabit.frequencyString)) return "Invalid frequency type";
  else if (newHabit.frequencyString == "Weekly" && newHabit.selectedDays.length == 0) {
    return "Please selected which days";
  } else if (newHabit.frequencyString == "Custom" && newHabit.customFrequency == 0) {
    return "Please select a valid frequency";
  }
}

// based on the habitForm properties, return a Frequency type from the Frequency union type
export function getFrequencyType(habitForm: HabitForm): Frequency {
  if (habitForm.frequencyString == "Weekly")
    return {
      name: habitForm.frequencyString,
      days: habitForm.selectedDays,
      startDate: new Date(),
    } as WeeklyFrequency;
  else if (habitForm.frequencyString == "Custom")
    return {
      name: habitForm.frequencyString,
      customFrequency: habitForm.customFrequency,
      startDate: habitForm.customFrequencyStartDate,
    } as CustomFrequency;
  else if (habitForm.frequencyString == "Daily") {
    return {
      name: habitForm.frequencyString,
      startDate: new Date(),
    } as DailyFrequency;
  } else {
    throw new Error(`frequency option ${habitForm.frequencyString} not yet handled`);
  }
}

// based on the existing Habit, destructure "Frequency" down to the properties it was created from in the habitForm
function getFrequencyProperties(habit: Habit): {
  frequencyString: FrequencyString;
  selectedDays: number[];
  customFrequency: number;
  customFrequencyStartDate: Date;
} {
  switch (habit.frequency.name) {
    case "Daily": {
      return {
        frequencyString: "Daily",
        selectedDays: [],
        customFrequency: 0,
        customFrequencyStartDate: new Date(),
      };
    }
    case "Weekly": {
      return {
        frequencyString: "Weekly",
        selectedDays: (habit.frequency as WeeklyFrequency).days,
        customFrequency: 0,
        customFrequencyStartDate: new Date(),
      };
    }
    case "Custom": {
      return {
        frequencyString: "Custom",
        selectedDays: [],
        customFrequency: (habit.frequency as CustomFrequency).customFrequency,
        customFrequencyStartDate: (habit.frequency as CustomFrequency).startDate,
      };
    }
    default: {
      throw new Error("Frequency type not yet handled");
    }
  }
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
