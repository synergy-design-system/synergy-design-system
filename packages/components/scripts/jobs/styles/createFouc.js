import fs from 'fs';
import path from 'path';
import { job } from '../shared.js';

export const runCreateFouc = job('Styles: Creating FOUC utilities', async (components, outDir) => {
  const selector = components
    .map(component => `${component}:not(:defined)`.toLowerCase())
    .join(',\n');

  const output = `
/**
 * This file prevents the flash of unstyled components
 * @see https://web.dev/custom-elements-v1/#styling-a-custom-element
 * @todo: Each component should be defined using its default height and display type.
 *
 * This file is created automatically in the build process!
 * All changes applied will get lost!
 * To recreate it, please use "pnpm build"!
 */  
${selector} {
  display: inline-block;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}
`.trim();

  const filePath = path.join(outDir, 'fouc.css');
  fs.writeFileSync(filePath, `${output}\n`, 'utf8');
});
