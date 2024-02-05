import fs from 'fs/promises';
import path from 'path';
import { createHeader, job } from '../shared.js';

const headerComment = createHeader('angular');

/**
 * Creates the synergy angular module, located at packages/angular/src/modules/synergy.module.ts
 */
export const runCreateExports = job('Angular: Creating exports file...', async (outDir) => {
  const outFile = path.join(outDir, 'index.ts');
  const output = `
${headerComment}
export * from './components';
export * from './modules/forms.module';
export * from './modules/synergy.module';
export type * from '@synergy-design-system/components';
`.trim();

  await fs.writeFile(outFile, `${output}\n`, 'utf8');
});
