## Default

The combobox suggests items based on the user input.

```html
<syn-combobox max-options-visible="3">
  <syn-option>Option 1</syn-option>
  <syn-option>Option 2</syn-option>
  <syn-option>Option 3</syn-option>
</syn-combobox>
```

---

## Labels

Use the label attribute to give the combobox an accessible label. For labels that contain HTML, use the label slot instead.

```html
<syn-combobox label="State">
  <syn-option>Option 1</syn-option>
  <syn-option>Option 2</syn-option>
  <syn-option>Option 3</syn-option>
</syn-combobox>
```

---

## Help Text

Add descriptive help text to a switch with the help-text attribute. For help texts that contain HTML, use the help-text slot instead.The help-text attribute should not be used to display error messages. To handle validation and error messaging, use syn-validate for proper error management.

```html
<syn-combobox label="State" help-text="Select a State">
  <syn-option>Option 1</syn-option>
  <syn-option>Option 2</syn-option>
  <syn-option>Option 3</syn-option>
</syn-combobox>
```

---

## Placeholder

Use the placeholder attribute to add a placeholder.

```html
<syn-combobox
  label="State"
  help-text="Select a State"
  placeholder="Select a State"
>
  <syn-option>Option 1</syn-option>
  <syn-option>Option 2</syn-option>
  <syn-option>Option 3</syn-option>
</syn-combobox>
```

---

## Focus

The focus attribute provides feedback to the users, informing them that the combobox component is ready for use.

```html
<div style="padding: 5px">
  <syn-combobox>
    <syn-option>Option 1</syn-option>
    <syn-option>Option 2</syn-option>
    <syn-option>Option 3</syn-option>
  </syn-combobox>
</div>
```

---

## Clearable

Add the clearable attribute to add a clear button when the combobox has content.

```html
<syn-combobox value="Green" clearable="">
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

---

## Disabled

Use the disabled attribute to disable a combobox.

```html
<syn-combobox disabled="" placeholder="Disabled">
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

---

## Readonly

Add the readonly attribute to draw a read-only combobox.

```html
<div
  style="display: flex; flex-direction: column; gap: var(--syn-spacing-large)"
>
  <syn-combobox placeholder="Readonly" value="option-1" readonly="">
    <syn-icon name="wallpaper" slot="prefix"></syn-icon>
    <syn-option value="option-1">Option 1</syn-option>
    <syn-option value="option-2">Option 2</syn-option>
    <syn-option value="option-3">Option 3</syn-option>
  </syn-combobox>
  <syn-combobox
    max-options-visible="2"
    multiple=""
    placeholder="Readonly"
    value="option-1 option-2 option-3"
    readonly=""
  >
    <syn-option value="option-1">Option 1</syn-option>
    <syn-option value="option-2">Option 2</syn-option>
    <syn-option value="option-3">Option 3</syn-option>
  </syn-combobox>
</div>
```

---

## Multiple

To allow multiple options to be selected, use the multiple attribute. It’s a good practice to use clearable when this option is enabled. To set multiple values at once, set value to a space-delimited list of values. Use the max-options-visible attribute to define the maximum number of selected options that will be visible. After the maximum, "+n" will be shown to indicate the number of additional items that are selected.

```html
<syn-combobox
  value="option-1 option-2 option-3"
  multiple=""
  clearable=""
  max-options-visible="2"
>
  <syn-option value="option-1">Option 1</syn-option>
  <syn-option value="option-2">Option 2</syn-option>
  <syn-option value="option-3">Option 3</syn-option>
  <syn-option value="option-4">Option 4</syn-option>
  <syn-option value="option-5">Option 5</syn-option>
  <syn-option value="option-6">Option 6</syn-option>
</syn-combobox>
```

---

## Setting Initial Value

Use the value attribute to set the initial selection.When using multiple, the value attribute uses space-delimited values to select more than one option. Because of this, <syn-option> values cannot contain spaces. If you’re accessing the value property through Javascript, it will be an array.

```html
<syn-combobox
  value="option-1 option-2 option-3"
  multiple=""
  clearable=""
  max-options-visible="2"
>
  <syn-option value="option-1">Option 1</syn-option>
  <syn-option value="option-2">Option 2</syn-option>
  <syn-option value="option-3">Option 3</syn-option>
  <syn-option value="option-4">Option 4</syn-option>
  <syn-option value="option-5">Option 5</syn-option>
  <syn-option value="option-6">Option 6</syn-option>
</syn-combobox>
```

---

## Restricted

This restricts the combobox to only allow selections from the available options. Users cannot enter custom values that are not in the list.

```html
<syn-combobox value="Option 1" restricted="">
  <syn-option value="option-1">Option 1</syn-option>
  <syn-option value="option-2">Option 2</syn-option>
  <syn-option value="option-3">Option 3</syn-option>
</syn-combobox>
```

---

## No Results Found

A “No results found” message is displayed, when the search term doesn’t match the options.

```html
<syn-combobox id="no-results" value="Search term" open="" restricted="">
  <syn-option>Option 1</syn-option>
  <syn-option>Option 2</syn-option>
  <syn-option>Option 3</syn-option>
</syn-combobox>
```

---

## Sizes

