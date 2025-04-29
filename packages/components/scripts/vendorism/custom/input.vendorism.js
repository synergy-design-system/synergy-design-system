import {
  addSectionAfter,
  addSectionBefore,
  addSectionsAfter,
  replaceSections,
} from '../replace-section.js';
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

  // #800: Add documentation for the new css variable tokens
  content = addSectionBefore(
    content,
    ` */
export`,
    ` *
 * @cssproperty --syn-input-autofill-shadow - The shadow to apply when the input is autofilled.
 * @cssproperty --syn-input-autofill-readonly-shadow - The shadow to apply when the input is readonly and autofilled.
 * @cssproperty --syn-input-autofill-text-fill-color - The text fill color to apply when the input is autofilled.
 * @cssproperty --syn-input-autofill-caret-color - The caret color to apply when the input is autofilled.
    `.trimEnd(),
  );

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

    if (this.min === undefined || this.min === null) {
      return false;
    }

    const min = typeof this.min === 'string' ? parseFloat(this.min) : this.min;
    return this.valueAsNumber <= min;
  }

  private isIncrementDisabled() {
    if(this.disabled || this.readonly) {
      return true;
    }

    if (this.max === undefined || this.max === null) {
      return false;
    }

    const max = typeof this.max === 'string' ? parseFloat(this.max) : this.max;
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

  // #417: Numeric Strategies
  content = addSectionsAfter([
    // Needed imports
    [
      "import type { SynergyFormControl } from '../../internal/synergy-element.js';",
      `import {
  type NumericStrategy,
  createNumericStrategy,
  nativeNumericStrategy,
  modernNumericStrategy,
} from './strategies.js';
import type { SynClampDetails } from '../../events/syn-clamp.js';`,
    ],
    // Event documentation
    [
      "@event syn-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.",
      ' * @event syn-clamp - Emitted if the numeric strategy allows autoClamp and the value is clamped to the min or max attribute.',
    ],
    // Add the numeric strategy property
    [
      "@property() inputmode: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';",
      `
  #numericStrategy: NumericStrategy = nativeNumericStrategy;

  /**
   * Defines the strategy for handling numbers in the numeric input.
   * This is used to determine how the input behaves when the user interacts with it.
   *
   * Includes the following configuration options:
   *
   * - **autoClamp**: If true, the input will clamp the value to the min and max attributes.
   * 
   * You may provide this as one of the following values:
   *
   * - 'native': Uses the native browser implementation.
   * - 'modern': Uses a more intuitive implementation: Values are clamped to the nearest min or max value.
   * - An object that matches the \`NumericStrategy\` type. Note this can only be set via \`property\`, not as an \`attribute\`!
   */
  @property({
    attribute: 'numeric-strategy',
    converter: {
      fromAttribute: (value) => {
        return value === 'modern'
          ? modernNumericStrategy
          : nativeNumericStrategy;
      },
    },
    type: Object,
  })
  set numericStrategy(value: 'native' | 'modern' | Partial<NumericStrategy>) {
    if (typeof value === 'string') {
      this.#numericStrategy = value === 'modern' ? modernNumericStrategy : nativeNumericStrategy;
    } else if (typeof value === 'object') {
      this.#numericStrategy = createNumericStrategy(value);
    } else {
      this.#numericStrategy = nativeNumericStrategy;
    }
  }

  /**
   * @default nativeNumericStrategy
   * @todo: This must be changed to "modern" in Synergy@3
   */
  get numericStrategy(): 'native' | 'modern' | Partial<NumericStrategy> {
    return this.#numericStrategy;
  }
      `,
    ],
    // Add the numeric strategy switch to handleChange
    [
      'private handleChange() {',
      `    if (this.type === 'number' && this.#numericStrategy.autoClamp) {
      this.handleNumericStrategyAutoClamp();
      return;
    }`,
    ],
  ], content);

  // Add the modern numeric strategy for autoclamp
  content = addSectionBefore(
    content,
    'private handleChange() {',
    `
  private handleNumericStrategyAutoClamp() {
    const min = typeof this.min === 'string' ? parseFloat(this.min) : this.min;
    const max = typeof this.max === 'string' ? parseFloat(this.max) : this.max;
    const { valueAsNumber } = this;

    let nextValue = valueAsNumber;
    let clampEvent = '';
    if (nextValue < min) {
      nextValue = min;
      clampEvent = 'min';
    }
    if (nextValue > max) {
      nextValue = max;
      clampEvent = 'max';
    }

    this.value = nextValue.toString();

    // Fire the event if the value was clamped
    if (clampEvent) {
      this.emit('syn-clamp', {
        detail: {
          clampedTo: clampEvent as SynClampDetails['clampedTo'],
          lastUserValue: valueAsNumber,
        }
      });
    }
    this.formControlController.updateValidity();
    this.emit('syn-change');
  }`,
    {
      newlinesAfterInsertion: 2,
      tabsAfterInsertion: 1,
    },
  );
  // /#417

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
  content = content.replaceAll('.input--no-spin-buttons ', '');

  // #800: Make sure we allow to override autofill vis css variables
  content = replaceSections([
    [
      'box-shadow: 0 0 0 var(--syn-input-height-large) var(--syn-input-background-color-hover) inset !important;',
      'box-shadow: var(--syn-input-autofill-shadow) !important;',
    ],
    [
      '-webkit-text-fill-color: var(--syn-color-primary-500);',
      '-webkit-text-fill-color: var(--syn-input-autofill-text-fill-color);',
    ],
    [
      'caret-color: var(--syn-input-color);',
      'caret-color: var(--syn-input-autofill-caret-color);',
    ],
    [
      'box-shadow: 0 0 0 var(--syn-input-height-large) var(--syn-input-readonly-background-color) inset !important;',
      'box-shadow: var(--syn-input-autofill-readonly-shadow) !important;',
    ],
  ], content);

  content = addSectionAfter(
    content,
    `:host {
    display: block;`,
    `
    --syn-input-autofill-shadow: 0 0 0 var(--syn-input-height-large) var(--syn-input-background-color-hover) inset;
    --syn-input-autofill-readonly-shadow: 0 0 0 var(--syn-input-height-large) var(--syn-input-readonly-background-color) inset;
    --syn-input-autofill-text-fill-color: var(--syn-color-primary-500);
    --syn-input-autofill-caret-color: var(--syn-input-color);
    `,
  );

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
