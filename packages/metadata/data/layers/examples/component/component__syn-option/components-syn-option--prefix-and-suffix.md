## Prefix And Suffix

Add icons to the start and end of menu items using the prefix and suffix slots.

```html
<syn-select label="Select one" open="">
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
