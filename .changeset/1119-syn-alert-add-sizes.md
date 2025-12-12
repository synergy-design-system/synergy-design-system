---
"@synergy-design-system/angular": minor
"@synergy-design-system/components": minor
"@synergy-design-system/mcp": minor
"@synergy-design-system/vue": minor
---

feat: ✨ syn alert add sizes (#1119)

We have added a new property `size` to `<syn-alert>` that can be set to `small`, `medium` (the default) and `large`.
The property can also be used with Synergy `defaultSettings`.

We also adjusted `<syn-validate>` to draw the `size` attribute of its `slotted` `HTMLInputElement`. If a `size` property is found on the rendered input, it will be forwarded to the rendered `<syn-alert>` if you use `variant="inline"`.
