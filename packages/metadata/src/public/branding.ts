import { styleText } from 'node:util';

type LogoColor = Parameters<typeof styleText>[0];

const SYNERGY_LOGO_RAW = `
  +------------------------------+
  |----+++++++--------+++++++----|
  |---++------+*---*-+------++---|
  |---++---------%*---------++---|
  |---++---------++---------++---|
  |---++-----*+++**+++%-----*+---|
  |----**----*---++---*----++----|
  |------****%********%****------|
  |----++----*---++---*----**----|
  |---+*-----%+++**+++*-----++---|
  |---++---------++---------++---|
  |---++---------*%---------++---|
  |---++------+-*---*+------++---|
  |----+++++++--------+++++++----|
  +------------------------------+
`;

const colorChar = (char: string, color: LogoColor): string => {
  if (char === '-') return ' ';
  return styleText(color, char);
};

/**
 * Returns the Synergy logo as a colored string ready for terminal output.
 *
 * The butterfly shape is rendered in the requested style; '-' placeholder characters
 * are replaced with spaces and the outer box frame is stripped, leaving the
 * logo shape floating freely.
 *
 * Uses `util.styleText` so color escapes are automatically suppressed in
 * non-TTY environments and when the NO_COLOR env var is set.
 */
export const getSynergyLogo = (color: LogoColor = 'blueBright'): string => SYNERGY_LOGO_RAW
  .split('\n')
  .map(line => {
    const trimmed = line.trimStart();
    if (trimmed.startsWith('+')) {
      return null;
    }
    if (trimmed.startsWith('|')) {
      const firstPipe = line.indexOf('|');
      const lastPipe = line.lastIndexOf('|');
      const prefix = line.slice(0, firstPipe);
      const interior = line.slice(firstPipe + 1, lastPipe);
      return prefix + [...interior].map(char => colorChar(char, color)).join('');
    }
    return line;
  })
  .filter((line): line is string => line !== null)
  .join('\n');
