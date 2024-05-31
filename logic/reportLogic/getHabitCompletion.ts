import { Habit, Submission } from "../../interfaces/habit";
import { toMidnight } from "../dateLogic";
import { isHabitOnDate } from "../getHabitsOnDate";

// completion percentage of habit's completed submissions from the start date to end date (inclusive)
export default function getHabitCompletion(habit: Habit, startDate: Date, endDate: Date): number {
  // get submissions between those dates
  const filteredCompletedSubmissions: Submission[] = habit.submissions.filter((submission) => {
    const normalDate = toMidnight(submission.submissionDate);
    if (normalDate >= startDate && normalDate <= endDate && submission.completionPercentage == 1) {
      return submission;
    }
  });

  // calculate number of submissions required between those dates
  let requiredSubmissionCount = 0;
  let date: Date = new Date(startDate);
  while (date <= endDate) {
    if (isHabitOnDate(habit, date)) {
      requiredSubmissionCount++;
    }
    date.setDate(date.getDate() + 1);
  }

  if (requiredSubmissionCount == 0) return 1; // if no required submissions, that means theyre all done :)

  return filteredCompletedSubmissions.length / requiredSubmissionCount;
}
