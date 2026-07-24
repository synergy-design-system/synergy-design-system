## Default

Switches allow the user to toggle an option on or off.

```html
<syn-switch> Option </syn-switch>
```

---

## Checked

Use the checked attribute to activate the switch.

```html
<syn-switch checked="">Checked</syn-switch>
```

---

## Focus

The focus event gives the user feedback that the Switch has been focused by the keyboard interaction.

```html
<syn-switch>Focused</syn-switch>
```

---

## Disabled

Use the disabled attribute to disable the switch.

```html
<syn-switch disabled="">Disabled</syn-switch>
```

---

## Readonly

Add the readonly attribute to draw a read-only switch.

```html
<div
  style="
    display: flex;
    gap: var(--syn-spacing-large);
    flex-direction: column;
    align-items: flex-start;
  "
>
  <syn-switch readonly="">Unchecked</syn-switch>
  <syn-switch checked="" readonly="">Checked</syn-switch>
</div>
```

---

## Sizes

Use the size attribute to change a switch’s size.

```html
<div
  style="
    gap: var(--syn-spacing-large);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  "
>
  <syn-switch size="small">Small</syn-switch>
  <syn-switch size="medium">Medium</syn-switch>
  <syn-switch size="large">Large</syn-switch>
</div>
```

---

## Help Text

Add descriptive help text to a switch with the help-text attribute. For help texts that contain HTML, use the help-text slot instead.The help-text attribute should not be used to display error messages. To handle validation and error messaging, use syn-validate for proper error management.

```html
<syn-switch help-text="What should the user know about the switch?"
  >Label</syn-switch
>
```

---

## Invalid

The invalid status is used to warn the user that the Switch is invalid.

```html
<form
  onsubmit="
    event.preventDefault();
    event.stopPropagation();
  "
  id="components-syn-switch--invalid"
>
  <syn-switch required="">Option</syn-switch>

  <syn-button type="submit" variant="filled">Submit</syn-button>
</form>
<style>
  #components-syn-switch--invalid {
    display: flex;
    flex-direction: column;
    gap: var(--syn-spacing-large);
  }
  syn-button {
    align-self: flex-start;
  }
</style>
```
