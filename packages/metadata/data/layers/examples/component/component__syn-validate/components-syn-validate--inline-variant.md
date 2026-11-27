## Inline Variant

Set the variant attribute to inline to show the invalid message below the selected element.👨‍💻 Additional developer Information:Per default, syn-validate uses the browser’s built-in validation. This shows only one error at a time and is optimized for accessbility.When using the inline variant, you have to ensure accessibility on your side and have to have in mind it most likely will lead to layout shifts.

```html
<form id="components-syn-validate--inline-variant-validate-demo-form">
  <syn-validate class="validation-inline" variant="inline">
    <syn-input
      label="Inline validation"
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
      "components-syn-validate--inline-variant-validate-demo-form",
    );
    form.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  });
</script>
```
