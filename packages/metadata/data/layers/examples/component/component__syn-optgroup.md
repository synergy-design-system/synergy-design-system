## Default

Use <syn-optgroup> to group listbox items visually.

```html
<syn-select>
  <syn-optgroup label="Section 1">
    <syn-option value="1">Option 1</syn-option>
    <syn-option value="2">Option 2</syn-option>
    <syn-option value="3">Option 3</syn-option>
  </syn-optgroup>

  <syn-optgroup label="Section 2">
    <syn-option value="4">Option 4</syn-option>
  </syn-optgroup>
</syn-select>
```

---

## Disabled

Use the disabled attribute in the <syn-optgroup> to disable the Section and prevent it from being selected.

```html
<syn-select>
  <syn-optgroup disabled="">
    <span slot="label">Section 1</span>
    <syn-option value="1">Option</syn-option>
    <syn-option value="2">Option</syn-option>
    <syn-option value="3">Option</syn-option>
  </syn-optgroup>
</syn-select>
```

---

## Prefix And Suffix

Add icons to the start and end of menu items using the prefix and suffix slots.

```html
<syn-select>
  <syn-optgroup label="Contact Support">
    <syn-icon name="contact_support" slot="prefix"></syn-icon>
    <syn-icon name="check_circle_outline" slot="suffix"></syn-icon>

    <syn-option value="1">
      <syn-icon name="mail" slot="prefix"></syn-icon>
      <syn-icon name="check_circle_outline" slot="suffix"></syn-icon>
      E-Mail
    </syn-option>

    <syn-option value="2">
      <syn-icon name="phone" slot="prefix"></syn-icon>
      <syn-icon name="check_circle_outline" slot="suffix"></syn-icon>
      Phone
    </syn-option>

    <syn-option value="3">
      <syn-icon name="chat_bubble_outline" slot="prefix"></syn-icon>
      <syn-icon name="check_circle_outline" slot="suffix"></syn-icon>
      Chat
    </syn-option>
  </syn-optgroup>
</syn-select>
```
