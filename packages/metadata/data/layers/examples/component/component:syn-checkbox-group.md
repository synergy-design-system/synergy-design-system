## Default

Checkbox groups are used to visually group multiple checkboxes.

```html
<syn-checkbox-group label="This is a label">
  <syn-checkbox name="checkbox-1" value="checkbox-1">Option</syn-checkbox>
  <syn-checkbox name="checkbox-2" value="checkbox-2">Option</syn-checkbox>
  <syn-checkbox name="checkbox-3" value="checkbox-3">Option</syn-checkbox>
</syn-checkbox-group>
```

---

## Layout Vertical

Use a vertical layout to display the checkboxes in a column.

```html
<syn-checkbox-group label="This is a label" layout="vertical">
  <syn-checkbox name="checkbox-1" value="checkbox-1">Option</syn-checkbox>

  <syn-checkbox name="checkbox-2" value="checkbox-2">Option</syn-checkbox>

  <syn-checkbox name="checkbox-3" value="checkbox-3">Option</syn-checkbox>
</syn-checkbox-group>
```

---

## Layout Horizontal

Use a horizontal layout to display the checkboxes in a row.

```html
<syn-checkbox-group label="This is a label" layout="horizontal">
  <syn-checkbox name="checkbox-1" value="checkbox-1">Option</syn-checkbox>

  <syn-checkbox name="checkbox-2" value="checkbox-2">Option</syn-checkbox>

  <syn-checkbox name="checkbox-3" value="checkbox-3">Option</syn-checkbox>

  <syn-checkbox name="checkbox-4" value="checkbox-4">Option</syn-checkbox>

  <syn-checkbox name="checkbox-5" value="checkbox-5">Option</syn-checkbox>

  <syn-checkbox name="checkbox-6" value="checkbox-6">Option</syn-checkbox>

  <syn-checkbox name="checkbox-7" value="checkbox-7">Option</syn-checkbox>

  <syn-checkbox name="checkbox-8" value="checkbox-8">Option</syn-checkbox>

  <syn-checkbox name="checkbox-9" value="checkbox-9">Option</syn-checkbox>

  <syn-checkbox name="checkbox-10" value="checkbox-10">Option</syn-checkbox>

  <syn-checkbox name="checkbox-11" value="checkbox-11">Option</syn-checkbox>
</syn-checkbox-group>
```

---

## Labels

Use the label attribute to give the checkbox-group an accessible label. For labels that contain HTML, use the label slot instead.

```html
<syn-checkbox-group label="This is a label">
  <syn-checkbox name="checkbox-1" value="checkbox-1">Option</syn-checkbox>

  <syn-checkbox name="checkbox-2" value="checkbox-2">Option</syn-checkbox>

  <syn-checkbox name="checkbox-3" value="checkbox-3">Option</syn-checkbox>

  <syn-checkbox name="checkbox-4" value="checkbox-4">Option</syn-checkbox>

  <syn-checkbox name="checkbox-5" value="checkbox-5">Option</syn-checkbox>

  <syn-checkbox name="checkbox-6" value="checkbox-6">Option</syn-checkbox>

  <syn-checkbox name="checkbox-7" value="checkbox-7">Option</syn-checkbox>

  <syn-checkbox name="checkbox-8" value="checkbox-8">Option</syn-checkbox>

  <syn-checkbox name="checkbox-9" value="checkbox-9">Option</syn-checkbox>

  <syn-checkbox name="checkbox-10" value="checkbox-10">Option</syn-checkbox>

  <syn-checkbox name="checkbox-11" value="checkbox-11">Option</syn-checkbox>
</syn-checkbox-group>
```

---

## Help Text

Add descriptive help text to a switch with the help-text attribute. For help texts that contain HTML, use the help-text slot instead.The help-text attribute should not be used to display error messages. To handle validation and error messaging, use syn-validate for proper error management.

```html
<syn-checkbox-group
  label="This is a label"
  help-text="Choose the most appropriate option."
>
  <syn-checkbox name="checkbox-1" value="checkbox-1">Option</syn-checkbox>

  <syn-checkbox name="checkbox-2" value="checkbox-2">Option</syn-checkbox>

  <syn-checkbox name="checkbox-3" value="checkbox-3">Option</syn-checkbox>
</syn-checkbox-group>
```

---

## Focus

The focus event gives the user feedback that one of the Checkboxes has been focused by the keyboard interaction.

```html
<syn-checkbox-group
  label="This is a label"
  help-text="Choose the most appropriate option."
>
  <syn-checkbox name="checkbox-1" value="checkbox-1">Option</syn-checkbox>

  <syn-checkbox name="checkbox-2" value="checkbox-2">Option</syn-checkbox>

  <syn-checkbox name="checkbox-3" value="checkbox-3">Option</syn-checkbox>
</syn-checkbox-group>
```

---

## Sizes

The size of checkboxes will be determined by the checkbox group’s size attribute.

```html
<div
  style="display: flex; flex-direction: column; gap: var(--syn-spacing-large)"
>
  <syn-checkbox-group
    label="This is a label"
    help-text="Choose the most appropriate option."
    size="small"
  >
    <syn-checkbox name="checkbox-1" value="checkbox-1">Option</syn-checkbox>

    <syn-checkbox name="checkbox-2" value="checkbox-2">Option</syn-checkbox>
  </syn-checkbox-group>

  <syn-checkbox-group
    label="This is a label"
    help-text="Choose the most appropriate option."
    size="medium"
  >
    <syn-checkbox name="checkbox-1" value="checkbox-1">Option</syn-checkbox>

    <syn-checkbox name="checkbox-2" value="checkbox-2">Option</syn-checkbox>
  </syn-checkbox-group>

  <syn-checkbox-group
    label="This is a label"
    help-text="Choose the most appropriate option."
    size="large"
  >
    <syn-checkbox name="checkbox-1" value="checkbox-1">Option</syn-checkbox>

    <syn-checkbox name="checkbox-2" value="checkbox-2">Option</syn-checkbox>
  </syn-checkbox-group>
</div>
```
