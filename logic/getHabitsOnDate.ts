import { MidnightDate } from "../interfaces/date";
import { CustomFrequency, Habit, WeeklyFrequency } from "../interfaces/habit";
import { isDateWithinDaysMultiple, toMidnight } from "./dateLogic";

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

export function getNextSubmissionDate(
  habit: Habit,
  referenceDate: Date,
  direction: "Forwards" | "Backwards"
): Date {
  const increment = direction === "Forwards" ? 1 : -1;

  let nextSubmissionDate = new MidnightDate(referenceDate);
  nextSubmissionDate.setDate(nextSubmissionDate.getDate() + increment);

  let found = false;
  while (!found) {
    if (isHabitOnDate(habit, nextSubmissionDate)) {
      found = true;
      break;
    }
    nextSubmissionDate.setDate(nextSubmissionDate.getDate() + increment);
  }
  return toMidnight(nextSubmissionDate);
}
