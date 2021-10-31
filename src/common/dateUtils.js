const weekDays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const getTodayHours = Hours => {
  let day = new Date().getDay();
  if (day === 0) day = 7;
  day -= 1;
  const todayDayHours = Hours.Availabilities.find(item => item[weekDays[day]]);

  if (todayDayHours) return todayDayHours?.Intervals[0]?.to.slice(0, -3);
  else {
    const everydayHours = Hours.Availabilities?.find(item => item['Everyday']);
    if (everydayHours?.TwentyFourHours) return '24 hours';
    if (!everydayHours?.Intervals) return null;

    return everydayHours ? everydayHours.Intervals[0]?.to.slice(0, -3) : null;
  }
};
