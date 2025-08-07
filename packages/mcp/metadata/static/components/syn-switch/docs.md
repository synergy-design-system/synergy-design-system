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
<syn-switch size="small" title="" form="">Small</syn-switch><br />
<syn-switch size="medium" title="" form="">Medium</syn-switch><br />
<syn-switch size="large" title="" form="">Large</syn-switch>
```
