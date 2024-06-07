import { MidnightDate } from "../../interfaces/date";
import { Habit } from "../../interfaces/habit";
import { getNextSubmissionDate } from "../getHabitsOnDate";

export default function getHabitStreak(habit: Habit): number {
  let streak = 0;
  let streakBroken = false;
  let submissionIndex = habit.submissions.length - 1;

  // add 1 day to most recent submissionDate, otherwise start from today (+ 1 day)
  let tempDate =
    submissionIndex >= 0 ? new Date(habit.submissions[submissionIndex].submissionDate) : new Date();

  tempDate.setDate(tempDate.getDate() + 1);

  let dateToCheckFrom = new MidnightDate(tempDate);

  // search backwards through whole submissions array for a streak, or until a streak is broken
  while (submissionIndex > -1) {
    let submission = habit.submissions[submissionIndex];

    if (
      getNextSubmissionDate(habit, dateToCheckFrom, "Backwards").getTime() ==
        submission.submissionDate.getTime() &&
      submission.completionPercentage == 1
    ) {
      streak++;
      submissionIndex--;
      dateToCheckFrom = new Date(submission.submissionDate);
    } else {
      streakBroken = true;
      break;
    }
  }

  return streak;
}
