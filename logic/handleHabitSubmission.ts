import { uuid } from "expo-modules-core";
import { Habit, Submission } from "../interfaces/habit";

// this feels longer than it i thought it would be?
export default function handleHabitSubmission(
  habitId: string,
  submissionPercentage: number,
  habits: Habit[]
): Habit[] {
  const existingHabit = habits.find((habit) => habit.id == habitId);

  if (existingHabit == undefined) {
    return habits;
  }

  const currentSubmittions = existingHabit.submissions;
  const mostRecentSubmission = currentSubmittions.pop();

  let newSubmissionsArray: Submission[] = [];

  // if first submission || previous submissionDate is NOT todays date
  if (
    mostRecentSubmission == undefined ||
    (mostRecentSubmission && !isTodaysDate(mostRecentSubmission.submissionDate))
  ) {
    // append (unpopped) submissions array with new submission
    newSubmissionsArray = [
      ...existingHabit.submissions,
      newSubmissionObject(habitId, submissionPercentage),
    ];
    // if previous submissionDate IS todays date
  } else if (
    mostRecentSubmission.submissionDate.toLocaleString() ==
    Date.now().toLocaleString()
  ) {
    // append (popped) submissions array with updated submission
    newSubmissionsArray = [
      ...currentSubmittions,
      updateSubmissionObject(mostRecentSubmission, submissionPercentage),
    ];
  }

  // update habits array with newly updated habit
  const newHabits = habits.map((habit) => {
    if (habit.id == existingHabit.id)
      return { ...habit, submissions: newSubmissionsArray };

    return habit;
  });

  return newHabits;
}

function newSubmissionObject(
  habitId: string,
  submissionPercentage: number
): Submission {
  return {
    id: uuid.v4() as string,
    habitId: habitId,
    submissionDate: new Date(),
    completionPercentage: submissionPercentage,
  };
}

function updateSubmissionObject(
  submission: Submission,
  newSubmissionPercentage: number
): Submission {
  return { ...submission, completionPercentage: newSubmissionPercentage };
}

function isTodaysDate(date: Date): boolean {
  return date.toLocaleDateString() == Date.now().toLocaleString();
}
