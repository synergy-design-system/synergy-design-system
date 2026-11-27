## Variants

Set the variant attribute to change the alert’s variant.

```html
<div
  style="display: flex; flex-direction: column; gap: var(--syn-spacing-medium)"
>
  <syn-alert variant="primary" open="" id="something">
    <syn-icon slot="icon" name="status-informative" library="system"></syn-icon>
    <strong>This is super informative</strong><br />
    You can tell by how pretty the alert is.
  </syn-alert>

  <syn-alert variant="success" open="">
    <syn-icon slot="icon" name="status-success" library="system"></syn-icon>
    <strong>Your changes have been saved</strong><br />
    You can safely exit the app now.
  </syn-alert>

  <syn-alert variant="warning" open="">
    <syn-icon slot="icon" name="status-warning" library="system"></syn-icon>
    <strong>Your session has ended</strong><br />
    Please login again to continue.
  </syn-alert>

  <syn-alert variant="critical" open="">
    <syn-icon slot="icon" name="status-critical" library="system"></syn-icon>
    <strong>Your session has ended</strong><br />
    Please login again to continue.
  </syn-alert>

  <syn-alert variant="error" open="">
    <syn-icon slot="icon" name="status-error" library="system"></syn-icon>
    <strong>Your account has been deleted</strong><br />
    We're very sorry to see you go!
  </syn-alert>

  <syn-alert variant="danger" open="">
    <syn-icon slot="icon" name="status-error" library="system"></syn-icon>
    <strong>Your account has been deleted*</strong><br />
    We're very sorry to see you go!
  </syn-alert>

  <syn-alert variant="neutral" open="">
    <syn-icon slot="icon" name="status-neutral" library="system"></syn-icon>
    <strong>Your settings have been updated</strong><br />
    Settings will take effect on next login.
  </syn-alert>
</div>
<style>
  #something::part(base) {
    overflow: hidden;
  }
</style>
```
