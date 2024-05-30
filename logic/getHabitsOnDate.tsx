import { CustomFrequency, Habit, WeeklyFrequency } from "../interfaces/habit";
import { toMidnight } from "./dateLogic";

const MILLISECONDS_PER_DAY = 86400000;

export default function getHabitsOnDate(date: Date, habits: Habit[]): Habit[] {
  return habits.filter((habit) => {
    if (habit.frequency == "Daily") return habit;

    const castedFrequency = habit.frequency as WeeklyFrequency;

    // if weekly
    if (castedFrequency.days) {
      if (castedFrequency.days.includes(date.getDay())) {
        return habit;
      }
      // if custom
    } else {
      if (
        isHabitWithinDaysMultiple(
          date,
          (habit.frequency as CustomFrequency).startDate,
          (habit.frequency as CustomFrequency).customFrequency
        )
      ) {
        return habit;
      }
    }
  });
}

// returns true if the gap in days between date1 and date2 are a multiple of daysGap apart
function isHabitWithinDaysMultiple(
  date1: Date,
  date2: Date,
  daysGap: number
): boolean {
  const differenceInMilliseconds = Math.abs(
    toMidnight(date1).getTime() - toMidnight(date2).getTime()
  );
  const differenceInDays = Math.round(
    differenceInMilliseconds / MILLISECONDS_PER_DAY
  );
  return differenceInDays % daysGap === 0;
}
