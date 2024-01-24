import { removeSection } from '../remove-section.js';

export const vendorInput = (path, content) => {
  const output = { content, path };
  if (!path.includes('input.component.ts')
    && !path.includes('input.styles.ts')
    && !path.includes('input.stories.ts')
    && !path.includes('input.test.ts')
  ) {
    return output;
  }
  // We don't provide a filled property in Synergy, but instead use the filled styles for readonly
  // update stories
  output.content = output.content.replace('<syn-input placeholder="Type something" filled>', '<syn-input value="Readonly content" readonly>');
  output.content = output.content.replaceAll('Filled', 'Readonly');

  // update component and styles
  output.content = removeSection(output.content, '/** Draws a filled', 'filled = false;');
  output.content = output.content.replaceAll('filled', 'readonly'); // makes changes in styles and components
  // Pill is not supported in Synergy
  output.content = removeSection(output.content, "'input--pill':", ',');
  output.content = removeSection(output.content, '/** Draws a pill-style', 'pill = false;');
  output.content = removeSection(
    output.content,
    '  /*\n   * Pill modifier',
    '  /*',
    { preserveEnd: true, removePrecedingWhitespace: false },
  );
  // We need to add classes depending on prefix and suffix slots to use them in CSS
  output.content = output.content.replace(
    "HasSlotController(this, 'help-text', 'label')",
    "HasSlotController(this, 'help-text', 'label', 'prefix', 'suffix')",
  );
  output.content = output.content.replace(
    "const hasHelpTextSlot = this.hasSlotController.test('help-text');",
    "const hasHelpTextSlot = this.hasSlotController.test('help-text');\n    const hasPrefixSlot = this.hasSlotController.test('prefix');\n    const hasSuffixSlot = this.hasSlotController.test('suffix');",
  );
  output.content = output.content.replace(
    "'form-control--has-help-text': hasHelpText",
    "'form-control--has-help-text': hasHelpText,\n          'form-control--has-prefix': hasPrefixSlot,\n          'form-control--has-suffix': hasSuffixSlot",
  );
  // remove tests for pill and filled
  output.content = removeSection(output.content, 'expect(el.filled)', ';');
  output.content = removeSection(output.content, 'expect(el.pill)', ';');
  // @todo remove this when syn-textarea and syn-checkbox are available
  output.content = output.content.replace(/syn-checkbox/g, 'syn-input');

  // Add syn-divider as dependency
  output.content = output.content.replace(
    "import SynIcon from '../icon/icon.component.js';",
    "import SynIcon from '../icon/icon.component.js';\nimport SynDivider from '../divider/divider.component.js';",
  );
  output.content = output.content.replace(
    '* @dependency syn-icon',
    '* @dependency syn-icon\n * @dependency syn-divider',
  );
  output.content = output.content.replace(
    "static dependencies = { 'syn-icon': SynIcon };",
    "static dependencies = {\n\t\t'syn-icon': SynIcon,\n\t\t'syn-divider': SynDivider\n\t};",
  );

  output.content = output.content.replace(
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
                  ?disabled=\${isDecrementStepperDisabled || this.disabled}
                  aria-hidden="true"
                  @click=\${this.handleStepDown}
                  @mousedown=\${this.handleMouseDown}
                  tabindex="-1"
                  size="\${this.size}"
                  color="primary"
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
                  ?disabled=\${isIncrementStepperDisabled || this.disabled}
                  aria-hidden="true"
                  @click=\${this.handleStepUp}
                  @mousedown=\${this.handleMouseDown}
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

  output.content = output.content.replace(
    "private __dateInput = Object.assign(document.createElement('input'), { type: 'date' });",
    `private __dateInput = Object.assign(document.createElement('input'), { type: 'date' });
  private __mousedownHappened = false;`,
  );

  output.content = output.content.replace(
    `private handleBlur() {
    this.hasFocus = false;
    this.emit('syn-blur');
  }`,
    `private handleBlur() {
    if(!this.__mousedownHappened || this.type !== 'number'){
      this.hasFocus = false;
      this.emit('syn-blur');
    }else {
      this.__mousedownHappened = false;
      this.input.focus();
    }
  }

  private handleMouseDown() {
    this.__mousedownHappened = true;
  }
  
  private handleStepUp() {
    this.stepUp();
    this.input.focus();
  }

  private handleStepDown() {
    this.stepDown();
    this.input.focus();
  }`,
  );

  output.content = output.content.replace(
    "const isClearIconVisible = hasClearIcon && (typeof this.value === 'number' || this.value.length > 0);",
    `const isClearIconVisible = hasClearIcon && (typeof this.value === 'number' || this.value.length > 0);
    const isDecrementStepperDisabled = this.type === 'number' && !this.noSpinButtons && this.valueAsNumber <= (typeof this.min === 'string' ? parseFloat(this.min) : this.min);
    const isIncrementStepperDisabled = this.type === 'number' && !this.noSpinButtons && this.valueAsNumber >= (typeof this.max === 'string' ? parseFloat(this.max) : this.max);`,
  );

  // Always hide the built-in number spinner
  output.content = output.content.replace(
    "'input--no-spin-buttons': this.noSpinButtons",
    "'input--no-spin-buttons': this.noSpinButtons,\n\t\t\t\t\t\t\t'input--no-browser-spin-buttons': true",
  );
  output.content = output.content.replace(
    `.input--no-spin-buttons input[type='number']::-webkit-outer-spin-button,
  .input--no-spin-buttons input[type='number']::-webkit-inner-spin-button {`,
    `.input--no-browser-spin-buttons input[type='number']::-webkit-outer-spin-button,
  .input--no-browser-spin-buttons input[type='number']::-webkit-inner-spin-button {`,
  );

  // Replace browser number built-in comments
  output.content = output.content.replace(
    "Hides the browser's built-in increment/decrement",
    'Hides the increment/decrement',
  );

  // TODO: handle spinner functionality by clicking button down
  return output;
};
