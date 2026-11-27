## Disabled

Set disabled on individual syn-radio or syn-radio-button options that are unavailable, and explain why they cannot be selected. The group itself has no disabled attribute.

```html
<syn-radio-group label="This is a label" help-text="This is disabled" name="a">
  <syn-radio value="1">Option</syn-radio>
  <syn-radio value="2" disabled="">Option</syn-radio>
  <syn-radio value="3">Option</syn-radio>
</syn-radio-group>
```
