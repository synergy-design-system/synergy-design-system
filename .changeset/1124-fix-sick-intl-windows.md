---
"@synergy-design-system/fonts": patch
"@synergy-design-system/mcp": patch
---

fix: 🐛 SICK Intl Semibold does not display correctly on Windows 11 (#1124)

This release fixes an issue that only appears when using Windows 11 (and possibly Windows 10).
The exported font used cleartype annotations which lead to broken renderings on certain font sizes.
