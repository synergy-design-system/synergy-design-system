import { removeSection, removeSections } from '../remove-section.js';
import { addSectionAfter, replaceSections } from '../replace-section.js';

const FILES_TO_TRANSFORM = [
  'button/button.component.ts',
  'button/button.styles.ts',
  'button/button.test.ts',
];

/**
 * Transform the component code
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformComponent = (path, originalContent) => {
  const unneededModifiers = ['pill', 'circle', 'danger', 'warning', 'success', 'neutral', 'default'].map((modifier) => [`'button--${modifier}':`, ',']);

  let content = removeSections([
    // Remove unneeded modifiers from component's classMap
    ...unneededModifiers,
    // Remove pill prop
    ['/** Draws a pill-style', ';'],
    // Remove circle prop
    ['/**\n   * Draws a circular', ';'],
    // Remove outline prop to use variant prop for shape
    ['/** Draws an outlined', ';'],
    ['@property({ reflect: true }) variant:', ';', { preserveEnd: true, preserveStart: true, removePrecedingWhitespace: false }],
  ], originalContent);

  content = replaceSections([
    ['variant:', "variant: 'filled' | 'outline' | 'text' = 'outline'"],
    ['!this.outline', 'this.variant === \'filled\''],
    ['this.outline', 'this.variant === \'outline\''],
    // Set "primary" as default color
    // If we need more colors later, a "color" prop would have to be added
    ["this.variant === 'primary'", 'true'],
    // Rename "standard" class to default
    ['button--standard', 'button--filled'],

    // Add default slot handling for icon-only buttons
    ['import { HasSlotController', 'import { HasSlotController, getTextContent'],
    [
      '<slot part="label" class="button__label"></slot>',
      // eslint-disable-next-line no-template-curly-in-string
      '<slot part="label" class=${classMap({ \'button__label\': true, \'button__icon-only\': this.iconOnly })} @slotchange=${this.handleSlotChange}></slot>',
    ],
  ], content);

  // Add default slot handling for icon-only buttons
  content = addSectionAfter(
    content,
    "@query('.button') button: HTMLButtonElement | HTMLLinkElement;",
    `  @query('slot:not([name])') defaultSlot: HTMLSlotElement;

  @state() private iconOnly = false;`,
  );

  content = addSectionAfter(
    content,
    `private isLink() {
    return this.href ? true : false;
  }`,
    `  private handleSlotChange() {
    const textContent = getTextContent(this.defaultSlot).trim();
    const assignedElements = this.defaultSlot.assignedElements({flatten: true})
    const iconOnlyElement = assignedElements.length === 1 && assignedElements[0].tagName.toLowerCase() === 'syn-icon';

    this.iconOnly = iconOnlyElement && textContent === '';
  }`,
    { newlinesBeforeInsertion: 2 },
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
  let content = originalContent;

  // Remove pill and circle from CSS
  ['Pill', 'Circle'].forEach((modifier) => {
    content = removeSection(
      content,
        `  /*\n   * ${modifier} modifier`,
        '  /*',
        { preserveEnd: true, removePrecedingWhitespace: false },
    );
  });

  // Remove all colors except primary from CSS
  ['Success', 'Warning', 'Danger', 'Neutral', 'Default'].forEach((color) => {
    // They appear twice in the file
    [0, 1].forEach(() => {
      content = removeSection(
        content,
          `/* ${color}`,
          '/*',
          { preserveEnd: true, removePrecedingWhitespace: false },
      );
    });
  });

  // Rename "standard" class to default
  content = content.replace(/button--standard/g, 'button--filled');

  // Fix button group
  content = content.replace("[variant='default']", "[variant='filled']");

  // Fix invalid css
  // TODO: can be removed as soon as following shoelace fix is released and integrated https://github.com/shoelace-style/shoelace/issues/1974 and https://github.com/shoelace-style/shoelace/pull/1975
  content = content.replace(':host([data-syn-button-group__button[checked]]) {', ':host([data-syn-button-group__button][checked]) {');

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

  content = content.replace("const variants = ['default', 'primary', 'success', 'neutral', 'warning', 'danger'];", "const variants = ['filled', 'outline', 'text'];");
  content = content.replace("expect(el.variant).to.equal('default');", "expect(el.variant).to.equal('outline');");
  ['outline', 'pill', 'circle'].forEach((prop) => {
    content = removeSection(content, `expect(el.${prop})`, ';');
  });

  return {
    content,
    path,
  };
};

// eslint-disable-next-line complexity
export const vendorButton = (path, content) => {
  const output = { content, path };

  // Skip for non button
  const isValidFile = !!FILES_TO_TRANSFORM.find(p => path.includes(p));

  if (!isValidFile) {
    return output;
  }

  if (path.endsWith('button.component.ts')) {
    return transformComponent(path, content);
  }

  if (path.endsWith('button.styles.ts')) {
    return transformStyles(path, content);
  }

  if (path.endsWith('button.test.ts')) {
    return transformTests(path, content);
  }

  return output;
};
