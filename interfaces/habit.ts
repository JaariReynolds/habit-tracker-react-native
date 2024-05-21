export interface Habit {
  id: string;
  habitName: string;
  submissions: Submission[];
  frequency: Frequency;
  creationDate: Date;
  lastUpdateDate: Date;
  currentStreak: number;
}

export interface HabitForm {
  habitId: string | null;
  habitName: string;
  frequencyString: string;
  selectedDays: number[];
  customFrequency: number;
  lastUpdateDate: Date | null;
}

export const emptyForm: HabitForm = {
  habitId: null,
  habitName: "",
  frequencyString: "Daily",
  selectedDays: [],
  customFrequency: 0,
  lastUpdateDate: null,
};

export interface Submission {
  id: string;
  habitId: string;
  submissionDate: Date;
  completionStatus: CompletionStatus;
}

export type WeeklyFrequency = {
  days: number[]; // 0 for Monday, ..., 6 for Sunday
};

export type CustomFrequency = {
  customFrequency: number;
};

// export type HabitEntry = "Timed" | "Checkbox" | "Percentage";
// export const HabitEntryNames = ["Timed", "Checkbox", "Percentage"];

export type CompletionStatus = "Incomplete" | "Complete" | "Partial";
export const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export type Frequency = "Daily" | WeeklyFrequency | CustomFrequency;
export const FrequencyNames = ["Daily", "Weekly", "Custom"];
