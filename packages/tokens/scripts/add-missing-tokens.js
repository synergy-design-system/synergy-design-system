/* eslint-disable no-console */
/**
 * As long as we don't have all tokens coming from Figma Tokens,
 * we will provide some fallback CSS variables from Shoelace.
 */
import { existsSync } from 'fs';
import { readFile, readdir, writeFile } from 'fs/promises';
import path from 'path';
import chalk from 'chalk';

const extractVariables = (data, prefix) => {
  const variablePattern = new RegExp(`(--${prefix}-[^:]+):\\s*([^;]+);`, 'g');
  const variables = [];
  let match;

  while ((match = variablePattern.exec(data)) !== null) {
    variables.push({ property: match[1], value: match[2] });
  }

  return variables;
};

const compareAndAppendVariables = async (sourceFilePath, targetFilePath, prefix) => {
  try {
    const [sourceData, targetData] = await Promise.all([
      readFile(sourceFilePath, 'utf-8'),
      readFile(targetFilePath, 'utf-8'),
    ]);

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

      const updatedTargetData = targetData.replace(/\}\s*$/, `\n  /* Fallbacks from Shoelace */\n${missingVariablesCSS}\n}`);
      await writeFile(targetFilePath, updatedTargetData, 'utf-8');
    }
  } catch (error) {
    console.error(chalk.red(`Error processing files ${sourceFilePath} and ${targetFilePath}:`, error));
  }
};

export const addMissingTokens = async (prefix, targetDir) => {
  const sourceDir = './src/shoelace-fallbacks';

  try {
    const targetFiles = await readdir(targetDir);

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
