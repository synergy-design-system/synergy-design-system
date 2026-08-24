/**
 * Returns a formatter that appends the given unit to each axis label value.
 *
 * @param unit - The unit string to append (e.g. `'kg'`, `'°C'`).
 * @returns A formatter function that concatenates the value and unit with a space.
 */
export const unitFormatter = (unit: string) => (value: string | number) => `${value} ${unit}`;

/**
 * Maps powers of 10 (in steps of 3) to their SI prefix symbols.
 */
const SI_PREFIXES = new Map<number, string>([
  [24, 'Y'],
  [21, 'Z'],
  [18, 'E'],
  [15, 'P'],
  [12, 'T'],
  [9, 'G'],
  [6, 'M'],
  [3, 'k'],
  [0, ''],
  [-3, 'm'],
  [-6, 'µ'],
  [-9, 'n'],
  [-12, 'p'],
  [-15, 'f'],
  [-18, 'a'],
  [-21, 'z'],
  [-24, 'y'],
]);

/**
 * Returns a formatter that shortens large or small numeric axis label values using SI prefixes.
 *
 * Values whose absolute magnitude falls within the range [10⁻³, 10³) are rendered as-is.
 * Values outside that range are divided by the appropriate power of 10 and suffixed with
 * the corresponding SI prefix (e.g. `1 500 000` → `'1.5M'`, `0.002` → `'2m'`).
 * Non-numeric strings are returned unchanged.
 *
 * @param locale - A locale tag passed to `Intl.NumberFormat`. Defaults to the runtime locale when omitted.
 * @param options - Additional `Intl.NumberFormat` options (e.g. `{ maximumFractionDigits: 2 }`).
 * @returns A formatter function that accepts a stringified number and returns a formatted label.
 */
export const numberShorthandFormatter = (locale?: string, options?: Intl.NumberFormatOptions) => (value: string | number) => {
  const numberValue = Number(value);

  // Check if value is a number
  if (Number.isNaN(numberValue)) {
    return String(value);
  }

  const formatter = new Intl.NumberFormat(locale, options);
  const normalizedValue = numberValue + 0.0; // avoid -0

  if (normalizedValue === 0) {
    return formatter.format(normalizedValue);
  }

  const absValue = Math.abs(normalizedValue);
  const floorLog10 = Math.floor(Math.log10(absValue));
  const shorthandIndex = Math.floor(floorLog10 / 3) * 3;

  if (shorthandIndex === 0 || (shorthandIndex < 3 && shorthandIndex > -4)) {
    return formatter.format(normalizedValue);
  }

  const siPrefix = SI_PREFIXES.get(shorthandIndex);
  if (siPrefix === undefined) {
    // Fallback for values outside the supported SI prefix range
    return formatter.format(normalizedValue);
  }

  const scaledValue = normalizedValue / 10 ** shorthandIndex;
  return formatter.format(scaledValue) + siPrefix;
};

/**
 * Returns a formatter that localizes numeric axis label values using `Intl.NumberFormat`.
 *
 * Non-numeric strings are returned unchanged.
 *
 * @param locale - A locale tag passed to `Intl.NumberFormat`. Defaults to the runtime locale when omitted.
 * @param options - Additional `Intl.NumberFormat` options (e.g. `{ maximumFractionDigits: 2 }`).
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
 */
export const numberFormatter = (locale?: string, options?: Intl.NumberFormatOptions) => (value: string | number) => {
  const numberValue = Number(value);
  // Check if value is a number
  if (Number.isNaN(numberValue)) {
    return String(value);
  }

  const formatter = new Intl.NumberFormat(locale, options);
  return formatter.format(numberValue);
};
