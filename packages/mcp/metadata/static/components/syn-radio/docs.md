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

## Initial Value

To set the initial value and checked state, use the value attribute on the radio element.

```html
<syn-radio-group value="1" size="medium" form="">
  <syn-radio
    value="1"
    selected=""
    role="radio"
    tabindex="0"
    aria-disabled="false"
    aria-checked="true"
    size="medium"
    >Option</syn-radio
  >
</syn-radio-group>
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

## Readonly

Add the read-only attribute to draw a read-only radio.

```html
<syn-radio-group value="1" size="medium" form="">
  <syn-radio
    value="1"
    readonly=""
    role="radio"
    tabindex="0"
    aria-disabled="true"
    aria-checked="true"
    size="medium"
    >Read-only content</syn-radio
  >
</syn-radio-group>
```

---

## Sizes

Add the size attribute to the Radio Group to change the radios’ size.

```html
<div
  style="display: flex; flex-direction: column; gap: var(--syn-spacing-large)"
>
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
</div>
```

---

## Invalid

The invalid status is used to warn the user that the Radio is invalid. For example, if the radio is mandatory and nothing has been checked.

```html
<form class="custom-validity">
  <syn-radio-group required="" value="2" size="medium" form="">
    <syn-radio
      value="1"
      role="radio"
      tabindex="-1"
      aria-disabled="false"
      aria-checked="false"
      size="medium"
      >Invalid</syn-radio
    >
    <syn-radio
      value="2"
      role="radio"
      tabindex="0"
      aria-disabled="false"
      aria-checked="true"
      size="medium"
      >Invalid</syn-radio
    >
  </syn-radio-group>
  <syn-button type="submit" variant="filled" title="" size="medium"
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
