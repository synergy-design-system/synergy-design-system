---
"@synergy-design-system/components": patch
"@synergy-design-system/mcp": patch
---

fix: 🐛 Angular: `<syn-validate>` does not work when dynamically added to the DOM (#851)

This release fixes an issue that made `<syn-validate>` ignore its set `customValidationMessage` when the component gets dynamically added to the DOM in Angular. It does so by preferring the provided `customValidationMessage` over of the internally available `validationMessage`, which could be empty under certain conditions.
