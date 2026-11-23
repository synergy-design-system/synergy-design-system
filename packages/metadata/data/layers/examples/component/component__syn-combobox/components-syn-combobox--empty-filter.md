## Empty Filter

Set the filter property to none to always show every option, regardless of what the user has typed. This is useful when the full list itself carries meaning, e.g. a fixed set of statuses or categories, and hiding options could make users think an option no longer exists or worry they mistyped it.Without filtering, users lose the visual feedback that narrows the list to their input. To compensate, set the getOption property to highlight so the matching text is marked inside each option, letting users confirm their input is recognized without removing any options from view.

```html
<syn-combobox
  class="empty-filter-combobox"
  filter="none"
  getoption="highlight"
  label="Empty Filter"
  multiple=""
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
```
