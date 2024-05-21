import { createContext, useContext, useState } from "react";
import { Habit } from "../interfaces/habit";

interface HabitContextProviderProps {
  children: React.ReactNode;
}

interface HabitContext {
  habits: Habit[];
  setHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
  openedHabit: number;
  setOpenedHabit: React.Dispatch<React.SetStateAction<number>>;
}
const HabitContext = createContext<HabitContext | null>(null);

export default function HabitContextProvider({
  children,
}: HabitContextProviderProps) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [openedHabit, setOpenedHabit] = useState<number>(-1); // -1 == no habit opened

  return (
    <HabitContext.Provider
      value={{ habits, setHabits, openedHabit, setOpenedHabit }}
    >
      {children}
    </HabitContext.Provider>
  );
}

export function useHabitContext() {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error(
      "useHabitContext must be used within a HabitContextProvider"
    );
  }
  return context;
}
