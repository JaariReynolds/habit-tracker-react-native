import { Habit } from "../../interfaces/habit";
import { toMidnight } from "../dateLogic";
import { getNextSubmissionDate, isHabitOnDate } from "../getHabitsOnDate";

export default function getHabitStreak(habit: Habit): number {
  return 0;
}

function isHabitCompleteOnDate(habit: Habit, date: Date): boolean {
  const reversedSubmissions = habit.submissions.toReversed();
  const submissionOnDate = reversedSubmissions.find(
    (submission) =>
      toMidnight(submission.submissionDate) == toMidnight(date) &&
      submission.completionPercentage == 1
  );

  return !(submissionOnDate === undefined);
}
