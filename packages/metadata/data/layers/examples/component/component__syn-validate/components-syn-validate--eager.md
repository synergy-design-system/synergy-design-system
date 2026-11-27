## Eager

Use the eager attribute to validate the field when the component is mounted. This may be used to prefill validation messages, e.g. during page loads. Please be aware that when mixed with a variant of native, this will display the error of the last eager element in your <form> only!

```html
<form id="components-syn-validate--eager-validate-demo-form">
  <syn-validate eager="" variant="inline">
    <syn-input
      label="Eager validation (triggered on page load)"
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
      "components-syn-validate--eager-validate-demo-form",
    );
    form.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  });
</script>
```
