import { Component } from '@angular/core';
import { SynButtonComponent } from '@synergy-design-system/angular/components/button';

@Component({
  selector: 'demo-button',
  standalone: true,
  imports: [
    SynButtonComponent,
  ],
  template: `
    <div style="display: flex; gap: var(--syn-spacing-medium)">
      <syn-button variant="filled">Filled</syn-button>
      <syn-button variant="outline">Outline</syn-button>
      <syn-button variant="text">Text</syn-button>
    </div>
  `,
})
export class Button {}
