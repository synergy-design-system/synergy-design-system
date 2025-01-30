import { Component } from '@angular/core';
import { SynProgressRingComponent } from '@synergy-design-system/angular/components/progress-ring';

@Component({
  selector: 'demo-progressring',
  standalone: true,
  imports: [
    SynProgressRingComponent,
  ],
  template: `
    <syn-progress-ring [value]=50>
      50%
    </syn-progress-ring>
  `,
})
export class ProgressRing {}
