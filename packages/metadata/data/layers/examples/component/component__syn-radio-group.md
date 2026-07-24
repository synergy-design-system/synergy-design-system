## Default

Radio groups are used to group multiple radios or radio buttons so they function as a single form control.

```html
<syn-radio-group label="This is a label">
  <syn-radio value="1">Option</syn-radio>
  <syn-radio value="2">Option</syn-radio>
  <syn-radio value="3">Option</syn-radio>
</syn-radio-group>
```

---

## Labels

Use the label attribute to give the radio-group an accessible label. For labels that contain HTML, use the label slot instead.

```html
<syn-radio-group label="This is a label">
  <syn-radio value="1">Option</syn-radio>
  <syn-radio value="2">Option</syn-radio>
  <syn-radio value="3">Option</syn-radio>
</syn-radio-group>
```

---

## Checked

To set the initial value and checked state, use the value attribute on the containing radio group.

```html
<syn-radio-group
  label="This is a label"
  help-text="This is checked"
  name="a"
  value="2"
>
  <syn-radio value="1">Option</syn-radio>
  <syn-radio value="2">Option</syn-radio>
  <syn-radio value="3">Option</syn-radio>
</syn-radio-group>
```

---

## Help Text

Add descriptive help text to a switch with the help-text attribute. For help texts that contain HTML, use the help-text slot instead.The help-text attribute should not be used to display error messages. To handle validation and error messaging, use syn-validate for proper error management.

```html
<syn-radio-group
  label="This is a label"
  help-text="Choose the most appropriate option."
  name="a"
>
  <syn-radio value="1">Option</syn-radio>
  <syn-radio value="2">Option</syn-radio>
  <syn-radio value="3">Option</syn-radio>
</syn-radio-group>
```

---

## Focus

The focus event gives the user feedback that one of the radio buttons has been focused by the keyboard interaction.

```html
<syn-radio-group label="This is a label" name="a">
  <syn-radio value="1" disabled="">Option</syn-radio>
  <syn-radio value="2">Option</syn-radio>
  <syn-radio value="3">Option</syn-radio>
</syn-radio-group>
```

---

## Disabled

Radios and radio buttons can be disabled by adding the disabled attribute to the respective options inside the radio group.

```html
<syn-radio-group label="This is a label" help-text="This is disabled" name="a">
  <syn-radio value="1">Option</syn-radio>
  <syn-radio value="2" disabled="">Option</syn-radio>
  <syn-radio value="3">Option</syn-radio>
</syn-radio-group>
```

---

## Readonly

Add the readonly attribute to a radio to draw it in a readonly state.

```html
<syn-radio-group
  label="This is a label"
  help-text="This is readonly"
  name="a"
  value="2"
>
  <syn-radio value="1">Option</syn-radio>
  <syn-radio value="2" readonly="">Option</syn-radio>
  <syn-radio value="3">Option</syn-radio>
</syn-radio-group>
```

---

## Sizes

The size of Radios and Radio Buttons will be determined by the Radio Group’s size attribute.

```html
<div class="demo-radio-group-grid">
  <div class="demo-radio-group-tile">
    <syn-radio-group layout="vertical" label="Small size vertical" size="small">
      <syn-radio value="1">Option</syn-radio>
      <syn-radio value="2">Option</syn-radio>
    </syn-radio-group>
  </div>
  <div class="demo-radio-group-tile">
    <syn-radio-group
      layout="horizontal"
      label="Small size horizontal"
      size="small"
    >
      <syn-radio value="1">Option</syn-radio>
      <syn-radio value="2">Option</syn-radio>
    </syn-radio-group>
  </div>

  <div class="demo-radio-group-tile">
    <syn-radio-group
      layout="vertical"
      label="Medium size vertical"
      size="medium"
    >
      <syn-radio value="1">Option</syn-radio>
      <syn-radio value="2">Option</syn-radio>
    </syn-radio-group>
  </div>
  <div class="demo-radio-group-tile">
    <syn-radio-group
      layout="horizontal"
      label="Medium size horizontal"
      size="medium"
    >
      <syn-radio value="1">Option</syn-radio>
      <syn-radio value="2">Option</syn-radio>
    </syn-radio-group>
  </div>

  <div class="demo-radio-group-tile">
    <syn-radio-group layout="vertical" label="Large size vertical" size="large">
      <syn-radio value="1">Option</syn-radio>
      <syn-radio value="2">Option</syn-radio>
    </syn-radio-group>
  </div>
  <div class="demo-radio-group-tile">
    <syn-radio-group
      layout="horizontal"
      label="Large size horizontal"
      size="large"
    >
      <syn-radio value="1">Option</syn-radio>
      <syn-radio value="2">Option</syn-radio>
    </syn-radio-group>
  </div>
</div>
<style>
  .demo-radio-group-grid {
    column-gap: var(--syn-spacing-large);
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: start;
  }

  .demo-radio-group-tile {
    background: var(--syn-page-background);
    padding: var(--syn-spacing-large);
    box-sizing: border-box;
    height: 100%;
  }
</style>
```

---

## Invalid

The invalid status is used to warn the user that the Radio Group is invalid. For example, if the radio is mandatory and nothing has been checked.

```html
<form
  onsubmit="
    event.preventDefault();
    event.stopPropagation();
  "
  id="components-syn-radio-group--invalid"
>
  <syn-radio-group
    label="Select an option"
    name="a"
    help-text="This is required"
    required=""
  >
    <syn-radio value="1">Option 1</syn-radio>
    <syn-radio value="2">Option 2</syn-radio>
    <syn-radio value="3">Option 3</syn-radio>
  </syn-radio-group>

  <syn-button type="submit" variant="filled">Submit</syn-button>
</form>
<style>
  #components-syn-radio-group--invalid {
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

## Custom Validity

Use the setCustomValidity() method to set a custom validation message. This will prevent the form from submitting and make the browser display the error message you provide. To clear the error, call this function with an empty string.

```html
<form>
  <syn-radio-group label="Select an option" name="a" value="1">
    <syn-radio value="1">Not me</syn-radio>
    <syn-radio value="2">Me neither</syn-radio>
    <syn-radio value="3">Choose me</syn-radio>
  </syn-radio-group>
  <br />
  <syn-button type="submit" variant="filled">Submit</syn-button>
</form>
```

---

## Radio Buttons

Radio buttons offer an alternate way to display radio controls. In this case, an internal button group is used to group the buttons into a single, cohesive control.

```html
<syn-radio-group
  label="Select an option"
  value="Option 1"
  help-text="Select an option that makes you proud."
>
  <syn-radio-button value="Option 1">Option 1</syn-radio-button>
  <syn-radio-button value="Option 2">Option 2</syn-radio-button>
  <syn-radio-button value="Option 3">Option 3</syn-radio-button>
</syn-radio-group>
```

---

## Horizontal Layout

Use a horizontal layout to display the radios in a row.

```html
<div
  style="display: flex; flex-direction: column; gap: var(--syn-spacing-large)"
>
  <syn-radio-group layout="horizontal" label="Small size" size="small">
    <syn-radio value="1">Option</syn-radio>
    <syn-radio value="2">Option</syn-radio>
  </syn-radio-group>
  <syn-radio-group layout="horizontal" label="Medium size" size="medium">
    <syn-radio value="1">Option</syn-radio>
    <syn-radio value="2">Option</syn-radio>
  </syn-radio-group>
  <syn-radio-group layout="horizontal" label="Large size" size="large">
    <syn-radio value="1">Option</syn-radio>
    <syn-radio value="2">Option</syn-radio>
  </syn-radio-group>
</div>
```
