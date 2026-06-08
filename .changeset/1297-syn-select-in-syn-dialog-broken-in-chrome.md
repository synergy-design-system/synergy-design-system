---
"@synergy-design-system/components": patch
"@synergy-design-system/metadata": patch
---

fix: 🐛 `<syn-select>` and `<syn-dropdown>` not opening correctly when slotted in `<syn-dialog>` or `<syn-drawer>` (#1297)

This release fixes an issue with multiple Synergy components automatically closing when opened in a `<syn-dialog>` or `<syn-drawer>` element in Chromium based browsers. This happens because Chromium now uses a more aggressive method of checking the active focused element when using `popover`.
