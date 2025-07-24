## Default

Selects allow you to choose items from a menu of predefined options.

```html
<syn-select
  max-options-visible="3"
  size="medium"
  placement="bottom"
  form=""
  data-optional=""
  data-valid=""
>
  <syn-option
    value="Option_1"
    role="option"
    aria-selected="false"
    aria-disabled="false"
    >Option 1</syn-option
  >
  <syn-option
    value="Option_2"
    role="option"
    aria-selected="false"
    aria-disabled="false"
    >Option 2</syn-option
  >
  <syn-option
    value="Option_3"
    role="option"
    aria-selected="false"
    aria-disabled="false"
    >Option 3</syn-option
  >
</syn-select>
```

---

## Labels

Use the label attribute to give the select an accessible label. For labels that contain HTML, use the label slot instead.

```html
<syn-select
  label="Select one"
  size="medium"
  placement="bottom"
  form=""
  data-optional=""
  data-valid=""
>
  <syn-option
    value="option-1"
    role="option"
    aria-selected="false"
    aria-disabled="false"
    >Option 1</syn-option
  >
  <syn-option
    value="option-2"
    role="option"
    aria-selected="false"
    aria-disabled="false"
    >Option 2</syn-option
  >
  <syn-option
    value="option-3"
    role="option"
    aria-selected="false"
    aria-disabled="false"
    >Option 3</syn-option
  >
</syn-select>
```

---

## Help Text

Add descriptive help text to a switch with the help-text attribute. For help texts that contain HTML, use the help-text slot instead.The help-text attribute should not be used to display error messages. To handle validation and error messaging, use syn-validate for proper error management.

```html
<syn-select
  label="Experience"
  help-text="Please tell us your skill level."
  size="medium"
  placement="bottom"
  form=""
  data-optional=""
  data-valid=""
>
  <syn-option
    value="1"
    role="option"
    aria-selected="false"
    aria-disabled="false"
    >Novice</syn-option
  >
  <syn-option
    value="2"
    role="option"
    aria-selected="false"
    aria-disabled="false"
    >Intermediate</syn-option
  >
  <syn-option
    value="3"
    role="option"
    aria-selected="false"
    aria-disabled="false"
    >Advanced</syn-option
  >
</syn-select>
```

---

## Placeholder

Use the placeholder attribute to add a placeholder.

```html
<syn-select
  placeholder="Select one"
  size="medium"
  placement="bottom"
  form=""
  data-optional=""
  data-valid=""
>
  <syn-option
    value="option-1"
    role="option"
    aria-selected="false"
    aria-disabled="false"
    >Option 1</syn-option
  >
  <syn-option
    value="option-2"
    role="option"
    aria-selected="false"
    aria-disabled="false"
    >Option 2</syn-option
  >
  <syn-option
    value="option-3"
    role="option"
    aria-selected="false"
    aria-disabled="false"
    >Option 3</syn-option
  >
</syn-select>
```

---

## Clearable

Use the clearable attribute to make the control clearable. The clear button only appears when an option is selected.

```html
<syn-select
  clearable=""
  value="option-1"
  size="medium"
  placement="bottom"
  form=""
  data-optional=""
  data-valid=""
>
  <syn-option
    value="option-1"
    role="option"
    aria-selected="true"
    aria-disabled="false"
    >Option 1</syn-option
  >
  <syn-option
    value="option-2"
    role="option"
    aria-selected="false"
    aria-disabled="false"
    >Option 2</syn-option
  >
  <syn-option
    value="option-3"
    role="option"
    aria-selected="false"
    aria-disabled="false"
    >Option 3</syn-option
  >
</syn-select>
```

---

## Focus

The focus event gives the user feedback that the Select has been focused by the keyboard interaction or active click from the user..

```html
<div style="padding: 5px">
  <syn-select
    label="Select one"
    size="medium"
    placement="bottom"
    form=""
    data-optional=""
    data-valid=""
  >
    <syn-option
      value="option-1"
      role="option"
      aria-selected="false"
      aria-disabled="false"
      >Option 1</syn-option
    >
    <syn-option
      value="option-2"
      role="option"
      aria-selected="false"
      aria-disabled="false"
      >Option 2</syn-option
    >
    <syn-option
      value="option-3"
      role="option"
      aria-selected="false"
      aria-disabled="false"
      >Option 3</syn-option
    >
  </syn-select>
</div>
```

---

## Disabled

Use the disabled attribute to disable a select.

