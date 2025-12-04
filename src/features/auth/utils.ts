export function calculateFutureDate(timeInMinutes: number) {
  const date = new Date();
  date.setMinutes(date.getMinutes() + timeInMinutes);
  return date;
}
