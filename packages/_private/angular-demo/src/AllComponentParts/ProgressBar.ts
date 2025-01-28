import { Component } from '@angular/core';
import { SynProgressBarComponent } from '@synergy-design-system/angular';

@Component({
  selector: 'demo-progressbar',
  standalone: true,
  imports: [
    SynProgressBarComponent,
  ],
  template: `
    <syn-progress-bar indeterminate />
  `,
})
export class ProgressBar {}
