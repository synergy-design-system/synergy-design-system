## Default

Radios allow the user to select a single option from a group. \nRadios are designed to be used with radio groups.

```html
<syn-radio> Option </syn-radio>
```

---

## Initial Value

To set the initial value and checked state, use the value attribute on the radio element.

```html
<syn-radio-group value="1">
  <syn-radio value="1" selected="">Option</syn-radio>
</syn-radio-group>
```

---

## Focus

The focus event gives the user feedback that the Radio has been focused by the keyboard interaction.

```html
<syn-radio value="1">Option</syn-radio>
```

---

## Disabled

Set disabled on an unavailable radio option and explain why it cannot be selected. Use readonly on every radio in the group when users should inspect the selection without changing it.

```html
<syn-radio value="1" disabled="">Option</syn-radio>
```

---

## Readonly

Set readonly on every syn-radio in the group when users should inspect the selected choice without changing it. Setting it only on the selected radio leaves other choices available.

```html
<syn-radio-group value="1">
  <syn-radio value="1" readonly="">Read-only content</syn-radio>
</syn-radio-group>
```

---

## Sizes

Add the size attribute to the Radio Group to change the radios’ size.

```html
<div
  style="display: flex; flex-direction: column; gap: var(--syn-spacing-large)"
>
  <syn-radio value="1" size="small">Option</syn-radio>
  <syn-radio value="2" size="medium">Option</syn-radio>
  <syn-radio value="3" size="large">Option</syn-radio>
</div>
```

---

## Invalid

The invalid status is used to warn the user that the Radio is invalid. For example, if the radio is mandatory and nothing has been checked.

```html
<form
  onsubmit="
    event.preventDefault();
    event.stopPropagation();
  "
  id="components-syn-radio--invalid"
>
  <syn-radio-group required="">
    <syn-radio value="1">Invalid</syn-radio>
    <syn-radio value="">Invalid</syn-radio>
  </syn-radio-group>

  <syn-button type="submit" variant="filled">Submit</syn-button>
</form>
<style>
  #components-syn-radio--invalid {
    display: flex;
    flex-direction: column;
    gap: var(--syn-spacing-large);
  }
  syn-button {
    align-self: flex-start;
  }
</style>
```
