## Custom Form Field

Wrap the element around any other form field, that follows browser standards to use all features.

```html
<form id="components-syn-validate--custom-form-field-validate-demo-form">
  <h3 style="margin: 0; padding: 0">Choose SICK´s brand color</h3>
  <syn-validate class="validation-custom-form-field" on="live" variant="inline">
    <validate-demo-radio name="color" required=""></validate-demo-radio>
  </syn-validate>

  <p>
    <syn-button type="submit">Submit</syn-button>
  </p>
</form>
<script type="module">
  customElements.whenDefined("syn-validate").then(() => {
    const form = document.getElementById(
      "components-syn-validate--custom-form-field-validate-demo-form",
    );
    form.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  });
</script>
```
