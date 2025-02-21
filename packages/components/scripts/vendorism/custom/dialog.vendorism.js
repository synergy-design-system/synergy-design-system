import { addSectionsAfter } from '../replace-section.js';

export const vendorDialog = (path, content) => {
  if (!path.endsWith('dialog.component.ts')) {
    return { content, path };
  }

  const newContent = addSectionsAfter([
    [
      "import type { CSSResultGroup } from 'lit';",
      "import { blurActiveElement } from '../../internal/closeActiveElement.js';",
    ],
    [
      '// Hide',
      '      blurActiveElement(this);',
    ],
  ], content);
  return {
    content: newContent,
    path,
  };
};
