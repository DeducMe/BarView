const weekDays = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

export const getTodayHours = Hours => {
  if (!Hours) return;
  let day = new Date().getDay();
  if (day === 0) day = 6;
  else day -= 1;

  const todayDayHours = Hours[weekDays[day]];
  if (!!todayDayHours && todayDayHours !== '')
    return todayDayHours.slice(8, 13);
  else {
    // if (everydayHours?.TwentyFourHours) return '24 hours';
    // if (!everydayHours?.Intervals) return null;
    return !!Hours['everyday'] && Hours['everyday'] !== ''
      ? Hours['everyday'].slice(8, 13)
      : null;
  }
};
