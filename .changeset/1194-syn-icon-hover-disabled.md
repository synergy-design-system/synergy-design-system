---
"@synergy-design-system/components": patch
"@synergy-design-system/mcp": patch
---

fix: 🐛 `<syn-menu-item>`: Slotted `<syn-icon>` elements not visible on hover (#1194)

This release fixes a bug that accidentally set the color of slotted elements in `<syn-menu-item>` to white which lead to the icons appear to be invisible.
