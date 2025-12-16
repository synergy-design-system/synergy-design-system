---
"@synergy-design-system/fonts": patch
"@synergy-design-system/mcp": patch
---

fix: 🐛 SICK Intl Semibold does not display correctly on Windows (#1124)

This release fixes an issue that only appears when using Windows 10 and 11.
The exported font used cleartype annotations which lead to broken renderings on certain font sizes.

> We are still in the process of optimizing `SICK Intl` and are actively working on a solution for current problems like blurry rendering.
