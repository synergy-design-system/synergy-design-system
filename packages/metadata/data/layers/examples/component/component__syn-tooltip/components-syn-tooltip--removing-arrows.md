## Removing Arrows

You can control the size of tooltip arrows by overriding the --syn-tooltip-arrow-size design token. To remove them, set the value to 0 as shown below.

```html
<syn-tooltip
  content="This is a tooltip"
  style="--syn-tooltip-arrow-size: 0"
  open=""
>
  <syn-button>No Arrow</syn-button>
</syn-tooltip>
```
