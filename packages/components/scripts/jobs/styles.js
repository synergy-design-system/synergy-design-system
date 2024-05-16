import fs from 'fs';
import path from 'path';
import { getAllComponents } from './shared.js';
import * as jobs from './styles/index.js';

/**
 * Run all steps to create dynamic styles
 * @param {String} settings.componentDistDir The absolute path to the component dist
 * @param {string} settings.stylesDir The absolute path to the components styles directory
 */
export const runCreateStyles = async ({
  componentDistDir,
  stylesDir,
}) => {
  // Get the manifest information
  const manifest = path.join(componentDistDir, '/custom-elements.json');
  const metadata = JSON.parse(fs.readFileSync(manifest, 'utf8'));

  const components = await getAllComponents(metadata);
  const availableComponents = components.map(c => c.tagName);

  await jobs.createFouc(availableComponents, stylesDir);
};
