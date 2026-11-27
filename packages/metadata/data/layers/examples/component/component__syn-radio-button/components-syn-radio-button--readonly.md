## Readonly

Set readonly on every syn-radio-button in the group to show the current selection without allowing changes. Setting it only on the selected option leaves other buttons available.

```html
<div
  style="display: flex; flex-direction: column; gap: var(--syn-spacing-medium)"
>
  <syn-radio-group label="Select an option" name="b" value="1">
    <syn-radio-button value="1" readonly="">Option 1</syn-radio-button>
    <syn-radio-button value="2" readonly="">Option 2</syn-radio-button>
    <syn-radio-button value="3" readonly="">Option 3</syn-radio-button>
  </syn-radio-group>
  <syn-radio-group label="Select an option" name="b" value="1">
    <syn-radio-button value="1" readonly="">Option 1</syn-radio-button>
    <syn-radio-button value="2" readonly="">Option 2</syn-radio-button>
    <syn-radio-button value="3">Option 3</syn-radio-button>
  </syn-radio-group>
</div>
```
