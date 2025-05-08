import { removeSections } from '../remove-section.js';
import {
  addSectionAfter,
  addSectionBefore,
  addSectionsAfter,
  addSectionsBefore,
  replaceSections,
} from '../replace-section.js';

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

  // #805: Allow numeric value property for syn-select
  content = replaceSections([
    [
      "private _value: string | string[] = '';",
      "private _value: string | number | Array<string | number> = '';",
    ],
    [
      'set value(val: string | string[]) {',
      'set value(val: string | number | Array<string | number>) {',
    ],
    [
      "@property({ attribute: 'value' }) defaultValue: string | string[] = '';",
      "@property({ attribute: 'value' }) defaultValue: string | number | Array<string | number> = '';",
    ],
    [
      'const values: string[] = [];',
      'const values: Array<string | number> = [];',
    ],
    [
      'this.setSelectedOptions(allOptions.filter(el => value.includes(el.value)));',
      `const valueString = value.map(String);
    const allSelectedOptions = allOptions.filter(
      el => valueString.includes(String(el.value)),
    );
    this.setSelectedOptions(allSelectedOptions);
      `,
    ],
    [
      'render() {',
      `render() {
    const hasValue = isAllowedValue(this.value);`,
    ],
    [
      'const hasClearIcon = this.clearable && !this.disabled && this.value.length > 0;',
      'const hasClearIcon = this.clearable && !this.disabled && hasValue;',
    ],
    [
      'const isPlaceholderVisible = this.placeholder && this.value && this.value.length <= 0;',
      'const isPlaceholderVisible = this.placeholder && this.value && !hasValue;',
    ],
    [
      "this.value.join(', ') : this.value",
      "this.value.join(', ') : this.value?.toString()",
    ],
  ], content);

  content = addSectionsAfter([
    [
      "import type SynOption from '../option/option.component.js';",
      "import { isAllowedValue } from './utility.js';",
    ],
  ], content);
  // End#805

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

  // #540: Support a custom delimiter
  content = addSectionAfter(
    content,
    'valueHasChanged: boolean = false;',
    `
  /**
   * The delimiter to use when setting the value when \`multiple\` is enabled.
   * The default is a space, but you can set it to a comma or other character.
   * @example <syn-select delimiter="|" value="option-1|option-2"></syn-select>
   */
  @property() delimiter = ' ';
    `,
  );

  content = replaceSections([
    [
      "val.split(' ')",
      'val.split(this.delimiter)',
    ],
    [
      "val.join(' ')",
      'val.join(this.delimiter)',
    ],
    [
      "@watch(['defaultValue', 'value'], { waitUntilFirstUpdate: true })",
      "@watch(['defaultValue', 'value', 'delimiter'], { waitUntilFirstUpdate: true })",
    ],
  ], content);

  content = addSectionBefore(
    content,
    "@watch('disabled'",
    `@watch('delimiter')
  handleDelimiterChange() {
    this.getAllOptions().forEach(option => {
      option.delimiter = this.delimiter;
    });
  }`,
    {
      newlinesAfterInsertion: 2,
      tabsAfterInsertion: 1,
    },
  );

  // This fix allows the select to be used in a form with a value set via property binding
  // and the dynamic loading of options to work correctly.
  content = addSectionAfter(
    content,
    'const val = this.valueHasChanged ? this.value : this.defaultValue;',
    'this.handleDelimiterChange();\n',
    {
      newlinesBeforeInsertion: 2,
      tabsBeforeInsertion: 2,
    },
  );

  // #850: Add documentation for tag max width props
  content = addSectionsAfter([
    [
      'private closeWatcher: CloseWatcher | null;',
      '  private resizeObserver: ResizeObserver;',
    ],
    [
      "@query('.select__listbox') listbox: HTMLSlotElement;",
      "  @query('.select__tags') tagContainer: HTMLDivElement;"
    ],
    [
      'this.isInitialized = true;',
      `
    if (this.multiple) {
      this.enableResizeObserver();
    }
      `,
    ],
  ], content);

  content = addSectionsBefore([
    [
      'private addOpenListeners() {',
      `
  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
  }`,
      { newlinesAfterInsertion: 2, tabsAfterInsertion: 1 },
    ],
    [
      'connectedCallback() {',
      `
  private enableResizeObserver() {
    if (this.multiple) {
      this.resizeObserver = new ResizeObserver(entries => {
        const entry = entries.at(0)!;
        const nextWidth = Math.max(entry.contentRect.width, 100);
        this.tagContainer.style.setProperty('--syn-select-tag-max-width', \`$\{nextWidth}px\`);
      });
      this.resizeObserver.observe(this.tagContainer);
    }
  }`,
      { newlinesAfterInsertion: 2, tabsAfterInsertion: 1 },
    ],
    [
      "@watch('delimiter')",
      `
  @watch('multiple')
  handleMultipleChange() {
    if (this.multiple) {
      this.enableResizeObserver();
    } else {
      this.resizeObserver?.disconnect();
      this.tagContainer.style.setProperty('--syn-select-tag-max-width', 'none');
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
