export const whereNotNull = <T>(arr: (T | undefined | null)[]): T[] =>
  arr.filter((item) => item !== undefined && item !== null);
