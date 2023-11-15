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
 * List of components that we want to use the default (string) fallback for
 * @var {string[]} defaultSelectors
 */
const defaultSelectors = [
  'syn-dropdown',
  'syn-input',
  'syn-textarea',
  'syn-range',
  'syn-select',
];

/**
 * List of all elements that should be treated as checkboxes
 * @var {string[]} checkboxSelectors
 */
const checkboxSelectors = ['syn-checkbox'];

/**
 * List of all elements that act as radio buttons
 * @var {string[]} radioSelector
 */
const radioSelectors = [
  'syn-radio',
  'syn-radio-button',
  'syn-radio-group',
];

/**
 * Creates an angular selector list from the given selectors
 * @param {string[]} selectors The selectors to use as input
 * @returns {string} Angular selector list
 */
const createSelectors = selectors => selectors
  .map(selector => fields
    .map(field => `${selector}[${field}]`)
    .join(', '),
  )
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
  RadioControlValueAccessor,
} from '@angular/forms';

@Directive({
  providers: [{
    multi: true,
    provide: NG_VALUE_ACCESSOR, 
    useExisting: forwardRef(() => SynDefaultValueAccessor),
  }],
  selector: \`${createSelectors(defaultSelectors)}\`,
})
export class SynDefaultValueAccessor extends DefaultValueAccessor { }

@Directive({
  providers: [{
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SynCheckboxControlValueAccessor),
  }],
  selector: \`${createSelectors(checkboxSelectors)}\`,
})
export class SynCheckboxControlValueAccessor extends CheckboxControlValueAccessor { }

@Directive({
  providers: [{
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SynRadioControlValueAccessor),
  }],
  selector: \`${createSelectors(radioSelectors)}\`,
})
export class SynRadioControlValueAccessor extends RadioControlValueAccessor { }

@NgModule({
  declarations: [
    SynDefaultValueAccessor,
    SynCheckboxControlValueAccessor,
    SynRadioControlValueAccessor,
  ],
  exports: [
    SynDefaultValueAccessor,
    SynCheckboxControlValueAccessor,
    SynRadioControlValueAccessor,
  ],
  imports: [],
})
export class SynergyFormsModule {}
`.trim();

  await fs.writeFile(outFile, `${output}\n`, 'utf8');
});
