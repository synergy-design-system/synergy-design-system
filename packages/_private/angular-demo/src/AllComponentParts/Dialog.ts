import { Component } from '@angular/core';
import { SynDialogComponent, SynButtonComponent } from '@synergy-design-system/angular';
import type { SynDialog } from '@synergy-design-system/components';

@Component({
  selector: 'demo-dialog',
  standalone: true,
  imports: [
    SynButtonComponent,
    SynDialogComponent,
  ],
  template: `
    <syn-dialog
      open
      label="Dialog"
      (syn-after-hide)="show($event)"
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      <syn-button variant="filled" slot="footer">
        Close
      </syn-button>
    </syn-dialog>
  `,
})
export class Dialog {
  show = async (e: Event) => {
    const target = e.target as SynDialog;
    window.setTimeout(async () => {
      await target.show();
      console.log('show')
    }, 2000);
  };
}
