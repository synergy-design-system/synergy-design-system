import { writeFileSync } from 'node:fs';
import { PATH_DEFAULT_ICONS_2025_EXPORTS } from './config.js';

/**
 * Creates a default export file that combines filled and outline icons
 */
const createDefaultExport = () => {
  const content = `import { filledIcons as sick2025FilledIcons } from './filled.js';
import { outlineIcons as sick2025OutlineIcons } from './outline.js';

const sick2025Icons = {
  ...sick2025FilledIcons,
  ...sick2025OutlineIcons,
};

export {
  sick2025FilledIcons,
  sick2025OutlineIcons,
};

export default sick2025Icons;
`;

  writeFileSync(PATH_DEFAULT_ICONS_2025_EXPORTS, content, 'utf-8');
  console.log(`✓ Created default export at ${PATH_DEFAULT_ICONS_2025_EXPORTS}`);
};

createDefaultExport();
