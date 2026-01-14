---
"@synergy-design-system/assets": major
---

feat: 💥 New default iconset SICK 2025

This release introduces SICK 2025 as the new default iconset and restructures the filesystem layout for better organization and maintainability.

**Key Changes:**
- **Breaking:** Filesystem structure reorganized - icons, logos, and system-icons are now organized under `src/sick2018/` and `src/sick2025/` directories
- **Breaking:** Default iconset changed to SICK 2025 - `createSpriteSheet` and CLI commands now use SICK 2025 icons by default
- **Breaking:** Export mappings updated - the main package export now serves SICK 2025 icons; use `@synergy-design-system/assets/sick2018.js` for SICK 2018 icons
- **Deprecation Notice:** SICK 2018 icons will be removed in a future major release (expected 2027+)

For detailed migration instructions, please refer to the [breaking changes documentation](https://synergy-design-system.github.io/?path=/docs/packages-assets-breaking-changes--docs).
