export const numericSort = (a: number, b: number): number => a - b;

export const arraysDiffer = (a: readonly number[], b: readonly number[]): boolean => {
  if (a.length !== b.length) return true;
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) return true;
  }
  return false;
};

// eslint-disable-next-line complexity
export const getNormalizedValueFromClientX = (
  baseDiv: HTMLElement,
  handle: HTMLElement,
  x: number,
  isRtl: boolean,
): number => {
  const bounds = baseDiv.getBoundingClientRect();
  const { clientWidth } = handle;
  const size = bounds.width - clientWidth;
  if (size <= 0) return 0;

  let nextX = x;

  nextX -= bounds.left + clientWidth / 2;
  if (nextX <= 0) return isRtl ? 1 : 0;
  if (nextX >= size) return isRtl ? 0 : 1;
  nextX /= size;
  return isRtl ? 1.0 - nextX : nextX;
};
