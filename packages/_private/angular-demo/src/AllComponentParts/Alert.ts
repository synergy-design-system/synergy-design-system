import { Component } from '@angular/core';
import { SynAlertComponent, SynIconComponent } from '@synergy-design-system/angular';

@Component({
  selector: 'demo-alert',
  standalone: true,
  imports: [
    SynAlertComponent,
    SynIconComponent,
  ],
  template: `
    <div style="display: flex; flex-direction: column; gap: var(--syn-spacing-medium);">
      <syn-alert variant="primary" open>
        <syn-icon slot="icon" name="info" />
        <strong>This is super informative</strong>
        <br />
        You can tell by how pretty the alert is.
      </syn-alert>

      <syn-alert variant="success" open>
        <syn-icon slot="icon" name="check_circle" />
        <strong>Your changes have been saved</strong>
        <br />
        You can safely exit the app now.
      </syn-alert>

      <syn-alert variant="neutral" open>
        <syn-icon slot="icon" name="settings" />
        <strong>Your settings have been updated</strong>
        <br />
        Settings will take effect on next login.
      </syn-alert>

      <syn-alert variant="warning" open>
        <syn-icon slot="icon" name="warning" />
        <strong>Your session has ended</strong>
        <br />
        Please login again to continue.
      </syn-alert>

      <syn-alert variant="danger" open>
        <syn-icon slot="icon" name="error" />
        <strong>Your account has been deleted</strong>
        <br />
        We&apos;re very sorry to see you go!
      </syn-alert>
    </div>
  `,
  })
export class Alert {}

