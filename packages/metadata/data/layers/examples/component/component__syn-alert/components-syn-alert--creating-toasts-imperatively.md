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
