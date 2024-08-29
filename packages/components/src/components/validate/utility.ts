/**
 * Check if two string arrays differ
 * @param a The first array
 * @param b The second array
 * @returns True if the arrays differ, false otherwise
 */
export const arraysDiffer = (a: readonly string[], b: readonly string[]): boolean => {
  if (a.length !== b.length) return true;

  // As the sort order is not guaranteed, we need to sort the arrays before comparing
  const sortedA = a.slice().sort();
  const sortedB = b.slice().sort();
  for (let i = 0; i < sortedA.length; i += 1) {
    if (sortedA[i] !== sortedB[i]) return true;
  }
  return false;
};
