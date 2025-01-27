import { NgModule } from '@angular/core';
import { SynButtonComponent } from '@synergy-design-system/angular/components/button';
import { SynCheckboxComponent } from '@synergy-design-system/angular/components/checkbox';
import { SynComboboxComponent } from '@synergy-design-system/angular/components/combobox';
import { SynDividerComponent } from '@synergy-design-system/angular/components/divider';
import { SynFileComponent } from '@synergy-design-system/angular/components/file';
import { SynIconComponent } from '@synergy-design-system/angular/components/icon';
import { SynInputComponent } from '@synergy-design-system/angular/components/input';
import { SynOptgroupComponent } from '@synergy-design-system/angular/components/optgroup';
import { SynOptionComponent } from '@synergy-design-system/angular/components/option';
import { SynRadioComponent } from '@synergy-design-system/angular/components/radio';
import { SynRadioGroupComponent } from '@synergy-design-system/angular/components/radio-group';
import { SynRangeComponent } from '@synergy-design-system/angular/components/range';
import { SynRangeTickComponent } from '@synergy-design-system/angular/components/range-tick';
import { SynSelectComponent } from '@synergy-design-system/angular/components/select';
import { SynSwitchComponent } from '@synergy-design-system/angular/components/switch';
import { SynTextareaComponent } from '@synergy-design-system/angular/components/textarea';
import { SynValidateComponent } from '@synergy-design-system/angular/components/validate';
import { SynergyFormsModule } from '@synergy-design-system/angular/modules/forms';

const components = [
  SynButtonComponent,
  SynCheckboxComponent,
  SynComboboxComponent,
  SynDividerComponent,
  SynFileComponent,
  SynIconComponent,
  SynInputComponent,
  SynOptgroupComponent,
  SynOptionComponent,
  SynRadioComponent,
  SynRadioGroupComponent,
  SynRangeComponent,
  SynRangeTickComponent,
  SynSelectComponent,
  SynSwitchComponent,
  SynTextareaComponent,
  SynValidateComponent,
  SynergyFormsModule,
];

@NgModule({
  imports: components,
  exports: components,
})
export class UsedSynergyComponentsModule {}
