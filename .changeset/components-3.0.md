---
"@synergy-design-system/angular": major
"@synergy-design-system/components": major
"@synergy-design-system/vue": major
"@synergy-design-system/react": major
---

feat: 💥 Component updates and deprecations for Synergy 3.0

This release removes deprecated attributes, updates defaults, and improves bundle size by removing fallback variables.

**Key Changes:**
- **Breaking:** Removed `hoist` attribute from `<syn-combobox>`, `<syn-dropdown>`, `<syn-select>`, and `<syn-tooltip>` (no longer needed with Popover API support)
- **Breaking:** Removed `strategy` attribute from `<syn-popup>` (no longer needed with Popover API support)
- **Breaking:** Removed `rail` attribute from `<syn-side-nav>` (use `variant="rail"` instead)
- **Breaking:** Changed default for `<syn-input>` `numeric-strategy` from "native" to "modern"
- **Breaking:** Variable fallbacks removed - all CSS custom property fallbacks have been eliminated to reduce bundle size
- **Breaking:** Token package alignment - components now has a `peerDependency` on `@synergy-design-system/tokens@^3.0.0`
- **Breaking:** Angular support - removed support for Angular 16 and 17 (no longer actively maintained)
- **Deprecation Notice:** Icon migration utilities (`migrateIconName`, `migrateIconNameFilled`, `migrationLibrary`) are now deprecated
- **Deprecation Notice:** `enableExperimentalSettingEmitEvents` is now deprecated in favor of `enableSettingEmitEvents`

**Migration Steps:**
- Remove all `hoist` and `strategy` attributes from affected components
- Update `<syn-side-nav rail>` to `<syn-side-nav variant="rail">`
- Remove `numeric-strategy="modern"` from `<syn-input>` as it's now the default
- Update Angular projects to version 18 or higher
- Replace `enableExperimentalSettingEmitEvents` with `enableSettingEmitEvents`
- Ensure matching versions of components and tokens packages

For detailed migration instructions, please refer to the [breaking changes documentation](https://synergy-design-system.github.io/?path=/docs/packages-components-breaking-changes--docs).
