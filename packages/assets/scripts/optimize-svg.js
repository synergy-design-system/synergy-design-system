import { promises as fs } from 'fs';
import { join, extname } from 'path';
import { optimize } from 'svgo';
import { spinner } from '@clack/prompts';

const s = spinner();

export async function optimizeSVGs(svgDirPath) {
  try {
    const files = await fs.readdir(svgDirPath);

    s.start(`Optimizing SVGs`)
    for (const file of files) {
      if (extname(file) === '.svg') {
        const filePath = join(svgDirPath, file);
        const data = await fs.readFile(filePath, 'utf8');

        const result = optimize(data, {
          path: filePath,
          multipass: true,
          plugins: [
            {
              name: 'removeAttrs',
              params: { attrs: 'fill' },
            },
            {
              name: 'addAttributesToSVGElement',
              params: {
                attributes: ["fill='currentColor'"]
              }
            }
          ],
        });
        await fs.writeFile(filePath, result.data);
      }
    }
    s.stop(`Optimized SVGs`)
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
