## Default

Alerts are used to display important messages inline or as toast notifications.

```html
<syn-alert open="">
  This is a standard alert. You can customize its content and even the icon.
  <syn-icon slot="icon" name="info"></syn-icon>
</syn-alert>
```

---

## Variants

Set the variant attribute to change the alert’s variant.

```html
<div
  style="display: flex; flex-direction: column; gap: var(--syn-spacing-medium)"
>
  <syn-alert variant="primary" open="" id="something">
    <syn-icon slot="icon" name="info"></syn-icon>
    <strong>This is super informative</strong><br />
    You can tell by how pretty the alert is.
  </syn-alert>

  <syn-alert variant="success" open="">
    <syn-icon slot="icon" name="check_circle"></syn-icon>
    <strong>Your changes have been saved</strong><br />
    You can safely exit the app now.
  </syn-alert>

  <syn-alert variant="neutral" open="">
    <syn-icon slot="icon" name="settings"></syn-icon>
    <strong>Your settings have been updated</strong><br />
    Settings will take effect on next login.
  </syn-alert>

  <syn-alert variant="warning" open="">
    <syn-icon slot="icon" name="warning"></syn-icon>
    <strong>Your session has ended</strong><br />
    Please login again to continue.
  </syn-alert>

  <syn-alert variant="danger" open="">
    <syn-icon slot="icon" name="status-error" library="system"></syn-icon>
    <strong>Your account has been deleted</strong><br />
    We're very sorry to see you go!
  </syn-alert>
</div>
<style>
  #something::part(base) {
    overflow: hidden;
  }
</style>
```

---

## Closable

Add the closable attribute to show a close button that will hide the alert.

```html
<syn-alert variant="primary" open="" closable="" class="alert-closable">
  <syn-icon slot="icon" name="info"></syn-icon>
  You can close this alert any time!
</syn-alert>

<script type="module">
  const alert = document.querySelector(".alert-closable");
  alert.addEventListener("syn-after-hide", () => {
    setTimeout(() => (alert.open = true), 2000);
  });
</script>
```

---

## Without Icons

Icons are optional. Simply omit the icon slot if you don’t want them.

```html
<syn-alert variant="primary" open="">
  Nothing fancy here, just a simple alert.
</syn-alert>
```

---

## Sizes

Use the size attribute to change an alert’s size.

```html
<div
  style="display: flex; flex-direction: column; gap: var(--syn-spacing-large)"
>
  <syn-alert variant="primary" open="" size="small">
    <syn-icon slot="icon" name="info"></syn-icon>
    <strong>This is size small</strong><br />
    Nothing fancy here, just a simple alert.
  </syn-alert>

  <syn-alert variant="primary" open="" size="medium">
    <syn-icon slot="icon" name="info"></syn-icon>
    <strong>This is size medium</strong><br />
    Nothing fancy here, just a simple alert.
  </syn-alert>

  <syn-alert variant="primary" open="" size="large">
    <syn-icon slot="icon" name="info"></syn-icon>
    <strong>This is size large</strong><br />
    Nothing fancy here, just a simple alert.
  </syn-alert>
</div>
```

---

## Duration

Set the duration attribute to automatically hide an alert after a period of time. This is useful for alerts that don’t require acknowledgement.

```html
<div class="alert-duration">
  <syn-button variant="outline">Show Alert</syn-button>

  <syn-alert variant="primary" duration="3000" closable="">
    <syn-icon slot="icon" name="info"></syn-icon>
    This alert will automatically hide itself after three seconds, unless you
    interact with it.
  </syn-alert>
</div>

<script type="module">
  const container = document.querySelector(".alert-duration");
  const button = container.querySelector("syn-button");
  const alert = container.querySelector("syn-alert");

  button.addEventListener("click", () => alert.show());
</script>

<style>
  .alert-duration syn-alert {
    margin-top: var(--syn-spacing-small);
  }
</style>
```

---

## Toast Notifications

To display an alert as a toast notification, or “toast”, create the alert and call its toast() method. This will move the alert out of its position in the DOM and into the toast stack where it will be shown. Once dismissed, it will be removed from the DOM completely. To reuse a toast, store a reference to it and call toast() again later on.You should always use the closable attribute so users can dismiss the notification. It’s also common to set a reasonable duration when the notification doesn’t require acknowledgement.

```html
<div class="alert-toast">
  <div style="display: flex; gap: var(--syn-spacing-small)">
    <syn-button data-variant="primary">Primary</syn-button>
    <syn-button data-variant="success">Success</syn-button>
    <syn-button data-variant="neutral">Neutral</syn-button>
    <syn-button data-variant="warning">Warning</syn-button>
    <syn-button data-variant="danger">Danger</syn-button>
  </div>

  <syn-alert variant="primary" duration="3000" closable="">
    <syn-icon slot="icon" name="info"></syn-icon>
    <strong>This is super informative</strong><br />
    You can tell by how pretty the alert is.
  </syn-alert>

  <syn-alert variant="success" duration="3000" closable="">
    <syn-icon slot="icon" name="check_circle"></syn-icon>
    <strong>Your changes have been saved</strong><br />
    You can safely exit the app now.
  </syn-alert>

  <syn-alert variant="neutral" duration="3000" closable="">
    <syn-icon slot="icon" name="settings"></syn-icon>
    <strong>Your settings have been updated</strong><br />
    Settings will take effect on next login.
  </syn-alert>

  <syn-alert variant="warning" duration="3000" closable="">
    <syn-icon slot="icon" name="warning"></syn-icon>
    <strong>Your session has ended</strong><br />
    Please login again to continue.
  </syn-alert>

  <syn-alert variant="danger" duration="3000" closable="">
    <syn-icon slot="icon" name="status-error" library="system"></syn-icon>
    <strong>Your account has been deleted</strong><br />
    We're very sorry to see you go!
  </syn-alert>
</div>

<script type="module">
  const container = document.querySelector(".alert-toast");

  ["primary", "success", "neutral", "warning", "danger"].map((variant) => {
    const button = container.querySelector(
      `syn-button[data-variant="${variant}"]`,
    );
    const alert = container.querySelector(`syn-alert[variant="${variant}"]`);

    button.addEventListener("click", () => alert.toast());
  });
</script>
```

---

## Creating Toasts Imperatively

For convenience, you can create a utility that emits toast notifications with a function call rather than composing them in your HTML. To do this, generate the alert with JavaScript, append it to the body, and call the toast() method as shown in the example below.

```html
<div class="alert-toast-wrapper">
  <syn-button>Create Toast</syn-button>
</div>

<script type="module">
  const container = document.querySelector(".alert-toast-wrapper");
  const button = container.querySelector("syn-button");
  let count = 0;

  // Always escape HTML for text arguments!
  function escapeHtml(html) {
    const div = document.createElement("div");
    div.textContent = html;
    return div.innerHTML;
  }

  // Custom function to emit toast notifications
  function notify(
    message,
    variant = "primary",
    icon = "info",
    duration = 3000,
  ) {
    const alert = Object.assign(document.createElement("syn-alert"), {
      variant,
      closable: true,
      duration: duration,
      innerHTML: `
        <syn-icon name="${icon}" slot="icon"></syn-icon>
        This alert will automatically hide itself after three seconds, unless you interact with it.
      `,
    });

    document.body.append(alert);
    return alert.toast();
  }

  button.addEventListener("click", () => {
    notify(`This is custom toast #${++count}`);
  });
</script>
```
