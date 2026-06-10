---
"@synergy-design-system/components": patch
"@synergy-design-system/metadata": patch
---

fix: 🐛 `<syn-dialog>` Font looks blurry when the prevent close animation is run (#1285)

Fixes an issue introduced with [Synergy@3.11.1](https://synergy-design-system.github.io/?path=/docs/packages-components-changelog--docs#3111) that could lead to text looking blurry in `<syn-dialog>` in Chromium based browsers.
