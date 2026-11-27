## Custom Track Offset

You can customize the initial offset of the active track using the --track-active-offset custom property.

```html
<syn-range
  class="custom-track-offset"
  max="50"
  min="-50"
  value="-15"
></syn-range>
<style>
  .custom-track-offset {
    --track-active-offset: 50%;
  }
</style>
```
