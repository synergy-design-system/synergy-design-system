## Default

Checkboxes allow the user to toggle an option on or off.

```html
<syn-checkbox title="" size="medium" form=""> Checkbox </syn-checkbox>
```

---

## Checked

Use the checked attribute to activate the checkbox.

```html
<syn-checkbox checked="" title="" size="medium" form="">Checked</syn-checkbox>
```

---

## Help Text

Add descriptive help text to a checkbox with the help-text attribute. For help texts that contain HTML, use the help-text slot instead.The help-text attribute should not be used to display error messages. To handle validation and error messaging, use syn-validate for proper error management.

```html
<syn-checkbox
  help-text="What should the user know about the checkbox?"
  title=""
  size="medium"
  form=""
  >Label</syn-checkbox
>
```

---

## Indeterminate

Use the indeterminate attribute to make the checkbox indeterminate.

```html
<syn-checkbox indeterminate="" title="" size="medium" form=""
  >Indeterminate</syn-checkbox
>
```

---

## Focus

The focus event gives the user feedback that the Checkbox has been focused by the keyboard interaction.

```html
<syn-checkbox title="" size="medium" form="">Focused</syn-checkbox>
```

---

## Disabled

Use the disabled attribute to disable the checkbox.

```html
<syn-checkbox disabled="" title="" size="medium" form="">Disabled</syn-checkbox>
```

---

## Sizes

Use the size attribute to change a checkbox’s size.

```html
<div
  style="display: flex; flex-direction: column; gap: var(--syn-spacing-large)"
>
  <syn-checkbox size="small" title="" form="">Small</syn-checkbox>
  <syn-checkbox size="medium" title="" form="">Medium</syn-checkbox>
  <syn-checkbox size="large" title="" form="">Large</syn-checkbox>
</div>
```

---

## Invalid

The invalid status is used to warn the user that the Checkbox is invalid. For example, if the check is mandatory and nothing has been checked.

```html
<form class="custom-validity">
  <div class="custom-validity">
    <syn-checkbox required="" title="" size="medium" form=""
      >Invalid</syn-checkbox
    >
    <syn-checkbox required="" indeterminate="" title="" size="medium" form=""
      >Invalid</syn-checkbox
    >
    <syn-checkbox required="" checked="" title="" size="medium" form=""
      >Invalid</syn-checkbox
    >
  </div>
  <syn-button type="submit" variant="filled" title="" size="medium"
    >Submit</syn-button
  >
</form>
<style>
  .custom-validity {
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
<form class="custom-validity">
  <syn-checkbox name="checked" value="on" title="" size="medium" form=""
    >Check me</syn-checkbox
  >
  <syn-button type="submit" variant="filled" title="" size="medium"
    >Submit</syn-button
  >
</form>
<style>
  .custom-validity {
    display: inline-flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
```
