import { removeSections } from '../remove-section.js';

const FILES_TO_TRANSFORM = [
  'input.component.ts',
  'input.styles.ts',
  'input.test.ts',
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
    ['/** Draws a pill-style', 'pill = false;'],
    ["'input--pill':", ','],
  ], originalContent);

  // Replace filled with readonly
  content = content.replaceAll('filled', 'readonly');

  // We need to add classes depending on prefix and suffix slots to use them in CSS
  content = content.replace(
    "HasSlotController(this, 'help-text', 'label')",
    "HasSlotController(this, 'help-text', 'label', 'prefix', 'suffix')",
  );
  content = content.replace(
    "const hasHelpTextSlot = this.hasSlotController.test('help-text');",
    "const hasHelpTextSlot = this.hasSlotController.test('help-text');\n    const hasPrefixSlot = this.hasSlotController.test('prefix');\n    const hasSuffixSlot = this.hasSlotController.test('suffix');",
  );
  content = content.replace(
    "'form-control--has-help-text': hasHelpText",
    "'form-control--has-help-text': hasHelpText,\n          'form-control--has-prefix': hasPrefixSlot,\n          'form-control--has-suffix': hasSuffixSlot",
  );

  // Replace browser number built-in comments
  content = content.replace(
    "Hides the browser's built-in increment/decrement",
    'Hides the increment/decrement',
  );

  // Always hide the built-in number spinner
  content = content.replace(
    "'input--no-spin-buttons': this.noSpinButtons",
    "'input--no-spin-buttons': this.noSpinButtons,\n\t\t\t\t\t\t\t'input--no-browser-spin-buttons': true",
  );

  // Add divider and longpress directive as imports
  content = content.replace(
    "import SynIcon from '../icon/icon.component.js';",
    "import SynIcon from '../icon/icon.component.js';\nimport SynDivider from '../divider/divider.component.js';\nimport { longPress } from '../../internal/longpress.js';",
  );

  // Add syn-divider as dependency
  content = content.replace(
    '* @dependency syn-icon',
    '* @dependency syn-icon\n * @dependency syn-divider',
  );
  content = content.replace(
    "static dependencies = { 'syn-icon': SynIcon };",
    "static dependencies = {\n\t\t'syn-icon': SynIcon,\n\t\t'syn-divider': SynDivider\n\t};",
  );

  // Add increment / decrement handling for number type
  content = content.replace(
    `private handleBlur() {
    this.hasFocus = false;
    this.emit('syn-blur');
  }`,
    `private handleBlur() {
    this.hasFocus = false;
    this.emit('syn-blur');
  }

  private handleStep(){
    this.handleInput();
    this.input.focus();
  }

  private handleStepUp() {
    this.stepUp();
    this.handleStep();
  }

  private handleStepDown() {
    this.stepDown();
    this.handleStep();
  }
  
  private isDecrementDisabled() {
    if(this.disabled || this.readonly) {
      return true;
    }

    if (this.min === undefined || this.min === null || this.disabled) {
      return false;
    }

    const min = typeof this.min === 'string' ? parseFloat(this.min) : this.min
    return this.valueAsNumber <= min;
  }

  private isIncrementDisabled() {
    if(this.disabled || this.readonly) {
      return true;
    }

    if (this.max === undefined || this.max === null) {
      return false;
    }

    const max = typeof this.max === 'string' ? parseFloat(this.max) : this.max
    return this.valueAsNumber >= max;
  }`,
  );

  // Add rendering of number input stepper
  content = content.replace(
    '<slot name="suffix"></slot>\n            </span>',
    `<slot name="suffix"></slot>
            </span>

            \${this.type === 'number' && !this.noSpinButtons
              ? html\`
              <div part="stepper" class="input__number-stepper">
                <button
                  part="decrement-number-stepper"
                  class="input__number-stepper-button"
                  type="button"
                  ?disabled=\${this.isDecrementDisabled()}
                  aria-hidden="true"
                  \${longPress({ start: () => this.handleStepDown(), end: () => this.handleChange()})}
                  tabindex="-1"
                >
                  <slot name="decrement-number-stepper">
                    <syn-icon name="indeterminate" library="system"></syn-icon>
                  </slot>
                </button>
                <syn-divider class="input__number-divider" part="divider" vertical></syn-divider>
                <button
                  part="increment-number-stepper"
                  class="input__number-stepper-button"
                  type="button"
                  ?disabled=\${this.isIncrementDisabled()}
                  aria-hidden="true"
                  \${longPress({ start: () => this.handleStepUp(), end: () => this.handleChange()})}
                  tabindex="-1"
                >
                  <slot name="increment-number-stepper">
                    <syn-icon name="add" library="system"></syn-icon>
                  </slot>
                </button>
              </div>
                \`
            : ''}`,
  );

  // Add cssparts and slots documentations
  content = content.replace(
    '* @slot help-text - Text that describes how to use the input. Alternatively, you can use the `help-text` attribute.',
    `* @slot help-text - Text that describes how to use the input. Alternatively, you can use the \`help-text\` attribute.
 * @slot increment-number-stepper - An icon to use in lieu of the default increment number stepper icon.
 * @slot decrement-number-stepper - An icon to use in lieu of the default decrement number stepper icon.`,
  );
  content = content.replace(
    '* @csspart suffix - The container that wraps the suffix.',
    `* @csspart suffix - The container that wraps the suffix.
 * @csspart stepper - The container that wraps the number stepper.
 * @csspart decrement-number-stepper - The decrement number stepper button.
 * @csspart increment-number-stepper - The increment number stepper button.
 * @csspart divider - The divider between the increment and decrement number stepper buttons.`,
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
  const content = removeSections([
    ['expect(el.filled)', ';'],
    ['expect(el.pill)', ';'],
  ], originalContent);

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
  let content = removeSections([
    ['/*\n   * Pill modifier', '  /*', {
      additionalNewlines: 2,
      preserveEnd: true,
    }],
  ], originalContent);

  // Replace filled with readonly
  content = content.replaceAll('Filled', 'Readonly');
  content = content.replaceAll('filled', 'readonly');

  // Always hide browser built-in spin buttons
  content = content.replaceAll('.input--no-spin-buttons input[type=\'number\']', '.input--no-browser-spin-buttons input[type=\'number\']');

  return {
    content,
    path,
  };
};

export const vendorInput = (path, content) => {
  const output = { content, path };

  // Skip for non select
  const isValidFile = !!FILES_TO_TRANSFORM.find(p => path.includes(p));

  if (!isValidFile) {
    return output;
  }

  if (path.endsWith('input.component.ts')) {
    return transformComponent(path, content);
  }

  if (path.endsWith('input.styles.ts')) {
    return transformStyles(path, content);
  }

  if (path.endsWith('input.test.ts')) {
    return transformTests(path, content);
  }

  return output;
};
