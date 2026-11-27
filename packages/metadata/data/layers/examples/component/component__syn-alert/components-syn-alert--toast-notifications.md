## Toast Notifications

To display an alert as a toast notification, or “toast”, create the alert and call its toast() method. This will move the alert out of its position in the DOM and into the toast stack where it will be shown. Once dismissed, it will be removed from the DOM completely. To reuse a toast, store a reference to it and call toast() again later on.You should always use the closable attribute so users can dismiss the notification. It’s also common to set a reasonable duration when the notification doesn’t require acknowledgement.

```html
<div class="alert-toast">
  <div style="display: flex; gap: var(--syn-spacing-small)">
    <syn-button data-variant="primary">Primary</syn-button>
    <syn-button data-variant="success">Success</syn-button>
    <syn-button data-variant="warning">Warning</syn-button>
    <syn-button data-variant="critical">Critical</syn-button>
    <syn-button data-variant="error">Error</syn-button>
    <syn-button data-variant="neutral">Neutral</syn-button>
  </div>

  <syn-alert variant="primary" duration="3000" closable="">
    <syn-icon slot="icon" name="status-informative" library="system"></syn-icon>
    <strong>This is super informative</strong><br />
    You can tell by how pretty the alert is.
  </syn-alert>

  <syn-alert variant="success" duration="3000" closable="">
    <syn-icon slot="icon" name="status-success" library="system"></syn-icon>
    <strong>Your changes have been saved</strong><br />
    You can safely exit the app now.
  </syn-alert>

  <syn-alert variant="neutral" duration="3000" closable="">
    <syn-icon slot="icon" name="status-neutral" library="system"></syn-icon>
    <strong>Your settings have been updated</strong><br />
    Settings will take effect on next login.
  </syn-alert>

  <syn-alert variant="warning" duration="3000" closable="">
    <syn-icon slot="icon" name="status-warning" library="system"></syn-icon>
    <strong>Your session has ended</strong><br />
    Please login again to continue.
  </syn-alert>

  <syn-alert variant="critical" duration="3000" closable="">
    <syn-icon slot="icon" name="status-critical" library="system"></syn-icon>
    <strong>Your session has ended</strong><br />
    Please login again to continue.
  </syn-alert>

  <syn-alert variant="error" duration="3000" closable="">
    <syn-icon slot="icon" name="status-error" library="system"></syn-icon>
    <strong>Your account has been deleted</strong><br />
    We're very sorry to see you go!
  </syn-alert>
</div>

<script type="module">
  const container = document.querySelector(".alert-toast");

  ["primary", "success", "neutral", "warning", "critical", "error"].map(
    (variant) => {
      const button = container.querySelector(
        `syn-button[data-variant="${variant}"]`,
      );
      const alert = container.querySelector(`syn-alert[variant="${variant}"]`);

      button.addEventListener("click", () => alert.toast());
    },
  );
</script>
```
