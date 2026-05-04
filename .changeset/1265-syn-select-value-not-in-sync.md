---
"@synergy-design-system/components": patch
"@synergy-design-system/metadata": patch
---

fix: 🐛 `<syn-select>` has invalid value if the selected option changes (#1265)

This release fixes an issue that appears when changing the content of the selected `<syn-option>` dynamically.
The value was not updated, resulting in a stale state with the old value displayed as the selects value and the new options content as the selectable content.
