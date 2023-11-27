/* eslint-disable no-await-in-loop */
import { promises as fs } from 'fs';
import { extname, join } from 'path';
import { spinner } from '@clack/prompts';

const s = spinner();

/**
 * Updates the system icons of a file with a start (// \*\*Start system icons\*\*) and
 * an end marker (// \*\*End system icons\*\*).
 *
 * @param {string} svgDirPath - the directory path, where the svg`s are
 * @param {string} outputFile - the output file, where the system icons should be updated
 */
export async function updateSystemIcons(svgDirPath, outputFilePath) {
  try {
    const files = await fs.readdir(svgDirPath);
    s.start('Update system icons');

    const systemIconsArray = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
      if (extname(file) === '.svg') {
        const fileName = file.replace('.svg', '');
        const filePath = join(svgDirPath, file);
        const fileData = await fs.readFile(filePath, 'utf8');
        systemIconsArray.push(`\t'${fileName}': \`\n\t\t${fileData}\``);
      }
    }
    let outputContent = await fs.readFile(outputFilePath, 'utf-8');

    const replacedContent = `// **Start system icons**
const icons = {
${systemIconsArray.join(',\n')}
};
// **End system icons**`;

    // Exchange the old system icons with the new ones in the components package
    const regex = /\/\/\s*\*\*Start system icons\*\*([\s\S]*?)\/\/\s*\*\*End system icons\*\*/;
    outputContent = outputContent.replace(regex, replacedContent);

    await fs.writeFile(outputFilePath, outputContent, 'utf8');
    s.stop('Updated system icons');
  } catch (error) {
    s.stop('Updating system icons failed.');
    console.error('An error occurred:', error);
  }
}
