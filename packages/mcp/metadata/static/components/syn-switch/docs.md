## Default

Switches allow the user to toggle an option on or off.

```html
<syn-switch title="" size="medium" form=""> Option </syn-switch>
```

---

## Checked

Use the checked attribute to activate the switch.

```html
<syn-switch checked="" title="" size="medium" form="">Checked</syn-switch>
```

---

## Disabled

Use the disabled attribute to disable the switch.

```html
<syn-switch disabled="" title="" size="medium" form="">Disabled</syn-switch>
```

---

## Focus

The focus event gives the user feedback that the Switch has been focused by the keyboard interaction.

```html
<syn-switch title="" size="medium" form="">Focused</syn-switch>
```

---

## Invalid

The invalid status is used to warn the user that the Switch is invalid.

```html
<form class="custom-validity">
  <syn-switch required="" title="" size="medium" form="">Option</syn-switch>
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
  <syn-switch size="small" title="" form="">Small</syn-switch>
  <syn-switch size="medium" title="" form="">Medium</syn-switch>
  <syn-switch size="large" title="" form="">Large</syn-switch>
</div>
```

---

## Help Text

Add descriptive help text to a switch with the help-text attribute. For help texts that contain HTML, use the help-text slot instead.The help-text attribute should not be used to display error messages. To handle validation and error messaging, use syn-validate for proper error management.

```html
<syn-switch
  help-text="What should the user know about the switch?"
  title=""
  size="medium"
  form=""
  >Label</syn-switch
>
```
