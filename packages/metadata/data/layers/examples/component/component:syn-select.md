## Default

Selects allow you to choose items from a menu of predefined options.

```html
<syn-select max-options-visible="3">
  <syn-option value="Option_1">Option 1</syn-option>
  <syn-option value="Option_2">Option 2</syn-option>
  <syn-option value="Option_3">Option 3</syn-option>
</syn-select>
```

---

## Labels

Use the label attribute to give the select an accessible label. For labels that contain HTML, use the label slot instead.

```html
<syn-select label="Select one">
  <syn-option value="option-1">Option 1</syn-option>
  <syn-option value="option-2">Option 2</syn-option>
  <syn-option value="option-3">Option 3</syn-option>
</syn-select>
```

---

## Help Text

Add descriptive help text to a switch with the help-text attribute. For help texts that contain HTML, use the help-text slot instead.The help-text attribute should not be used to display error messages. To handle validation and error messaging, use syn-validate for proper error management.

```html
<syn-select label="Experience" help-text="Please tell us your skill level.">
  <syn-option value="1">Novice</syn-option>
  <syn-option value="2">Intermediate</syn-option>
  <syn-option value="3">Advanced</syn-option>
</syn-select>
```

---

## Placeholder

Use the placeholder attribute to add a placeholder.

```html
<syn-select placeholder="Select one">
  <syn-option value="option-1">Option 1</syn-option>
  <syn-option value="option-2">Option 2</syn-option>
  <syn-option value="option-3">Option 3</syn-option>
</syn-select>
```

---

## Clearable

Use the clearable attribute to make the control clearable. The clear button only appears when an option is selected.

```html
<syn-select clearable="" value="option-1">
  <syn-option value="option-1">Option 1</syn-option>
  <syn-option value="option-2">Option 2</syn-option>
  <syn-option value="option-3">Option 3</syn-option>
</syn-select>
```

---

## Focus

The focus event gives the user feedback that the Select has been focused by the keyboard interaction or active click from the user..

```html
<div style="padding: 5px">
  <syn-select label="Select one">
    <syn-option value="option-1">Option 1</syn-option>
    <syn-option value="option-2">Option 2</syn-option>
    <syn-option value="option-3">Option 3</syn-option>
  </syn-select>
</div>
```

---

## Disabled

Use the disabled attribute to disable a select.

```html
<syn-select placeholder="Disabled" disabled="">
  <syn-option value="option-1">Option 1</syn-option>
  <syn-option value="option-2">Option 2</syn-option>
  <syn-option value="option-3">Option 3</syn-option>
</syn-select>
```

---

## Readonly

Add the readonly attribute to a select to draw it in a readonly state.

```html
<div
  style="display: flex; flex-direction: column; gap: var(--syn-spacing-large)"
>
  <syn-select placeholder="Readonly" value="option-1" readonly="">
    <syn-icon name="wallpaper" slot="prefix"></syn-icon>
    <syn-option value="option-1">Option 1</syn-option>
    <syn-option value="option-2">Option 2</syn-option>
    <syn-option value="option-3">Option 3</syn-option>
  </syn-select>
  <syn-select
    max-options-visible="2"
    multiple=""
    placeholder="Readonly"
    value="option-1 option-2 option-3"
    readonly=""
  >
    <syn-option value="option-1">Option 1</syn-option>
    <syn-option value="option-2">Option 2</syn-option>
    <syn-option value="option-3">Option 3</syn-option>
  </syn-select>
</div>
```

---

## Multiple

To allow multiple options to be selected, use the multiple attribute. It’s a good practice to use clearable when this option is enabled. To set multiple values at once, set value to a space-delimited list of values.

```html
<syn-select
  label="Select a Few"
  value="Option_1 Option_2 Option_3"
  multiple=""
  clearable=""
>
  <syn-option value="Option_1">Option 1</syn-option>
  <syn-option value="Option_2">Option 2</syn-option>
  <syn-option value="Option_3">Option 3</syn-option>
  <syn-option value="Option_4">Option 4</syn-option>
  <syn-option value="Option_5">Option 5</syn-option>
  <syn-option value="Option_6">Option 6</syn-option>
</syn-select>
```

