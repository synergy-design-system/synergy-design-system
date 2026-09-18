---
"@synergy-design-system/components": patch
"@synergy-design-system/metadata": patch
---

fix: 🐛 `<syn-progress-ring>` renders twice during render and property updates (#1328)

This release fixes an issue with `<syn-progress-ring>` that triggered multiple render calls when inserting it into the DOM.
