import { ResolvedTokens as ChartTokens } from '@synergy-design-system/tokens/charts/resolved';
import { ResolvedTokens as ComponentTokens } from '@synergy-design-system/tokens/resolved';

/**
 * Combined token dictionary used by chart theme utilities.
 * Chart-specific tokens are merged with component tokens.
 */
const ResolvedTokens = {
  ...ChartTokens,
  ...ComponentTokens,
};

export type ThemeMode = 'light' | 'dark' | 'auto';
export type Themes = Exclude<ThemeMode, 'auto'>;

let globalThemeStore: Themes = 'light';

export const setGlobalThemeStore = (theme: Themes) => {
  globalThemeStore = theme;
};

/**
 * All valid token keys supported by the merged token dictionary.
*/
export type ResolvedTokensName = keyof typeof ChartTokens | keyof typeof ComponentTokens;

/**
 * Resolves a token name to its theme value from the merged chart/component token maps.
 *
 * @param token Token key, e.g. SynColorPrimary500.
 * @param mode Theme mode to resolve, defaults to light.
 * @returns Token value for the selected mode or an empty string when the token has no value.
 */
export const getRealStyleValue = (token: ResolvedTokensName, mode: ThemeMode = 'auto'): string => {
  let currentMode: Themes;
  if(mode === 'auto') {
    currentMode = globalThemeStore;
  } else {
    currentMode = mode;
  }
  const value = ResolvedTokens[token][currentMode];

  const resolved = value || '';
  return resolved;
};

/**
 * Resolves a token value and parses its numeric part.
 *
 * @param token Token key.
 * @param mode Theme mode to resolve, defaults to light.
 * @returns Parsed floating-point number from the token value of the selected mode.
 */
export const getRealValueWithoutUnit = (token: ResolvedTokensName, mode: ThemeMode = 'auto'): number => {
  const value = getRealStyleValue(token, mode);
  return parseFloat(value);
};

/**
 * Normalizes either a single value or an array into an array shape.
 *
 * @param value A single item or an array of items.
 * @returns The input as an array.
 */
export const normalizeArray = <T>(value: T | T[]): T[] => (Array.isArray(value) ? value : [value]);

/**
 * Checks if an object has an own property for a given key.
 *
 * @param obj Object to inspect.
 * @param key Property key to check.
 * @returns True when the key exists as an own property.
 */
const checkKeyExists = (obj: Record<string, unknown>, key: string): boolean => Object.prototype.hasOwnProperty.call(obj, key);

/**
 * Ensures that a nested property path exists and applies a default value when the final key is missing.
 * Existing values are preserved.
 *
 * @param target Object that is read and potentially mutated.
 * @param keyPath Dot-separated key path, e.g. a.b.c.
 * @param value Default value to assign when the final key does not exist.
 */
export const setDefaultValueIfNotAvailable = (target: Record<string, unknown>, keyPath: string, value: unknown) => {
  const keys = keyPath.split('.');
  let currentObj: Record<string, unknown> = target;
  const finalKey = keys[keys.length - 1];

  keys.forEach((key) => {
    if (finalKey === key) {
      if (!checkKeyExists(currentObj, key)) {
        currentObj[key] = value;
      }
    } else {
      if (!checkKeyExists(currentObj, key)) {
        currentObj[key] = {};
      }
      currentObj = currentObj[key] as Record<string, unknown>;
    }
  });
};

export const getHexWithOpacity = (hexColor: string, opacity: number) => {
  if (!Number.isFinite(opacity) || opacity < 0 || opacity > 1) {
    throw new Error(`Opacity must be a number between 0 and 1. Received: ${opacity}`);
  }
  const alpha = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, '0')
    .toUpperCase();

  return `${hexColor}${alpha}`;
};

let measureCanvas: HTMLCanvasElement | undefined;

/**
 * Measures the rendered width of a text string for a given CSS font shorthand,
 * using an offscreen canvas 2D context.
 *
 * @param text Text to measure.
 * @param font CSS font shorthand, e.g. `600 14px sans-serif`.
 * @returns The measured width in pixels, or `0` when no canvas context is available.
 */
export const measureTextWidth = (text: string, font: string): number => {
  if (typeof document === 'undefined') {
    return 0;
  }

  measureCanvas ??= document.createElement('canvas');
  const context = measureCanvas.getContext('2d');

  if (!context) {
    return 0;
  }

  context.font = font;
  return context.measureText(text).width;
};