---

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

---

## Grouping Options

Use <syn-optgroup> to group listbox items visually.

```html
<syn-select placeholder="This is a value">
  <syn-optgroup label="Section 1">
    <syn-option value="1">Option</syn-option>
    <syn-option value="2">Option</syn-option>
  </syn-optgroup>
  <syn-optgroup label="Section 2">
    <syn-option value="3">Option</syn-option>
    <syn-option value="4">Option</syn-option>
  </syn-optgroup>
</syn-select>
```

---

## Sizes

Use the size attribute to change a select’s size. Note that size does not apply to listbox options.

```html
<syn-select placeholder="Small" size="small">
  <syn-option value="option-1">Option 1</syn-option>
  <syn-option value="option-2">Option 2</syn-option>
  <syn-option value="option-3">Option 3</syn-option>
</syn-select>

<br />

<syn-select placeholder="Medium" size="medium">
  <syn-option value="option-1">Option 1</syn-option>
  <syn-option value="option-2">Option 2</syn-option>
  <syn-option value="option-3">Option 3</syn-option>
</syn-select>

<br />

<syn-select placeholder="Large" size="large">
  <syn-option value="option-1">Option 1</syn-option>
  <syn-option value="option-2">Option 2</syn-option>
  <syn-option value="option-3">Option 3</syn-option>
</syn-select>
```

---

## Invalid

The invalid status is used to warn the user that the Select is invalid. For example, if the entry of text is mandatory and nothing has been entered.

```html
<form class="custom-validity">
  <syn-select label="Select one" required="">
    <syn-option value="option-1">Option 1</syn-option>
    <syn-option value="option-2">Option 2</syn-option>
    <syn-option value="option-3">Option 3</syn-option>
  </syn-select>
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

## Prefix Suffix Icons

Use the prefix and suffix slots to add text and icons.

```html
<syn-select placeholder="Small" size="small" clearable="">
  <syn-icon name="wallpaper" slot="prefix"></syn-icon>
  <syn-option value="option-1">Option 1</syn-option>
  <syn-option value="option-2">Option 2</syn-option>
  <syn-option value="option-3">Option 3</syn-option>
  <syn-icon name="wallpaper" slot="suffix"></syn-icon>
</syn-select>
<br />
<syn-select placeholder="Medium" size="medium" clearable="">
  <syn-icon name="wallpaper" slot="prefix"></syn-icon>
  <syn-option value="option-1">Option 1</syn-option>
  <syn-option value="option-2">Option 2</syn-option>
  <syn-option value="option-3">Option 3</syn-option>
  <syn-icon name="wallpaper" slot="suffix"></syn-icon>
</syn-select>
<br />
<syn-select placeholder="Large" size="large" clearable="">
  <syn-icon name="wallpaper" slot="prefix"></syn-icon>
  <syn-option value="option-1">Option 1</syn-option>
  <syn-option value="option-2">Option 2</syn-option>
  <syn-option value="option-3">Option 3</syn-option>
  <syn-icon name="wallpaper" slot="suffix"></syn-icon>
</syn-select>
```

---

## Custom Tags

When multiple options can be selected, you can provide custom tags by passing a function to the getTag property. Your function can return a string of HTML, a Lit Template, or an HTMLElement. The getTag() function will be called for each option. The first argument is an <syn-option> element and the second argument is the tag’s index (its position in the tag list).Remember that custom tags are rendered in a shadow root. To style them, you can use the style attribute in your template or you can add your own parts and target them with the ::part() selector.

```html
<syn-select
  clearable=""
  id="custom-tags-story"
  multiple=""
  placeholder="Select one"
  value="phone email"
>
  <syn-option value="email">
    <syn-icon slot="prefix" name="mail_outline"></syn-icon>
    Email
  </syn-option>
  <syn-option value="phone">
    <syn-icon slot="prefix" name="phone"></syn-icon>
    Phone
  </syn-option>
  <syn-option value="chat">
    <syn-icon slot="prefix" name="chat_bubble_outline"></syn-icon>
    Chat
  </syn-option>
</syn-select>

<script type="module">
  const select = document.querySelector("#custom-tags-story");

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
