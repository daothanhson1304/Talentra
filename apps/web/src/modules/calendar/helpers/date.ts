export const getCurrentWeekDays = (offset: number): string[] => {
  const today = new Date();
  const monday = new Date(today);
  monday.setDate(
    today.getDate() -
      today.getDay() +
      (today.getDay() === 0 ? -6 : 1) +
      offset * 7
  );
  const days = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);
    day.setUTCHours(0, 0, 0, 0);
    days.push(day.toISOString());
  }
  return days;
};

export const formatHour = (h: number) => {
  if (h === 0) return '12 AM';
  if (h < 12) return `${h} AM`;
  if (h === 12) return '12 PM';
  return `${h - 12} PM`;
};

export const getDayInfo = (day: string) => {
  const date = new Date(day);
  const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
  const dayNum = date.toLocaleDateString('en-US', { day: 'numeric' });
  return {
    weekday,
    dayNum,
  };
};

export const isSameDay = (day1: string, day2: string) => {
  const date1 = new Date(day1);
  const date2 = new Date(day2);
  date1.setUTCHours(0, 0, 0, 0);
  date2.setUTCHours(0, 0, 0, 0);
  return date1.toISOString() === date2.toISOString();
};

export const getWeek = (day: string) => {
  const date = new Date(day);
  date.setUTCHours(0, 0, 0, 0);
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

export const getMonth = (day: string) => {
  const date = new Date(day);
  return date.toLocaleDateString('en-US', { month: 'long' });
};

export const getYear = (day: string) => {
  const date = new Date(day);
  return date.toLocaleDateString('en-US', { year: 'numeric' });
};

export const getDayOfWeek = (
  currentWeekOffset: number,
  dayOfTheWeek: number
) => {
  const days = getCurrentWeekDays(currentWeekOffset);
  return days[dayOfTheWeek];
};
