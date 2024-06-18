import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { Habit } from "../interfaces/habit";
import { isHabitOnDate } from "../logic/getHabitsOnDate";
import { MidnightDate } from "../interfaces/date";
import { getOverallDayCompletion } from "../logic/reportLogic/getHabitCompletion";

interface HabitContextProviderProps {
  children: React.ReactNode;
}

interface HabitContext {
  habits: Habit[];
  setHabits: Dispatch<SetStateAction<Habit[]>>;
  openedHabit: number;
  setOpenedHabit: Dispatch<SetStateAction<number>>;
  dateShown: Date;
  handleSetDateShown: (dayOffsetOrDate: number | Date) => void;
  dateShownCompletion: number;
  formattedDateArray: string[];
}
const HabitContext = createContext<HabitContext | null>(null);

export default function HabitContextProvider({ children }: HabitContextProviderProps) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [openedHabit, setOpenedHabit] = useState<number>(-1);
  const [dateShown, setDateShown] = useState<Date>(new MidnightDate());
  const [dateShownCompletion, setDateShownCompletion] = useState<number>(0);
  const [formattedDateArray, setFormattedDateArray] = useState<string[]>(
    new Date()
      .toLocaleDateString("en-GB", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
      .split(", ")
  );

  function handleSetDateShown(dayOffsetOrDate: number | Date) {
    var newDate: Date;
    if (dayOffsetOrDate instanceof Date) {
      newDate = new MidnightDate(dayOffsetOrDate);
    } else {
      if (dayOffsetOrDate === 0) {
        newDate = new MidnightDate();
      } else {
        newDate = new MidnightDate(dateShown);
        newDate.setDate(newDate.getDate() + dayOffsetOrDate);
      }
    }

    setDateShown(newDate);

    setFormattedDateArray(
      newDate
        .toLocaleDateString("en-GB", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })
        .split(", ")
    );

    setHabits((prev) =>
      prev.map((habit) => {
        return { ...habit, isOnDateShown: isHabitOnDate(habit, newDate) };
      })
    );
  }

  useEffect(() => {
    setDateShownCompletion(getOverallDayCompletion(habits, dateShown));
  }, [habits, dateShown]);

  return (
    <HabitContext.Provider
      value={{
        habits,
        setHabits,
        openedHabit,
        setOpenedHabit,
        dateShown,
        handleSetDateShown,
        dateShownCompletion,
        formattedDateArray,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
}

export function useHabitContext() {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error("useHabitContext must be used within a HabitContextProvider");
  }
  return context;
}
