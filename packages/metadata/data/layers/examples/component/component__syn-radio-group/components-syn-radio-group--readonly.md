## Readonly

Set readonly on every syn-radio or syn-radio-button in the group when users should inspect the selected choice without changing it. Marking only the selected option readonly leaves other choices available.

```html
<syn-radio-group
  label="This is a label"
  help-text="This is readonly"
  name="a"
  value="2"
>
  <syn-radio value="1">Option</syn-radio>
  <syn-radio value="2" readonly="">Option</syn-radio>
  <syn-radio value="3">Option</syn-radio>
</syn-radio-group>
```
