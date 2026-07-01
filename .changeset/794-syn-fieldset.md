---
"@synergy-design-system/angular": minor
"@synergy-design-system/components": minor
"@synergy-design-system/metadata": minor
"@synergy-design-system/react": minor
"@synergy-design-system/tokens": minor
"@synergy-design-system/vue": minor
---

feat: ✨ syn-fieldset (#794)

Adds a new `<syn-fieldset>` component for grouping related form controls with semantic markup and accessibility support.

- Supports `legend` and `description` via attributes and named slots.
- Adds configurable `layout` (`one-column`/`two-columns`) and `item-spacing` (`normal`/`dense`).
- Syncs disabled state to nested form controls.

Adds a new property `layout` to `<syn-radio-group>`. This can be used to display slotted `<syn-radio>` elements horizontally.
