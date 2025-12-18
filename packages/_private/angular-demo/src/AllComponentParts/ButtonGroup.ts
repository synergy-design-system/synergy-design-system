import { Component } from '@angular/core';
import { SynButtonComponent } from '@synergy-design-system/angular/components/button';
import { SynButtonGroupComponent } from '@synergy-design-system/angular/components/button-group';

@Component({
  selector: 'demo-button-group',
  standalone: true,
  imports: [
    SynButtonComponent,
    SynButtonGroupComponent,
  ],
  template: `
    <div style="display: flex; flex-direction: column; gap: var(--syn-spacing-medium)">
      <syn-button-group label="Button Group - Default">
        <syn-button>Left</syn-button>
        <syn-button>Center (This Group will size adjust!)</syn-button>
        <syn-button>Right</syn-button>
      </syn-button-group>

      @for (size of sizes; track size) {
        @for (variant of variants; track variant) {
          <syn-button-group
            [attr.size]="size"
            [attr.variant]="variant"
            [attr.label]="'Button Group - Size: ' + size + ', Variant: ' + variant"
          >
            <syn-button>Left</syn-button>
            <syn-button>Center</syn-button>
            <syn-button>Right</syn-button>
          </syn-button-group>
        }
      }
    </div>
  `,
})
export class ButtonGroup {
  sizes = ['small', 'medium', 'large'] as const;
  variants = ['outline', 'filled'] as const;
}
