## Default

Checkboxes allow the user to toggle an option on or off.

```html
<syn-checkbox title="" size="medium" form="" data-optional="" data-valid="">
  Checkbox
</syn-checkbox>
```

---

## Checked

Use the checked attribute to activate the checkbox.

```html
<syn-checkbox
  checked=""
  title=""
  size="medium"
  form=""
  data-optional=""
  data-valid=""
  >Checked</syn-checkbox
>
```

---

## Indeterminate

Use the indeterminate attribute to make the checkbox indeterminate.

```html
<syn-checkbox
  indeterminate=""
  title=""
  size="medium"
  form=""
  data-optional=""
  data-valid=""
  >Indeterminate</syn-checkbox
>
```

---

## Disabled

Use the disabled attribute to disable the checkbox.

```html
<syn-checkbox
  disabled=""
  title=""
  size="medium"
  form=""
  data-optional=""
  data-valid=""
  >Disabled</syn-checkbox
>
```

---

## Sizes

Use the size attribute to change a checkbox’s size.

```html
<div style="display: flex; flex-direction: column; gap: 1rem">
  <syn-checkbox size="small" title="" form="" data-optional="" data-valid=""
    >Small</syn-checkbox
  >
  <syn-checkbox size="medium" title="" form="" data-optional="" data-valid=""
    >Medium</syn-checkbox
  >
  <syn-checkbox size="large" title="" form="" data-optional="" data-valid=""
    >Large</syn-checkbox
  >
</div>
```

---

## Custom Validity

Use the setCustomValidity() method to set a custom validation message. This will prevent the form from submitting and make the browser display the error message you provide. To clear the error, call this function with an empty string.

```html
<form class="custom-validity">
  <syn-checkbox
    name="checked"
    value="on"
    title=""
    size="medium"
    form=""
    data-optional=""
    data-valid=""
    >Check me</syn-checkbox
  >
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
    display: inline-flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
```
