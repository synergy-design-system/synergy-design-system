import { Component } from '@angular/core';
import { SynInputComponent, SynValidateComponent } from '@synergy-design-system/angular';

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
  `,
})
export class Validate {}
