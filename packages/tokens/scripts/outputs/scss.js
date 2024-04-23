/* eslint-disable no-console */
import fs from 'fs';
import { pascalCase } from 'change-case';
import chalk from 'chalk';
import { createFolder, createHeaderComment } from '../helpers.js';

/**
 * Creates scss exports from the provided css file
 *
 * @param {string} header The header to prepend to the output
 * @param {string} inputFile Path to the input file
 * @param {string} outputFile Path to the output file
 */
export const createSCSS = (header, inputFile, outputFile) => {
  createFolder(outputFile);
  const contents = fs.readFileSync(inputFile).toString();
  const foundItems = Array.from(contents.matchAll(/--[A-Za-z0-9-]*:/g))
    .map(match => match[0])
    .map(cssVar => {
      const varName = cssVar.replace('--', '').replace(':', '');
      return [
        pascalCase(varName, {
          mergeAmbiguousCharacters: true,
        }),
        cssVar.replace(':', ''),
      ];
    })
    .map(([sassVar, cssVar]) => `
      $${sassVar}: var(${cssVar}) !default;
    `.trim())
    .join('\n');

  const output = `
${createHeaderComment(header)}
${foundItems}
  `.trim();

  fs.writeFileSync(outputFile, `${output}\n`, {
    encoding: 'utf-8',
  });
  console.log(chalk.green('✔︎ Created SCSS exports'));
};
