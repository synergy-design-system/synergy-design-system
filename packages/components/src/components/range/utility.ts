export const numericSort = (a: number, b: number): number => a - b;

export const arraysDiffer = (a: readonly number[], b: readonly number[]): boolean => {
  if (a.length !== b.length) return true;
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) return true;
  }
  return false;
};
