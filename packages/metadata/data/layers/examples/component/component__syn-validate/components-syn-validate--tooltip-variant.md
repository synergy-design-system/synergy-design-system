## Tooltip Variant

When the tooltip variant is chosen, validation errors are displayed in a <syn-tooltip> component that has its center at the invalid element. The native tooltip is suppressed.

```html
<form id="components-syn-validate--tooltip-variant-validate-demo-form">
  <syn-validate class="validation-tooltip" variant="tooltip" on="live">
    <syn-input
      label="Invalid input"
      type="email"
      value="team(at)synergy.com"
      required=""
    ></syn-input>
  </syn-validate>
  <p>
    <syn-button type="submit">Submit</syn-button>
  </p>
</form>
<script type="module">
  customElements.whenDefined("syn-validate").then(() => {
    const form = document.getElementById(
      "components-syn-validate--tooltip-variant-validate-demo-form",
    );
    form.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  });
</script>
```
