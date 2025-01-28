import { Component } from '@angular/core';
import { SynSpinnerComponent } from '@synergy-design-system/angular';

@Component({
  selector: 'demo-spinner',
  standalone: true,
  imports: [
    SynSpinnerComponent,
  ],
  template: `
    <syn-spinner />
  `,
})
export class Spinner {}
