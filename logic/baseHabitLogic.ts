import { HabitsRow } from "../database/types";
import { MidnightDate } from "../interfaces/date";
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
  if (newHabit.habitName.trim().length == 0) {
    return "Please enter a habit name";
  } else if (!FrequencyNames.includes(newHabit.frequencyString)) {
    return "Invalid frequency type";
  } else if (newHabit.frequencyString == "Weekly" && newHabit.selectedDays.length == 0) {
    return "Please selected which days";
  } else if (newHabit.frequencyString == "Custom" && newHabit.customFrequency == 0) {
    return "Please select a valid frequency";
  }
}

export interface FrequencyInfo {
  type: FrequencyString;
  days: number[] | null;
  startDate: Date;
  customFrequency: number | null;
}

// based on the habitForm properties, return a Frequency type from the Frequency union type
export function getFrequencyType(frequencyObject: FrequencyInfo): Frequency {
  if (frequencyObject.type == "Weekly")
    return {
      name: frequencyObject.type,
      days: frequencyObject.days,
      startDate: new MidnightDate(),
    } as WeeklyFrequency;
  else if (frequencyObject.type == "Custom")
    return {
      name: frequencyObject.type,
      customFrequency: frequencyObject.customFrequency,
      startDate: frequencyObject.startDate,
    } as CustomFrequency;
  else if (frequencyObject.type == "Daily") {
    return {
      name: frequencyObject.type,
      startDate: new MidnightDate(),
    } as DailyFrequency;
  } else {
    throw new Error(`frequency option ${frequencyObject.type} not yet handled`);
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
        customFrequencyStartDate: new MidnightDate(),
      };
    }
    case "Weekly": {
      return {
        frequencyString: "Weekly",
        selectedDays: (habit.frequency as WeeklyFrequency).days,
        customFrequency: 0,
        customFrequencyStartDate: new MidnightDate(),
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
  if (!habit) {
    throw new Error("Habit no longer exists");
  }
  return {
    habitId: habit.id,
    habitName: habit.habitName,
    lastUpdateDate: habit.lastUpdateDate,
    ...getFrequencyProperties(habit),
  };
}
