## Default

Options define the selectable items within various form controls such as select.

```html
<syn-select label="Select one" size="medium" placement="bottom" form="">
  <syn-option
    value="Option_1"
    role="option"
    aria-selected="false"
    aria-disabled="false"
  >
    Option 1
  </syn-option>

  <syn-option
    value="Option_2"
    role="option"
    aria-selected="false"
    aria-disabled="false"
    >Option 2</syn-option
  >
  <syn-option
    value="Option_3"
    role="option"
    aria-selected="false"
    aria-disabled="false"
    >Option 3</syn-option
  >
</syn-select>
```

---

## Disabled

Use the disabled attribute to disable an option and prevent it from being selected.

```html
<syn-select label="Select one" size="medium" placement="bottom" form="">
  <syn-option
    value="option-1"
    role="option"
    aria-selected="false"
    aria-disabled="false"
    >Email</syn-option
  >
  <syn-option
    value="option-2"
    disabled=""
    role="option"
    aria-selected="false"
    aria-disabled="true"
    >Phone</syn-option
  >
  <syn-option
    value="option-3"
    role="option"
    aria-selected="false"
    aria-disabled="false"
    >Chat</syn-option
  >
</syn-select>
```

---

## Prefix And Suffix

Add icons to the start and end of menu items using the prefix and suffix slots.

```html
<syn-select label="Select one" size="medium" placement="bottom" form="">
  <syn-option
    value="option-1"
    role="option"
    aria-selected="false"
    aria-disabled="false"
  >
    <syn-icon
      slot="prefix"
      name="email"
      aria-hidden="true"
      library="default"
    ></syn-icon>
    Email
    <syn-icon
      slot="suffix"
      name="check_circle_outline"
      aria-hidden="true"
      library="default"
    ></syn-icon>
  </syn-option>

  <syn-option
    value="option-2"
    role="option"
    aria-selected="false"
    aria-disabled="false"
  >
    <syn-icon
      slot="prefix"
      name="local_phone"
      aria-hidden="true"
      library="default"
    ></syn-icon>
    Phone
    <syn-icon
      slot="suffix"
      name="check_circle_outline"
      aria-hidden="true"
      library="default"
    ></syn-icon>
  </syn-option>

  <syn-option
    value="option-3"
    role="option"
    aria-selected="false"
    aria-disabled="false"
  >
    <syn-icon
      slot="prefix"
      name="chat_bubble_outline"
      aria-hidden="true"
      library="default"
    ></syn-icon>
    Chat
    <syn-icon
      slot="suffix"
      name="check_circle_outline"
      aria-hidden="true"
      library="default"
    ></syn-icon>
  </syn-option>
</syn-select>
```
