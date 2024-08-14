export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const generateDate = ({ day, week, month, year }: { day?: number; week?: number; month?: number; year: number }) => {

  let date = String(year);

  if (month) {
    date = `${months[month - 1]}, ${year}`
  }

  if (week) {
    date = `${week}th week of ${year}`
  }

  if (day && month) {
    date = `${day} ${months[month - 1]}, ${year}`
  }

  return date;
};

export default generateDate