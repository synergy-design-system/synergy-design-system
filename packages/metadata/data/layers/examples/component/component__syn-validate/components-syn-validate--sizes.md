## Sizes

In development use the size attribute of the form element e.g. syn-input to set the size of the inline syn-validate automatically.

```html
<form id="components-syn-validate--sizes-validate-demo-form">
  <div
    style="display: flex; flex-direction: column; gap: var(--syn-spacing-large)"
  >
    <syn-validate eager="" variant="inline">
      <syn-input
        type="email"
        value="team(at)synergy.com"
        label="Size small"
        size="small"
      ></syn-input>
    </syn-validate>

    <syn-validate eager="" variant="inline">
      <syn-input
        type="email"
        value="team(at)synergy.com"
        label="Size medium"
        size="medium"
      ></syn-input>
    </syn-validate>

    <syn-validate eager="" variant="inline">
      <syn-input
        type="email"
        value="team(at)synergy.com"
        label="Size large"
        size="large"
      ></syn-input>
    </syn-validate>
  </div>

  <p>
    <syn-button type="submit">Submit</syn-button>
  </p>
</form>
<script type="module">
  customElements.whenDefined("syn-validate").then(() => {
    const form = document.getElementById(
      "components-syn-validate--sizes-validate-demo-form",
    );
    form.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  });
</script>
```