Use the size attribute to change a combobox size.

```html
<syn-combobox size="small" placeholder="Small">
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

<br />

<syn-combobox size="medium" placeholder="Medium">
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

<br />

<syn-combobox size="large" placeholder="Large">
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

---

## Invalid

The invalid status is used to warn the user that the combobox is invalid. For example, if the entry is mandatory.

```html
<form class="custom-validity">
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
  .custom-validity {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  syn-button {
    align-self: flex-start;
  }
</style>
```

---

## Prefix Suffix Text And Icons

Use the prefix and suffix slots to add text and icons.

```html
<syn-combobox placeholder="Small" size="small" clearable="">
  <span slot="prefix">prefix</span>
  <span slot="suffix">suffix</span>
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
<br />
<syn-combobox placeholder="Medium" size="medium" clearable="">
  <span slot="prefix">prefix</span>
  <span slot="suffix">suffix</span>
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
<br />
<syn-combobox placeholder="Large" size="large" clearable="">
  <span slot="prefix">prefix</span>
  <span slot="suffix">suffix</span>
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

<br />

<syn-combobox placeholder="Small" size="small" clearable="">
  <syn-icon name="wallpaper" slot="prefix"></syn-icon>
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
  <syn-icon name="wallpaper" slot="suffix"></syn-icon>
</syn-combobox>
<br />
<syn-combobox placeholder="Medium" size="medium" clearable="">
  <syn-icon name="wallpaper" slot="prefix"></syn-icon>
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
  <syn-icon name="wallpaper" slot="suffix"></syn-icon>
</syn-combobox>
<br />
<syn-combobox placeholder="Large" size="large" clearable="">
  <syn-icon name="wallpaper" slot="prefix"></syn-icon>
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
  <syn-icon name="wallpaper" slot="suffix"></syn-icon>
</syn-combobox>
```

---

## Simple Suggests

A simple suggestions list shows the user a filtered list.

```html
<syn-combobox label="Preferred Color" value="g">
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

---

## Highlight Query

The filtered options shown in the list can be customized by passing a function to the getOption property. Your function can return a string of HTML, a Lit Template, or an HTMLElement. The getOption() function will be called for each option. The first argument is an <syn-option> element and the second argument is the query string.Remember that the options are rendered in a shadow root. To style them, you can use the style attribute in your template or you can add your own parts and target them with the ::part() selector. Note: Be sure you trust the content you are outputting! Passing unsanitized user input to getOption() can result in XSS vulnerabilities.

```html
<syn-combobox label="Preferred color" class="highlight-combobox" value="g">
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
  // the highlight option renderer utility function can be imported via:
  // import { highlightOptionRenderer } from '@synergy-design-system/components';

  // preview-ignore:start
  const highlightOptionRenderer = (t, e) => {
    if (!e) return t;
    const o = t.cloneNode(!0),
      s = o.getTextLabel();
    o.selected = t.selected;
    const n = s.toLowerCase().indexOf(e.toLowerCase()),
      l = o.innerHTML.indexOf(s),
      h = document.createElement("mark");
    ((h.textContent = s.slice(n, n + e.length)),
      h.classList.add("syn-highlight-style"));
    const c = s.replace(new RegExp(e, "i"), h.outerHTML),
      f = o.innerHTML.slice(0, l),
      T = o.innerHTML.slice(l + s.length);
    return ((o.innerHTML = f.concat(c, T)), o);
  };
  // preview-ignore:end

  const comboboxes = document.querySelectorAll(".highlight-combobox");
  comboboxes.forEach((combobox) => {
    combobox.getOption = highlightOptionRenderer;
  });
</script>
```

---

## Grouping Query

Use <syn-optgroup> to group <syn-option>`s visually.

```html
<syn-combobox label="Group elements" value="g">
  <syn-optgroup label="B">
    <syn-option value="Black">Black</syn-option>
    <syn-option value="Blue">Blue</syn-option>
    <syn-option value="Brown">Brown</syn-option>
  </syn-optgroup>
  <syn-optgroup label="G">
    <syn-option value="Green">Green</syn-option>
    <syn-option value="Grey">Grey</syn-option>
  </syn-optgroup>
  <syn-optgroup label="L">
    <syn-option value="Light_Green">Light Green</syn-option>
  </syn-optgroup>
  <syn-optgroup label="M">
    <syn-option value="Magenta">Magenta</syn-option>
  </syn-optgroup>
  <syn-optgroup label="O">
    <syn-option value="Orange">Orange</syn-option>
  </syn-optgroup>
  <syn-optgroup label="W">
    <syn-option value="White">White</syn-option>
  </syn-optgroup>
  <syn-optgroup label="P">
    <syn-option value="Pink">Pink</syn-option>
    <syn-option value="Purple">Purple</syn-option>
  </syn-optgroup>
  <syn-optgroup label="R">
    <syn-option value="Red">Red</syn-option>
  </syn-optgroup>
  <syn-optgroup label="W">
    <syn-option value="White">White</syn-option>
  </syn-optgroup>
  <syn-optgroup label="Y">
    <syn-option value="Yellow">Yellow</syn-option>
  </syn-optgroup>
</syn-combobox>
```

---

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

---

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
