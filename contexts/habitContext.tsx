import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { Habit } from "../interfaces/habit";
import getHabitsOnDate from "../logic/getHabitsOnDate";

interface HabitContextProviderProps {
  children: React.ReactNode;
}

interface HabitContext {
  habits: Habit[];
  setHabits: Dispatch<SetStateAction<Habit[]>>;
  filteredHabits: Habit[];
  setFilteredHabits: Dispatch<SetStateAction<Habit[]>>;
  openedHabit: number;
  setOpenedHabit: Dispatch<SetStateAction<number>>;
  dateShown: Date;
  setDateShown: Dispatch<SetStateAction<Date>>;
}
const HabitContext = createContext<HabitContext | null>(null);

export default function HabitContextProvider({ children }: HabitContextProviderProps) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [filteredHabits, setFilteredHabits] = useState<Habit[]>([]);
  const [openedHabit, setOpenedHabit] = useState<number>(-1);
  const [dateShown, setDateShown] = useState<Date>(new Date());

  // when habits updated, reset home back to current day
  useEffect(() => {
    // const currentDate = new Date();
    // setDateShown(currentDate);
    setFilteredHabits(getHabitsOnDate(dateShown, habits));
  }, [habits]);

  return (
    <HabitContext.Provider
      value={{
        habits,
        setHabits,
        filteredHabits,
        setFilteredHabits,
        openedHabit,
        setOpenedHabit,
        dateShown,
        setDateShown,
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
