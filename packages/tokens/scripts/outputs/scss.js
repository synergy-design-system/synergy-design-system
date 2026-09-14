import fs from 'node:fs';
import { styleText } from 'node:util';
import { join } from 'node:path';
import { cssVariableToTokenName, parseCssVariableNames } from '../css-variable-utils.js';
import { createFolder, createHeaderComment } from '../helpers.js';

/**
 * Creates scss exports from the provided css file
 */
/** @type {import('../types.d.ts').CreateFileOutputFn} */
export const createSCSS = (header, themesDir, buildPath) => {
  const inputFile = join(themesDir, 'light.css');

  const outputFile = join(buildPath, 'scss', '_tokens.scss');
  createFolder(outputFile);
  const contents = fs.readFileSync(inputFile).toString();
  /** @type {Array<[string, string]>} */
  const foundItems = parseCssVariableNames(contents)
    .map(cssVar => [cssVariableToTokenName(cssVar), cssVar]);
  const scssExports = foundItems
    .map(([sassVar, cssVar]) => `
      $${sassVar}: var(${cssVar}) !default;
    `.trim())
    .join('\n');

  const output = `
${createHeaderComment(header)}
${scssExports}
  `.trim();

  fs.writeFileSync(outputFile, `${output}\n`, {
    encoding: 'utf-8',
  });
  console.log(styleText('green', '✔︎ Created SCSS exports'));
};
