---
"@synergy-design-system/components": patch
"@synergy-design-system/mcp": patch
---

fix: 🐛 `<syn-option>` corner radius may look blurry or too sharp on low resolution screens (#1200)

This release fixes an issue with `<syn-option>` in combination with the SICK2025 theme.
When using this combination, the `border-radius` looked either blurry or too sharp on low resolution screens.
