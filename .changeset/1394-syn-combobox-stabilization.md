---
"@synergy-design-system/angular": minor
"@synergy-design-system/components": minor
"@synergy-design-system/metadata": minor
"@synergy-design-system/react": minor
"@synergy-design-system/tokens": minor
"@synergy-design-system/vue": minor
---

feat: ✨ New features and fixes for `<syn-combobox>` and `<syn-select>` (#1394)

This release adds various smaller adjustments and features to the `<syn-combobox>` and `<syn-select>` components:

**Features**:

- #1239: Filtering can now use string values (e.g. `contains` or `none`). This is also included in the default settings.
- #1371: Added a custom event that is emitted when the bottom of the scroll list is reached. This makes it possible to create endless scrolling with `<syn-combobox>` and `<syn-select>`.

**Fixes**:

- #1391: Fixed an issue where `<syn-combobox>` would still show the `clear` icon in an empty combobox after resetting the value and with an empty search field.
- #1391: Fixed an issue with `<syn-combobox>` showing the placeholder attribute when the user has already selected a value.
