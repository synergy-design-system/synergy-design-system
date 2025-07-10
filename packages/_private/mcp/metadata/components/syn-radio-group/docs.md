
## Default

Radio groups are used to group multiple radios or radio buttons so they function as a single form control.

```html
<syn-radio-group
  label="This is a label"
  value=""
  size="medium"
  form=""
  data-optional=""
  data-valid=""
>
  <syn-radio
    value="1"
    role="radio"
    tabindex="0"
    aria-disabled="false"
    aria-checked="false"
    size="medium"
    >Option</syn-radio
  >
  <syn-radio
    value="2"
    role="radio"
    tabindex="-1"
    aria-disabled="false"
    aria-checked="false"
    size="medium"
    >Option</syn-radio
  >
  <syn-radio
    value="3"
    role="radio"
    tabindex="-1"
    aria-disabled="false"
    aria-checked="false"
    size="medium"
    >Option</syn-radio
  >
</syn-radio-group>

```

---

## Labels

Use the label attribute to give the radio-group an accessible label. For labels that contain HTML, use the label slot instead.

```html
<syn-radio-group
  label="This is a label"
  value=""
  size="medium"
  form=""
  data-optional=""
  data-valid=""
>
  <syn-radio
    value="1"
    role="radio"
    tabindex="0"
    aria-disabled="false"
    aria-checked="false"
    size="medium"
    >Option</syn-radio
  >
  <syn-radio
    value="2"
    role="radio"
    tabindex="-1"
    aria-disabled="false"
    aria-checked="false"
    size="medium"
    >Option</syn-radio
  >
  <syn-radio
    value="3"
    role="radio"
    tabindex="-1"
    aria-disabled="false"
    aria-checked="false"
    size="medium"
    >Option</syn-radio
  >
</syn-radio-group>

```

---

## Help Text

Add descriptive help text to a switch with the help-text attribute. For help texts that contain HTML, use the help-text slot instead.The help-text attribute should not be used to display error messages. To handle validation and error messaging, use syn-validate for proper error management.

```html
<syn-radio-group
  label="This is a label"
  help-text="This is the help-text"
  name="a"
  value=""
  size="medium"
  form=""
  data-optional=""
  data-valid=""
>
  <syn-radio
    value="1"
    role="radio"
    tabindex="0"
    aria-disabled="false"
    aria-checked="false"
    size="medium"
    >Option</syn-radio
  >
  <syn-radio
    value="2"
    role="radio"
    tabindex="-1"
    aria-disabled="false"
    aria-checked="false"
    size="medium"
    >Option</syn-radio
  >
  <syn-radio
    value="3"
    role="radio"
    tabindex="-1"
    aria-disabled="false"
    aria-checked="false"
    size="medium"
    >Option</syn-radio
  >
</syn-radio-group>

```

---

## Focus

The focus event gives the user feedback that one of the radio buttons has been focused by the keyboard interaction.

```html
<syn-radio-group
  label="This is a label"
  name="a"
  value=""
  size="medium"
  form=""
  data-optional=""
  data-valid=""
>
  <syn-radio
    value="1"
    disabled=""
    role="radio"
    tabindex="0"
    aria-disabled="true"
    aria-checked="false"
    size="medium"
    >Option</syn-radio
  >
  <syn-radio
    value="2"
    role="radio"
    tabindex="-1"
    aria-disabled="false"
    aria-checked="false"
    size="medium"
    >Option</syn-radio
  >
  <syn-radio
    value="3"
    role="radio"
    tabindex="-1"
    aria-disabled="false"
    aria-checked="false"
    size="medium"
    >Option</syn-radio
  >
</syn-radio-group>

```

---

## Disabled

Radios and radio buttons can be disabled by adding the disabled attribute to the respective options inside the radio group.

```html
<syn-radio-group
  label="This is a label"
  help-text="This is disabled"
  name="a"
  value=""
  size="medium"
  form=""
  data-optional=""
  data-valid=""
>
  <syn-radio
    value="1"
    role="radio"
    tabindex="0"
    aria-disabled="false"
    aria-checked="false"
    size="medium"
    >Option</syn-radio
  >
  <syn-radio
    value="2"
    disabled=""
    role="radio"
    tabindex="-1"
    aria-disabled="true"
    aria-checked="false"
    size="medium"
    >Option</syn-radio
  >
  <syn-radio
    value="3"
    role="radio"
    tabindex="-1"
    aria-disabled="false"
    aria-checked="false"
    size="medium"
    >Option</syn-radio
  >
</syn-radio-group>

```

---

## Invalid

The invalid status is used to warn the user that the Radio Group is invalid. For example, if the radio is mandatory and nothing has been checked.

```html
<form class="custom-validity">
  <syn-radio-group
    label="Select an option"
    name="a"
    help-text="This is required"
    required=""
    value=""
    size="medium"
    form=""
    data-required=""
    data-invalid=""
  >
    <syn-radio
      value="1"
      role="radio"
      tabindex="0"
      aria-disabled="false"
      aria-checked="false"
      size="medium"
      >Option 1</syn-radio
    >
    <syn-radio
      value="2"
      role="radio"
      tabindex="-1"
      aria-disabled="false"
      aria-checked="false"
      size="medium"
      >Option 2</syn-radio
    >
    <syn-radio
      value="3"
      role="radio"
      tabindex="-1"
      aria-disabled="false"
      aria-checked="false"
      size="medium"
      >Option 3</syn-radio
    >
  </syn-radio-group>
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

## Custom Validity

Use the setCustomValidity() method to set a custom validation message. This will prevent the form from submitting and make the browser display the error message you provide. To clear the error, call this function with an empty string.

```html
<form>
  <syn-radio-group
    label="Select an option"
    name="a"
    value="1"
    size="medium"
    form=""
    data-optional=""
    data-valid=""
  >
    <syn-radio
      value="1"
      role="radio"
      tabindex="0"
      aria-disabled="false"
      aria-checked="true"
      size="medium"
      >Not me</syn-radio
    >
    <syn-radio
      value="2"
      role="radio"
      tabindex="-1"
      aria-disabled="false"
      aria-checked="false"
      size="medium"
      >Me neither</syn-radio
    >
    <syn-radio
      value="3"
      role="radio"
      tabindex="-1"
      aria-disabled="false"
      aria-checked="false"
      size="medium"
      >Choose me</syn-radio
    >
  </syn-radio-group>
  <br />
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

```
