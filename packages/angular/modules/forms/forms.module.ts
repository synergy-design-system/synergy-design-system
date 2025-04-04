// ---------------------------------------------------------------------
// 🔒 AUTOGENERATED @synergy-design-system/angular wrappers for @synergy-design-system/components
// Please do not edit this file directly!
// It will get recreated when running pnpm build.
// ---------------------------------------------------------------------
import { Directive, forwardRef, NgModule } from '@angular/core';
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { SynergyValidatorsModule } from '@synergy-design-system/angular/directives/validators';

@Directive({
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SynDefaultValueAccessor),
    },
  ],
  selector: `syn-button-group[formControlName], syn-button-group[formControl], syn-button-group[ngModel],
    syn-combobox[formControlName], syn-combobox[formControl], syn-combobox[ngModel],
    syn-dropdown[formControlName], syn-dropdown[formControl], syn-dropdown[ngModel],
    syn-input[formControlName], syn-input[formControl], syn-input[ngModel],
    syn-radio-group[formControlName], syn-radio-group[formControl], syn-radio-group[ngModel],
    syn-range[formControlName], syn-range[formControl], syn-range[ngModel],
    syn-range[formControlName], syn-range[formControl], syn-range[ngModel],
    syn-select[formControlName], syn-select[formControl], syn-select[ngModel],
    syn-textarea[formControlName], syn-textarea[formControl], syn-textarea[ngModel]`,
  standalone: false,
  host: {
    // Overwrite the input event, because we only emit syn-input event
    '(syn-input)': '$any(this)._handleInput($event.target.value)',
    '(blur)': 'onTouched()',
    '(compositionstart)': '$any(this)._compositionStart()',
    '(compositionend)': '$any(this)._compositionEnd($event.target.value)',
  },
})
export class SynDefaultValueAccessor extends DefaultValueAccessor {}

@Directive({
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SynCheckedValueAccessor),
    },
  ],
  selector: `syn-checkbox[formControlName], syn-checkbox[formControl], syn-checkbox[ngModel],
    syn-switch[formControlName], syn-switch[formControl], syn-switch[ngModel]`,
  standalone: false,
  // Overwrite the change event, because we only emit syn-change event
  host: {
    '(syn-change)': 'onChange($event.target.checked)',
    '(blur)': 'onTouched()',
  },
})
export class SynCheckedValueAccessor extends CheckboxControlValueAccessor {}

@Directive({
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SynFileValueAccessor),
    },
  ],
  selector: `syn-file[formControlName], syn-file[formControl], syn-file[ngModel]`,
  standalone: false,
  // Overwrite the change event, because we only emit syn-change event
  host: {
    '(syn-change)': 'onChange($event.target.files)',
  },
})
export class SynFileValueAccessor extends DefaultValueAccessor {}

@NgModule({
  declarations: [
    SynDefaultValueAccessor,
    SynCheckedValueAccessor,
    SynFileValueAccessor,
  ],
  exports: [
    SynDefaultValueAccessor,
    SynCheckedValueAccessor,
    SynFileValueAccessor,
    SynergyValidatorsModule,
  ],
  imports: [SynergyValidatorsModule],
})
export class SynergyFormsModule {}
