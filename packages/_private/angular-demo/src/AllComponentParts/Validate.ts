import { Component, ViewChild } from '@angular/core';
import { SynInputComponent } from '@synergy-design-system/angular/components/input';
import { SynValidateComponent } from '@synergy-design-system/angular/components/validate';

@Component({
  selector: 'demo-validate',
  standalone: true,
  imports: [
    SynValidateComponent,
    SynInputComponent,
  ],
  template: `
    <syn-validate eager variant="inline" on="live">
      <syn-input
        label="Invalid input"
        type="email"
        value=""
        required
      />
    </syn-validate>

    <syn-validate #validate915 data-testid="validate-915" on="revalidate" variant="inline">
      <syn-input #input915 label="Incorrect state with custom event #915" (synChangeEvent)="setError('Invalid value')"/>
    </syn-validate>
  `,
})
export class Validate {
  @ViewChild('input915') input!: SynInputComponent;
  @ViewChild('validate915') validate!: SynValidateComponent;

  setError(message: string) {
    this.validate.customValidationMessage = message;
    this.input.nativeElement.dispatchEvent(new CustomEvent('revalidate', { bubbles: true}));
  }
}
