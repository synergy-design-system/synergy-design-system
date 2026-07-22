import { Component } from '@angular/core';
import type { SynDialog } from '@synergy-design-system/components';
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
      [open]="true"
      label="Dialog"
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      <syn-button
        variant="filled"
        slot="footer"
        (click)="closeDialog($event)"
      >
        Close
      </syn-button>
    </syn-dialog>
  `,
})
export class Dialog {
  closeDialog(event: Event) {
    const parentDialog = (event.target as HTMLElement).closest('syn-dialog') as SynDialog;
    if (parentDialog) {
      parentDialog.hide();
    }
  }
}
