## Custom Filter

A custom filter can be applied by passing a filter function to the filter property. This filter() function will be called for each option. The first argument is an <syn-option> element and the second argument is the query string.

```html
<syn-combobox label="Custom Filter" class="filter-combobox">
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
<script type="module">
  const comboboxes = document.querySelectorAll(".filter-combobox");
  comboboxes.forEach((combobox) => {
    const oldFilter = combobox.filter;
    combobox.filter = (option, queryString) => {
      // only show options for more than 2 characters on text input
      if (queryString && queryString.length > 2) {
        return oldFilter(option, queryString);
      }
      return false;
    };
  });
</script>
```
