/* eslint-disable no-await-in-loop */
import { promises as fs } from 'fs';
import { extname, join } from 'path';

import { spinner } from '@clack/prompts';

const s = spinner();

/**
 * Iterates over all svg`s in a directory to create a bundled js file and
 * corresponding declaration file for them.
 *
 * @param {string} svgDirPath - the directory path, where the svg`s are
 * @param {string} outputFile - the created output file
 */
export async function bundleIcons(svgDirPath, outputFile) {
  try {
    const files = await fs.readdir(svgDirPath);

    s.start('Bundling SVGs');
    const jsContent = {};

    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
      if (extname(file) === '.svg') {
        const fileName = file.replace('.svg', '');
        const filePath = join(svgDirPath, file);
        const fileData = await fs.readFile(filePath, 'utf8');

        jsContent[fileName] = `${fileData}`;
      }
    }

    const jsData = `export const defaultIcons = ${JSON.stringify(jsContent, null, 2)};`;

    const writeFiles = [
      fs.writeFile(outputFile, jsData),
    ];

    await Promise.all(writeFiles);
    s.stop('Bundled SVGs');
  } catch (error) {
    s.stop('Bundling SVGs failed.');
    console.error('An error occurred:', error);
  }
}
