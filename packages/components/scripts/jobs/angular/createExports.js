import fs from 'fs/promises';
import path from 'path';
import { createHeader, job } from '../shared.js';

const headerComment = createHeader('angular');

/**
 * Creates the index.ts exports file, located at packages/angular/index.ts
 */
export const runCreateExports = job('Angular: Creating exports file...', async (outDir) => {
  const outFile = path.join(outDir, 'index.ts');
  const output = `
${headerComment}
export * from '@synergy-design-system/angular/components';
export * from '@synergy-design-system/angular/directives/validators';
export * from '@synergy-design-system/angular/modules/forms';
export * from '@synergy-design-system/angular/modules/synergy'; 
`.trim();

  await fs.writeFile(outFile, `${output}\n`, 'utf8');
});
