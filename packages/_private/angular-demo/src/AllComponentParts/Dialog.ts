import { Component } from '@angular/core';
import { SynDialogComponent, SynButtonComponent } from '@synergy-design-system/angular';

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
