---
"@synergy-design-system/tokens": major
---

feat: 💥 New default theme SICK 2025

This release introduces SICK 2025 as the new default theme. The `light.css` and `dark.css` imports now point to SICK 2025 instead of SICK 2018.

**Key Changes:**
- **Breaking:** Default theme changed to SICK 2025 - if you want to continue using SICK 2018, import `sick2018_light.css` or `sick2018_dark.css` instead
- **Deprecation Notice:** SICK 2018 theme will be removed in a future major release (expected 2027+)
- **Deprecation Notice:** `--syn-page-background` token renamed to `--syn-page-background-color`
- **Deprecation Notice:** Token Studio code in `src/figma-tokens` will be removed in a future release

For detailed migration instructions, please refer to the [breaking changes documentation](https://synergy-design-system.github.io/?path=/docs/packages-tokens-breaking-changes--docs).
