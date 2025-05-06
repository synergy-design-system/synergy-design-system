/**
 * Formats a number using the Intl.NumberFormat API.
 * @param value The value to format
 * @param step The step value to use for formatting. Used if no minimumFractionDigits is provided.
 * @param numberFormatterOptions Additional parameters to pass to the number formatter.
 * @returns The formatted value
 */
export const formatNumber = (
  value: number,
  step: number | string,
  numberFormatterOptions: Intl.NumberFormatOptions = {},
) => {
  const {
    maximumFractionDigits,
    minimumFractionDigits,
    ...otherOptions
  } = numberFormatterOptions;

  // There may be times where the user sets something like this:
  // <syn-input fraction-digits="0" step="0.3">
  // In this case, we need to use the step value to determine the fraction digits
  // to use for the formatter.
  const stepToUse = step === 'any' ? 1 : +step;
  const stepFractionDigits = stepToUse.toString().split('.')[1]?.length || 0;
  const usedMinFractionDigitsToUse = Math.max(minimumFractionDigits!, stepFractionDigits);
  const usedMinimumFractionDigits = Math.max(usedMinFractionDigitsToUse, 0);

  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits,
    minimumFractionDigits: usedMinimumFractionDigits,
    ...otherOptions,
  });

  return formatter.format(value);
};
