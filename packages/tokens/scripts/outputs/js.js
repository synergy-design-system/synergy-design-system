/* eslint-disable no-console */
import fs from 'fs';
import { pascalCase } from 'change-case';
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
          mergeAmbiguousCharacters: true,
        }),
        cssVar.replace(':', ''),
      ];
    });

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
  console.log(chalk.green('✔︎ Created javascript exports'));

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
  console.log(chalk.green('✔︎ Created typescript types'));
};
