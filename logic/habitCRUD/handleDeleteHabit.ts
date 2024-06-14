import { Habit } from "../../interfaces/habit";

export default function handleDeleteHabit(habitId: string, habits: Habit[]): Habit[] {
  // currently does not care if the habit does not exist
  return habits.filter((habit) => habit.id !== habitId);
}
