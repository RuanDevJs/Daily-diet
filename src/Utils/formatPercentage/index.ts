export function formatPercentage(value: number, total: number): string {
  const percentage = (value / total) * 100;
  return percentage.toFixed(2);
}
