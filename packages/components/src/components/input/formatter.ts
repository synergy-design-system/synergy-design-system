/* eslint-disable complexity */
/**
 * Formats a number using the Intl.NumberFormat API.
 * @param value The value to format
 * @param step The step value to use for formatting. Used if no minimumFractionDigits is provided.
 * @param numberFormatterOptions Additional parameters to pass to the number formatter.
 * @returns The formatted value
 */
export const formatNumber = (
  value: number,
  step: number | string | undefined,
  numberFormatterOptions: Intl.NumberFormatOptions = {},
) => {
  const {
    maximumFractionDigits: providedMaxFractionDigits,
    minimumFractionDigits: providedMinFractionDigits,
    ...otherOptions
  } = numberFormatterOptions;

  // There may be times where the user sets something like this:
  // <syn-input min-fraction-digits="0" step="0.3">
  // In this case, we need to use the step value to determine the fraction digits
  // to use for the formatter.
  const stepToUse = step === 'any' || !step ? 1 : +step;
  const stepFractionDigits = stepToUse.toString().split('.')[1]?.length || 0;

  let minimumFractionDigits;
  let maximumFractionDigits;

  if (providedMinFractionDigits && !providedMaxFractionDigits) {
    // If only min is set, use the min both min and max
    minimumFractionDigits = providedMinFractionDigits;
    maximumFractionDigits = providedMinFractionDigits;
  } else if (providedMaxFractionDigits && !providedMinFractionDigits) {
    // If only max is set, use the max both min and max
    minimumFractionDigits = providedMaxFractionDigits;
    maximumFractionDigits = providedMaxFractionDigits;
  } else if (providedMaxFractionDigits && providedMinFractionDigits) {
    // If both are set, use the provided values, but make sure to sort them first
    minimumFractionDigits = Math.min(providedMinFractionDigits, providedMaxFractionDigits);
    maximumFractionDigits = Math.max(providedMinFractionDigits, providedMaxFractionDigits);
  }

  // Make sure to use the step fraction digits
  // if they are greater than the provided min or max values
  if (stepFractionDigits > (minimumFractionDigits || 0)) {
    minimumFractionDigits = stepFractionDigits;
  }
  if (stepFractionDigits > (maximumFractionDigits || 0)) {
    maximumFractionDigits = stepFractionDigits;
  }

  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits,
    minimumFractionDigits,
    ...otherOptions,
  });

  return formatter.format(value);
};
