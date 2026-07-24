/**
 * Creates a sanitized string from a given value, replacing the specified delimiter with whitespace.
 * @param value The value to be converted
 * @param delimiter The delimiter to use
 * @returns The value with the delimiter replaced by whitespace
 */
export const delimiterToWhiteSpace = (value: string, delimiter: string) => {
  const escapedDelimiter = delimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(escapedDelimiter, 'g');
  return value.replace(regex, '_');
};
