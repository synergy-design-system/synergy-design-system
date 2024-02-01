export const capitalize = (s: string) => s && s[0].toUpperCase() + s.slice(1);

// We have to adjust the original form data
// so it is possible to send multiple values
// This prevents errors with select[multiple]
// that will send all three selected elements
// in form-data with the same name.
// This will make sure multiple uses "," as separator for multi values
export const normalizeData = (data: FormData) => Array
  .from(data)
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  .map(([key, value]) => [key, value.toString()])
  .reduce((prev, curr) => {
    const [currKey, currVal] = curr;
    const finalValue = typeof prev[currKey] !== 'undefined'
      ? `${prev[currKey]},${currVal}`
      : currVal;

    return {
      ...prev,
      [currKey]: finalValue,
    };
  }, {} as Record<string, string>);
