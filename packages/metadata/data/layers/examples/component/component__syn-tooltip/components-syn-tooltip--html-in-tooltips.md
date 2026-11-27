## HTML In Tooltips

Use the content slot to create tooltips with HTML content. Tooltips are designed only for text and presentational elements. Avoid placing interactive content, such as buttons, links, and form controls, in a tooltip.

```html
<syn-tooltip open="">
  <div slot="content">
    I'm not <strong>just</strong> a tooltip, I'm a <em>tooltip</em> with HTML!
  </div>

  <syn-button>Hover me</syn-button>
</syn-tooltip>
```
