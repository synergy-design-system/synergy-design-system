import { Component } from '@angular/core';
import { SynIconComponent } from '@synergy-design-system/angular/components/icon';
import { SynInputComponent } from '@synergy-design-system/angular/components/input';

@Component({
  selector: 'demo-input',
  standalone: true,
  imports: [
    SynInputComponent,
    SynIconComponent,
  ],
  template: `
    <syn-input
      placeholder="Disabled"
      help-text="Help Text"
      label="Label"
    >
      <syn-icon name="house" slot="prefix" />
      <syn-icon name="chat" slot="suffix" />
    </syn-input>

    <!-- #417: Numeric Strategy -->
    <syn-input
      data-testid="input-417-numeric-no-value"
      label="Numeric Strategy (no value provided)"
      [max]=100
      [min]=0
      placeholder="Enter a numeric value between 0 and 100"
      type="number"
      value="50"
    />

    <syn-input
      data-testid="input-417-numeric-native"
      label="Numeric Strategy (native)"
      numericStrategy="native"
      [max]=100
      [min]=0
      placeholder="Enter a numeric value between 0 and 100"
      type="number"
      value="50"
    />

    <syn-input
      data-testid="input-417-numeric-modern"
      label="Numeric Strategy (modern)"
      numericStrategy="modern"
      [max]=100
      [min]=0
      placeholder="Enter a numeric value between 0 and 100"
      type="number"
      value="50"
    />
    <!-- /#417 -->

    <!-- #838: Numeric Strategy (min-fraction-digits) -->
    <syn-input
      data-testid="input-838-numeric-native-min-fraction-digits"
      label="Numeric Strategy (native, using min-fraction-digits)"
      numericStrategy="native"
      [max]=100
      [min]=0
      [minFractionDigits]="4"
      placeholder="Enter a numeric value between 0 and 100"
      type="number"
      value="50"
    />

    <syn-input
      data-testid="input-838-numeric-modern-min-fraction-digits"
      label="Numeric Strategy (modern, using min-fraction-digits)"
      numericStrategy="modern"
      [max]=100
      [min]=0
      [minFractionDigits]="4"
      placeholder="Enter a numeric value between 0 and 100"
      type="number"
      value="50"
    />
    <!-- /#838 -->
  `,
})
export class Input {}
