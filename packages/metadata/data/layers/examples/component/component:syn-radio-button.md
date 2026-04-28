## Default

Radio buttons allow the user to select a single option from a group using a button-like control.Radio buttons are designed to be used with radio groups. When a radio button has focus, the arrow keys can be used to change the selected option just like standard radio controls.

```html
<syn-radio-group label="Select an option" name="a" value="1">
  <syn-radio-button value="1"> Option 1 </syn-radio-button>

  <syn-radio-button value="2">Option 2</syn-radio-button>
  <syn-radio-button value="3">Option 3</syn-radio-button>
</syn-radio-group>
```

---

## Checked

To set the initial value and checked state, use the value attribute on the containing radio group.

```html
<syn-radio-group label="Select an option" name="b" value="1">
  <syn-radio-button value="1">Option 1</syn-radio-button>
  <syn-radio-button value="2">Option 2</syn-radio-button>
  <syn-radio-button value="3">Option 3</syn-radio-button>
</syn-radio-group>
```

---

## Disabled

Use the disabled attribute to disable a radio button.

```html
<syn-radio-group label="Select an option" name="b" value="1">
  <syn-radio-button value="1">Option 1</syn-radio-button>
  <syn-radio-button value="2" disabled="">Option 2</syn-radio-button>
  <syn-radio-button value="3">Option 3</syn-radio-button>
</syn-radio-group>
```

---

## Readonly

Add the read-only attribute to render a readonly radio button. Please note that you need to enable the readonly state for each individual radio button.

```html
<div
  style="display: flex; flex-direction: column; gap: var(--syn-spacing-medium)"
>
  <syn-radio-group label="Select an option" name="b" value="1">
    <syn-radio-button value="1" readonly="">Option 1</syn-radio-button>
    <syn-radio-button value="2" readonly="">Option 2</syn-radio-button>
    <syn-radio-button value="3" readonly="">Option 3</syn-radio-button>
  </syn-radio-group>
  <syn-radio-group label="Select an option" name="b" value="1">
    <syn-radio-button value="1" readonly="">Option 1</syn-radio-button>
    <syn-radio-button value="2">Option 2</syn-radio-button>
    <syn-radio-button value="3">Option 3</syn-radio-button>
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
  >
    <syn-radio-button value="1">Option 1</syn-radio-button>
    <syn-radio-button value="2">Option 2</syn-radio-button>
    <syn-radio-button value="3">Option 3</syn-radio-button>
  </syn-radio-group>

  <syn-button type="submit" variant="filled">Submit</syn-button>
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
  <syn-radio-group label="Select an option" name="size" value="1" size="small">
    <syn-radio-button value="1">Option 1</syn-radio-button>
    <syn-radio-button value="2">Option 2</syn-radio-button>
    <syn-radio-button value="3">Option 3</syn-radio-button>
  </syn-radio-group>

  <syn-radio-group label="Select an option" name="size" value="1" size="medium">
    <syn-radio-button value="1">Option 1</syn-radio-button>
    <syn-radio-button value="2">Option 2</syn-radio-button>
    <syn-radio-button value="3">Option 3</syn-radio-button>
  </syn-radio-group>

  <syn-radio-group label="Select an option" name="size" value="1" size="large">
    <syn-radio-button value="1">Option 1</syn-radio-button>
    <syn-radio-button value="2">Option 2</syn-radio-button>
    <syn-radio-button value="3">Option 3</syn-radio-button>
  </syn-radio-group>
</div>
```

---

## Prefix And Suffix Icons

Use the prefix and suffix slots to add icons.

```html
<syn-radio-group label="Select an option" name="b" value="1">
  <syn-radio-button value="1">
    <syn-icon slot="prefix" name="wallpaper"></syn-icon>
    Option 1
  </syn-radio-button>
  <syn-radio-button value="2">
    Option 2
    <syn-icon slot="suffix" name="wallpaper"></syn-icon>
  </syn-radio-button>
  <syn-radio-button value="3">
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
<syn-radio-group label="Select an option" name="a" value="neutral">
  <syn-radio-button value="angry">
    <syn-icon name="face_5" label="Angry"></syn-icon>
  </syn-radio-button>

  <syn-radio-button value="sad">
    <syn-icon name="face_4" label="Sad"></syn-icon>
  </syn-radio-button>

  <syn-radio-button value="neutral">
    <syn-icon name="face_3" label="Neutral"></syn-icon>
  </syn-radio-button>

  <syn-radio-button value="happy">
    <syn-icon name="face_2" label="Happy"></syn-icon>
  </syn-radio-button>

  <syn-radio-button value="laughing">
    <syn-icon name="face_6" label="Laughing"></syn-icon>
  </syn-radio-button>
</syn-radio-group>
```
