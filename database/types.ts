import { FrequencyString } from "../interfaces/habit";

export interface HabitsRow {
  id: string;
  habitName: string;
  creationDate: number;
  lastUpdatedDate: number;
  currentStreak: number;
  startDate: number;
  type: FrequencyString;
  days: string;
  customFrequency: number;
}

export interface SubmissionsRow {
  id: string;
  habitId: string;
  submissionDate: number;
  completionPercentage: number;
}

export interface Test {
  id: string;
  name: string;
}
