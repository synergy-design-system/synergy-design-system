import { Component } from '@angular/core';
import { SynDialogComponent } from '@synergy-design-system/angular/components/dialog';
import { SynButtonComponent } from '@synergy-design-system/angular/components/button';

@Component({
  selector: 'demo-dialog',
  standalone: true,
  imports: [
    SynButtonComponent,
    SynDialogComponent,
  ],
  template: `
    <syn-dialog
      [open]="false"
      label="Dialog"
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      <syn-button variant="filled" slot="footer">
        Close
      </syn-button>
    </syn-dialog>
  `,
})
export class Dialog {}
