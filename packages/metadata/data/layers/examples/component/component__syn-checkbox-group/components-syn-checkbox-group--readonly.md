## Readonly

Set readonly on each syn-checkbox whose checked state users should inspect but not change. To freeze the entire group, apply it to every option, not just the checked ones.

```html
<syn-checkbox-group label="This is a label">
  <syn-checkbox readonly="" name="checkbox-1" value="checkbox-1"
    >Option</syn-checkbox
  >

  <syn-checkbox checked="" readonly="" name="checkbox-2" value="checkbox-2"
    >Option</syn-checkbox
  >

  <syn-checkbox name="checkbox-3" value="checkbox-3">Option</syn-checkbox>
</syn-checkbox-group>
```
