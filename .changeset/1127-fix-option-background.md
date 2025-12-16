---
"@synergy-design-system/components": patch
"@synergy-design-system/mcp": patch
---

fix: 🐛 Adjust `<syn-option>` and `<syn-menu-item>` interactive background (#1127)

Minor adjustments for `<syn-option>` and `<syn-menu-item>` hover and focus states to better mimic the effects as detailed in Figma for the SICK 2025 themes.
Both components now use a combination of `background` and `border-radius` to show the `<syn-option>` with an inset highlight color, allowing to better match the wanted spacings.
