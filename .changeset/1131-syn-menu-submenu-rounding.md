---
"@synergy-design-system/components": patch
"@synergy-design-system/mcp": patch
---

fix: 🐛 syn menu submenu rounding (#1131)

Fixes an issue with `<syn-menu-item>` when rendering submenus.
Submenus did not take the changed `border-radius` of `<syn-menu>` into account, leading to squared borders in the `SICK 2025` themes.
