---
"@synergy-design-system/tokens": patch
"@synergy-design-system/mcp": patch
---

fix: 🐛 adjust syn button tokens (#1145)

The original tokens used `inherit` as a fallback value, which did not have any effect but to fall back to the original value.
This is now made explicit to allow the use of button variables in code directly.
