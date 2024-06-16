import { MidnightDate } from "../../interfaces/date";
import { Habit, Submission } from "../../interfaces/habit";
import { isHabitOnDate } from "../getHabitsOnDate";

// completion percentage of habit's completed submissions from the start date to end date (inclusive)
export function getHabitCompletionOverall(habit: Habit, startDate: Date, endDate: Date): number {
  // get submissions between those dates
  const filteredCompletedSubmissions: Submission[] = habit.submissions.filter((submission) => {
    if (
      submission.submissionDate >= startDate &&
      submission.submissionDate <= endDate &&
      submission.completionPercentage == 1
    ) {
      return submission;
    }
  });

  // calculate number of submissions required between those dates
  let requiredSubmissionCount = 0;
  let date: Date = new MidnightDate(startDate);
  while (date <= endDate) {
    if (isHabitOnDate(habit, date)) {
      requiredSubmissionCount++;
    }
    date.setDate(date.getDate() + 1);
  }

  if (requiredSubmissionCount == 0) return 1; // if no required submissions, means theyre all done
  return filteredCompletedSubmissions.length / requiredSubmissionCount;
}

export function getHabitCompletionOnDay(habit: Habit, date: Date): number {
  const submission = habit.submissions.find(
    (submission) => submission.submissionDate.getTime() == date.getTime()
  );

  if (submission === undefined) return 0;

  return submission.completionPercentage;
}

export function getOverallDayCompletion(habits: Habit[], date: Date): number {
  const totalDue = habits.reduce((accumulator, habit) => {
    if (habit.isOnDateShown === true) return (accumulator += 1);
    return accumulator;
  }, 0);

  if (totalDue === 0) return 1; // if none due, 100% completion

  const completionPercentage = habits.reduce((accumulator, habit) => {
    if (habit.isOnDateShown === undefined || habit.isOnDateShown === false) return accumulator;

    const submission = habit.submissions.find(
      (submission) => submission.submissionDate.getTime() === date.getTime()
    );

    if (submission === undefined) return accumulator;

    return (accumulator += submission.completionPercentage);
  }, 0);

  return completionPercentage / totalDue || 0;
}
