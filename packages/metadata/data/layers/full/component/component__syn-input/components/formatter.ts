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

  const minFractionIsNumber = typeof providedMinFractionDigits === 'number';
  const maxFractionIsNumber = typeof providedMaxFractionDigits === 'number';

  if (minFractionIsNumber && !maxFractionIsNumber) {
    // If only min is set, use the min both min and max
    minimumFractionDigits = providedMinFractionDigits;
    maximumFractionDigits = providedMinFractionDigits;
  } else if (maxFractionIsNumber && !minFractionIsNumber) {
    // If only max is set, use the max both min and max
    minimumFractionDigits = providedMaxFractionDigits;
    maximumFractionDigits = providedMaxFractionDigits;
  } else if (minFractionIsNumber && maxFractionIsNumber) {
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

  // min and max fraction digits have a hard cap of 100 decimal places
  // If provided a bigger value, the numberformat will throw an error.
  // Therefore, we make sure to cap the values to 100.
  // https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#minimumfractiondigits
  if (typeof minimumFractionDigits !== 'undefined' && minimumFractionDigits > 100) {
    minimumFractionDigits = 100;
  }
  if (typeof maximumFractionDigits !== 'undefined' && maximumFractionDigits > 100) {
    maximumFractionDigits = 100;
  }

  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits,
    minimumFractionDigits,
    useGrouping: false,
    ...otherOptions,
  });

  return formatter.format(value);
};
