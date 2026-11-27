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
