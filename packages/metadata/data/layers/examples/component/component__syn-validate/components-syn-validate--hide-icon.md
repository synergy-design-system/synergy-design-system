## Hide Icon

Use hide-icon to hide the icon in inline style. This is especially useful when showing more than one error at a time.

```html
<form id="components-syn-validate--hide-icon-validate-demo-form">
  <syn-validate class="validation-hide-icon" hide-icon="" variant="inline">
    <syn-input
      label="Hide icon"
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
      "components-syn-validate--hide-icon-validate-demo-form",
    );
    form.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  });
</script>
```
