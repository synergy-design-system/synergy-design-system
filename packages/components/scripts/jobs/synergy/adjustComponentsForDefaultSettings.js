import path from 'path';
import fs from 'fs/promises';
import {
  getManifestData,
  job,
} from '../shared.js';
import { getComponentsWithDefaultSettings } from './createDefaultSettings.js';

export const adjustComponentsForDefaultSettings = job('Synergy: Adjusting components for default settings...', async (
  componentDistDir,
  componentsDir,
) => {
  const components = await getManifestData(componentDistDir);
  const componentDir = path.join(componentsDir, 'src/components');
  const componentsWithDefaults = getComponentsWithDefaultSettings(components);

  const STATE_ALREADY_PRESENT = 1;
  const STATE_WRITTEN = 2;
  const STATE_ERROR = 3;

  // Add the default settings decorator to the components,
  // but only if it is not already present
  const items = components
    // Filter out everything not in the default settings list
    .filter(c => componentsWithDefaults.has(c.name))
    .map(async (c) => {
      const componentFile = path.join(componentDir, `${c.tagNameWithoutPrefix}/${c.tagNameWithoutPrefix}.component.ts`);
      const componentContent = await fs.readFile(componentFile, 'utf8');

      // Check if the default settings decorator is already present
      if (componentContent.includes('@enableDefaultSettings')) {
        return STATE_ALREADY_PRESENT;
      }

      // Add the default settings decorator
      let newContent = componentContent.replace(
        'export default class',
        `@enableDefaultSettings('${c.name}')\nexport default class`,
      );

      // Add the missing import after the last found import statement of the component code
      // Use string.match for this
      const importStatement = componentContent.match(/import .+ from '.+';/g);
      if (importStatement) {
        const lastImport = importStatement[importStatement.length - 1];
        newContent = newContent.replace(lastImport, `${lastImport}\nimport { enableDefaultSettings } from '../../internal/defaultSettings/decorator.js';`);
      }

      try {
        await fs.writeFile(componentFile, newContent);
        return STATE_WRITTEN;
      } catch (err) {
        return STATE_ERROR;
      }
    });

  const finalResult = await Promise.all(items);

  const result = finalResult.reduce((acc, state) => {
    if (state === STATE_ALREADY_PRESENT) {
      acc.already_present += 1;
    } else if (state === STATE_WRITTEN) {
      acc.written += 1;
    } else if (state === STATE_ERROR) {
      acc.errors += 1;
    }
    return acc;
  }, {
    already_present: 0,
    errors: 0,
    written: 0,
  });

  if (result.errors > 0) {
    throw new Error(`Failed to write ${result.errors} components`);
  }

  if (result.written > 0) {
    console.log(`✔ Adjusted ${result.written} components with ${result.already_present} already present and ${finalResult.length} total`);
  } else {
    console.log('✔ All components up to date');
  }
  return true;
});
