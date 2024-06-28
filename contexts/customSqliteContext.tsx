import * as SQLite from "expo-sqlite";
import { createContext, useContext, useEffect, useState } from "react";
import { useHabitContext } from "./habitContext";
import { CustomFrequency, Habit, WeeklyFrequency } from "../interfaces/habit";
import { HabitsRow } from "../database/types";
import { getFrequencyType } from "../logic/baseHabitLogic";
import { isHabitOnDate } from "../logic/getHabitsOnDate";
import { MidnightDate } from "../interfaces/date";

interface CustomSqliteContextProviderProps {
  children: React.ReactNode;
  databaseName: string;
}

interface CustomSqliteContext {
  database: SQLite.SQLiteDatabase;
  createHabit: (habit: Habit) => Promise<void>;
}

const CustomSqliteContext = createContext<CustomSqliteContext | null>(null);

export default function CustomSqliteContextProvider({
  children,
  databaseName,
}: CustomSqliteContextProviderProps) {
  const { setHabits } = useHabitContext();
  const [database] = useState<SQLite.SQLiteDatabase>(() => SQLite.openDatabaseSync(databaseName));

  useEffect(() => {
    async function createTables() {
      // await SQLite.deleteDatabaseAsync(databaseName);

      await database.execAsync(`
        CREATE TABLE IF NOT EXISTS habits (
            id TEXT PRIMARY KEY NOT NULL,
            habitName TEXT NOT NULL,
            creationDate INTEGER NOT NULL,
            lastUpdatedDate INTEGER NOT NULL,
            currentStreak INTEGER NOT NULL,
            startDate INTEGER NOT NULL,
            type TEXT NOT NULL,
            days TEXT,
            customFrequency INTEGER   
        );
    
        CREATE TABLE IF NOT EXISTS submissions (
            id TEXT PRIMARY KEY NOT NULL,
            habitId TEXT NOT NULL,
            submissionDate INTEGER NOT NULL,
            completionPercentage REAL NOT NULL,
            FOREIGN KEY (habitId) REFERENCES Habits(id)
        );
    
        CREATE TABLE IF NOT EXISTS test (
            id TEXT PRIMARY KEY NOT NULL,
            name TEXT NOT NULL
        )     
      `);
      console.log("tables created");
    }
    createTables();
    loadHabits();
  }, [database]);

  async function createHabit(habit: Habit) {
    console.log("running create habit statement");
    try {
      const habitStatement = await database.runAsync(
        `INSERT INTO habits (id, habitName, creationDate, lastUpdatedDate, currentStreak, startDate, type, days, customFrequency) VALUES ($id, $habitName, $creationDate, $lastUpdatedDate, $currentStreak, $startDate, $type, $days, $customFrequency)`,
        {
          $id: habit.id,
          $habitName: habit.habitName,
          $creationDate: habit.creationDate.getTime(),
          $lastUpdatedDate: habit.creationDate.getTime(),
          $currentStreak: 0,
          $startDate: habit.frequency.startDate.getTime(),
          $type: habit.frequency.name,
          $days:
            habit.frequency.name === "Weekly"
              ? (habit.frequency as WeeklyFrequency).days.toString()
              : null,
          $customFrequency:
            habit.frequency.name === "Custom"
              ? (habit.frequency as CustomFrequency).customFrequency
              : null,
        }
      );
      console.log(habitStatement.lastInsertRowId);
      console.log("inserted finished");
    } catch (error) {
      console.error(error);
    }
  }

  async function loadHabits() {
    const habits = (await database.getAllAsync(`SELECT * FROM habits`)) as HabitsRow[];
    // console.log(JSON.stringify(habits, null, 2));
    const habitsArray: Habit[] = habits
      .map((habit) => {
        return {
          id: habit.id,
          habitName: habit.habitName,
          creationDate: new Date(habit.creationDate),
          lastUpdateDate: new Date(habit.lastUpdatedDate),
          currentStreak: habit.currentStreak,
          frequency: getFrequencyType({
            type: habit.type,
            days:
              habit.days !== null ? habit.days.split(",").map((day) => parseInt(day, 10)) : null,
            customFrequency: habit.customFrequency,
            startDate: new Date(habit.startDate),
          }),
          submissions: [],
        };
      })
      .map((habit) => {
        // .map again as isHabitOnDate takes in existing habit
        return { ...habit, isOnDateShown: isHabitOnDate(habit, new MidnightDate()) };
      });

    setHabits(habitsArray);
  }

  return (
    <CustomSqliteContext.Provider value={{ database, createHabit }}>
      {children}
    </CustomSqliteContext.Provider>
  );
}

export function useCustomSqliteContext() {
  const context = useContext(CustomSqliteContext);
  if (!context) {
    throw new Error("useCustomSqliteContext must be used within a CustomSqliteContextProvider");
  }
  return context;
}
