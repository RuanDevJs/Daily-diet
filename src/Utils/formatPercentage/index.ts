type formatPercentage = (value: number, total: number) => string;

export function formatPercentage(value: number, total: number): number {
  const percentage = (value / total) * 100;
  return percentage;
}
