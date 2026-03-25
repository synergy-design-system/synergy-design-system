## Default

Radios buttons allow the user to select a single option from a group using a button-like control.Radio buttons are designed to be used with radio groups. When a radio button has focus, the arrow keys can be used to change the selected option just like standard radio controls.

```html
<syn-radio-group
  label="Select an option"
  name="a"
  value="1"
  size="medium"
  form=""
>
  <syn-radio-button value="1" role="presentation" size="medium" checked="">
    Option 1
  </syn-radio-button>

  <syn-radio-button value="2" role="presentation" size="medium"
    >Option 2</syn-radio-button
  >
  <syn-radio-button value="3" role="presentation" size="medium"
    >Option 3</syn-radio-button
  >
</syn-radio-group>
```

---

## Checked

To set the initial value and checked state, use the value attribute on the containing radio group.

```html
<syn-radio-group
  label="Select an option"
  name="b"
  value="1"
  size="medium"
  form=""
>
  <syn-radio-button value="1" role="presentation" size="medium" checked=""
    >Option 1</syn-radio-button
  >
  <syn-radio-button value="2" role="presentation" size="medium"
    >Option 2</syn-radio-button
  >
  <syn-radio-button value="3" role="presentation" size="medium"
    >Option 3</syn-radio-button
  >
</syn-radio-group>
```

---

## Disabled

Use the disabled attribute to disable a radio button.

```html
<syn-radio-group
  label="Select an option"
  name="b"
  value="1"
  size="medium"
  form=""
>
  <syn-radio-button value="1" role="presentation" size="medium" checked=""
    >Option 1</syn-radio-button
  >
  <syn-radio-button value="2" disabled="" role="presentation" size="medium"
    >Option 2</syn-radio-button
  >
  <syn-radio-button value="3" role="presentation" size="medium"
    >Option 3</syn-radio-button
  >
</syn-radio-group>
```

---

## Readonly

Add the read-only attribute to render a readonly radio button. Please note that you need to enable the readonly state for each individual radio button.

```html
<div
  style="display: flex; flex-direction: column; gap: var(--syn-spacing-medium)"
>
  <syn-radio-group
    label="Select an option"
    name="b"
    value="1"
    size="medium"
    form=""
  >
    <syn-radio-button
      value="1"
      readonly=""
      role="presentation"
      size="medium"
      checked=""
      >Option 1</syn-radio-button
    >
    <syn-radio-button value="2" readonly="" role="presentation" size="medium"
      >Option 2</syn-radio-button
    >
    <syn-radio-button value="3" readonly="" role="presentation" size="medium"
      >Option 3</syn-radio-button
    >
  </syn-radio-group>
  <syn-radio-group
    label="Select an option"
    name="b"
    value="1"
    size="medium"
    form=""
  >
    <syn-radio-button
      value="1"
      readonly=""
      role="presentation"
      size="medium"
      checked=""
      >Option 1</syn-radio-button
    >
    <syn-radio-button value="2" role="presentation" size="medium"
      >Option 2</syn-radio-button
    >
    <syn-radio-button value="3" role="presentation" size="medium"
      >Option 3</syn-radio-button
    >
  </syn-radio-group>
</div>
```

---

## Invalid

The invalid status is used to warn the user that the Radio Group is invalid. For example, if the radio-button is mandatory and nothing has been checked.

```html
<form
  onsubmit="
    event.preventDefault();
    event.stopPropagation();
  "
  id="components-syn-radio-button--invalid"
>
  <syn-radio-group
    label="Select an option"
    name="a"
    help-text="This is required"
    required=""
    value=""
    size="medium"
    form=""
  >
    <syn-radio-button value="1" role="presentation" size="medium"
      >Option 1</syn-radio-button
    >
    <syn-radio-button value="2" role="presentation" size="medium"
      >Option 2</syn-radio-button
    >
    <syn-radio-button value="3" role="presentation" size="medium"
      >Option 3</syn-radio-button
    >
  </syn-radio-group>

  <syn-button type="submit" variant="filled" title="" size="medium"
    >Submit</syn-button
  >
</form>
<style>
  #components-syn-radio-button--invalid {
    display: flex;
    flex-direction: column;
    gap: var(--syn-spacing-large);
  }
  syn-button {
    align-self: flex-start;
  }
</style>
```

