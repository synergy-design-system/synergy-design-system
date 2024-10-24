import fs from 'fs';
import path from 'path';
import { job } from '../shared.js';

/**
 * List of components using a block layout.
 * Used to create a specific selector for these components.
 */
const componentsUsingBlockLayout = [
  'accordion',
  'breadcrumb',
  'combobox',
  'details',
  'divider',
  'header',
  'file',
  'menu',
  'menu-item',
  'menu-label',
  'nav-item',
  'opt-group',
  'option',
  'prio-nav',
  'progress-bar',
  'radio-group',
  'range',
  'select',
  'side-nav',
  'textarea',
  'tab-group',
  'tab-panel',
  'validate',
]
  .map(c => `syn-${c}`)
  .sort();

/**
 * Create a fouc selector for the given components
 * @param {string} selector The selector to use
 * @param {string} displayType The display type to use for the fouc selector
 * @returns {string} selector The final selector
 */
const createSelector = (components, displayType = 'inline-block') => {
  const selector = components
    .map(component => `${component}:not(:defined)`.toLowerCase())
    .join(',\n');

  return `
${selector} {
  display: ${displayType};
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}`.trim();
};

export const runCreateFouc = job('Styles: Creating FOUC utilities', async (components, outDir) => {
  const blockSelectors = components.filter(c => componentsUsingBlockLayout.includes(c));
  const inlineSelectors = components.filter(c => !componentsUsingBlockLayout.includes(c));

  const output = `
/**
 * This file prevents the flash of unstyled components
 * @see https://web.dev/custom-elements-v1/#styling-a-custom-element
 * @todo: Each component should be defined using its default dimensions.
 *
 * This file is created automatically in the build process!
 * All changes applied will get lost!
 * To recreate it, please use "pnpm build"!
 */
${createSelector(blockSelectors, 'block')}

${createSelector(inlineSelectors, 'inline-block')}
`.trim();

  const filePath = path.join(outDir, 'fouc.css');
  fs.writeFileSync(filePath, `${output}\n`, 'utf8');
});
