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

  // #783 Allow to see the title attribute in the checkbox
  content = content.replace(
    "@property() title = '';",
    "@property({ reflect: true }) title = '';",
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
import { formatNumber } from './formatter.js';
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
  /**
   * Optional options that should be passed to the \`NumberFormatter\` when formatting the value.
   * This is used to format the number when the input type is \`number\`.
   * Note this can only be set via \`property\`, not as an \`attribute\`!
   */
  @property({
    attribute: false,
    reflect: false,
    type: Object,
  }) numberFormatterOptions: Intl.NumberFormatOptions;

  /**
   * The minimal amount of fraction digits to use for numeric values.
   * Used to format the number when the input type is \`number\`.
   */
  @property({
    attribute: 'min-fraction-digits',
    type: Number,
  }) minFractionDigits: number;

  /**
   * The maximal amount of fraction digits to use for numeric values.
   * Used to format the number when the input type is \`number\`.
   */
  @property({
    attribute: 'max-fraction-digits',
    type: Number,
  }) maxFractionDigits: number;

  #numericStrategy: NumericStrategy = nativeNumericStrategy;

  /**
   * Defines the strategy for handling numbers in the numeric input.
   * This is used to determine how the input behaves when the user interacts with it.
   *
   * Includes the following configuration options:
   *
   * - **autoClamp**: If true, the input will clamp the value to the min and max attributes.
   * - **noStepAlign**: If true, the input will not align the value to the step attribute.
   * - **noStepValidation**: If true, the input will not validate the value against the step attribute.
   * 
   * You may provide this as one of the following values:
   *
   * - 'native': Uses the native browser implementation.
   * - 'modern': Uses a more intuitive implementation:
   *   - Values are clamped to the nearest min or max value.
   *   - Stepping is inclusive to the provided min and max values.
   *   - Provided stepping is no longer used in validation.
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
    switch (typeof value) {
      case 'string': this.#numericStrategy = value === 'modern' ? modernNumericStrategy : nativeNumericStrategy; break;
      case 'object': this.#numericStrategy = createNumericStrategy(value); break;
      default: this.#numericStrategy = nativeNumericStrategy;
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
      `    if (this.type === 'number' && (this.#isNumberFormattingEnabled() || this.#numericStrategy.autoClamp)) {
      const { eventObj, shouldClamp, nextValue } = this.handleNumericStrategyAutoClamp();
      let initialNextValue = this.#numericStrategy.autoClamp ? nextValue : this.valueAsNumber;

      // Make sure to flag non numeric values as invalid
      if (isNaN(initialNextValue)) {
        // Make sure to set the value to the min or max value if the input is empty
        // If neither min nor max are set, we set the value to 0
        const { max, min } = this;

        if (max !== undefined && max !== null) {
          initialNextValue = typeof max === 'string' ? parseFloat(max) : +max;
        } else if (min !== undefined && min !== null) {
          initialNextValue = typeof min === 'string' ? parseFloat(min) : +min;
        } else {
          initialNextValue = 0;
        }
      }

      this.value = this.#isNumberFormattingEnabled()
        ? this.#formatNumber(initialNextValue)
        : initialNextValue.toString();

      // Make sure to wait for the updateComplete to be done before updating the validity
      // and firing events. This is needed because valueAsNumber is not updated yet when the event is fired
      this.updateComplete.then(() => {

        if (shouldClamp && eventObj) {
          this.emit('syn-clamp', eventObj);
        }

        this.formControlController.updateValidity();
        this.emit('syn-change');
      });
      return;
    }`,
    ],
    // Make sure to disable the sync of the step property if noStepValidation is used
    [
      'handleStepChange() {',
      `    // If the numericStrategy has noStepValidation set, skip this as the inputs step will always set to "any".
    if (this.#numericStrategy.noStepValidation) {
      return;
    }
      `,
    ],
  ], content);
  // /#417

  // #818
  content = addSectionsAfter([
    // Handle keydown
    [
      'private handleKeyDown(event: KeyboardEvent) {',
      `    if (this.#numericStrategy.noStepAlign && this.type === 'number') {
      const { key } = event;
      if (key === 'ArrowUp' || key === 'ArrowDown') {
        event.preventDefault();
        event.stopPropagation();

        if (key === 'ArrowUp') {
          this.handleStepUp();
        } else if (key === 'ArrowDown') {
          this.handleStepDown();
        }
        this.handleChange();
        return;
      }
    }`,
    ],
    // Handle step up
    [
      'stepUp() {',
      `    if (this.#numericStrategy.noStepAlign) {
      const { max, step, valueAsNumber } = this;

      // Needed because the input could be empty. In this case, valueAsNumber is NaN
      const usedInitialValue = Number.isNaN(valueAsNumber) ? 0 : valueAsNumber;
      const usedMin = typeof this.min === 'string' ? parseFloat(this.min) : this.min;
      const usedMax = typeof max === 'string' ? parseFloat(max) : max;
      const usedStep = (typeof step === 'undefined' || step === null || step === 'any') ? 1 : typeof step === 'number' ? step : parseFloat(step);

      let wantedNextValue = usedInitialValue + usedStep;

      if (typeof usedMax === 'number' && usedMax < wantedNextValue) {
        wantedNextValue = usedMax;
      } else if (typeof usedMin === 'number' && usedMin > wantedNextValue) {
        wantedNextValue = usedMin;
      }

      const finalStringValue = this.#isNumberFormattingEnabled()
        ? this.#formatNumber(wantedNextValue)
        : wantedNextValue.toString();

      this.input.value = finalStringValue;

      if (this.value !== this.input.value) {
        this.value = this.input.value;
      }
      return;
    }
`,
    ],
    // Handle step down
    [
      'stepDown() {',
      `    if (this.#numericStrategy.noStepAlign) {
      const { min, max, step, valueAsNumber } = this;

      // Needed because the input could be empty. In this case, valueAsNumber is NaN
      const usedInitialValue = Number.isNaN(valueAsNumber) ? 0 : valueAsNumber;
      const usedMin = typeof min === 'string' ? parseFloat(min) : min;
      const usedMax = typeof max === 'string' ? parseFloat(max) : max;
      const usedStep = (typeof step === 'undefined' || step === null || step === 'any') ? 1 : typeof step === 'number' ? step : parseFloat(step);

      let wantedNextValue = usedInitialValue - usedStep;
      
      if (typeof usedMin === 'number' && usedMin > wantedNextValue) {
        wantedNextValue = usedMin;
      } else if (typeof usedMax === 'number' && usedMax < wantedNextValue) {
        wantedNextValue = usedMax;
      }

      const finalStringValue = this.#isNumberFormattingEnabled()
        ? this.#formatNumber(wantedNextValue)
        : wantedNextValue.toString();

      this.input.value = finalStringValue;

      if (this.value !== this.input.value) {
        this.value = this.input.value;
      }
      return;
    }
`,
    ],
  ], content);

  // Disable the stepper if the input uses noStepValidation
  content = content.replace(
    'ifDefined(this.step as number)',
    "ifDefined(!this.#numericStrategy.noStepValidation ? this.step as number : 'any')",
  );
  // /#818

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
    } else if (nextValue > max) {
      nextValue = max;
      clampEvent = 'max';
    }

    const eventObj = clampEvent ? {
      detail: {
        clampedTo: clampEvent as SynClampDetails['clampedTo'],
        lastUserValue: valueAsNumber,
      },
    } : null;

    return {
      eventObj,
      shouldClamp: !!eventObj,
      nextValue,
    };
  }`,
    {
      newlinesAfterInsertion: 2,
      tabsAfterInsertion: 1,
    },
  );
  // /#417

  // #838: Add formatter
  content = addSectionBefore(
    content,
    'render() {',
    `#formatNumber(value: number) {
    return formatNumber(value, this.step, {
      maximumFractionDigits: this.maxFractionDigits,
      minimumFractionDigits: this.minFractionDigits,
      ...this.numberFormatterOptions,
    });
  }`,
    {
      newlinesAfterInsertion: 2,
      tabsAfterInsertion: 1,
    },
  );

  content = addSectionBefore(
    content,
    'render() {',
    `#isNumberFormattingEnabled() {
    const {
      numberFormatterOptions,
      maxFractionDigits,
      minFractionDigits,
      step,
    } = this;

    const hasMaxFractionDigits = typeof maxFractionDigits !== 'undefined' && !Number.isNaN(maxFractionDigits);
    const hasMinFractionDigits = typeof minFractionDigits !== 'undefined' && !Number.isNaN(minFractionDigits);

    // Easy checks first: If we have a min or max fraction digit, proceed
    if (hasMaxFractionDigits || hasMinFractionDigits) {
      return true;
    }
    
    // Check if there are any options that where provided via formatter options
    if (typeof numberFormatterOptions === 'object') {
      return true;
    }

    // As a last fallback, see if the step has a decimal value
    // If it has, we should format according to the steps amount of fraction digits
    const stepToUse = step === 'any' || !step ? 1 : +step;
    const stepFractionDigits = stepToUse.toString().split('.')[1]?.length || 0;

    return stepFractionDigits > 0;
  }`,
    {
      newlinesAfterInsertion: 2,
      tabsAfterInsertion: 1,
    },
  );

  // Auto format when a new value is provided via attribute
  content = addSectionBefore(
    content,
    'private handleBlur() {',
    `attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    // #838: Make sure to format the value when set via attribute
    // Note that we have to wait for the updateComplete to be done before we can reset the value
    // This is because some properties might not been set in attributeCHangedCallback when the
    // value change here is triggered. This depends on the ORDER in which the props have been provided
    // in the DOM, so we have to wait until the render cycle is over to trigger a new one.
    if (name === 'value' && oldValue !== newValue) {
      this.updateComplete.then(() => {
        if (this.type === 'number' && this.#isNumberFormattingEnabled() && typeof newValue === 'string') {
          if (isNaN(+newValue)) {
            this.value = '';
          } else {
            this.value = this.#formatNumber(+newValue);
          }
        }
      });
    }

    super.attributeChangedCallback(name, oldValue, newValue);
  }`,
    {
      newlinesAfterInsertion: 2,
      tabsAfterInsertion: 1,
    },
  );
  // /#838

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
