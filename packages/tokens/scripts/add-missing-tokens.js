/**
 * As long as we don't have all tokens coming from Figma Tokens,
 * we will provide some fallback CSS variables from Shoelace.
 */
import {
  existsSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from 'node:fs';
import path from 'path';
import chalk from 'chalk';

/**
 * Extract variables from the given data with the given prefix
 * @param {string} data The original data entry
 * @param {string} prefix The prefix to check for
 * @returns {{property: string, value: string}[]}
 */
const extractVariables = (data, prefix) => {
  const variablePattern = new RegExp(`(--${prefix}-[^:]+):\\s*([^;]+);`, 'g');
  const variables = [];
  let match;

  // eslint-disable-next-line no-cond-assign
  while ((match = variablePattern.exec(data)) !== null) {
    variables.push({ property: match[1], value: match[2] });
  }

  return variables;
};

/**
 * Compare the given source and target files and append missing variables to the target file
 * @param {string} sourceFilePath The source file to extract the missing variables from
 * @param {string} targetFilePath The target to apply the missing variables to
 * @param {string} prefix The prefix to use for the variables
 * @returns {void}
 */
const compareAndAppendVariables = (sourceFilePath, targetFilePath, prefix) => {
  try {
    const [sourceData, targetData] = [
      readFileSync(sourceFilePath, 'utf-8'),
      readFileSync(targetFilePath, 'utf-8'),
    ];

    const sourceVariables = extractVariables(sourceData, prefix);
    const targetVariables = extractVariables(targetData, prefix);

    const targetVariableProperties = targetVariables.map(v => v.property);

    const missingVariables = sourceVariables.filter(
      variable => !targetVariableProperties.includes(variable.property),
    );

    if (missingVariables.length > 0) {
      const missingVariablesCSS = missingVariables
        .filter(variable => !variable.property.startsWith(`--${prefix}-color-`))
        .map(variable => `  ${variable.property}: ${variable.value};`)
        .join('\n');

      // Search for the end of the file and add the tokens underneath them
      const updatedTargetData = targetData.replace(
        /\}\s*$/,
        `\n  /* Fallbacks from Shoelace */\n${missingVariablesCSS}\n}`,
      );

      writeFileSync(targetFilePath, updatedTargetData, 'utf-8');
    }
  } catch (error) {
    console.error(
      chalk.red(`Error processing files ${sourceFilePath} and ${targetFilePath}:`, error),
    );
  }
};

/**
 * Add the missing tokens from the source directory to the target files
 * @param {string} prefix The prefix to use for finding tokens
 * @param {string} targetDir The target directory where the files are located
 */
export const addMissingTokens = (prefix, targetDir) => {
  const sourceDir = './src/shoelace-fallbacks';

  try {
    const targetFiles = readdirSync(targetDir);

    /**
     * @type {void[]}
     */
    const results = [];

    targetFiles.forEach((targetFile) => {
      const sourceFilePath = path.join(sourceDir, targetFile);
      const targetFilePath = path.join(targetDir, targetFile);

      if (existsSync(sourceFilePath)) {
        results.push(compareAndAppendVariables(sourceFilePath, targetFilePath, prefix));
      }
    });

    console.log(chalk.green('✔︎ Missing tokens added'));
  } catch (error) {
    console.error(chalk.red('Error reading directory:', error));
  }
};
