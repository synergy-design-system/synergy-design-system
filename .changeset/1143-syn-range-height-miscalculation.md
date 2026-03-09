---
"@synergy-design-system/components": patch
"@synergy-design-system/mcp": patch
---

fix: 🐛 `<syn-range>` content may bleed into the label when rendering a prefix or suffix slot and using ticks (#1143)

This release fixes an issue with `<syn-range>` that caused a layout miscalculation when using prefix and suffix slots in combination with slots.
