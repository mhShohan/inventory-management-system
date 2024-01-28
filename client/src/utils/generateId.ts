const generateId = ({
  day,
  week,
  month,
  year,
}: {
  day?: number;
  week?: number;
  month?: number;
  year: number;
}) => {
  let id = String(year);

  if (month) {
    id += month;
  }

  if (week) {
    id += week;
  }

  if (day) {
    id += day;
  }

  return id;
};

export default generateId