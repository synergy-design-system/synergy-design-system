/**
 * As long as we don't have all tokens coming from Figma Tokens,
 * we will provide some fallback CSS variables.
 */
import {
  readFileSync,
  readdirSync,
  writeFileSync,
} from 'node:fs';
import path from 'path';
import chalk from 'chalk';

/**
 * Extract variables from the given data
 * @param {string} data The original data entry
 * @returns {{property: string, value: string}[]}
 */
const extractVariables = (data) => {
  const variablePattern = /(--syn-[^:]+):\s*([^;]+);/g;
  const variables = [];
  let match;

  // eslint-disable-next-line no-cond-assign
  while ((match = variablePattern.exec(data)) !== null) {
    variables.push({ property: match[1], value: match[2] });
  }

  return variables;
};

/**
 * Append missing variables to the target file
 * @param {string} targetFilePath The target to apply the missing variables to
 * @param { Array<{name: string, value: string}> } variables The variables to append
 * @returns {void}
 */
const appendVariables = (targetFilePath, variables) => {
  try {
    const targetFile = readFileSync(targetFilePath, 'utf-8');
    const targetVariables = extractVariables(targetFile);
    const targetVariableProperties = targetVariables.map(v => v.property);
    const missingData = variables
      .filter(({ name }) => {
        const variableExists = targetVariableProperties.includes(name);
        if (variableExists) {
          console.log(
            chalk.red(
              `Variable ${name} already exists in ${targetFilePath}. `
              + 'Update the missingVariables array in addMissingTokens function.',
            ),
          );
        }
        return !variableExists;
      })
      .map(({ name, value }) => `  ${name}: ${value};`).join('\n');

    // Search for the end of the file and add the tokens underneath them
    const updatedTargetData = targetFile.replace(
      /\}\s*$/,
      `${missingData}\n}`,
    );

    writeFileSync(targetFilePath, updatedTargetData, 'utf-8');
  } catch (error) {
    console.error(chalk.red(`Error processing file ${targetFilePath}:`, error));
  }
};

/**
 * Add the missing tokens to the target files
 * @param {string} targetDir The target directory where the files are located
 */
export const addMissingTokens = (targetDir) => {
  const missingVariables = [
    // Figma is not able to use multiple variable values in a single variable. We could do a workaround by using text in Figma,
    // but we would encounter another problem, since we would get an invalid style dict JSON structure, as `focus-ring` has both a value and nested children at the same time.
    // See https://github.com/style-dictionary/style-dictionary/issues/797
    // Therefore, we decided to add the missing token manually on the development side.
    {
      name: '--syn-focus-ring',
      value: 'var(--syn-focus-ring-style) var(--syn-focus-ring-width) var(--syn-focus-ring-color)',
    },
  ];

  try {
    const targetFiles = readdirSync(targetDir);

    targetFiles.forEach((targetFile) => {
      const targetFilePath = path.join(targetDir, targetFile);
      appendVariables(targetFilePath, missingVariables);
    });

    console.log(chalk.green('✔︎ Missing tokens added'));
  } catch (error) {
    console.error(chalk.red('Error reading directory:', error));
  }
};
