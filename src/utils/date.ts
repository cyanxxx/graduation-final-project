export function compareDate(startDate: string, endDate: string) {
  const start_date = +new Date(startDate);
  const end_date = +new Date(endDate);
  function isVerse() {
    console.log(end_date - start_date);
    return end_date - start_date < 0;
  }
  function isOverflow() {
    return Math.abs(end_date - start_date) - 60 * 1000 * 60 * 24 * 30 > 0;
  }
  return {
    isVerse,
    isOverflow,
  };
}
