export const getRealStyleValue = (token: string): string => {
  const computedStyles = getComputedStyle(document.body);
  const value = computedStyles.getPropertyValue(token).trim();
  return value || '';
};

export const getRealValueWithoutUnit = (token: string): number => {
  const value = getRealStyleValue(token);
  return parseFloat(value);
};
