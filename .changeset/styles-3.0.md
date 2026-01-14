---
"@synergy-design-system/styles": major
---

feat: 💥 Removal of variable fallbacks and token alignment

This release removes the compatibility layer that was introduced in Synergy v2 to support misaligned versions between styles and tokens packages.

**Key Changes:**
- **Breaking:** Variable fallbacks removed - all CSS custom property fallbacks have been eliminated to reduce bundle size
- **Breaking:** Token package alignment - styles now has a `peerDependency` on `@synergy-design-system/tokens@^3.0.0`
- Improved bundle size due to removal of fallback compatibility layer

**Migration Steps:**
- Ensure you're using the latest version of `@synergy-design-system/tokens` (v3.0.0 or higher)
- The tokens package is now automatically installed as a peer dependency

For detailed migration instructions, please refer to the [breaking changes documentation](https://synergy-design-system.github.io/?path=/docs/packages-styles-breaking-changes--docs).
