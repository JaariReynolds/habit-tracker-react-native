import { uuid } from "expo-modules-core";
import { Habit, Submission } from "../interfaces/habit";
import { toMidnight } from "./dateLogic";

// this feels longer than it i thought it would be?
export default function handleHabitSubmission(
  habitId: string,
  submissionPercentage: number,
  submissionDate: Date,
  habits: Habit[]
): Habit[] {
  const existingHabit = habits.find((habit) => habit.id == habitId);

  if (existingHabit == undefined) {
    return habits;
  }

  // update submissions array if date already exists
  let updatedSubmission: boolean = false;
  let updatedSubmissions = existingHabit.submissions.map((submission) => {
    if (submission.submissionDate.toLocaleDateString() == submissionDate.toLocaleDateString()) {
      updatedSubmission = true;
      return updateSubmissionObject(submission, submissionPercentage);
    }
    return submission;
  });

  // otherwise, push new submission
  if (!updatedSubmission)
    updatedSubmissions.push(newSubmissionObject(habitId, submissionPercentage, submissionDate));
  console.log("new submission array..");

  // this is not necessary tbh but helps for debugging if needed
  updatedSubmissions = updatedSubmissions.sort(
    (a, b) => a.submissionDate.getTime() - b.submissionDate.getTime()
  );

  const log = updatedSubmissions.map((submission) => {
    return {
      x: submission.submissionDate.toLocaleDateString(),
      y: submission.completionPercentage,
    };
  });

  console.log(JSON.stringify(log, null, 2));

  // update habits array with newly updated habit
  const newHabits = habits.map((habit) => {
    if (habit.id == existingHabit.id)
      return {
        ...habit,
        lastUpdateDate: new Date(),
        submissions: updatedSubmissions,
      };

    return habit;
  });

  return newHabits;
}

function newSubmissionObject(
  habitId: string,
  submissionPercentage: number,
  submissionDate: Date
): Submission {
  return {
    id: uuid.v4() as string,
    habitId: habitId,
    submissionDate: submissionDate,
    completionPercentage: submissionPercentage,
  };
}

function updateSubmissionObject(
  submission: Submission,
  newSubmissionPercentage: number
): Submission {
  return { ...submission, completionPercentage: newSubmissionPercentage };
}
