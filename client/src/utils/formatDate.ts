const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

const formatDate = (time: string) => {
  const date = new Date(time);

  return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
}

export default formatDate