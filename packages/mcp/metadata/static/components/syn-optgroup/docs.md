## Default

Use <syn-optgroup> to group listbox items visually.

```html
<syn-select size="medium" placement="bottom" form="">
  <syn-optgroup label="Section 1">
    <syn-option
      value="1"
      role="option"
      aria-selected="false"
      aria-disabled="false"
      >Option 1</syn-option
    >
    <syn-option
      value="2"
      role="option"
      aria-selected="false"
      aria-disabled="false"
      >Option 2</syn-option
    >
    <syn-option
      value="3"
      role="option"
      aria-selected="false"
      aria-disabled="false"
      >Option 3</syn-option
    >
  </syn-optgroup>

  <syn-optgroup label="Section 2">
    <syn-option
      value="4"
      role="option"
      aria-selected="false"
      aria-disabled="false"
      >Option 4</syn-option
    >
  </syn-optgroup>
</syn-select>
```

---

## Disabled

Use the disabled attribute in the <syn-optgroup> to disable the Section and prevent it from being selected.

```html
<syn-select size="medium" placement="bottom" form="">
  <syn-optgroup disabled="">
    <span slot="label">Section 1</span>
    <syn-option
      value="1"
      role="option"
      aria-selected="false"
      aria-disabled="true"
      disabled=""
      >Option</syn-option
    >
    <syn-option
      value="2"
      role="option"
      aria-selected="false"
      aria-disabled="true"
      disabled=""
      >Option</syn-option
    >
    <syn-option
      value="3"
      role="option"
      aria-selected="false"
      aria-disabled="true"
      disabled=""
      >Option</syn-option
    >
  </syn-optgroup>
</syn-select>
```

---

## Prefix And Suffix

Add icons to the start and end of menu items using the prefix and suffix slots.

```html
<syn-select size="medium" placement="bottom" form="">
  <syn-optgroup label="Contact Support">
    <syn-icon
      name="contact_support"
      slot="prefix"
      aria-hidden="true"
      library="default"
    ></syn-icon>
    <syn-icon
      name="check_circle_outline"
      slot="suffix"
      aria-hidden="true"
      library="default"
    ></syn-icon>

    <syn-option
      value="1"
      role="option"
      aria-selected="false"
      aria-disabled="false"
    >
      <syn-icon
        name="mail"
        slot="prefix"
        aria-hidden="true"
        library="default"
      ></syn-icon>
      <syn-icon
        name="check_circle_outline"
        slot="suffix"
        aria-hidden="true"
        library="default"
      ></syn-icon>
      E-Mail
    </syn-option>

    <syn-option
      value="2"
      role="option"
      aria-selected="false"
      aria-disabled="false"
    >
      <syn-icon
        name="phone"
        slot="prefix"
        aria-hidden="true"
        library="default"
      ></syn-icon>
      <syn-icon
        name="check_circle_outline"
        slot="suffix"
        aria-hidden="true"
        library="default"
      ></syn-icon>
      Phone
    </syn-option>

    <syn-option
      value="3"
      role="option"
      aria-selected="false"
      aria-disabled="false"
    >
      <syn-icon
        name="chat_bubble_outline"
        slot="prefix"
        aria-hidden="true"
        library="default"
      ></syn-icon>
      <syn-icon
        name="check_circle_outline"
        slot="suffix"
        aria-hidden="true"
        library="default"
      ></syn-icon>
      Chat
    </syn-option>
  </syn-optgroup>
</syn-select>
```
