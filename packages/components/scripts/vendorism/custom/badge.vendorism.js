/* eslint-disable @typescript-eslint/quotes */
import { removeSections } from '../remove-section.js';

const FILES_TO_TRANSFORM = [
  'badge.component.ts',
  'badge.styles.ts',
  'badge.test.ts',
];

/**
 * Transform the component code
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformComponent = (path, originalContent) => {
  let content = removeSections([
    // Remove the pill attribute
    ['/** Draws a pill', ';'],
    ['\'badge--pill', 'this.pill,'],
    // Remove the pulsate attribute
    ['/** Makes the badge pulsate', ';'],
    ['\'badge--pulse', 'this.pulse'],
  ], originalContent);

  // Add support for aria-label
  content = content.replace(
    `import SynergyElement from '../../internal/synergy-element.js';`,
    `import SynergyElement from '../../internal/synergy-element.js';
import { LocalizeController } from '../../utilities/localize.js';`,
  );

  // Initialize the controller
  content = content.replace(
    `static styles`,
    `
  private readonly localize = new LocalizeController(this);
  static styles`,
  );

  content = content.replace(
    '<slot></slot>',
    `<slot>
          <span class="visually-hidden">
            \${this.localize.term(\`badge_\${this.variant}\`)}
          </span>
        </slot>`,
  );

  return {
    content,
    path,
  };
};

/**
 * Transform the components styles
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformStyles = (path, originalContent) => {
  const content = removeSections([
    // Remove the pill styling
    ['/* Pill modifier', '  /* Pulse', {
      additionalNewlines: 2,
      preserveEnd: true,
    }],
    ['@keyframes pulse', '`;', {
      additionalNewlines: 1,
      preserveEnd: true,
    }],
    // Remove the pulse styling
    ['/* Pulse modifier', '`;', {
      additionalNewlines: 1,
      preserveEnd: true,
    }],
  ], originalContent);

  return {
    content,
    path,
  };
};

/**
 * Transform the components tests
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformTests = (path, originalContent) => {
  const content = removeSections([
    // Remove the pill attribute tests
    ["describe('when provided a pill", "  describe('when provided a pulse", {
      additionalNewlines: 2,
      preserveEnd: true,
    }],
    // Remove the pulsate attribute tests
    ["describe('when provided a pulse", "  ['primary'", {
      additionalNewlines: 2,
      preserveEnd: true,
    }],
  ], originalContent);

  return {
    content,
    path,
  };
};

export const vendorBadge = (path, content) => {
  const output = { content, path };

  // Skip for non select
  const isValidFile = !!FILES_TO_TRANSFORM.find(p => path.includes(p));

  if (!isValidFile) {
    return output;
  }

  if (path.endsWith('badge.component.ts')) {
    return transformComponent(path, content);
  }

  if (path.endsWith('badge.styles.ts')) {
    return transformStyles(path, content);
  }

  if (path.endsWith('badge.test.ts')) {
    return transformTests(path, content);
  }

  return output;
};
