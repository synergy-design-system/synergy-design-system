/* eslint-disable no-console */
import fs from 'fs';
import { pascalCase, pascalCaseTransformMerge } from 'change-case';
import chalk from 'chalk';
import { createFolder, createHeaderComment } from '../helpers.js';

/**
 * Creates JavaScript exports from the provided css file
 *
 * @param {string} header The header to prepend to the output
 * @param {string} inputFile Path to the input file
 * @param {string} outputFile Path to the output file
 */
export const createJS = (header, inputFile, outputFile) => {
  createFolder(outputFile);
  const contents = fs.readFileSync(inputFile).toString();
  const foundItems = Array.from(contents.matchAll(/--[A-Za-z0-9-]*:/g))
    .map(match => match[0])
    .map(cssVar => {
      const varName = cssVar.replace('--', '').replace(':', '');
      return [
        pascalCase(varName, {
          transform: pascalCaseTransformMerge,
        }),
        cssVar.replace(':', ''),
      ];
    })
    .map(([jsVar, cssVar]) => `
/**
 * @type {string}
 */
export const ${jsVar} = 'var(${cssVar})';
    `.trim())
    .join('\n\n');

  const output = `
${createHeaderComment(header)}

${foundItems}
  `.trim();

  fs.writeFileSync(outputFile, `${output}\n`, {
    encoding: 'utf-8',
  });
  console.log(chalk.green('✔︎ Created javascript exports'));
};
