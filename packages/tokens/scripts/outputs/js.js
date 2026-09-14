import fs from 'node:fs';
import { styleText } from 'node:util';
import { join } from 'node:path';
import {
  cssVariableToTokenName, parseCssVariableNames,
} from '../css-variable-utils.js';
import { createFolder, createHeaderComment } from '../helpers.js';

/**
 * Creates JavaScript exports from the provided css file
 */
/** @type {import('../types.d.ts').CreateFileOutputFn} */
export const createJS = (header, themesDir, buildPath) => {
  const inputFile = join(themesDir, 'light.css');
  const outputFile = join(buildPath, 'js', 'index.js');
  createFolder(outputFile);
  const contents = fs.readFileSync(inputFile).toString();
  /** @type {Array<[string, string]>} */
  const foundItems = parseCssVariableNames(contents)
    .map(cssVar => [cssVariableToTokenName(cssVar), cssVar]);

  // Create the list of javascript exports
  const jsExports = foundItems.map(([jsVar, cssVar]) => `
/**
 * @type {string}
 */
export const ${jsVar} = 'var(${cssVar})';`);

  const jsOutput = `
${createHeaderComment(header)}
${jsExports.join('\n')}
`.trim();

  fs.writeFileSync(outputFile, `${jsOutput}\n`, {
    encoding: 'utf-8',
  });
  console.log(styleText('green', '✔︎ Created javascript exports'));

  // Create the typescript files
  const tsFile = outputFile.replace(/\.js$/, '.d.ts');
  const tsExports = foundItems.map(([jsVar, cssVar]) => `
/**
 * Maps to the css variable \`${cssVar}\`
 */
export const ${jsVar}: string;`);

  const tsOutput = `
${createHeaderComment(header)}
${tsExports.join('\n')}
`.trim();

  fs.writeFileSync(tsFile, `${tsOutput}\n`, {
    encoding: 'utf-8',
  });
  console.log(styleText('green', '✔︎ Created typescript types'));
};
