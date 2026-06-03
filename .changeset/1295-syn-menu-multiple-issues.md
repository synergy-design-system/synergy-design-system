---
"@synergy-design-system/components": patch
"@synergy-design-system/metadata": patch
---

fix: 🐛 `<syn-menu>` multiple issues (#1295)

This release fixes multiple issues when using `<syn-menu>`:

- submenus no longer stay open when leaving the browser window (#882)
- `<syn-menu-item>` wrapped in tooltip can now be used reliably (including navigation and selection) (#1162)
- `<syn-menu-item>` no longer steals focus on hover (#1286)
