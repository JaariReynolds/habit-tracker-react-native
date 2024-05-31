import { CustomFrequency, Habit, WeeklyFrequency } from "../interfaces/habit";
import { isDateWithinDaysMultiple } from "./dateLogic";

export default function getHabitsOnDate(date: Date, habits: Habit[]): Habit[] {
  return habits.filter((habit) => {
    if (isHabitOnDate(habit, date)) return habit;
  });
}

export function isHabitOnDate(habit: Habit, date: Date): boolean {
  switch (habit.frequency.name) {
    case "Daily": {
      return true;
    }
    case "Weekly": {
      if ((habit.frequency as WeeklyFrequency).days.includes(date.getDay())) {
        return true;
      }
    }
    case "Custom": {
      if (
        isDateWithinDaysMultiple(
          date,
          (habit.frequency as CustomFrequency).startDate,
          (habit.frequency as CustomFrequency).customFrequency
        )
      )
        return true;
    }
    default: {
      return false;
    }
  }
}
