---
"@synergy-design-system/components": patch
---

fix: 🐛 dialog with details scroll issue in Chrome (#1373)

- Fixes a Chrome-specific regression where collapsing a details section inside a dialog could leave the content area at its previous expanded height.
