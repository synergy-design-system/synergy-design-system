
## Default

Radios allow the user to select a single option from a group. \nRadios are designed to be used with radio groups.

```html
<syn-radio
  role="radio"
  tabindex="-1"
  aria-disabled="false"
  aria-checked="false"
  size="medium"
>
  Option
</syn-radio>

```

---

## Disabled

Use the disabled attribute to disable a radio.

```html
<syn-radio
  value="1"
  disabled=""
  role="radio"
  tabindex="-1"
  aria-disabled="true"
  aria-checked="false"
  size="medium"
  >Option</syn-radio
>

```

---

## Focus

The focus event gives the user feedback that the Radio has been focused by the keyboard interaction.

```html
<syn-radio
  value="1"
  role="radio"
  tabindex="-1"
  aria-disabled="false"
  aria-checked="false"
  size="medium"
  >Option</syn-radio
>

```

---

## Invalid

The invalid status is used to warn the user that the Radio is invalid. For example, if the radio is mandatory and nothing has been checked.

```html
<form class="custom-validity">
  <syn-radio-group
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
      >Option</syn-radio
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

## Sizes

Add the size attribute to the Radio Group to change the radios’ size.

```html
<syn-radio
  value="1"
  size="small"
  role="radio"
  tabindex="-1"
  aria-disabled="false"
  aria-checked="false"
  >Option</syn-radio
>
<syn-radio
  value="2"
  size="medium"
  role="radio"
  tabindex="-1"
  aria-disabled="false"
  aria-checked="false"
  >Option</syn-radio
>
<syn-radio
  value="3"
  size="large"
  role="radio"
  tabindex="-1"
  aria-disabled="false"
  aria-checked="false"
  >Option</syn-radio
>

```
