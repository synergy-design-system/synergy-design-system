import fs from 'fs/promises';
import path from 'path';
import { createHeader, job } from '../shared.js';

const headerComment = createHeader('angular');

/**
 * @var {string[]} fields The fields we want to apply selectors for
 */
const fields = [
  'formControlName',
  'formControl',
  'ngModel',
];

/**
 * List of components that use the value property in forms
 * @var {string[]} defaultSelectors
 */
const defaultSelectors = [
  'syn-dropdown',
  'syn-input',
  'syn-textarea',
  'syn-range',
  'syn-select',
  'syn-radio-group',
  'syn-button-group',
  'syn-range',
  'syn-combobox',
].sort();

/**
 * List of file upload enabled elements
 */
const fileSelectors = [
  'syn-file',
];

/**
 * List of components that use the checked property in forms
 * @var {string[]} checkedSelectors
 */
const checkedSelectors = [
  'syn-checkbox',
  'syn-switch',
];

/**
 * Creates an angular selector list from the given selectors
 * @param {string[]} selectors The selectors to use as input
 * @returns {string} Angular selector list
 */
const createSelectors = selectors => selectors
  .map(selector => fields
    .map(field => `${selector}[${field}]`)
    .join(', '))
  .flat()
  .join(',\n    ');

/**
 * Creates the synergy angular module, located at packages/angular/src/modules/synergy.module.ts
 */
export const runCreateFormsModule = job('Angular: Creating FormsModule...', async (outDir) => {
  const outFile = path.join(outDir, 'forms.module.ts');

  const output = `
${headerComment}
import {
  Directive,
  forwardRef,
  NgModule,
} from '@angular/core';
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
 import { SynCheckboxRequiredValidator, SynMaxValidator, SynMinValidator } from '../directives/validators';

@Directive({
  providers: [{
    multi: true,
    provide: NG_VALUE_ACCESSOR, 
    useExisting: forwardRef(() => SynDefaultValueAccessor),
  }],
  selector: \`${createSelectors(defaultSelectors)}\`,
  standalone: false,
  host: {
    // Overwrite the input event, because we only emit syn-input event
    '(syn-input)': '$any(this)._handleInput($event.target.value)',
    '(blur)': 'onTouched()',
    '(compositionstart)': '$any(this)._compositionStart()',
    '(compositionend)': '$any(this)._compositionEnd($event.target.value)'
  },
})
export class SynDefaultValueAccessor extends DefaultValueAccessor { }

@Directive({
  providers: [{
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SynCheckedValueAccessor),
  }],
  selector: \`${createSelectors(checkedSelectors)}\`,
  standalone: false,
  // Overwrite the change event, because we only emit syn-change event
  host: { '(syn-change)': 'onChange($event.target.checked)', '(blur)': 'onTouched()' },
})
export class SynCheckedValueAccessor extends CheckboxControlValueAccessor { }

@Directive({
  providers: [{
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SynFileValueAccessor),
  }],
  selector: \`${createSelectors(fileSelectors)}\`,
  standalone: false,
  // Overwrite the change event, because we only emit syn-change event
  host: {
    '(syn-change)': 'onChange($event.target.files)',
  },
})
export class SynFileValueAccessor extends DefaultValueAccessor { }

@NgModule({
  declarations: [
    SynDefaultValueAccessor,
    SynCheckedValueAccessor,
    SynFileValueAccessor,
    SynMinValidator,
    SynMaxValidator,
    SynCheckboxRequiredValidator,
  ],
  exports: [
    SynDefaultValueAccessor,
    SynCheckedValueAccessor,
    SynFileValueAccessor,
    SynMinValidator,
    SynMaxValidator,
    SynCheckboxRequiredValidator,
  ],
  imports: [],
})
export class SynergyFormsModule {}
`.trim();

  await fs.writeFile(outFile, `${output}\n`, 'utf8');
});
