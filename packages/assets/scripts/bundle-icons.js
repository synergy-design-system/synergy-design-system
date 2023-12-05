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
    const dtsOutputFile = outputFile.replace('.js', '.d.ts');
    const files = await fs.readdir(svgDirPath);

    s.start('Bundling SVGs');
    const jsContent = {};
    const dtsContent = {};

    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
      if (extname(file) === '.svg') {
        const fileName = file.replace('.svg', '');
        const filePath = join(svgDirPath, file);
        const fileData = await fs.readFile(filePath, 'utf8');

        jsContent[fileName] = `${fileData}`;
        dtsContent[fileName] = 'string';
      }
    }

    const jsData = `/* eslint-disable */\n\nexport const defaultIcons = ${JSON.stringify(jsContent, null, 2)};`;
    let dtsData = `export declare const defaultIcons : ${JSON.stringify(dtsContent, null, 2)};`;
    // Replace "string" with string to get the type for the d.ts file
    dtsData = dtsData.replaceAll(': "string"', ': string');

    const writeFiles = [
      fs.writeFile(outputFile, jsData),
      fs.writeFile(dtsOutputFile, dtsData),
    ];

    await Promise.all(writeFiles);
    s.stop('Bundled SVGs');
  } catch (error) {
    s.stop('Bundling SVGs failed.');
    console.error('An error occurred:', error);
  }
}
