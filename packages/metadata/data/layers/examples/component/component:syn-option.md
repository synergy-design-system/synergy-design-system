## Default

Options define the selectable items within various form controls such as select.

```html
<syn-select label="Select one">
  <syn-option value="Option_1"> Option 1 </syn-option>

  <syn-option value="Option_2">Option 2</syn-option>
  <syn-option value="Option_3">Option 3</syn-option>
</syn-select>
```

---

## Disabled

Use the disabled attribute to disable an option and prevent it from being selected.

```html
<syn-select label="Select one">
  <syn-option value="option-1">Email</syn-option>
  <syn-option value="option-2" disabled="">Phone</syn-option>
  <syn-option value="option-3">Chat</syn-option>
</syn-select>
```

---

## Prefix And Suffix

Add icons to the start and end of menu items using the prefix and suffix slots.

```html
<syn-select label="Select one">
  <syn-option value="option-1">
    <syn-icon slot="prefix" name="email"></syn-icon>
    Email
    <syn-icon slot="suffix" name="check_circle_outline"></syn-icon>
  </syn-option>

  <syn-option value="option-2">
    <syn-icon slot="prefix" name="local_phone"></syn-icon>
    Phone
    <syn-icon slot="suffix" name="check_circle_outline"></syn-icon>
  </syn-option>

  <syn-option value="option-3">
    <syn-icon slot="prefix" name="chat_bubble_outline"></syn-icon>
    Chat
    <syn-icon slot="suffix" name="check_circle_outline"></syn-icon>
  </syn-option>
</syn-select>
```
