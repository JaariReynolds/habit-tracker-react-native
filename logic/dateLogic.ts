const MILLISECONDS_PER_DAY = 86400000;

export function toMidnight(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function isTodaysDate(date: Date): boolean {
  return date.toLocaleDateString() == Date.now().toLocaleString();
}

// returns true if the gap in days between date1 and date2 are a multiple of daysGap apart
export function isDateWithinDaysMultiple(date1: Date, date2: Date, daysGap: number): boolean {
  const differenceInMilliseconds = Math.abs(
    toMidnight(date1).getTime() - toMidnight(date2).getTime()
  );
  const differenceInDays = Math.round(differenceInMilliseconds / MILLISECONDS_PER_DAY);
  return differenceInDays % daysGap === 0;
}
