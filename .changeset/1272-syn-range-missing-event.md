---
"@synergy-design-system/components": patch
"@synergy-design-system/metadata": patch
---

fix: 🐛 syn-range now emits syn-change after programmatic value updates (#1272)

This release fixes an issue where `syn-change` events where not fired for subsequent user interactions after a value was set in code.
