# @synergy-design-system/react

## 3.0.0

### Major Changes

- [#1160](https://github.com/synergy-design-system/synergy-design-system/pull/1160) [`669cbcb`](https://github.com/synergy-design-system/synergy-design-system/commit/669cbcb9cccce72134beac99ac12a2591f3e3c74) Thanks [@schilchSICKAG](https://github.com/schilchSICKAG)! - Released on: 2026-02-02

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

### Patch Changes

- Updated dependencies [[`669cbcb`](https://github.com/synergy-design-system/synergy-design-system/commit/669cbcb9cccce72134beac99ac12a2591f3e3c74), [`669cbcb`](https://github.com/synergy-design-system/synergy-design-system/commit/669cbcb9cccce72134beac99ac12a2591f3e3c74)]:
  - @synergy-design-system/components@3.0.0
  - @synergy-design-system/tokens@3.0.0

## 2.77.1

### Patch Changes

- [#1148](https://github.com/synergy-design-system/synergy-design-system/pull/1148) [`73b7011`](https://github.com/synergy-design-system/synergy-design-system/commit/73b70118ae21bc58c83cbfeb9e2e8447873803a6) Thanks [@schilchSICKAG](https://github.com/schilchSICKAG)! - Released on: 2026-01-08

  fix: 🐛 Minor dependency updates (#258)

- Updated dependencies [[`73b7011`](https://github.com/synergy-design-system/synergy-design-system/commit/73b70118ae21bc58c83cbfeb9e2e8447873803a6)]:
  - @synergy-design-system/components@2.77.1
  - @synergy-design-system/tokens@2.48.2

## 2.77.0

### Patch Changes

- Updated dependencies []:
  - @synergy-design-system/components@2.77.0

## 2.76.0

### Patch Changes

- Updated dependencies [[`dc56e6f`](https://github.com/synergy-design-system/synergy-design-system/commit/dc56e6f0ebc08e44b23bdbdaa6fffa03abc26e9e)]:
  - @synergy-design-system/components@2.76.0
  - @synergy-design-system/tokens@2.48.0

## 2.75.0

### Patch Changes

- Updated dependencies [[`6b4b7e2`](https://github.com/synergy-design-system/synergy-design-system/commit/6b4b7e2940b5c87e44d5da6030354ec0e21f2f38)]:
  - @synergy-design-system/components@2.75.0
  - @synergy-design-system/tokens@2.47.0

## 2.74.4

### Patch Changes

- Updated dependencies [[`53bd655`](https://github.com/synergy-design-system/synergy-design-system/commit/53bd655f465b76c2aa7d57449750b99e8fcfb500)]:
  - @synergy-design-system/components@2.74.4

## 2.74.3

### Patch Changes

- Updated dependencies [[`6cc7376`](https://github.com/synergy-design-system/synergy-design-system/commit/6cc737681f2b137702f3e95b0a666ae6f28b5039)]:
  - @synergy-design-system/components@2.74.3

## 2.74.2

### Patch Changes

- Updated dependencies [[`212b5bd`](https://github.com/synergy-design-system/synergy-design-system/commit/212b5bd29087b10d1fe0e6bbb94c97090b7b4f74)]:
  - @synergy-design-system/components@2.74.2

## 2.74.1

### Patch Changes

- Updated dependencies [[`82ea066`](https://github.com/synergy-design-system/synergy-design-system/commit/82ea066fa18e35831d94f22c7ac620135bc8c334)]:
  - @synergy-design-system/components@2.74.1

## 2.74.0

### Patch Changes

- Updated dependencies [[`102e650`](https://github.com/synergy-design-system/synergy-design-system/commit/102e6503af3a72d0d2529ed216ce6053a07b9607)]:
  - @synergy-design-system/components@2.74.0

## 2.73.0

### Patch Changes

- Updated dependencies [[`740816b`](https://github.com/synergy-design-system/synergy-design-system/commit/740816b1a86768e7f2fed5516241bdb3a9df4ef7)]:
  - @synergy-design-system/components@2.73.0
  - @synergy-design-system/tokens@2.46.0

## 2.72.0

### Patch Changes

- Updated dependencies [[`7de2441`](https://github.com/synergy-design-system/synergy-design-system/commit/7de244110cf55bb3788e26f65704194bfc861412)]:
  - @synergy-design-system/components@2.72.0

## 2.71.0

### Patch Changes

- Updated dependencies [[`ab15da3`](https://github.com/synergy-design-system/synergy-design-system/commit/ab15da3bf8956f1d523ca3115a466205474e071f)]:
  - @synergy-design-system/components@2.71.0

## 2.70.0

### Patch Changes

- Updated dependencies [[`d414abe`](https://github.com/synergy-design-system/synergy-design-system/commit/d414abe26eaee05928a8f1914748de1866837804)]:
  - @synergy-design-system/components@2.70.0

## 2.69.0

### Patch Changes

- Updated dependencies [[`f9f544f`](https://github.com/synergy-design-system/synergy-design-system/commit/f9f544feb2adb3edef95bd1b50a303440e0c8385)]:
  - @synergy-design-system/components@2.69.0

## 2.68.0

### Patch Changes

- Updated dependencies [[`7c97c2e`](https://github.com/synergy-design-system/synergy-design-system/commit/7c97c2eed665902484eb07d7dc23534bf2064f08)]:
  - @synergy-design-system/components@2.68.0

## 2.67.0

### Patch Changes

- Updated dependencies [[`b82f1d9`](https://github.com/synergy-design-system/synergy-design-system/commit/b82f1d961aa4c2898f41b7c55eb3b7d43220878c)]:
  - @synergy-design-system/components@2.67.0
  - @synergy-design-system/tokens@2.45.0

## 2.66.0

### Patch Changes

- Updated dependencies [[`27adaae`](https://github.com/synergy-design-system/synergy-design-system/commit/27adaaeab60487ca4c92be8fd15b09eb4f09fdc6)]:
  - @synergy-design-system/components@2.66.0

## 2.65.0

### Patch Changes

- Updated dependencies [[`e27f95b`](https://github.com/synergy-design-system/synergy-design-system/commit/e27f95ba3e5bd1f494db80ad51d0c1957b8d2204)]:
  - @synergy-design-system/components@2.65.0

## 2.64.1

### Patch Changes

- Updated dependencies [[`92973ed`](https://github.com/synergy-design-system/synergy-design-system/commit/92973ed0242ceb836dfe662cbe8e81b7a5364c2e)]:
  - @synergy-design-system/components@2.64.1

## 2.64.0

### Patch Changes

- Updated dependencies [[`ac24e63`](https://github.com/synergy-design-system/synergy-design-system/commit/ac24e6379862c7e60b5d5293614f0d804eeb7388)]:
  - @synergy-design-system/components@2.64.0
  - @synergy-design-system/tokens@2.44.0

## 2.63.0

### Patch Changes

- Updated dependencies [[`3f893f9`](https://github.com/synergy-design-system/synergy-design-system/commit/3f893f9d9d04cbfa3ae530bf8e3ecbcfe7be022f)]:
  - @synergy-design-system/components@2.63.0

## 2.62.0

### Patch Changes

- Updated dependencies [[`515226c`](https://github.com/synergy-design-system/synergy-design-system/commit/515226c44f8bba7b2b4b80cdd0f21f3237f0670d)]:
  - @synergy-design-system/components@2.62.0
  - @synergy-design-system/tokens@2.43.0

## 2.61.0

### Patch Changes

- Updated dependencies [[`1392ed2`](https://github.com/synergy-design-system/synergy-design-system/commit/1392ed23aba2b628344356adba0a78e1e8beff84)]:
  - @synergy-design-system/components@2.61.0
  - @synergy-design-system/tokens@2.42.0

## 2.60.0

### Patch Changes

- Updated dependencies [[`6e616f5`](https://github.com/synergy-design-system/synergy-design-system/commit/6e616f51007ebde567eeb33190518159becc7c32)]:
  - @synergy-design-system/components@2.60.0
  - @synergy-design-system/tokens@2.41.0

## 2.59.0

### Patch Changes

- Updated dependencies [[`81dae1e`](https://github.com/synergy-design-system/synergy-design-system/commit/81dae1e912bcbdefb4346b4a3bbc245f7fac9f12)]:
  - @synergy-design-system/components@2.59.0
  - @synergy-design-system/tokens@2.40.0

## 2.58.0

### Patch Changes

- Updated dependencies [[`0ae632c`](https://github.com/synergy-design-system/synergy-design-system/commit/0ae632c5331f0583ba652add18755df01766cbf5)]:
  - @synergy-design-system/components@2.58.0
  - @synergy-design-system/tokens@2.39.0

## 2.57.0

### Patch Changes

- Updated dependencies [[`bc0bc63`](https://github.com/synergy-design-system/synergy-design-system/commit/bc0bc639a996fc75c57194244596d5733097389d)]:
  - @synergy-design-system/components@2.57.0
  - @synergy-design-system/tokens@2.38.0
