/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */

import { promises as fs } from 'fs';
import { extname, join } from 'path';
import { optimize } from 'svgo';
import { spinner } from '@clack/prompts';

const s = spinner();

export async function optimizeSVGs(svgDirPath) {
  try {
    const files = await fs.readdir(svgDirPath);

    s.start('Optimizing SVGs');
    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
      if (extname(file) === '.svg') {
        const filePath = join(svgDirPath, file);
        const data = await fs.readFile(filePath, 'utf8');

        const result = optimize(data, {
          multipass: true,
          path: filePath,
          plugins: [
            {
              name: 'removeAttrs',
              params: { attrs: 'fill' },
            },
            {
              name: 'addAttributesToSVGElement',
              params: {
                attributes: ["fill='currentColor'"],
              },
            },
          ],
        });
        await fs.writeFile(filePath, result.data);
      }
    }
    s.stop('Optimized SVGs');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}
