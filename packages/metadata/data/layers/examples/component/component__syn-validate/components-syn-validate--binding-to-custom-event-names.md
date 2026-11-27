## Binding To Custom Event Names

Use the on attribute to listen for one or many custom events. This may be useful if you want to validate on keypress or custom events that may be fired by third party web-components.👨‍💻 Additional developer Information:You can provide one or multiple events in the on property. Please use a whitespace separated list of DOM event names. <syn-validate> will make sure to automatically use Synergies custom events. This means <syn-validate on="change click"> will bind to the syn-change and click events for a <syn-input> or change and click events for a regular <input> element.

```html
<form
  id="components-syn-validate--binding-to-custom-event-names-validate-demo-form"
>
  <syn-validate
    class="validation-custom-validation"
    on="mouseover blur"
    variant="inline"
  >
    <syn-input
      label="Custom validation (triggered on hover and blur)"
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
      "components-syn-validate--binding-to-custom-event-names-validate-demo-form",
    );
    form.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  });
</script>
```
