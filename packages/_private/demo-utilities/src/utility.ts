/**
 * Capitalizes the first letter of a string
 * @param s string to be capitalized
 * @returns Capitalized string
 */
export const capitalize = (s: string) => s && s[0].toUpperCase() + s.slice(1);

export const noop = () => null;