```html
<syn-select
  placeholder="Disabled"
  disabled=""
  size="medium"
  placement="bottom"
  form=""
  data-optional=""
  data-valid=""
>
  <syn-option
    value="option-1"
    role="option"
    aria-selected="false"
    aria-disabled="false"
    >Option 1</syn-option
  >
  <syn-option
    value="option-2"
    role="option"
    aria-selected="false"
    aria-disabled="false"
    >Option 2</syn-option
  >
  <syn-option
    value="option-3"
    role="option"
    aria-selected="false"
    aria-disabled="false"
    >Option 3</syn-option
  >
</syn-select>
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
  size="medium"
  placement="bottom"
  form=""
  data-optional=""
  data-valid=""
>
  <syn-option
    value="Option_1"
    role="option"
    aria-selected="true"
    aria-disabled="false"
    >Option 1</syn-option
  >
  <syn-option
    value="Option_2"
    role="option"
    aria-selected="true"
    aria-disabled="false"
    >Option 2</syn-option
  >
  <syn-option
    value="Option_3"
    role="option"
    aria-selected="true"
    aria-disabled="false"
    >Option 3</syn-option
  >
  <syn-option
    value="Option_4"
    role="option"
    aria-selected="false"
    aria-disabled="false"
    >Option 4</syn-option
  >
  <syn-option
    value="Option_5"
    role="option"
    aria-selected="false"
    aria-disabled="false"
    >Option 5</syn-option
  >
  <syn-option
    value="Option_6"
    role="option"
    aria-selected="false"
    aria-disabled="false"
    >Option 6</syn-option
  >
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
  size="medium"
  placement="bottom"
  form=""
  data-optional=""
  data-valid=""
>
  <syn-option
    value="option-1"
    role="option"
    aria-selected="true"
    aria-disabled="false"
    >Option</syn-option
  >
  <syn-option
    value="option-2"
    role="option"
    aria-selected="true"
    aria-disabled="false"
    >Option 1</syn-option
  >
  <syn-option
    value="option-3"
    role="option"
    aria-selected="true"
    aria-disabled="false"
    >Option 2</syn-option
  >
  <syn-option
    value="option-4"
    role="option"
    aria-selected="true"
    aria-disabled="false"
    >Option 3</syn-option
  >
</syn-select>
```

---

## Grouping Options

Use <syn-optgroup> to group listbox items visually.

```html
<syn-select
  placeholder="This is a value"
  size="medium"
  placement="bottom"
  form=""
  data-optional=""
  data-valid=""
>
  <syn-optgroup label="Section 1">
    <syn-option
      value="1"
      role="option"
      aria-selected="false"
      aria-disabled="false"
      >Option</syn-option
    >
    <syn-option
      value="2"
      role="option"
      aria-selected="false"
      aria-disabled="false"
      >Option</syn-option
    >
  </syn-optgroup>
  <syn-optgroup label="Section 2">
    <syn-option
      value="3"
      role="option"
      aria-selected="false"
      aria-disabled="false"
      >Option</syn-option
    >
    <syn-option
      value="4"
      role="option"
      aria-selected="false"
      aria-disabled="false"
      >Option</syn-option
    >
  </syn-optgroup>
</syn-select>
```

---

## Sizes

Use the size attribute to change a select’s size. Note that size does not apply to listbox options.

```html
<syn-select
  placeholder="Small"
  size="small"
  placement="bottom"
  form=""
  data-optional=""
  data-valid=""
>
  <syn-option
    value="option-1"
    role="option"
    aria-selected="false"
    aria-disabled="false"
    >Option 1</syn-option
  >
  <syn-option
    value="option-2"
    role="option"
    aria-selected="false"
    aria-disabled="false"
    >Option 2</syn-option
  >
  <syn-option
    value="option-3"
    role="option"
    aria-selected="false"
    aria-disabled="false"
    >Option 3</syn-option
  >
</syn-select>

<br />

<syn-select
  placeholder="Medium"
  size="medium"
  placement="bottom"
  form=""
  data-optional=""
  data-valid=""
>
  <syn-option
    value="option-1"
    role="option"
    aria-selected="false"
    aria-disabled="false"
    >Option 1</syn-option
  >
  <syn-option
    value="option-2"
    role="option"
    aria-selected="false"
    aria-disabled="false"
    >Option 2</syn-option
  >
  <syn-option
    value="option-3"
    role="option"
    aria-selected="false"
    aria-disabled="false"
    >Option 3</syn-option
  >
</syn-select>

<br />

<syn-select
  placeholder="Large"
  size="large"
  placement="bottom"
  form=""
  data-optional=""
  data-valid=""
>
  <syn-option
    value="option-1"
    role="option"
    aria-selected="false"
    aria-disabled="false"
    >Option 1</syn-option
  >
  <syn-option
    value="option-2"
    role="option"
    aria-selected="false"
    aria-disabled="false"
    >Option 2</syn-option
  >
  <syn-option
    value="option-3"
    role="option"
    aria-selected="false"
    aria-disabled="false"
    >Option 3</syn-option
  >
</syn-select>
```

