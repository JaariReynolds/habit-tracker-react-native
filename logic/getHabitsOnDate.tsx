import { CustomFrequency, Habit, WeeklyFrequency } from "../interfaces/habit";
import { isDateWithinDaysMultiple } from "./dateLogic";

export default function getHabitsOnDate(date: Date, habits: Habit[]): Habit[] {
  return habits.filter((habit) => {
    if (isHabitOnDate(habit, date)) return habit;
  });
}

export function isHabitOnDate(habit: Habit, date: Date): boolean {
  if (habit.frequency == "Daily") {
    return true;
  }

  const castedFrequency = habit.frequency as WeeklyFrequency;

  // if weekly
  if (castedFrequency.days) {
    if (castedFrequency.days.includes(date.getDay())) {
      return true;
    }
    // if custom
  } else {
    if (
      isDateWithinDaysMultiple(
        date,
        (habit.frequency as CustomFrequency).startDate,
        (habit.frequency as CustomFrequency).customFrequency
      )
    )
      return true;
  }

  return false;
}
