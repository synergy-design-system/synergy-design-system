## Default

Checkboxes allow the user to toggle an option on or off.

```html
<syn-checkbox> Checkbox </syn-checkbox>
```

---

## Checked

Use the checked attribute to activate the checkbox.

```html
<syn-checkbox checked="">Checked</syn-checkbox>
```

---

## Help Text

Add descriptive help text to a checkbox with the help-text attribute. For help texts that contain HTML, use the help-text slot instead.The help-text attribute should not be used to display error messages. To handle validation and error messaging, use syn-validate for proper error management.

```html
<syn-checkbox help-text="What should the user know about the checkbox?"
  >Label</syn-checkbox
>
```

---

## Indeterminate

Use the indeterminate attribute to make the checkbox indeterminate.

```html
<syn-checkbox indeterminate="">Indeterminate</syn-checkbox>
```

---

## Focus

The focus event gives the user feedback that the Checkbox has been focused by the keyboard interaction.

```html
<syn-checkbox>Focused</syn-checkbox>
```

---

## Disabled

Use the disabled attribute to disable the checkbox.

```html
<syn-checkbox disabled="">Disabled</syn-checkbox>
```

---

## Readonly

Add the readonly attribute to draw a read-only checkbox.

```html
<div
  style="display: flex; flex-direction: column; gap: var(--syn-spacing-large)"
>
  <syn-checkbox name="a" value="a" readonly="">Read only content</syn-checkbox>
  <syn-checkbox name="b" value="b" readonly="" indeterminate=""
    >Read only content (indet)</syn-checkbox
  >
  <syn-checkbox name="c" value="c" readonly="" checked=""
    >Read only content (checked)</syn-checkbox
  >
</div>
```

---

## Sizes

Use the size attribute to change a checkbox’s size.

```html
<div
  style="display: flex; flex-direction: column; gap: var(--syn-spacing-large)"
>
  <syn-checkbox size="small">Small</syn-checkbox>
  <syn-checkbox size="medium">Medium</syn-checkbox>
  <syn-checkbox size="large">Large</syn-checkbox>
</div>
```

---

## Invalid

The invalid status is used to warn the user that the Checkbox is invalid. For example, if the check is mandatory and nothing has been checked.

```html
<form
  onsubmit="
    event.preventDefault();
    event.stopPropagation();
  "
  id="components-syn-checkbox--invalid"
>
  <div class="custom-validity">
    <syn-checkbox required="">Invalid</syn-checkbox>
    <syn-checkbox required="" indeterminate="">Invalid</syn-checkbox>
    <syn-checkbox required="" checked="">Invalid</syn-checkbox>
  </div>
  <style>
    .custom-validity {
      display: flex;
      flex-direction: column;
      gap: var(--syn-spacing-large);
    }
  </style>

  <syn-button type="submit" variant="filled">Submit</syn-button>
</form>
<style>
  #components-syn-checkbox--invalid {
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
  <syn-checkbox name="checked" value="on">Check me</syn-checkbox>
  <syn-button type="submit" variant="filled">Submit</syn-button>
</form>
<style>
  .custom-validity {
    display: inline-flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>

<script type="module">
  const form = document.querySelector(".custom-validity");
  const checkbox = form.querySelector("syn-checkbox");
  const errorMessage = "Don't forget to check me!";

  // Update validity on change
  checkbox.addEventListener("syn-change", () => {
    checkbox.setCustomValidity(checkbox.checked ? "" : errorMessage);
  });

  // Handle submit
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("All fields are valid!");
  });
</script>
```
