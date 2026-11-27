## Setting Initial Values

Use the value attribute to set the initial selection.When using multiple, the value attribute uses space-delimited values to select more than one option. Because of this, <syn-option> values cannot contain spaces. If you’re accessing the value property through Javascript, it will be an array.

```html
<syn-select
  value="option-1 option-2 option-3 option-4"
  multiple=""
  clearable=""
  class="custom-tag"
>
  <syn-option value="option-1">Option</syn-option>
  <syn-option value="option-2">Option 1</syn-option>
  <syn-option value="option-3">Option 2</syn-option>
  <syn-option value="option-4">Option 3</syn-option>
</syn-select>
<script type="module">
  const select = document.querySelector(".custom-tag");

  select.getTag = (option, index) => {
    // Use the same icon used in the <syn-option>
    const optionElement = option.querySelector('syn-icon[slot="prefix"]');

    if (!optionElement) {
      return `
      <syn-tag removable>
      ${option.getTextLabel()}
      </syn-tag>
      `;
    }

    const { name } = optionElement;

    // You can return a string, a Lit Template, or an HTMLElement here
    return `
      <syn-tag removable>
        <syn-icon name="${name}"></syn-icon>
        ${option.getTextLabel()}
      </syn-tag>
    `;
  };
</script>
```
