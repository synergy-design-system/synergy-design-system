import { removeSections } from '../remove-section.js';
import { addSectionsBefore, replaceSections } from '../replace-section.js';

const FILES_TO_TRANSFORM = [
  'select.component.ts',
  'select.styles.ts',
  'select.test.ts',
];

/**
 * Transform the component code
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformComponent = (path, originalContent) => {
  let content = removeSections([
    ['/** Draws a filled', 'filled = false;'],
    ["'select--filled", ','],
    ['/** Draws a pill-style', ';'],
    ['?pill', 'pill}'],
    ["'select--pill'", ','],
  ], originalContent);

  content = replaceSections([
    [
      "val = Array.isArray(val) ? val : val.split(' ');",
      `if (!Array.isArray(val)) {
        val = typeof val === 'string' ? val.split(' ') : [val].filter(Boolean);
      }`,
    ],
    [
      "import type { CSSResultGroup, TemplateResult } from 'lit';",
      "import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';",
    ],
  ], content);

  content = addSectionsBefore([
    // Define the isInitialized variable
    [
      "private typeToSelectString = '';",
      'private isInitialized: boolean = false;',
      { tabsAfterInsertion: 1 },
    ],
    // Add the defaultValue handling if value was initially set via property
    [
      'attributeChangedCallback(name: string, oldVal: string | null, newVal: string | null)',
       `firstUpdated() {
    this.isInitialized = true;
  }

  protected override willUpdate(changedProperties: PropertyValues) {
    super.willUpdate(changedProperties);

    if(!this.isInitialized && !this.defaultValue && this.value) {
      // If the value was set initially via property binding instead of attribute, we need to set the defaultValue manually
      // to be able to reset forms and the dynamic loading of options are working correctly.
      this.defaultValue = this.value
      this.valueHasChanged = false;
    }
  }`,
       { newlinesAfterInsertion: 2, tabsAfterInsertion: 1 },
    ],
  ], content);

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
  // Remove the pill attribute
  const content = removeSections([
    ['/* Filled selects', '/*', {
      additionalNewlines: 2,
      preserveEnd: true,
    }],
    ['/* Pills', '/* Prefix', {
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
    ["it('should have rounded tags", '});'],
  ], originalContent);
  return {
    content,
    path,
  };
};

export const vendorSelect = (path, content) => {
  const output = { content, path };

  // Skip for non select
  const isValidFile = !!FILES_TO_TRANSFORM.find(p => path.includes(p));

  if (!isValidFile) {
    return output;
  }

  if (path.endsWith('select.component.ts')) {
    return transformComponent(path, content);
  }

  if (path.endsWith('select.styles.ts')) {
    return transformStyles(path, content);
  }

  if (path.endsWith('select.test.ts')) {
    return transformTests(path, content);
  }

  return output;
};
