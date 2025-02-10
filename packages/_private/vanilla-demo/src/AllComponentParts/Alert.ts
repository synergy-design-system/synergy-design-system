import { html } from 'lit';

export const Alert = () => html`
  <div
    style="display: flex; flex-direction: column; gap: var(--syn-spacing-medium);"
  >
    <syn-alert variant="primary" open>
      <syn-icon slot="icon" name="info"></syn-icon>
      <strong>This is super informative</strong>
      <br />
      You can tell by how pretty the alert is.
    </syn-alert>

    <syn-alert variant="success" open>
      <syn-icon slot="icon" name="check_circle"></syn-icon>
      <strong>Your changes have been saved</strong>
      <br />
      You can safely exit the app now.
    </syn-alert>

    <syn-alert variant="neutral" open>
      <syn-icon slot="icon" name="settings"></syn-icon>
      <strong>Your settings have been updated</strong>
      <br />
      Settings will take effect on next login.
    </syn-alert>

    <syn-alert variant="warning" open>
      <syn-icon slot="icon" name="warning"></syn-icon>
      <strong>Your session has ended</strong>
      <br />
      Please login again to continue.
    </syn-alert>

    <syn-alert variant="danger" open>
      <syn-icon slot="icon" name="error"></syn-icon>
      <strong>Your account has been deleted</strong>
      <br />
      We&apos;re very sorry to see you go!
    </syn-alert>
  </div>
`;
