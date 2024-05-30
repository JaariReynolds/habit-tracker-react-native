export function toMidnight(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function isTodaysDate(date: Date): boolean {
  return date.toLocaleDateString() == Date.now().toLocaleString();
}
