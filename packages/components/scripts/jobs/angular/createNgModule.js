import fs from 'fs/promises';
import path from 'path';
import { createHeader, getAllComponents, job } from '../shared.js';

const headerComment = createHeader('angular');

/**
 * Creates the synergy angular module, located at packages/angular/src/modules/synergy.module.ts
 */
export const runCreateNgModule = job('Angular: Creating SynergyModule...', async (metadata, outDir) => {
  const outFile = path.join(outDir, 'synergy.module.ts');

  // Get the path to component exports
  const components = getAllComponents(metadata)
    .map(component => `${component.name}Component`)
    .join(',\n');

  const output = `
${headerComment}
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import {
  ${components},
} from '../components';

const components = [
  ${components},
];

@NgModule({
  imports: components,
  exports: components,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SynergyElementsModule {}
`.trim();

  await fs.writeFile(outFile, `${output}\n`, 'utf8');
});
