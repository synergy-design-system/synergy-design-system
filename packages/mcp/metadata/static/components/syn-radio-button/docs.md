## Default

Radios buttons allow the user to select a single option from a group using a button-like control.Radio buttons are designed to be used with radio groups. When a radio button has focus, the arrow keys can be used to change the selected option just like standard radio controls.

```html
<syn-radio-group
  label="Select an option"
  name="a"
  value=""
  size="medium"
  form=""
>
  <syn-radio-button value="1" role="presentation" size="medium">
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

## Checked States

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

## Sizes

Use the size attribute to change a radio button’s size.

```html
<syn-radio-group
  label="Select an option"
  name="size"
  value="1"
  style="margin-bottom: 16px"
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
  style="margin-bottom: 16px"
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
  style="margin-bottom: 16px"
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
    <syn-icon slot="prefix" name="wallpaper"></syn-icon>
    Option 1
  </syn-radio-button>
  <syn-radio-button value="2" role="presentation" size="medium">
    Option 2
    <syn-icon slot="suffix" name="wallpaper"></syn-icon>
  </syn-radio-button>
  <syn-radio-button value="3" role="presentation" size="medium">
    <syn-icon slot="prefix" name="wallpaper"></syn-icon>
    Option 3
    <syn-icon slot="suffix" name="wallpaper"></syn-icon>
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
    <syn-icon name="face_5" label="Angry"></syn-icon>
  </syn-radio-button>

  <syn-radio-button value="sad" role="presentation" size="medium">
    <syn-icon name="face_4" label="Sad"></syn-icon>
  </syn-radio-button>

  <syn-radio-button
    value="neutral"
    role="presentation"
    size="medium"
    checked=""
  >
    <syn-icon name="face_3" label="Neutral"></syn-icon>
  </syn-radio-button>

  <syn-radio-button value="happy" role="presentation" size="medium">
    <syn-icon name="face_2" label="Happy"></syn-icon>
  </syn-radio-button>

  <syn-radio-button value="laughing" role="presentation" size="medium">
    <syn-icon name="face_6" label="Laughing"></syn-icon>
  </syn-radio-button>
</syn-radio-group>
```
