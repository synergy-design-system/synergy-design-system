## Prefix Suffix Text

Add any element to the start and end of range items using the prefix and suffix slots.

```html
<syn-range
  help-text="Controls the volume of the current song"
  label="Volume"
  max="100"
  min="0"
  value="50"
>
  <span slot="prefix">0</span>
  <span slot="suffix">100</span>
</syn-range>

<br />
<p>This can be used to add input fields or icons.</p>
<br />

<syn-range
  label="Estimated Time"
  class="suffix-input-field"
  min="0"
  max="60"
  value="30"
>
  <span slot="prefix">0</span>
  <span slot="suffix">
    <div class="suffix-input">
      60
      <syn-input value="30" type="number" no-spin-buttons="" min="0" max="60">
        <span slot="suffix">sec</span>
      </syn-input>
    </div>
  </span>
</syn-range>

<style>
  .suffix-input {
    align-items: center;
    display: flex;
    gap: var(--syn-spacing-medium);

    syn-input {
      max-width: 6.5rem;
    }
  }
</style>
<script>
  [...document.querySelectorAll(".suffix-input-field")].forEach((range) => {
    const input = range.querySelector("syn-input");

    range.addEventListener("syn-input", (e) => {
      const { target } = e;
      if (target.tagName !== "SYN-RANGE") return;
      target.querySelector("syn-input").value = target.value;
      range.setCustomValidity("");
    });

    input.addEventListener("syn-input", (e) => {
      const { target } = e;
      target.closest("syn-range").value = target.value;

      const inputValidationMessage = target.validationMessage;

      if (inputValidationMessage) {
        range.setCustomValidity(inputValidationMessage);
      } else {
        range.setCustomValidity("");
      }
    });

    input.addEventListener("syn-change", (e) => {
      const { target } = e;
      if (!target.checkValidity()) {
        range.reportValidity();
      }
    });
  });
</script>
```
