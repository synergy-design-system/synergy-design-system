## Custom Validation Message

Use the custom-validation-message attribute to use whichever error you need as text, overriding the default browser errors.👨‍💻 Additional developer Information:By using the custom-validation-message attribute, you can override the default browser error messages with custom text. However, please note that applying this attribute disables the browser’s native validation functionality. This means the standard error messages will not be displayed until the custom-validation attribute is removed, at which point the native functionality will be restored.

```html
<form
  id="components-syn-validate--custom-validation-message-validate-demo-form"
>
  <syn-validate
    class="validation-custom-validation"
    custom-validation-message='Include an "@" in the email address, otherwise you will never get our marvelous newsletter'
    variant="inline"
  >
    <syn-input
      label="Custom validation"
      type="email"
      value="team(at)synergy.com"
    ></syn-input>
  </syn-validate>

  <p>
    <syn-button type="submit">Submit</syn-button>
  </p>
</form>
<script type="module">
  customElements.whenDefined("syn-validate").then(() => {
    const form = document.getElementById(
      "components-syn-validate--custom-validation-message-validate-demo-form",
    );
    form.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  });
</script>
```
