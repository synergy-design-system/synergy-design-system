import fs from 'fs/promises';
import path from 'path';
import {
  createHeader, getAllComponents, job,
} from '../shared.js';
import { createNgPackageJson } from './shared.js';

const headerComment = createHeader('angular');

/**
 * Creates the angular synergy module, located at packages/angular/modules/synergy/synergy.module.ts
 */
export const runCreateNgModule = job('Angular: Creating SynergyModule...', async (metadata, outDir) => {
  const fileName = 'synergy.module.ts';
  const synergyModuleDir = path.join(outDir, 'synergy');
  const outFile = path.join(synergyModuleDir, fileName);

  // Create a subdirectory for the forms module
  await fs.mkdir(synergyModuleDir, { recursive: true });

  // Get the path to component exports
  const components = await getAllComponents(metadata);
  const componentNames = components.map(component => `${component.name}Component`)
    .join(',\n');

  const output = `
${headerComment}
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import {
  ${componentNames},
} from '@synergy-design-system/angular/components';

const components = [
  ${componentNames},
];

@NgModule({
  imports: components,
  exports: components,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SynergyComponentsModule {}
`.trim();

  await fs.writeFile(outFile, `${output}\n`, 'utf8');
  createNgPackageJson(fileName, synergyModuleDir);
});
