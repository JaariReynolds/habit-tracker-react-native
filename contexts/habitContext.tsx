import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
import { Habit } from "../interfaces/habit";
import { isHabitOnDate } from "../logic/getHabitsOnDate";
import { MidnightDate } from "../interfaces/date";

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
}
const HabitContext = createContext<HabitContext | null>(null);

export default function HabitContextProvider({ children }: HabitContextProviderProps) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [openedHabit, setOpenedHabit] = useState<number>(-1);
  const [dateShown, setDateShown] = useState<Date>(new MidnightDate());

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
    setHabits((prev) =>
      prev.map((habit) => {
        return { ...habit, isOnDateShown: isHabitOnDate(habit, newDate) };
      })
    );
  }

  return (
    <HabitContext.Provider
      value={{
        habits,
        setHabits,
        openedHabit,
        setOpenedHabit,
        dateShown,
        handleSetDateShown,
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
