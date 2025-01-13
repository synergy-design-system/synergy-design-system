import fs from 'fs/promises';
import path from 'path';
import { createHeader, job } from '../shared.js';
import { createNgPackageJson } from './shared.js';

const headerComment = createHeader('angular');

/**
 * Creates the angular validators directive,
 * located at packages/angular/directives/validators/validators.ts
 */
export const runCreateValidatorDirectives = job('Angular: Creating ValidatorDirectives...', async (outDir) => {
  const fileName = 'validators.ts';
  const validatorDir = path.join(outDir, 'validators');
  const outFile = path.join(validatorDir, fileName);

  // Create a subdirectory for the validators
  await fs.mkdir(validatorDir, { recursive: true });

  const output = `
${headerComment}
import { Directive, forwardRef, NgModule, Provider } from '@angular/core';
import {
  CheckboxRequiredValidator,
  MaxValidator,
  MinValidator,
  NG_VALIDATORS,
} from '@angular/forms';

/**
 * @description
 * Provider which adds \`SYN_MIN_VALIDATOR\` to the \`NG_VALIDATORS\` multi-provider list.
 */
export const SYN_MIN_VALIDATOR: Provider = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => SynMinValidator),
  multi: true,
};

/**
 *  A directive which installs the {@link SynMinValidator} for a syn-input with \`formControlName\`,
 * \`formControl\`, or control with \`ngModel\` that also has a \`min\` attribute.
 *
 * @usageNotes
 *
 * ### Adding a min validator
 *
 * The following example shows how to add a min validator to a syn-input attached to an
 * ngModel binding.
 *
 * \`\`\`html
 * <syn-input type="number" ngModel min="1"></syn-input>
 * \`\`\`
 */
@Directive({
  // This validator is needed, because angular specifies the min validator especially only for \`<input />\` elements. See https://github.com/angular/angular/blob/e603e5616d2c3830a641d4cf76c891af0059798c/packages/forms/src/directives/validators.ts#L276
  selector: 'syn-input[type=number][min][formControlName],syn-input[type=number][min][formControl],syn-input[type=number][min][ngModel]',
  standalone: false,
  providers: [SYN_MIN_VALIDATOR],
  host: {'[attr.min]': '_enabled ? min : null'},
})
export class SynMinValidator extends MinValidator {}


/**
 * @description
 * Provider which adds \`SynMaxValidator\` to the \`NG_VALIDATORS\` multi-provider list.
 */
export const SYN_MAX_VALIDATOR: Provider = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => SynMaxValidator),
  multi: true,
};

/**
 * A directive which installs the {@link SynMaxValidator} for a syn-input with \`formControlName\`,
 * \`formControl\`, or control with \`ngModel\` that also has a \`max\` attribute.
 *
 * @usageNotes
 *
 * ### Adding a max validator
 *
 * The following example shows how to add a max validator to a syn-input attached to an
 * ngModel binding.
 *
 * \`\`\`html
 * <syn-input type="number" ngModel max="4"></syn-input>
 * \`\`\`
 */
@Directive({
  // This validator is needed, because angular specifies the max validator especially only for \`<input />\` elements. See https://github.com/angular/angular/blob/e603e5616d2c3830a641d4cf76c891af0059798c/packages/forms/src/directives/validators.ts#L224
  selector: 'syn-input[type=number][max][formControlName],syn-input[type=number][max][formControl],syn-input[type=number][max][ngModel]',
  standalone: false,
  providers: [SYN_MAX_VALIDATOR],
  host: {'[attr.max]': '_enabled ? max : null'},
})
export class SynMaxValidator extends MaxValidator {}

/**
 * @description
 * Provider which adds \`SynCheckboxRequiredValidator\` to the \`NG_VALIDATORS\` multi-provider list.
 */
export const SYN_CHECKBOX_REQUIRED_VALIDATOR: Provider = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => SynCheckboxRequiredValidator),
  multi: true,
};

/**
 * A Directive that adds the \`required\` validator to syn-checkbox controls marked with the
 * \`required\` attribute. The directive is provided with the \`NG_VALIDATORS\` multi-provider list.
 *
 * ### Adding a required syn-checkbox validator using template-driven forms
 *
 * The following example shows how to add a checkbox required validator to an input attached to an
 * ngModel binding.
 *
 * \`\`\`
 * <syn-checkbox ngModel required></syn-checkbox>
 * \`\`\`
 */
@Directive({
  // This validator is needed, because angular specifies the required checkbox validator especially only for \`<input type="checkbox"/>\` elements. See https://github.com/angular/angular/blob/e603e5616d2c3830a641d4cf76c891af0059798c/packages/forms/src/directives/validators.ts#L429 
  selector: 'syn-checkbox[required][formControlName],syn-checkbox[required][formControl],syn-checkbox[required][ngModel]',
  standalone: false,
  providers: [SYN_CHECKBOX_REQUIRED_VALIDATOR],
  host: {'[attr.required]': '_enabled ? "" : null'},
})
export class SynCheckboxRequiredValidator extends CheckboxRequiredValidator {}

@NgModule({
  declarations: [
    SynMinValidator,
    SynMaxValidator,
    SynCheckboxRequiredValidator,
  ],
  exports: [
    SynMinValidator,
    SynMaxValidator,
    SynCheckboxRequiredValidator,
  ],
 
})
export class SynergyValidatorsModule {}
`.trim();

  await fs.writeFile(outFile, `${output}\n`, 'utf8');
  createNgPackageJson(fileName, validatorDir);
});
