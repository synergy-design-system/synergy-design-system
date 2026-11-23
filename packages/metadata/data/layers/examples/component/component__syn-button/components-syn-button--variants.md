## Variants

Use the variant attribute to set the button’s variant. Variants can be Filled, Outline and Text Buttons. Use the outline attribute to draw outlined buttons with transparent backgrounds. Use the text variant to create text buttons that share the same size as regular buttons but don’t have backgrounds or borders.

```html
<div style="display: flex; flex-direction: row; gap: var(--syn-spacing-large)">
  <syn-button variant="filled">Filled</syn-button>
  <syn-button variant="outline">Outline</syn-button>
  <syn-button variant="text">Text</syn-button>
</div>
```
