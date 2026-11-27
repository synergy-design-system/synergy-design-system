## Default

Tooltips display additional information based on a specific action.A tooltip’s target is its first child element, so you should only wrap one element inside of the tooltip. If you need the tooltip to show up for multiple elements, nest them inside a container first.Tooltips use display: contents so they won’t interfere with how elements are positioned in a flex or grid layout.

```html
<syn-tooltip content="This is a tooltip" open="true">
  <syn-button>Hover me</syn-button>
</syn-tooltip>
```
