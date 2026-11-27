## Disabled

Use the disabled attribute to disable an option and prevent it from being selected.

```html
<syn-select label="Select one">
  <syn-option value="option-1">Email</syn-option>
  <syn-option value="option-2" disabled="">Phone</syn-option>
  <syn-option value="option-3">Chat</syn-option>

  <syn-option value="option-4" disabled="">
    <syn-icon name="chat_bubble_outline" slot="prefix"></syn-icon>
    <syn-icon name="check_circle_outline" slot="suffix"></syn-icon>
    Other
  </syn-option>
  <!-- /Regression#1277 -->
</syn-select>
```
