## Suggestion Container Height

The height of the filtered options list can be customized by setting the max-height on the listbox part of the combobox.

```html
<syn-combobox id="max-height" label="Preferred color" value="g">
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
<style>
  #max-height::part(listbox) {
    /* if there is not enough space for the desired height, use the available calculated height */
    max-height: min(var(--auto-size-available-height), 112px);
  }
</style>
```
