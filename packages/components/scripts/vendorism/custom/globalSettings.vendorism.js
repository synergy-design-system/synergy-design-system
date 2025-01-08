import { sep } from 'path';
import { addSectionAfter, addSectionBefore } from '../replace-section.js';

// List of components that have default values that should be set by global settings
const COMPONENTS_TO_TRANSFORM = [
  'accordion',
  'button',
  'checkbox',
  'combobox',
  'details',
  'file',
  'icon-button',
  'input',
  'radio',
  'radio-button',
  'radio-group',
  'range',
  'select',
  'switch',
  'tag',
  'textarea',
];

export const vendorGlobalSettings = (path, content) => {
  const filesToWrite = COMPONENTS_TO_TRANSFORM.map(c => `${c}.component.ts`);

  // Make sure to use the separator to ensure we are only matching the end of the path
  const fileIndex = filesToWrite.findIndex(p => path.endsWith(`${sep}${p}`));

  if (fileIndex === -1) {
    return {
      content,
      path,
    };
  }

  const withImport = addSectionAfter(
    content,
    '/* eslint-disable */',
    "import { globalSettingsDecorator } from '../../internal/globalSettings.js';",
  );

  const finalContent = addSectionBefore(
    withImport,
    'export default class',
    '@globalSettingsDecorator()',
  );

  return {
    content: finalContent,
    path,
  };
};
