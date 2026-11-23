## Live

Use the live value for the on attribute to validate on every input change (e. g. typing a character or checking a checkbox.) instead of form submit. This will automatically bind to the input and blur events.👨‍💻 Additional developer Information:Please ensure, that you really need live validation for your use case as this can have implications on accessibility.

```html
<form id="components-syn-validate--live-validate-demo-form">
  <syn-validate class="validation-live" variant="inline" on="live">
    <syn-input
      label="Invalid input"
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
      "components-syn-validate--live-validate-demo-form",
    );
    form.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  });
</script>
```
