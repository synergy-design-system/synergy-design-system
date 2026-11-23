## Variants

Use the variant attribute to set the button’s variant. Variants can be Filled, Outline. There is no Text variant.

```html
<div
  style="display: flex; gap: var(--syn-spacing-large); flex-direction: column"
>
  <syn-button-group variant="outline" label="Variant (outline)">
    <syn-button>Left</syn-button>
    <syn-button>Center</syn-button>
    <syn-button>Right</syn-button>
  </syn-button-group>

  <syn-button-group variant="filled" label="Variant (filled)">
    <syn-button>Left</syn-button>
    <syn-button>Center</syn-button>
    <syn-button>Right</syn-button>
  </syn-button-group>
</div>
```
