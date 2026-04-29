---
"@synergy-design-system/components": patch
"@synergy-design-system/metadata": patch
---

fix: 🐛 `<syn-icon-button>` is not visible when `disabled` in dark mode (#1257)

This release fixes an issue where disabled `<syn-icon-button>` components were appearing too light in dark mode, making them difficult to see. The disabled state styling now properly contrasts with the dark background.
