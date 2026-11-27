## Invalid

The invalid status is used to warn the user that the combobox is invalid. For example, if the entry is mandatory.

```html
<form
  onsubmit="
    event.preventDefault();
    event.stopPropagation();
  "
  id="components-syn-combobox--invalid"
>
  <syn-combobox
    required=""
    placeholder="Type something"
    help-text="This is required"
  >
    <syn-option value="Black">Black</syn-option>
    <syn-option value="Blue">Blue</syn-option>
    <syn-option value="Brown">Brown</syn-option>
    <syn-option value="Green">Green</syn-option>
    <syn-option value="Grey">Grey</syn-option>
    <syn-option value="Light_Green">Light Green</syn-option>
    <syn-option value="Magenta">Magenta</syn-option>
    <syn-option value="Orange">Orange</syn-option>
    <syn-option value="Pink">Pink</syn-option>
    <syn-option value="Purple">Purple</syn-option>
    <syn-option value="Red">Red</syn-option>
    <syn-option value="White">White</syn-option>
    <syn-option value="Yellow">Yellow</syn-option>
  </syn-combobox>

  <syn-button type="submit" variant="filled">Submit</syn-button>
</form>
<style>
  #components-syn-combobox--invalid {
    display: flex;
    flex-direction: column;
    gap: var(--syn-spacing-large);
  }
  syn-button {
    align-self: flex-start;
  }
</style>
```
