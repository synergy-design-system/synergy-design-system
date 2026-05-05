---
"@synergy-design-system/components": patch
"@synergy-design-system/metadata": patch
---

fix: 🐛 `<syn-select>` and `<syn-combobox>` have invalid selected value if the selected option changes (#1265)

This release ensures `<syn-select>` and `<syn-combobox>` always show the current selected option text.
If a selected option name changes, the field now updates right away instead of showing outdated text.
