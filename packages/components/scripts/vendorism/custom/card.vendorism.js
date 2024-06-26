/* eslint-disable @typescript-eslint/quotes */
import { addSectionAfter } from "../replace-section.js";

const FILES_TO_TRANSFORM = [
  'card.component.ts',
  'card.test.ts',
];

/**
 * Transform the component code
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformComponent = (path, originalContent) => {
  let content = originalContent;

  // Add the decorator function
  content = addSectionAfter(
    content,
    `import { classMap } from 'lit/directives/class-map.js';`,
    `import { property } from 'lit/decorators.js';`,
  );

  // Add the new property
  content = addSectionAfter(
    content,
    `private readonly hasSlotController = new HasSlotController(this, 'footer', 'header', 'image');`,
    `
  /** Draws the card with sharp edges. Can be used e.g. when nesting multiple syn-cards to create hierarchy. */
  @property({ type: Boolean, reflect: true }) sharp = false; 
    `,
  );

  // Add the new className for sharp cards
  content = addSectionAfter(
    content,
    'card: true,',
    "          'card--sharp': this.sharp,",
  );

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
  let content = originalContent;

  // Add the new test for sharp cards
  content = addSectionAfter(
    content,
    'let el: SynCard;',
    `
  describe('when nested is provided', () => {
    it('should not add the className "card--sharp" when nested is set to "false"', async () => {
      el = await fixture<SynCard>(html\`<syn-card>Content</syn-card>\`);
      const card = el.shadowRoot?.querySelector('.card');
      expect(card).to.not.have.class('card--sharp');
    });

    it('should add the className "card--sharp" when nested is set to "true"', async () => {
      el = await fixture<SynCard>(html\`<syn-card sharp>Content</syn-card>\`);
      const card = el.shadowRoot?.querySelector('.card');
      expect(card).to.have.class('card--sharp');
    });
  });
    `,
  );

  return {
    content,
    path,
  };
};

export const vendorCard = (path, content) => {
  const output = { content, path };

  // Skip for non select
  const isValidFile = !!FILES_TO_TRANSFORM.find(p => path.includes(p));

  if (!isValidFile) {
    return output;
  }

  if (path.endsWith('card.component.ts')) {
    return transformComponent(path, content);
  }

  if (path.endsWith('card.test.ts')) {
    return transformTests(path, content);
  }

  return output;
};