---

## Sizes

Use the size attribute to change a radio button’s size.

```html
<div
  style="display: flex; flex-direction: column; gap: var(--syn-spacing-medium)"
>
  <syn-radio-group
    label="Select an option"
    name="size"
    value="1"
    size="small"
    form=""
  >
    <syn-radio-button value="1" role="presentation" size="small" checked=""
      >Option 1</syn-radio-button
    >
    <syn-radio-button value="2" role="presentation" size="small"
      >Option 2</syn-radio-button
    >
    <syn-radio-button value="3" role="presentation" size="small"
      >Option 3</syn-radio-button
    >
  </syn-radio-group>

  <syn-radio-group
    label="Select an option"
    name="size"
    value="1"
    size="medium"
    form=""
  >
    <syn-radio-button value="1" role="presentation" size="medium" checked=""
      >Option 1</syn-radio-button
    >
    <syn-radio-button value="2" role="presentation" size="medium"
      >Option 2</syn-radio-button
    >
    <syn-radio-button value="3" role="presentation" size="medium"
      >Option 3</syn-radio-button
    >
  </syn-radio-group>

  <syn-radio-group
    label="Select an option"
    name="size"
    value="1"
    size="large"
    form=""
  >
    <syn-radio-button value="1" role="presentation" size="large" checked=""
      >Option 1</syn-radio-button
    >
    <syn-radio-button value="2" role="presentation" size="large"
      >Option 2</syn-radio-button
    >
    <syn-radio-button value="3" role="presentation" size="large"
      >Option 3</syn-radio-button
    >
  </syn-radio-group>
</div>
```

---

## Prefix And Suffix Icons

Use the prefix and suffix slots to add icons.

```html
<syn-radio-group
  label="Select an option"
  name="b"
  value="1"
  size="medium"
  form=""
>
  <syn-radio-button value="1" role="presentation" size="medium" checked="">
    <syn-icon
      slot="prefix"
      name="wallpaper"
      aria-hidden="true"
      library="default"
    ></syn-icon>
    Option 1
  </syn-radio-button>
  <syn-radio-button value="2" role="presentation" size="medium">
    Option 2
    <syn-icon
      slot="suffix"
      name="wallpaper"
      aria-hidden="true"
      library="default"
    ></syn-icon>
  </syn-radio-button>
  <syn-radio-button value="3" role="presentation" size="medium">
    <syn-icon
      slot="prefix"
      name="wallpaper"
      aria-hidden="true"
      library="default"
    ></syn-icon>
    Option 3
    <syn-icon
      slot="suffix"
      name="wallpaper"
      aria-hidden="true"
      library="default"
    ></syn-icon>
  </syn-radio-button>
</syn-radio-group>
```

---

## Buttons With Icons

You can omit button labels and use icons instead. Make sure to set a label attribute on each icon so screen readers will announce each option correctly.

```html
<syn-radio-group
  label="Select an option"
  name="a"
  value="neutral"
  size="medium"
  form=""
>
  <syn-radio-button value="angry" role="presentation" size="medium">
    <syn-icon
      name="face_5"
      label="Angry"
      role="img"
      aria-label="Angry"
      library="default"
    ></syn-icon>
  </syn-radio-button>

  <syn-radio-button value="sad" role="presentation" size="medium">
    <syn-icon
      name="face_4"
      label="Sad"
      role="img"
      aria-label="Sad"
      library="default"
    ></syn-icon>
  </syn-radio-button>

  <syn-radio-button
    value="neutral"
    role="presentation"
    size="medium"
    checked=""
  >
    <syn-icon
      name="face_3"
      label="Neutral"
      role="img"
      aria-label="Neutral"
      library="default"
    ></syn-icon>
  </syn-radio-button>

  <syn-radio-button value="happy" role="presentation" size="medium">
    <syn-icon
      name="face_2"
      label="Happy"
      role="img"
      aria-label="Happy"
      library="default"
    ></syn-icon>
  </syn-radio-button>

  <syn-radio-button value="laughing" role="presentation" size="medium">
    <syn-icon
      name="face_6"
      label="Laughing"
      role="img"
      aria-label="Laughing"
      library="default"
    ></syn-icon>
  </syn-radio-button>
</syn-radio-group>
```