---

## Invalid

The invalid status is used to warn the user that the Select is invalid. For example, if the entry of text is mandatory and nothing has been entered.

```html
<form class="custom-validity">
  <syn-select
    label="Select one"
    required=""
    size="medium"
    placement="bottom"
    form=""
    data-required=""
    data-invalid=""
  >
    <syn-option
      value="option-1"
      role="option"
      aria-selected="false"
      aria-disabled="false"
      >Option 1</syn-option
    >
    <syn-option
      value="option-2"
      role="option"
      aria-selected="false"
      aria-disabled="false"
      >Option 2</syn-option
    >
    <syn-option
      value="option-3"
      role="option"
      aria-selected="false"
      aria-disabled="false"
      >Option 3</syn-option
    >
  </syn-select>
  <syn-button
    type="submit"
    variant="filled"
    title=""
    size="medium"
    data-optional=""
    data-valid=""
    >Submit</syn-button
  >
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
<syn-select
  placeholder="Small"
  size="small"
  clearable=""
  placement="bottom"
  form=""
  data-optional=""
  data-valid=""
>
  <syn-icon
    name="wallpaper"
    slot="prefix"
    aria-hidden="true"
    library="default"
  ></syn-icon>
  <syn-option
    value="option-1"
    role="option"
    aria-selected="false"
    aria-disabled="false"
    >Option 1</syn-option
  >
  <syn-option
    value="option-2"
    role="option"
    aria-selected="false"
    aria-disabled="false"
    >Option 2</syn-option
  >
  <syn-option
    value="option-3"
    role="option"
    aria-selected="false"
    aria-disabled="false"
    >Option 3</syn-option
  >
  <syn-icon
    name="wallpaper"
    slot="suffix"
    aria-hidden="true"
    library="default"
  ></syn-icon>
</syn-select>
<br />
<syn-select
  placeholder="Medium"
  size="medium"
  clearable=""
  placement="bottom"
  form=""
  data-optional=""
  data-valid=""
>
  <syn-icon
    name="wallpaper"
    slot="prefix"
    aria-hidden="true"
    library="default"
  ></syn-icon>
  <syn-option
    value="option-1"
    role="option"
    aria-selected="false"
    aria-disabled="false"
    >Option 1</syn-option
  >
  <syn-option
    value="option-2"
    role="option"
    aria-selected="false"
    aria-disabled="false"
    >Option 2</syn-option
  >
  <syn-option
    value="option-3"
    role="option"
    aria-selected="false"
    aria-disabled="false"
    >Option 3</syn-option
  >
  <syn-icon
    name="wallpaper"
    slot="suffix"
    aria-hidden="true"
    library="default"
  ></syn-icon>
</syn-select>
<br />
<syn-select
  placeholder="Large"
  size="large"
  clearable=""
  placement="bottom"
  form=""
  data-optional=""
  data-valid=""
>
  <syn-icon
    name="wallpaper"
    slot="prefix"
    aria-hidden="true"
    library="default"
  ></syn-icon>
  <syn-option
    value="option-1"
    role="option"
    aria-selected="false"
    aria-disabled="false"
    >Option 1</syn-option
  >
  <syn-option
    value="option-2"
    role="option"
    aria-selected="false"
    aria-disabled="false"
    >Option 2</syn-option
  >
  <syn-option
    value="option-3"
    role="option"
    aria-selected="false"
    aria-disabled="false"
    >Option 3</syn-option
  >
  <syn-icon
    name="wallpaper"
    slot="suffix"
    aria-hidden="true"
    library="default"
  ></syn-icon>
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
  size="medium"
  placement="bottom"
  form=""
  data-optional=""
  data-valid=""
>
  <syn-option
    value="email"
    role="option"
    aria-selected="true"
    aria-disabled="false"
  >
    <syn-icon
      slot="prefix"
      name="mail_outline"
      aria-hidden="true"
      library="default"
    ></syn-icon>
    Email
  </syn-option>
  <syn-option
    value="phone"
    role="option"
    aria-selected="true"
    aria-disabled="false"
  >
    <syn-icon
      slot="prefix"
      name="phone"
      aria-hidden="true"
      library="default"
    ></syn-icon>
    Phone
  </syn-option>
  <syn-option
    value="chat"
    role="option"
    aria-selected="false"
    aria-disabled="false"
  >
    <syn-icon
      slot="prefix"
      name="chat_bubble_outline"
      aria-hidden="true"
      library="default"
    ></syn-icon>
    Chat
  </syn-option>
</syn-select>
```
