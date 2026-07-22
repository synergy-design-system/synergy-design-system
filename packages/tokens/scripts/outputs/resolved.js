import fs from 'node:fs';
import { styleText } from 'node:util';
import { join } from 'node:path';
import { cssVariableToTokenName, parseCssVariableMap } from '../css-variable-utils.js';
import { createFolder, createHeaderComment } from '../helpers.js';

const VAR_REFERENCE_PATTERN = /var\(\s*(--syn-[A-Za-z0-9-_]+)\s*\)/g;

/**
 * This cache is used to store resolved values for CSS variables to avoid redundant computations.
 * Also the resolved values of the components are needed for the charts.
 */
const RESOLVED_VALUE_CACHE = new Map();

/**
 * Converts a resolved CSS token value into a quoted JavaScript string literal.
 *
 * Values that contain single quotes (e.g. font-family stacks with font names like `'SICK Intl'`)
 * are serialized using `JSON.stringify`, which produces a double-quoted string to avoid
 * escaping conflicts. All other values are wrapped in single quotes.
 *
 * @param {string | null} value - The resolved CSS value to stringify.
 * @returns {string} A quoted string literal ready to be embedded in JS source output.
 */
const stringifyValue = (value) => {
  if (typeof value === 'string' && value.includes("'")) {
    return JSON.stringify(value);
  }
  return `'${value}'`;
};

/**
 * @param {string} mode
 * @param {string} cssVariable
 * @returns {string}
 */
const getResolvedValueCacheKey = (mode, cssVariable) => `${mode}:${cssVariable}`;

/**
 * @param {string} message
 * @param {Parameters<typeof styleText>[0]} color
 */
const log = (message, color = 'yellow') => {
  console.log(styleText(color, `Resolved JS Token Outputter:' ${message}`));
};

/**
 * @param {string} cssVariable
 * @param {Record<string, string>} variables
 * @param {string} mode
 * @returns {string | null}
 */
const resolveVariableValue = (cssVariable, variables, mode) => {
  const cacheKey = getResolvedValueCacheKey(mode, cssVariable);

  if (RESOLVED_VALUE_CACHE.has(cacheKey)) {
    return RESOLVED_VALUE_CACHE.get(cacheKey);
  }

  const rawValue = variables[cssVariable];

  if (rawValue === undefined) {
    log(`Missing value for ${cssVariable}`);
    RESOLVED_VALUE_CACHE.set(cacheKey, null);
    return null;
  }

  const resolvedValue = rawValue.replace(VAR_REFERENCE_PATTERN, (fullMatch, referencedVariable) => {
    const resolvedReference = resolveVariableValue(referencedVariable, variables, mode);

    if (resolvedReference !== null) {
      return resolvedReference;
    }

    log(`Could not fully resolve ${referencedVariable} for ${cssVariable}`);
    return fullMatch;
  });

  RESOLVED_VALUE_CACHE.set(cacheKey, resolvedValue);
  return resolvedValue;
};

/**
 * @param {string} filePath
 * @returns {Record<string, string>}
 */
const readThemeVariables = (filePath) => {
  try {
    return parseCssVariableMap(fs.readFileSync(filePath, 'utf-8'));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    log(`Could not read ${filePath}: ${message}`, 'red');
    return {};
  }
};

/**
 * Creates a resolved css values JavaScript export file from the provided css files
/** @type {import('../types.d.ts').CreateFileOutputFn} */
export const createResolvedJS = (header, themesDir, buildPath) => {
  const outputFile = join(buildPath, 'js', 'resolved.js');
  createFolder(outputFile);

  const lightCssFile = join(themesDir, 'light.css');
  const darkCssFile = join(themesDir, 'dark.css');

  const lightVariables = readThemeVariables(lightCssFile);
  const darkVariables = readThemeVariables(darkCssFile);

  const resolvedEntries = Array.from(Object.keys(lightVariables))
    .map(cssVariable => ({
      dark: resolveVariableValue(cssVariable, darkVariables, 'dark'),
      jsTokenName: cssVariableToTokenName(cssVariable),
      light: resolveVariableValue(cssVariable, lightVariables, 'light'),
    }))
    .sort((a, b) => a.jsTokenName.localeCompare(b.jsTokenName, 'en', { numeric: true }));

  const jsExports = resolvedEntries.map(({ jsTokenName, light, dark }) => `  ${jsTokenName}: { dark: ${stringifyValue(dark)}, light: ${stringifyValue(light)} },`);

  const jsOutput = `
${createHeaderComment(header)}

export const ResolvedTokens = {
${jsExports.join('\n')}
};
`.trim();

  fs.writeFileSync(outputFile, `${jsOutput}\n`, {
    encoding: 'utf-8',
  });
  log('✔︎ Created resolved javascript exports', 'green');

  const tsFile = outputFile.replace(/\.js$/, '.d.ts');
  const tsProperties = resolvedEntries.map(({ jsTokenName }) => `  ${jsTokenName}: ResolvedTokenModes;`);
  const tsOutput = `
${createHeaderComment(header)}

export type ResolvedTokenModeValue = string | null;

export interface ResolvedTokenModes {
  light: ResolvedTokenModeValue;
  dark: ResolvedTokenModeValue;
}

export declare const ResolvedTokens: {
${tsProperties.join('\n')}
};
`.trim();
  fs.writeFileSync(tsFile, `${tsOutput}\n`, {
    encoding: 'utf-8',
  });
  log('✔︎ Created resolved typescript types', 'green');
};
