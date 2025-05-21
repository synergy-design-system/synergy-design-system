import { copyFileSync } from 'node:fs';
import chalk from 'chalk';
import {
  DEFAULT_THEME,
  getInformationForTheme,
} from './helpers.js';

/**
 * Copies the packages main css theme to the default location
 * @param {string} targetDir The target directory where the files are located
 */
export const copyToDefaultLocation = (targetDir) => {
  const copyInfo = [
    getInformationForTheme(DEFAULT_THEME, 'light'),
    getInformationForTheme(DEFAULT_THEME, 'dark'),
  ];

  const result = copyInfo.map(themeInfo => {
    const sourceFilePath = `./dist/themes/${themeInfo.cssFileName}`;
    const targetFilePath = `${targetDir}/${themeInfo.mode}.css`;

    try {
      copyFileSync(sourceFilePath, targetFilePath);
      return true;
    } catch (e) {
      return false;
    }
  });

  if (result.filter(Boolean).length === result.length) {
    console.log(chalk.green(`✔︎ Successfully copied ${DEFAULT_THEME} theme to default location`));
  } else {
    console.log(chalk.red(`✘ Failed to copy ${DEFAULT_THEME} theme to default location`));
  }
};
