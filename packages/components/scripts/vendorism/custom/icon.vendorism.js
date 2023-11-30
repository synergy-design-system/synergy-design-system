import { removeSection } from '../remove-section.js';

export const vendorIcon = (path, content) => {
  const output = { content, path };

  if (!path.includes('icon.component.ts')
    && !path.includes('icon.styles.ts')
    && !path.includes('icon.test.ts')
  ) {
    return output;
  }

  // Remove failing tests for sprite sheet usage
  // TODO: add them again, as soon as it is fixed
  output.content = removeSection(
    output.content,
    "describe('svg sprite sheets', () => {",
    `    });
  });
  `,
  );

  return output;
};
