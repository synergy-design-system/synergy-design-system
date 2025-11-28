# Changelog

## 2.67.0

### Minor Changes

- [#1092](https://github.com/synergy-design-system/synergy-design-system/pull/1092) [`b82f1d9`](https://github.com/synergy-design-system/synergy-design-system/commit/b82f1d961aa4c2898f41b7c55eb3b7d43220878c) Thanks [@kirchsuSICKAG](https://github.com/kirchsuSICKAG)! - Released on: 2025-11-28

  feat: ✨ Brand update for `syn-file` (#953)

### Patch Changes

- Updated dependencies [[`b82f1d9`](https://github.com/synergy-design-system/synergy-design-system/commit/b82f1d961aa4c2898f41b7c55eb3b7d43220878c)]:
  - @synergy-design-system/tokens@2.45.0

## 2.66.0

### Minor Changes

- [#1105](https://github.com/synergy-design-system/synergy-design-system/pull/1105) [`27adaae`](https://github.com/synergy-design-system/synergy-design-system/commit/27adaaeab60487ca4c92be8fd15b09eb4f09fdc6) Thanks [@schilchSICKAG](https://github.com/schilchSICKAG)! - Released on: 2025-11-28

  feat: ✨ add new error icon (#1101)

## 2.65.0

### Minor Changes

- [#1082](https://github.com/synergy-design-system/synergy-design-system/pull/1082) [`e27f95b`](https://github.com/synergy-design-system/synergy-design-system/commit/e27f95ba3e5bd1f494db80ad51d0c1957b8d2204) Thanks [@schilchSICKAG](https://github.com/schilchSICKAG)! - Released on: 2025-11-27

  feat: ✨ Brand updates for `<syn-tab-group>`, `<syn-tab-panel>` and `<syn-tab>` (#969)

## 2.64.1

### Patch Changes

- [#1098](https://github.com/synergy-design-system/synergy-design-system/pull/1098) [`92973ed`](https://github.com/synergy-design-system/synergy-design-system/commit/92973ed0242ceb836dfe662cbe8e81b7a5364c2e) Thanks [@schilchSICKAG](https://github.com/schilchSICKAG)! - Released on: 2025-11-27

  fix: 🐛 angular validator api fix (#1097)

  Validators do not use the internal `_enabled` property anymore.

## 2.64.0

### Minor Changes

- [#1074](https://github.com/synergy-design-system/synergy-design-system/pull/1074) [`ac24e63`](https://github.com/synergy-design-system/synergy-design-system/commit/ac24e6379862c7e60b5d5293614f0d804eeb7388) Thanks [@schilchSICKAG](https://github.com/schilchSICKAG)! - Released on: 2025-11-27

  feat: ✨ Brand updates for `<syn-menu>`, `<syn-menu-item>` and `<syn-menu-label>` (#958)

### Patch Changes

- Updated dependencies [[`ac24e63`](https://github.com/synergy-design-system/synergy-design-system/commit/ac24e6379862c7e60b5d5293614f0d804eeb7388)]:
  - @synergy-design-system/tokens@2.44.0

## 2.63.0

### Minor Changes

- [#1079](https://github.com/synergy-design-system/synergy-design-system/pull/1079) [`3f893f9`](https://github.com/synergy-design-system/synergy-design-system/commit/3f893f9d9d04cbfa3ae530bf8e3ecbcfe7be022f) Thanks [@schilchSICKAG](https://github.com/schilchSICKAG)! - Released on: 2025-11-25

  feat: ✨ create migration iconset (#1078)

  Added new utilities that help with migrating from 2018 to the new 2025 theme:

  `migrationLibrary`:

  A small migration library, aimed to be a drop in replacement for the default system icon library.
  Please have a look at [Synergies 2025 migration guide](https://synergy-design-system.github.io/?path=/docs/migration-to-synergy-3-0--docs) about how to use this.

  `migrateIconName` and `migrateIconNameFilled`:

  New low level utilities that helps mapping 2018 icons to the new 2025 icon library.
  This may be used if a custom icon library is in place.
  You should use `migrateIconName` in most cases as the default for Synergy are outlined icons.
  In cases where needed, you may also use `migrateIconNameFilled`, which will use the filled variant of Material Icons.

  `setupIcons`:

  High level feature that allows to toggle the default icon library, as well as the system icons via one command. You may use `setupIcons('sick2025');` to switch to the new icon set.

  > Note this only works if you have your icons setup according to the Synergy defaults.

  docs: 📚 Make sure to use correct icons on both 2018 and 2025 stories (#1024)

  Documentation now correctly toggles the icon sets, using the new `migrateIconName` underneath.

## 2.62.0

### Minor Changes

- [#1086](https://github.com/synergy-design-system/synergy-design-system/pull/1086) [`515226c`](https://github.com/synergy-design-system/synergy-design-system/commit/515226c44f8bba7b2b4b80cdd0f21f3237f0670d) Thanks [@schilchSICKAG](https://github.com/schilchSICKAG)! - Released on: 2025-11-19

  feat: ✨ Brand updates for `<syn validate>` (#973)

### Patch Changes

- Updated dependencies [[`515226c`](https://github.com/synergy-design-system/synergy-design-system/commit/515226c44f8bba7b2b4b80cdd0f21f3237f0670d)]:
  - @synergy-design-system/tokens@2.43.0

## 2.61.0

### Minor Changes

- [#1076](https://github.com/synergy-design-system/synergy-design-system/pull/1076) [`1392ed2`](https://github.com/synergy-design-system/synergy-design-system/commit/1392ed23aba2b628344356adba0a78e1e8beff84) Thanks [@schilchSICKAG](https://github.com/schilchSICKAG)! - Released on: 2025-11-18

  feat: ✨ Brand updates for `<syn-side-nav>`, `<syn-prio-nav>` and `<syn-nav-item>` (#967, #960)

### Patch Changes

- Updated dependencies [[`1392ed2`](https://github.com/synergy-design-system/synergy-design-system/commit/1392ed23aba2b628344356adba0a78e1e8beff84)]:
  - @synergy-design-system/tokens@2.42.0

## 2.60.0

### Minor Changes

- [#1063](https://github.com/synergy-design-system/synergy-design-system/pull/1063) [`6e616f5`](https://github.com/synergy-design-system/synergy-design-system/commit/6e616f51007ebde567eeb33190518159becc7c32) Thanks [@kirchsuSICKAG](https://github.com/kirchsuSICKAG)! - Released on: 2025-11-17

  feat: ✨ Brand update for syn-range and syn-range-tick (#966)

### Patch Changes

- Updated dependencies [[`6e616f5`](https://github.com/synergy-design-system/synergy-design-system/commit/6e616f51007ebde567eeb33190518159becc7c32)]:
  - @synergy-design-system/tokens@2.41.0

## 2.59.0

### Minor Changes

- [#1072](https://github.com/synergy-design-system/synergy-design-system/pull/1072) [`81dae1e`](https://github.com/synergy-design-system/synergy-design-system/commit/81dae1e912bcbdefb4346b4a3bbc245f7fac9f12) Thanks [@schilchSICKAG](https://github.com/schilchSICKAG)! - Released on: 2025-11-07

  feat: ✨ Brand updates for `<syn-card>` (#942)

### Patch Changes

- Updated dependencies [[`81dae1e`](https://github.com/synergy-design-system/synergy-design-system/commit/81dae1e912bcbdefb4346b4a3bbc245f7fac9f12)]:
  - @synergy-design-system/tokens@2.40.0

## 2.58.0

### Minor Changes

- [#1073](https://github.com/synergy-design-system/synergy-design-system/pull/1073) [`0ae632c`](https://github.com/synergy-design-system/synergy-design-system/commit/0ae632c5331f0583ba652add18755df01766cbf5) Thanks [@schilchSICKAG](https://github.com/schilchSICKAG)! - Released on: 2025-11-07

  feat: ✨ Brand updates for `<syn-dialog>` (#946)

  Also made sure to have smaller `blur` settings as the token has double the size in Figma.

### Patch Changes

- Updated dependencies [[`0ae632c`](https://github.com/synergy-design-system/synergy-design-system/commit/0ae632c5331f0583ba652add18755df01766cbf5)]:
  - @synergy-design-system/tokens@2.39.0

## 2.57.0

### Minor Changes

- [#1039](https://github.com/synergy-design-system/synergy-design-system/pull/1039) [`bc0bc63`](https://github.com/synergy-design-system/synergy-design-system/commit/bc0bc639a996fc75c57194244596d5733097389d) Thanks [@schilchSICKAG](https://github.com/schilchSICKAG)! - Released on: 2025-11-04

  feat: ✨ changesets migration (#928)

  This PR migrates Synergies ci/cd system from `semantic-release` to `changesets`.

### Patch Changes

- Updated dependencies [[`bc0bc63`](https://github.com/synergy-design-system/synergy-design-system/commit/bc0bc639a996fc75c57194244596d5733097389d)]:
  - @synergy-design-system/tokens@2.38.0

## 2.56.2

(Released on: 2025-11-03)

### Patch Changes

- 🐛 Async delimiter change for pre-selected value in syn-select not displayed ([#1061](https://github.com/synergy-design-system/synergy-design-system/issues/1061)) ([5f6d361](https://github.com/synergy-design-system/synergy-design-system/commit/5f6d36102b669cc34aa44cded47ef49559e74529))

## 2.56.1

(Released on: 2025-11-03)

### Patch Changes

- 🐛 Show scrollbars for closed sticky variant of side-nav ([#1062](https://github.com/synergy-design-system/synergy-design-system/issues/1062)) ([926905b](https://github.com/synergy-design-system/synergy-design-system/commit/926905bd15c87948700e5f32382547b2a1c43821))

## 2.56.0

(Released on: 2025-11-03)

### Minor Changes

- ✨CD update for syn-alert ([#1064](https://github.com/synergy-design-system/synergy-design-system/issues/1064)) ([f9c0656](https://github.com/synergy-design-system/synergy-design-system/commit/f9c0656a268a71ea676ed0b937d8ca77cca2c924))

## 2.55.0

(Released on: 2025-10-29)

### Minor Changes

- ✨ CD update for syn-switch ([#1046](https://github.com/synergy-design-system/synergy-design-system/issues/1046)) ([088ce44](https://github.com/synergy-design-system/synergy-design-system/commit/088ce44da4e948099f10c66d29ca48dc6da3b5bb))

## 2.54.0

(Released on: 2025-10-28)

### Minor Changes

- ✨ CD update for syn-radio ([#1051](https://github.com/synergy-design-system/synergy-design-system/issues/1051)) ([b245f1f](https://github.com/synergy-design-system/synergy-design-system/commit/b245f1f90836a68594ecc8fdc026ecb8b3d284a9))

## 2.53.0

(Released on: 2025-10-27)

### Minor Changes

- ✨ CD update for syn-badge ([#1049](https://github.com/synergy-design-system/synergy-design-system/issues/1049)) ([894e541](https://github.com/synergy-design-system/synergy-design-system/commit/894e5416653a66f5ef81acaaee8b74a1adf7f3ab))

## 2.52.0

(Released on: 2025-10-23)

### Minor Changes

- ✨ CD update for syn-checkbox ([#1050](https://github.com/synergy-design-system/synergy-design-system/issues/1050)) ([1054c71](https://github.com/synergy-design-system/synergy-design-system/commit/1054c71415f36233ba1e242433806aac21d4d19b))

## 2.51.0

(Released on: 2025-10-23)

### Minor Changes

- ✨ CD update for syn-icon-button ([#1048](https://github.com/synergy-design-system/synergy-design-system/issues/1048)) ([d740a54](https://github.com/synergy-design-system/synergy-design-system/commit/d740a5495abd1b36bbe1c1c47fc69ca6a6480549))

## 2.50.0

(Released on: 2025-10-23)

### Minor Changes

- ✨ CD update for syn-breadcrumb ([#1045](https://github.com/synergy-design-system/synergy-design-system/issues/1045)) ([46383b2](https://github.com/synergy-design-system/synergy-design-system/commit/46383b2557d284328cfb49d476a052986cb47d75))

## 2.49.0

(Released on: 2025-10-22)

### Minor Changes

- ✨ CD update for syn-header ([#1047](https://github.com/synergy-design-system/synergy-design-system/issues/1047)) ([6841148](https://github.com/synergy-design-system/synergy-design-system/commit/684114811f939b91a13302cc85300fd1b9b1670e))

## 2.48.0

(Released on: 2025-10-20)

### Minor Changes

- ✨ CD update for syn-drawer ([#1043](https://github.com/synergy-design-system/synergy-design-system/issues/1043)) ([214b367](https://github.com/synergy-design-system/synergy-design-system/commit/214b367e8e603e264ec2718772087601f463439e))

## 2.47.2

(Released on: 2025-10-15)

### Patch Changes

- 🐛 Upgrade packages to latest versions - 10/25 ([#1035](https://github.com/synergy-design-system/synergy-design-system/issues/1035)) ([2fb5693](https://github.com/synergy-design-system/synergy-design-system/commit/2fb5693e536df706ea2c99a8ffc6e4d853442bbf))

## 2.47.1

(Released on: 2025-10-13)

### Patch Changes

- 🐛 Testing syn-popup in angular results in console errors ([#1042](https://github.com/synergy-design-system/synergy-design-system/issues/1042)) ([544e01a](https://github.com/synergy-design-system/synergy-design-system/commit/544e01a1227e4760c76d7a74238a224c7ca31a18))

## 2.47.0

(Released on: 2025-10-13)

### Minor Changes

- ✨ CD update for syn-progress-ring ([#1033](https://github.com/synergy-design-system/synergy-design-system/issues/1033)) ([ba51374](https://github.com/synergy-design-system/synergy-design-system/commit/ba51374977ad486c2a8020586718740e60da7f51))

## 2.46.1

(Released on: 2025-10-08)

### Patch Changes

- 🐛 Subsequently changed delimiter not taking into account for option value ([#1040](https://github.com/synergy-design-system/synergy-design-system/issues/1040)) ([fb45b32](https://github.com/synergy-design-system/synergy-design-system/commit/fb45b32c36d39046da754a294bff79d1a0ffeb42))

## 2.46.0

(Released on: 2025-10-02)

### Minor Changes

- ✨ CD update for syn-divider, syn-tag, syn-accordion, syn-details ([#1028](https://github.com/synergy-design-system/synergy-design-system/issues/1028)) ([b43a81a](https://github.com/synergy-design-system/synergy-design-system/commit/b43a81ab651da6b41668e481981ccbdcc1f07254))

## 2.45.2

(Released on: 2025-10-02)

### Patch Changes

- 🐛 Synergy does not work with Typescript 5.9.x ([#1027](https://github.com/synergy-design-system/synergy-design-system/issues/1027)) ([7f6921c](https://github.com/synergy-design-system/synergy-design-system/commit/7f6921cccb536a9a91e7d61b487fef2ad62dc831))

## 2.45.1

(Released on: 2025-09-30)

### Patch Changes

- 🐛 Synergy element which use syn-popup may break if used in a stacking context ([#1034](https://github.com/synergy-design-system/synergy-design-system/issues/1034)) ([8d23dc7](https://github.com/synergy-design-system/synergy-design-system/commit/8d23dc737e36065a0208bc01a98981541540d0ef))

## 2.45.0

(Released on: 2025-09-24)

### Minor Changes

- ✨ CD update for syn-tooltip ([#1025](https://github.com/synergy-design-system/synergy-design-system/issues/1025)) ([b02ec3d](https://github.com/synergy-design-system/synergy-design-system/commit/b02ec3d7d720a869975dcd19dd29f096b8fd2035))

## 2.44.0

(Released on: 2025-09-24)

### Minor Changes

- ✨ CD update for syn-progress-bar ([#1026](https://github.com/synergy-design-system/synergy-design-system/issues/1026)) ([7bb3a49](https://github.com/synergy-design-system/synergy-design-system/commit/7bb3a49dfec36d4b78180e1a6413bd0f68d80724))

## 2.43.0

(Released on: 2025-09-23)

### Minor Changes

- ✨ CD update for syn-spinner, syn-textarea, syn-link, syn-table ([#1010](https://github.com/synergy-design-system/synergy-design-system/issues/1010)) ([c472bab](https://github.com/synergy-design-system/synergy-design-system/commit/c472bab888e5fb9efd368456e1b8f60953970b63))

## 2.42.0

(Released on: 2025-09-12)

### Minor Changes

- ✨ add new logos for sick2025 ([#1017](https://github.com/synergy-design-system/synergy-design-system/issues/1017)) ([d9eec10](https://github.com/synergy-design-system/synergy-design-system/commit/d9eec1045812f0538d686269254dfc33414d0667))

## 2.41.1

(Released on: 2025-08-28)

### Patch Changes

- 🐛 Add old token as fallback token for new SICK 2025 tokens ([#1006](https://github.com/synergy-design-system/synergy-design-system/issues/1006)) ([e5fff30](https://github.com/synergy-design-system/synergy-design-system/commit/e5fff3060b340ceae2707eefdd06b2f2b32b9224))

## 2.41.0

(Released on: 2025-08-28)

### Minor Changes

- ✨CD update for syn-input ([#1001](https://github.com/synergy-design-system/synergy-design-system/issues/1001)) ([52f42f8](https://github.com/synergy-design-system/synergy-design-system/commit/52f42f8d1f494c54492e54b6ddafc6693dcdb0bb))

## 2.40.1

(Released on: 2025-08-21)

### Patch Changes

- 🐛 Placeholder is clipped for syn-select multiple ([#992](https://github.com/synergy-design-system/synergy-design-system/issues/992)) ([973933e](https://github.com/synergy-design-system/synergy-design-system/commit/973933e477a2cba1611c2f73f77e4e79d755c8a1))

## 2.40.0

(Released on: 2025-08-08)

### Minor Changes

- ✨ syn-icon: Provide a function to switch the icon set to brand2025 ([#974](https://github.com/synergy-design-system/synergy-design-system/issues/974)) ([1482e34](https://github.com/synergy-design-system/synergy-design-system/commit/1482e34f21ce80b9ad6f25e760f87de13d5f70db))

## 2.39.2

(Released on: 2025-08-05)

### Patch Changes

- 🐛 syn-header with syn-side-nav burger menu stops working ([#976](https://github.com/synergy-design-system/synergy-design-system/issues/976)) ([cdf744c](https://github.com/synergy-design-system/synergy-design-system/commit/cdf744ccb77cd83dc700b2816f53aa6e7d7a7da9))

## 2.39.1

(Released on: 2025-07-11)

### Patch Changes

- 🐛 syn-validate - Incorrect state of form element if setting customValidationMessage via custom event ([#916](https://github.com/synergy-design-system/synergy-design-system/issues/916)) ([679a92f](https://github.com/synergy-design-system/synergy-design-system/commit/679a92f4499d2ff81b8fd83c4f78a45375694e56))

## 2.39.0

(Released on: 2025-07-09)

### Minor Changes

- ✨ Add restricted options to syn-combobox ([#914](https://github.com/synergy-design-system/synergy-design-system/issues/914)) ([d1b2e4d](https://github.com/synergy-design-system/synergy-design-system/commit/d1b2e4d0d63bf9f132fa179cc3954e9b21b4ea72))

## 2.38.0

(Released on: 2025-06-24)

### Minor Changes

- ✨ syn-radio-group: Allow numbers as valid value ([#904](https://github.com/synergy-design-system/synergy-design-system/issues/904)) ([e8bb39c](https://github.com/synergy-design-system/synergy-design-system/commit/e8bb39cb4eab164d537338974cc604bc1d028504))

## 2.37.1

(Released on: 2025-06-20)

### Patch Changes

- 🐛 Upgrade packages to latest versions ([#905](https://github.com/synergy-design-system/synergy-design-system/issues/905)) ([64de3cd](https://github.com/synergy-design-system/synergy-design-system/commit/64de3cd72f7ab3c7eeb727a9de85d9d980b27055))

## 2.37.0

(Released on: 2025-06-10)

### Minor Changes

- ✨ Add support for Angular 20 ([#895](https://github.com/synergy-design-system/synergy-design-system/issues/895)) ([b4f575e](https://github.com/synergy-design-system/synergy-design-system/commit/b4f575ed64088969acc49d7db876101eb735c858))

## 2.36.0

(Released on: 2025-06-10)

### Minor Changes

- ✨ Remove static opacity in favor of the new syn-opacity-medium token ([#894](https://github.com/synergy-design-system/synergy-design-system/issues/894)) ([455ab99](https://github.com/synergy-design-system/synergy-design-system/commit/455ab9958caf6ee82cd8bbabcf04fc0e0acd8b4c))

## 2.35.0

(Released on: 2025-06-06)

### Minor Changes

- ✨ assets: Provide infrastructure for fetching new icon sets ([#888](https://github.com/synergy-design-system/synergy-design-system/issues/888)) ([f051b6f](https://github.com/synergy-design-system/synergy-design-system/commit/f051b6f5ed256dcdb5e39ae653c22fc602a7fe5f))

## 2.34.3

(Released on: 2025-06-04)

### Patch Changes

- 🐛 syn-select with numeric value does not work with 0 ([#892](https://github.com/synergy-design-system/synergy-design-system/issues/892)) ([9e09a8f](https://github.com/synergy-design-system/synergy-design-system/commit/9e09a8f4aad6bbc8de9c855f4cabbaa0e22fc706))

## 2.34.2

(Released on: 2025-05-27)

### Patch Changes

- 🐛 syn-input: Numeric inputs having wrong min/max state when setting the value prop externally ([#881](https://github.com/synergy-design-system/synergy-design-system/issues/881)) ([01a3169](https://github.com/synergy-design-system/synergy-design-system/commit/01a31693a6490fb944391dd85b668619607d643f))

## 2.34.1

(Released on: 2025-05-27)

### Patch Changes

- 🐛 syn-nav-item: syn-icon not in dependencies list ([#879](https://github.com/synergy-design-system/synergy-design-system/issues/879)) ([61c1075](https://github.com/synergy-design-system/synergy-design-system/commit/61c107557e3f0b58aa88a57edaf3b25932a1df59))

## 2.34.0

(Released on: 2025-05-26)

### Minor Changes

- ✨ Make angular ngModel event changeable ([#870](https://github.com/synergy-design-system/synergy-design-system/issues/870)) ([4692c69](https://github.com/synergy-design-system/synergy-design-system/commit/4692c69e919e69d078365f51f9a793330c9da353))

## 2.33.0

(Released on: 2025-05-26)

### Minor Changes

- ✨ number-input - allow clamping via property ([#853](https://github.com/synergy-design-system/synergy-design-system/issues/853)) ([674f310](https://github.com/synergy-design-system/synergy-design-system/commit/674f310b19aad7e02e8b6d0e6346c8cff1a89d94))

## 2.32.0

(Released on: 2025-05-21)

### Minor Changes

- ✨ Add variant="sticky" to syn-side-nav ([#855](https://github.com/synergy-design-system/synergy-design-system/issues/855)) ([0004497](https://github.com/synergy-design-system/synergy-design-system/commit/0004497ff3c35fab1de65fdd70730f5962ffd748))
  > `rail` attribute received a deprecation warning as it will be removed in the next major synergy version (3.0). Please use `variant="rail"` instead.

## 2.31.2

(Released on: 2025-05-20)

### Patch Changes

- 🐛 Angular problem with multiple select and async options ([#867](https://github.com/synergy-design-system/synergy-design-system/issues/867)) ([3508710](https://github.com/synergy-design-system/synergy-design-system/commit/350871007772fd7a5a5ed4cc4239c33b403f7291))

## 2.31.1

(Released on: 2025-05-19)

### Patch Changes

- 🐛 syn-side-nav does not correctly reappear after double-click on burger menu ([#865](https://github.com/synergy-design-system/synergy-design-system/issues/865)) ([fde5c13](https://github.com/synergy-design-system/synergy-design-system/commit/fde5c13426b410fc98a31d21432ab191cdb57392))

## 2.31.0

(Released on: 2025-05-13)

### Minor Changes

- ✨ syn-combobox, syn-select: Allow listbox of syn-select to exceed the input width ([#861](https://github.com/synergy-design-system/synergy-design-system/issues/861)) ([0759a8f](https://github.com/synergy-design-system/synergy-design-system/commit/0759a8f3545200dc9fb93d51ccd4c1e6b503c0b8))

## 2.30.5

(Released on: 2025-05-13)

### Patch Changes

- 🐛 syn-tooltip - box-shadow bleeds into tooltip arrow ([#863](https://github.com/synergy-design-system/synergy-design-system/issues/863)) ([853ed25](https://github.com/synergy-design-system/synergy-design-system/commit/853ed2534f9cc470959501f66453d0e17ec5839f))

## 2.30.4

(Released on: 2025-05-12)

### Patch Changes

- 🐛 Tags expand and push out UI elements in syn-select with multiple enabled and fixed width ([#859](https://github.com/synergy-design-system/synergy-design-system/issues/859)) ([74a33f4](https://github.com/synergy-design-system/synergy-design-system/commit/74a33f423735a1a125582eb868da052809200fe6))

## 2.30.3

(Released on: 2025-05-08)

### Patch Changes

- 🤔 Vendorism rewrites inline comment tickets to github to synergy account ([#860](https://github.com/synergy-design-system/synergy-design-system/issues/860)) ([99c9b43](https://github.com/synergy-design-system/synergy-design-system/commit/99c9b438e0485550215a810c2d33833140ac941e))

## 2.30.2

(Released on: 2025-05-07)

### Patch Changes

- 🐛 Form fields: Allow to set title attribute for the whole component ([#858](https://github.com/synergy-design-system/synergy-design-system/issues/858)) ([affa56b](https://github.com/synergy-design-system/synergy-design-system/commit/affa56bd5d22d93aaf615a1293ff8b4b9f541d22))

## 2.30.1

(Released on: 2025-04-28)

### Patch Changes

- 🐛 syn-input has some paddings which are not aligned with design ([#852](https://github.com/synergy-design-system/synergy-design-system/issues/852)) ([15f110a](https://github.com/synergy-design-system/synergy-design-system/commit/15f110aca5b3e81d1860cf930942a3d1555d6d9b))

## 2.30.0

(Released on: 2025-04-16)

### Minor Changes

- ✨ Let users configure delimiter for syn-select ([#844](https://github.com/synergy-design-system/synergy-design-system/issues/844)) ([b19fe82](https://github.com/synergy-design-system/synergy-design-system/commit/b19fe82ac6e19ad5daf7b776f3bae40044bbe389))

## 2.29.1

(Released on: 2025-04-14)

### Patch Changes

- 🐛 Make the syn-select more robust to allow undefined as value ([#846](https://github.com/synergy-design-system/synergy-design-system/issues/846)) ([87fc921](https://github.com/synergy-design-system/synergy-design-system/commit/87fc921b8ce2f50fc609d6827b7923e1ab27a86e))

## 2.29.0

(Released on: 2025-04-11)

### Minor Changes

- ✨ syn-select should allow numeric types as value ([#842](https://github.com/synergy-design-system/synergy-design-system/issues/842)) ([29156b2](https://github.com/synergy-design-system/synergy-design-system/commit/29156b239a1192ae6bbf0c805543a9e5b286658e))

## 2.28.0

(Released on: 2025-04-10)

### Minor Changes

- ✨ improve delayed loading of system icons ([#837](https://github.com/synergy-design-system/synergy-design-system/issues/837)) ([ab0fab2](https://github.com/synergy-design-system/synergy-design-system/commit/ab0fab2b66402b383c4d974cf16f94b43b8b987b))

## 2.27.0

(Released on: 2025-04-10)

### Minor Changes

- ✨ syn-range should align vertically with other input elements ([#836](https://github.com/synergy-design-system/synergy-design-system/issues/836)) ([680962a](https://github.com/synergy-design-system/synergy-design-system/commit/680962ab95ab95efc36392021480992de8f33352))

## 2.26.4

(Released on: 2025-04-02)

### Patch Changes

- 🐛 dynamically added active tab in angular does not show any panel content ([#832](https://github.com/synergy-design-system/synergy-design-system/issues/832)) ([bb9c1c0](https://github.com/synergy-design-system/synergy-design-system/commit/bb9c1c00333b38f2db2d1a788aff7e42434ae89d))

## 2.26.3

(Released on: 2025-04-01)

### Patch Changes

- 🐛 disabling syn-option does not work when nested in syn-optgroup ([#819](https://github.com/synergy-design-system/synergy-design-system/issues/819)) ([507797e](https://github.com/synergy-design-system/synergy-design-system/commit/507797ec54cc9514e11bc32528ea5fd70d93d2b0))

## 2.26.2

(Released on: 2025-03-31)

### Patch Changes

- 🐛 Upgrade packages to latest versions ([#830](https://github.com/synergy-design-system/synergy-design-system/issues/830)) ([f5fe54f](https://github.com/synergy-design-system/synergy-design-system/commit/f5fe54fb55732b1e3efdf3062d55ee517aef4e81))

## 2.26.1

(Released on: 2025-03-31)

### Patch Changes

- 🐛 Combobox and select not showing selected value if value was initially set via property binding ([#822](https://github.com/synergy-design-system/synergy-design-system/issues/822)) ([bb06d87](https://github.com/synergy-design-system/synergy-design-system/commit/bb06d87e64467d3710acf74868a69372be1225aa))

## 2.26.0

(Released on: 2025-03-27)

### Minor Changes

- ✨ syn-nav-item: Allow opening links in new windows ([#820](https://github.com/synergy-design-system/synergy-design-system/issues/820)) ([7aa93c0](https://github.com/synergy-design-system/synergy-design-system/commit/7aa93c02ebc127aac35aaca7e7ede1e26f637394))

## 2.25.0

(Released on: 2025-03-25)

### Minor Changes

- ✨ syn-details exports content_wrapper as CSS part ([#821](https://github.com/synergy-design-system/synergy-design-system/issues/821)) ([d343f4b](https://github.com/synergy-design-system/synergy-design-system/commit/d343f4b07a70d263824a166e6793d164313bfc22))

## 2.24.1

(Released on: 2025-03-24)

### Patch Changes

- 🐛 Combobox should always show the text content of the option instead of the value ([#816](https://github.com/synergy-design-system/synergy-design-system/issues/816)) ([9999fb8](https://github.com/synergy-design-system/synergy-design-system/commit/9999fb885795019b598bf90fcdbedfe3fa262fcc))

## 2.24.0

(Released on: 2025-03-14)

### Minor Changes

- ✨ provide html linting ([#798](https://github.com/synergy-design-system/synergy-design-system/issues/798)) ([c62acd4](https://github.com/synergy-design-system/synergy-design-system/commit/c62acd45d0c6a15932e25ffd0c327462037c4dab))

## 2.23.0

(Released on: 2025-03-12)

### Minor Changes

- ✨ Allow to override autofill styles for syn-input ([#803](https://github.com/synergy-design-system/synergy-design-system/issues/803)) ([d2f66f9](https://github.com/synergy-design-system/synergy-design-system/commit/d2f66f9eb3d10222a4d157c627f9f4a2ab860820))

## 2.22.6

(Released on: 2025-03-11)

### Patch Changes

- 🐛 setGlobalDefaultSettings does overwrite explicitly set default property values with new default size ([#801](https://github.com/synergy-design-system/synergy-design-system/issues/801)) ([46b3ebd](https://github.com/synergy-design-system/synergy-design-system/commit/46b3ebd5f39f58682995d75e3b665dfd6b800961))

## 2.22.5

(Released on: 2025-03-03)

### Patch Changes

- 🐛 stepper buttons of reused syn-input type=number nodes no longer working ([#796](https://github.com/synergy-design-system/synergy-design-system/issues/796)) ([300d044](https://github.com/synergy-design-system/synergy-design-system/commit/300d044dc59d2678861e9a8306d2ee7a3db5d6c1))

## 2.22.4

(Released on: 2025-02-27)

### Patch Changes

- 🐛 syn-details in angular animates incorrectly when it is set to be open initially via property binding ([#790](https://github.com/synergy-design-system/synergy-design-system/issues/790)) ([e9f50a1](https://github.com/synergy-design-system/synergy-design-system/commit/e9f50a192ed284cd556b3328f1b5fee905bda025))

## 2.22.3

(Released on: 2025-02-27)

### Patch Changes

- 🐛 syn-alert should not emit warnings when closing and a slotted element has focus ([#787](https://github.com/synergy-design-system/synergy-design-system/issues/787)) ([61c8cd3](https://github.com/synergy-design-system/synergy-design-system/commit/61c8cd3453f182c08884b40c7eada1e1c878248f))

## 2.22.2

(Released on: 2025-02-27)

### Patch Changes

- 🐛 syn-card font-size and color of slot content can not be changed ([#792](https://github.com/synergy-design-system/synergy-design-system/issues/792)) ([e3c470c](https://github.com/synergy-design-system/synergy-design-system/commit/e3c470ca7a07d81c06d881a81d7f3ff46829f31b))

## 2.22.1

(Released on: 2025-02-26)

### Patch Changes

- 🐛 syn-select with multiple should not error when value is set to a falsy value ([#788](https://github.com/synergy-design-system/synergy-design-system/issues/788)) ([e0ac297](https://github.com/synergy-design-system/synergy-design-system/commit/e0ac2978f25d4d7632dea465c746cbc649776fe5))

## 2.22.0

(Released on: 2025-02-14)

### Minor Changes

- ✨ UPDATED syn-header to a more compact form by reducing the internal padding-top/bottom from 24px to 12px. New total height is 64px, down from 88px.

  Based on feedback from the stakeholder community, we only provide one header size to ensure our applications are consistent across the whole organization. ([#777](https://github.com/synergy-design-system/synergy-design-system/issues/777)) ([ae9245b](https://github.com/synergy-design-system/synergy-design-system/commit/ae9245b87caa93e9f4edd9a609e83a9d2779a3ce))

## 2.21.1

(Released on: 2025-02-13)

### Patch Changes

- 🐛 Closable syn-alert closes on whole vertical area instead of the close icon only ([#774](https://github.com/synergy-design-system/synergy-design-system/issues/774)) ([3793ab2](https://github.com/synergy-design-system/synergy-design-system/commit/3793ab283cbb26bccc57612eb56bdc90aa3b563b))

## 2.21.0

(Released on: 2025-02-12)

### Minor Changes

- ✨ Allow to set global defaults for Synergy Component props ([#733](https://github.com/synergy-design-system/synergy-design-system/issues/733)) ([d5cf6fb](https://github.com/synergy-design-system/synergy-design-system/commit/d5cf6fbb07a496f142c15e2f021b65a2561a4e3a))

## 2.20.1

(Released on: 2025-02-10)

### Patch Changes

- 🐛 SynTabGroup does not allow nested SynTabGroup as a child ([#766](https://github.com/synergy-design-system/synergy-design-system/issues/766)) ([4ccb938](https://github.com/synergy-design-system/synergy-design-system/commit/4ccb9382b2a40e009761af5aef117751f4230ccb))

## 2.20.0

(Released on: 2025-02-10)

### Minor Changes

- ✨Update shoelace and deps to latest version ([#769](https://github.com/synergy-design-system/synergy-design-system/issues/769)) ([143d88f](https://github.com/synergy-design-system/synergy-design-system/commit/143d88f0a50c47a996be0cb1527629802266800e))

## 2.19.3

(Released on: 2025-02-07)

### Patch Changes

- 🐛 syn-input is overflowing in flex and grid container with fix size ([#768](https://github.com/synergy-design-system/synergy-design-system/issues/768)) ([fb68576](https://github.com/synergy-design-system/synergy-design-system/commit/fb68576ca378466cc3eb22e0f30228d2008e84c3))

## 2.19.2

(Released on: 2025-02-07)

### Patch Changes

- 🐛 Only apply min-width styling for syn-input type="number" with spin buttons ([#767](https://github.com/synergy-design-system/synergy-design-system/issues/767)) ([dfacbcb](https://github.com/synergy-design-system/synergy-design-system/commit/dfacbcbb79768a3cd658e0de440d270fa768fcfb))

## 2.19.1

(Released on: 2025-01-27)

### Patch Changes

- 🐛 Remove warning message in console for syn-header and syn-combobox in dev mode ([#756](https://github.com/synergy-design-system/synergy-design-system/issues/756)) ([724196c](https://github.com/synergy-design-system/synergy-design-system/commit/724196c50bb598bfaf40a30792fc140f2aa704a2))

## 2.19.0

(Released on: 2025-01-27)

### Minor Changes

- ✨ Tree shakable angular components ([#724](https://github.com/synergy-design-system/synergy-design-system/issues/724)) ([d65e323](https://github.com/synergy-design-system/synergy-design-system/commit/d65e323f19b819d533b1b70b146c293e4fddbe2b))

## 2.18.8

(Released on: 2025-01-23)

### Patch Changes

- 🐛 React: style and ref for react19 not working ([#748](https://github.com/synergy-design-system/synergy-design-system/issues/748)) ([b71d73a](https://github.com/synergy-design-system/synergy-design-system/commit/b71d73a2c4d561a9d744c7301606070b179f25c3))

## 2.18.7

(Released on: 2025-01-23)

### Patch Changes

- 🐛 Accessibility error in console when using syn-side-nav as rail ([#752](https://github.com/synergy-design-system/synergy-design-system/issues/752)) ([a5d7d4d](https://github.com/synergy-design-system/synergy-design-system/commit/a5d7d4d33a59af5507940508b374306544745da1))

## 2.18.6

(Released on: 2025-01-20)

### Patch Changes

- 🐛 syn-range Various issues for syn-range ([#742](https://github.com/synergy-design-system/synergy-design-system/issues/742)) ([d6dc350](https://github.com/synergy-design-system/synergy-design-system/commit/d6dc3505576aa65cadb7c78f7a4a44deeffb3e4a))
  - Syn-Range suffix jumps when used with ticks and component is not visible initially ([#727](https://github.com/synergy-design-system/synergy-design-system/issues/727))
  - Tooltip displayed below items with higher stacking context ([#728](https://github.com/synergy-design-system/synergy-design-system/issues/728))
  - Sliding a thumb after clicking on the track does not work without releasing the gesture ([#595](https://github.com/synergy-design-system/synergy-design-system/issues/595))
  - Vue: Range resets all thumb values to the same when using multiple knobs and two way databinding ([#729](https://github.com/synergy-design-system/synergy-design-system/issues/729))

## 2.18.5

(Released on: 2025-01-20)

### Patch Changes

- 🐛 syn-validate: Rendered input should be highlighted as error when loading with an invalid state ([#745](https://github.com/synergy-design-system/synergy-design-system/issues/745)) ([c07e688](https://github.com/synergy-design-system/synergy-design-system/commit/c07e6885a8c1392cd42adfd3877f7869125ced6b))

## 2.18.4

(Released on: 2025-01-20)

### Patch Changes

- 🐛 syn-validate: Validation message not removed when the slotted input is set to readonly or disabled ([#739](https://github.com/synergy-design-system/synergy-design-system/issues/739)) ([12766f0](https://github.com/synergy-design-system/synergy-design-system/commit/12766f008f9c73de2c2f72d49d6830fa2a780b13))

## 2.18.3

(Released on: 2025-01-20)

### Patch Changes

- 🐛 Side-nav not working correctly for some production builds ([#744](https://github.com/synergy-design-system/synergy-design-system/issues/744)) ([c7d5a57](https://github.com/synergy-design-system/synergy-design-system/commit/c7d5a5719edca5e6759d4eae6a20b240e6143ffd))

## 2.18.2

(Released on: 2025-01-17)

### Patch Changes

- 🐛 Checkbox and Radio have different disabled styles ([#740](https://github.com/synergy-design-system/synergy-design-system/issues/740)) ([c2c77d3](https://github.com/synergy-design-system/synergy-design-system/commit/c2c77d3d6c72175b707b1a9808bc117d6daa2674))

## 2.18.1

(Released on: 2025-01-16)

### Patch Changes

- 🐛 Z-index order rendering problem with syn-side-nav in rail mode ([#737](https://github.com/synergy-design-system/synergy-design-system/issues/737)) ([dce8bb2](https://github.com/synergy-design-system/synergy-design-system/commit/dce8bb21a9594a6b6d9bc00b3201907e992dc044))

## 2.18.0

(Released on: 2025-01-15)

### Minor Changes

- ✨ React: Add support for react v19 ([#710](https://github.com/synergy-design-system/synergy-design-system/issues/710)) ([7f9992a](https://github.com/synergy-design-system/synergy-design-system/commit/7f9992a36ea7403c803faff2813b4d506ef1ae26))

## 2.17.0

(Released on: 2025-01-10)

### Minor Changes

- ✨ range: restrain knobs via property ([#725](https://github.com/synergy-design-system/synergy-design-system/issues/725)) ([3dcbfe2](https://github.com/synergy-design-system/synergy-design-system/commit/3dcbfe224ede07866358c86b07e48744969e5ec4))

## 2.16.0

(Released on: 2025-01-08)

### Minor Changes

- ✨ syn-select: dropdown items should be same size as the select itself ([#707](https://github.com/synergy-design-system/synergy-design-system/issues/707)) ([a4e5703](https://github.com/synergy-design-system/synergy-design-system/commit/a4e5703b9c1280ad1711f748d3825ee4f6e3806c))

## 2.15.2

(Released on: 2025-01-07)

### Patch Changes

- 🐛 Various issues with syn-combobox ([#723](https://github.com/synergy-design-system/synergy-design-system/issues/723)) ([744c485](https://github.com/synergy-design-system/synergy-design-system/commit/744c485a7c24636f5f7cdd9f61f6640e593fcb8b))
  - Fixed a bug in `<syn-combobox>` that results in incorrect toggling of the open state, when using the expand icon ([#719](https://github.com/synergy-design-system/synergy-design-system/issues/719))
  - Fixed a bug in `<syn-combobox>` when using optgroups their label is not shown ([#712](https://github.com/synergy-design-system/synergy-design-system/issues/712))
  - Fixed a bug in `<syn-combobox>` that results in added custom styles to syn-options are not applied ([#714](https://github.com/synergy-design-system/synergy-design-system/issues/714))

## 2.15.1

(Released on: 2024-12-20)

### Patch Changes

- 🐛 Indentation of nested nav-items in side-nav is not shown correctly for firefox ([#722](https://github.com/synergy-design-system/synergy-design-system/issues/722)) ([916a79d](https://github.com/synergy-design-system/synergy-design-system/commit/916a79dd4a7cc6bac079d76464bffdbbfc624b51))

## 2.15.0

(Released on: 2024-12-11)

### Minor Changes

- ✨ adjust padding for syn-menu + syn-option checkmarks ([#682](https://github.com/synergy-design-system/synergy-design-system/issues/682)) ([09447c6](https://github.com/synergy-design-system/synergy-design-system/commit/09447c6ad2bcab3847375b21d74d4893f07095d4))

## 2.14.4

(Released on: 2024-12-10)

### Patch Changes

- 🐛 Align prefixes, suffixes and build-in icons to design ([#709](https://github.com/synergy-design-system/synergy-design-system/issues/709)) ([b91fa56](https://github.com/synergy-design-system/synergy-design-system/commit/b91fa56004070cffcd6f59989b7d783c3fac4cb9))

## 2.14.3

(Released on: 2024-12-05)

### Patch Changes

-  🐛 select does not respect async value property anymore ([#705](https://github.com/synergy-design-system/synergy-design-system/issues/705)) ([f4fc645](https://github.com/synergy-design-system/synergy-design-system/commit/f4fc645092ab6a902e66c7e59aeb1a5178e3956a))

## 2.14.2

(Released on: 2024-12-04)

### Patch Changes

-  🐛 Change active tab via active property of syn-tab ([#701](https://github.com/synergy-design-system/synergy-design-system/issues/701)) ([2f84cbe](https://github.com/synergy-design-system/synergy-design-system/commit/2f84cbe961b19247d829ec93c379778784ca1b74))

## 2.14.1

(Released on: 2024-11-29)

### Patch Changes

- 🤔 Adjust Paddings for syn-prio-nav ([#691](https://github.com/synergy-design-system/synergy-design-system/issues/691)) ([2c2937b](https://github.com/synergy-design-system/synergy-design-system/commit/2c2937b3d4e4c847e9cdd3df55555cc8085a4b74))

## 2.14.0

(Released on: 2024-11-29)

### Minor Changes

- ✨ DX: Angular should allow using boolean attributes without square brackets in templates ([#694](https://github.com/synergy-design-system/synergy-design-system/issues/694)) ([78e82b8](https://github.com/synergy-design-system/synergy-design-system/commit/78e82b8bbecd427b4f6bac188537cbe19bdf5a5a))

## 2.13.0

(Released on: 2024-11-28)

### Minor Changes

- ✨ Update packages to latest versions ([#688](https://github.com/synergy-design-system/synergy-design-system/issues/688)) ([37fd055](https://github.com/synergy-design-system/synergy-design-system/commit/37fd055f0b4d067ea1afecb90a1bd1390de4d382))
  - Upgrade Shoelace@2.18.0
    - Added the .focus function to `<syn-radio-group>` [shoelace#2192](https://github.com/shoelace-style/shoelace/pull/2192)
    - Fixed a bug in `<syn-tab-group>` when removed from the DOM too quickly [shoelace#2218](https://github.com/shoelace-style/shoelace/pull/2218)
    - Fixed a bug with `<syn-select>` not respecting its initial value [shoelace#2204](https://github.com/shoelace-style/shoelace/pull/2204)
    - Fixed a bug with certain bundlers when using dynamic imports [shoelace#2210](https://github.com/shoelace-style/shoelace/pull/2210)
    - Fixed a bug in `<syn-textarea>` causing scroll jumping when using resize="auto" [shoelace#2182](https://github.com/shoelace-style/shoelace/pull/2182)
    - Fixed a bug in `<syn-select>` that caused multi-selects without placeholders to have the wrong padding [shoelace#2194](https://github.com/shoelace-style/shoelace/pull/2194)
    - Fixed a bug in `<syn-tooltip>` that caused a memory leak in disconnected elements [shoelace#2226](https://github.com/shoelace-style/shoelace/pull/2226)
    - Fixed a bug in `<syn-select>` that caused an exception in an edge case using Edge + autofill [shoelace#2221](https://github.com/shoelace-style/shoelace/pull/2221)
    - Updated all checks for directionality to use this.localize.dir() instead of el.matches(:dir(rtl)) so older browsers don’t error out [shoelace#2188](https://github.com/shoelace-style/shoelace/pull/2188)
  - Add support for Angular@19

## 2.12.1

(Released on: 2024-11-22)

### Patch Changes

- 🤔 Syn-radio uses wrong line-height when in multi-line mode ([#681](https://github.com/synergy-design-system/synergy-design-system/issues/681)) ([1638bd9](https://github.com/synergy-design-system/synergy-design-system/commit/1638bd91a55f45fedc3eada4b69c525c150b26a3))

## 2.12.0

(Released on: 2024-11-21)

### Minor Changes

- ✨ provide accessible solution for validation ([#599](https://github.com/synergy-design-system/synergy-design-system/issues/599)) ([f8ef81a](https://github.com/synergy-design-system/synergy-design-system/commit/f8ef81a4a61af27fcb6de2c03ce13ef502fcb732))

## 2.11.8

(Released on: 2024-11-15)

### Patch Changes

- 🐛 syn-alert's left border does not reach the edge anymore ([#676](https://github.com/synergy-design-system/synergy-design-system/issues/676)) ([83eebd8](https://github.com/synergy-design-system/synergy-design-system/commit/83eebd8ac4762fc57c4470aaf99fcdc2143f542d))

## 2.11.7

(Released on: 2024-11-11)

### Patch Changes

- 🤔 Vue: Using registerIconLibrary with wrappers lead to bigger bundle size ([#670](https://github.com/synergy-design-system/synergy-design-system/issues/670)) ([61a13af](https://github.com/synergy-design-system/synergy-design-system/commit/61a13afe843f113a7e8d76f9e2eb3d8089df73fe))

## 2.11.6

(Released on: 2024-11-08)

### Patch Changes

- 🐛 syn-prio-nav takes size of prio menu into account when it's not shown ([#665](https://github.com/synergy-design-system/synergy-design-system/issues/665)) ([3218669](https://github.com/synergy-design-system/synergy-design-system/commit/3218669c14a89b0f613edddb0d0c2866a2b0a48e))

## 2.11.5

(Released on: 2024-11-05)

### Patch Changes

- 🐛 Add default entry for default export for better tooling compatibility ([#668](https://github.com/synergy-design-system/synergy-design-system/issues/668)) ([c1206e9](https://github.com/synergy-design-system/synergy-design-system/commit/c1206e9dce7e4d45a6b8d5569ad2163b735b9497))

## 2.11.4

(Released on: 2024-10-25)

### Patch Changes

- 🐛 Make attribute:false properties work with all wrappers ([#658](https://github.com/synergy-design-system/synergy-design-system/issues/658)) ([6bf63e9](https://github.com/synergy-design-system/synergy-design-system/commit/6bf63e93ca36c4eed2e823bef856b8be72ed3be0))

## 2.11.3

(Released on: 2024-10-24)

### Patch Changes

- 🐛 Incorrect scaling of syn-icon with font-size if using spritesheet ([#656](https://github.com/synergy-design-system/synergy-design-system/issues/656)) ([593cbc4](https://github.com/synergy-design-system/synergy-design-system/commit/593cbc4aec47866bed8316ac0acb63a03de0e7bf))

## 2.11.2

(Released on: 2024-10-23)

### Patch Changes

- 🐛 Incorrect validations in angular forms ([#655](https://github.com/synergy-design-system/synergy-design-system/issues/655)) ([cb3a3fc](https://github.com/synergy-design-system/synergy-design-system/commit/cb3a3fc551620d0ff27e7284f0c26221eaf125b0))

## 2.11.1

(Released on: 2024-10-16)

### Patch Changes

- 🐛 syn-tab-group may throw an error when unmounted too quick ([#653](https://github.com/synergy-design-system/synergy-design-system/issues/653)) ([6ac5b37](https://github.com/synergy-design-system/synergy-design-system/commit/6ac5b378b3b60babdf7eb68e00a53211b42992e4))

## 2.11.0

(Released on: 2024-10-11)

### Minor Changes

- ✨ Update Shoelace to 2.17.1 ([#641](https://github.com/synergy-design-system/synergy-design-system/issues/641)) ([86fd83b](https://github.com/synergy-design-system/synergy-design-system/commit/86fd83b528be24abc8dd8427604c7fd62e8c1ff2))

## 2.10.2

(Released on: 2024-10-11)

### Patch Changes

- 🐛 Various issues with syn-prio-nav ([#645](https://github.com/synergy-design-system/synergy-design-system/issues/645)) ([f509e94](https://github.com/synergy-design-system/synergy-design-system/commit/f509e94672d494aa6393cf3287a749ca8eeee1ed))
  - Fixed a bug in `<syn-side-nav>` that results in the parent syn-nav-item incorrectly remained the selected state ([#582](https://github.com/synergy-design-system/synergy-design-system/issues/582))
  - Fixed a bug in `<syn-nav-item>` that results in a bad text alignment using the href attribute ([#631](https://github.com/synergy-design-system/synergy-design-system/issues/631))
  - Updated the `<syn-prio-nav>` shrinking mechanism to have a better UX ([#410](https://github.com/synergy-design-system/synergy-design-system/issues/410))
  - Fixed a misalignment in the `<syn-nav-item>` if using horizontal attribute and a prefix icon ([#409](https://github.com/synergy-design-system/synergy-design-system/issues/409))
  - Fixed a misalignment in the `<syn-nav-item>` where the shrinked drop down text and icon was not centered to the other items ([#630](https://github.com/synergy-design-system/synergy-design-system/issues/630))
  - Fixed a bug in the `<syn-prio-nav` where the items where hidden too early because of wrong calculations ([#639](https://github.com/synergy-design-system/synergy-design-system/issues/639))

## 2.10.1

(Released on: 2024-10-02)

### Patch Changes

- 🐛 syn-prio-nav: priority menu position is always calculated from the absolute left of the document ([#608](https://github.com/synergy-design-system/synergy-design-system/issues/608)) ([06a7974](https://github.com/synergy-design-system/synergy-design-system/commit/06a7974b6f6e93dbe7b6eee66e0c1ede99377629))

## 2.10.0

(Released on: 2024-10-02)

### Minor Changes

- ✨ syn-radio-group should allow to set focus programmatically ([#638](https://github.com/synergy-design-system/synergy-design-system/issues/638)) ([6a81714](https://github.com/synergy-design-system/synergy-design-system/commit/6a81714e1ec29ccffe0324e78cba693d1f64091d))

## 2.9.0

(Released on: 2024-09-27)

### Minor Changes

- ✨ add support for folder dnd in syn-file ([#616](https://github.com/synergy-design-system/synergy-design-system/issues/616)) ([114893b](https://github.com/synergy-design-system/synergy-design-system/commit/114893b7422ae86acd5893fc3f212054ce7e297e))

## 2.8.1

(Released on: 2024-09-26)

### Patch Changes

- 🐛 syn-combobox: Keyboard navigation not working after text was entered ([#634](https://github.com/synergy-design-system/synergy-design-system/issues/634)) ([077d010](https://github.com/synergy-design-system/synergy-design-system/commit/077d010c25995663e521e2eafa065612db1cb739))

## 2.8.0

(Released on: 2024-09-24)

### Minor Changes

- ✨add syn-combobox ([#542](https://github.com/synergy-design-system/synergy-design-system/issues/542)) ([9be251b](https://github.com/synergy-design-system/synergy-design-system/commit/9be251b327f9ea63fb29c1194d2471d87c195ed4))

## 2.7.3

(Released on: 2024-09-16)

### Patch Changes

- 🤔 Build: Use prettier for formatting generated framework wrappers ([#611](https://github.com/synergy-design-system/synergy-design-system/issues/611)) ([a6b2c90](https://github.com/synergy-design-system/synergy-design-system/commit/a6b2c90f9efd411ae5b6adc71a8ae559114dc651))

## 2.7.2

(Released on: 2024-09-13)

### Patch Changes

- 🐛 Wrong font weight for text content in button ([#606](https://github.com/synergy-design-system/synergy-design-system/issues/606)) ([42f3054](https://github.com/synergy-design-system/synergy-design-system/commit/42f3054cb7652ab16e5e276e499f6c60eeebf81b))

## 2.7.1

(Released on: 2024-09-05)

### Patch Changes

- 🐛 syn-icon-button is not honoring 'currentColor' correctly ([#597](https://github.com/synergy-design-system/synergy-design-system/issues/597)) ([670528c](https://github.com/synergy-design-system/synergy-design-system/commit/670528c9ebdec2465e905141fe6930204aceca56))

## 2.7.0

(Released on: 2024-08-23)

### Minor Changes

- ✨ Upgrade packages to latest versions ([#592](https://github.com/synergy-design-system/synergy-design-system/issues/592)) ([e43c563](https://github.com/synergy-design-system/synergy-design-system/commit/e43c5630b6c43ef855af6815604c7649376104ee)), closes [#2078](https://github.com/synergy-design-system/synergy-design-system/issues/2078) [#2063](https://github.com/synergy-design-system/synergy-design-system/issues/2063) [#2041](https://github.com/synergy-design-system/synergy-design-system/issues/2041) [#2041](https://github.com/synergy-design-system/synergy-design-system/issues/2041) [#2116](https://github.com/synergy-design-system/synergy-design-system/issues/2116) [#2121](https://github.com/synergy-design-system/synergy-design-system/issues/2121) [#1992](https://github.com/synergy-design-system/synergy-design-system/issues/1992) [#2079](https://github.com/synergy-design-system/synergy-design-system/issues/2079) [#2009](https://github.com/synergy-design-system/synergy-design-system/issues/2009) [#1967](https://github.com/synergy-design-system/synergy-design-system/issues/1967) [#1947](https://github.com/synergy-design-system/synergy-design-system/issues/1947) [#1974](https://github.com/synergy-design-system/synergy-design-system/issues/1974) [#1985](https://github.com/synergy-design-system/synergy-design-system/issues/1985) [#2001](https://github.com/synergy-design-system/synergy-design-system/issues/2001)

## 2.6.0

(Released on: 2024-08-23)

### Minor Changes

- ✨ syn-range ([#551](https://github.com/synergy-design-system/synergy-design-system/issues/551)) ([ee0f1fa](https://github.com/synergy-design-system/synergy-design-system/commit/ee0f1fa27dbaf8fe2fac840fba9cc2274715e377))

## 2.5.0

(Released on: 2024-08-19)

### Minor Changes

- ✨ create syn-file ([#563](https://github.com/synergy-design-system/synergy-design-system/issues/563)) ([181f121](https://github.com/synergy-design-system/synergy-design-system/commit/181f121ee87e43ba0381ec4288470d3414467d8e))

## 2.4.3

(Released on: 2024-07-24)

### Patch Changes

- 🤔 syn-side-nav and syn-details may throw an error when unmounted too quick ([#565](https://github.com/synergy-design-system/synergy-design-system/issues/565)) ([c308e28](https://github.com/synergy-design-system/synergy-design-system/commit/c308e28cd3dbdd452273b1c1d80344c3f378f1dc))

## 2.4.2

(Released on: 2024-07-17)

### Patch Changes

- 🤔 Typescript error on vue components with no properties ([#558](https://github.com/synergy-design-system/synergy-design-system/issues/558)) ([8564df1](https://github.com/synergy-design-system/synergy-design-system/commit/8564df1880fc6e17b6dc077a1cde7c4262705699))

## 2.4.1

(Released on: 2024-06-25)

### Patch Changes

- 🤔 added invalid state to syn-select ([#517](https://github.com/synergy-design-system/synergy-design-system/issues/517)) ([ac290d1](https://github.com/synergy-design-system/synergy-design-system/commit/ac290d16dd208342d2c2565259895bf8eca62a96))

## 2.4.0

(Released on: 2024-06-21)

### Minor Changes

- ✨ Add open / close handling for side-nav in rail mode for keyboard focus ([#513](https://github.com/synergy-design-system/synergy-design-system/issues/513)) ([ab1ccc2](https://github.com/synergy-design-system/synergy-design-system/commit/ab1ccc24837dcbf5b56195f4f31c03555b47d2f6))

## 2.3.0

(Released on: 2024-06-21)

### Minor Changes

- ✨ syn-details ([#468](https://github.com/synergy-design-system/synergy-design-system/issues/468)) ([e064922](https://github.com/synergy-design-system/synergy-design-system/commit/e064922ef435f3173db12548375e6032d281421a))

## 2.2.1

(Released on: 2024-06-20)

### Patch Changes

- 🤔 syn-tab-group may throw an error when unmounted too quick ([#512](https://github.com/synergy-design-system/synergy-design-system/issues/512)) ([49ca556](https://github.com/synergy-design-system/synergy-design-system/commit/49ca55659358577973122fff9059a6c36b5343d9))

## 2.2.0

(Released on: 2024-06-18)

### Minor Changes

- ✨ Styles Package ([#495](https://github.com/synergy-design-system/synergy-design-system/issues/495)) ([5e7b3dc](https://github.com/synergy-design-system/synergy-design-system/commit/5e7b3dc54bc9d94060fafc8119648e9e01bd07b7))

## 2.1.0

(Released on: 2024-06-18)

### Minor Changes

- ✨ syn-tab ([#496](https://github.com/synergy-design-system/synergy-design-system/issues/496)) ([921299e](https://github.com/synergy-design-system/synergy-design-system/commit/921299e8f37db2b0a5f3e53a891f8f03ce39e12d))

## 2.0.0

(Released on: 2024-06-05)

### Patch Changes

- 🤔 v2 breaking changes ([#448](https://github.com/synergy-design-system/synergy-design-system/issues/448)) ([b251fa7](https://github.com/synergy-design-system/synergy-design-system/commit/b251fa72ec6668d005eed23c561e901dc050ab83))

### BREAKING CHANGES

- syn-header - Deprecate default slot in favor of label slot
- syn-header - fix attribute naming
- syn-prio-nav - Deprecated prop "priority-menu-label"
- syn-side-nav - Adjust default width of open sidenav
- syn-card - Rename nested prop to sharp
- Wrappers - Remove deprecated methods in wrappers

## 1.27.0

(Released on: 2024-06-05)

### Minor Changes

- ✨ icon-only button ([#498](https://github.com/synergy-design-system/synergy-design-system/issues/498)) ([d223e2c](https://github.com/synergy-design-system/synergy-design-system/commit/d223e2cd649fce2bb9109798613d4b7c60ce2117))

## 1.26.3

(Released on: 2024-06-05)

### Patch Changes

- 🤔  syn-nav-item getting too wide when in syn-side-nav with keyboard navigation ([#503](https://github.com/synergy-design-system/synergy-design-system/issues/503)) ([e297474](https://github.com/synergy-design-system/synergy-design-system/commit/e2974749b8a3d19b3a7c1ecd3fda0f1855ceca7c))

## 1.26.2

(Released on: 2024-06-05)

### Patch Changes

- 🤔 Support Angular@18 ([#502](https://github.com/synergy-design-system/synergy-design-system/issues/502)) ([10cb7fc](https://github.com/synergy-design-system/synergy-design-system/commit/10cb7fc47c951a9dfb0ea1f6070780262c0632c4))

## 1.26.1

(Released on: 2024-06-03)

### Patch Changes

- 🤔 Nav-item has incorrect hover state when :focus ([#497](https://github.com/synergy-design-system/synergy-design-system/issues/497)) ([ace15b3](https://github.com/synergy-design-system/synergy-design-system/commit/ace15b3c67a88c8136ce97aa4df522f1d18eded5))

## 1.26.0

(Released on: 2024-05-15)

### Minor Changes

- ✨ syn-breadcrumb ([#470](https://github.com/synergy-design-system/synergy-design-system/issues/470)) ([3f15e28](https://github.com/synergy-design-system/synergy-design-system/commit/3f15e28c60829f344d07c3751d19e1cf8787e64e))

## 1.25.0

(Released on: 2024-05-15)

### Minor Changes

- ✨ syn-card ([#467](https://github.com/synergy-design-system/synergy-design-system/issues/467)) ([6fa03de](https://github.com/synergy-design-system/synergy-design-system/commit/6fa03def4564236b737df851880902da03b4f47d))

## 1.24.1

(Released on: 2024-05-15)

### Patch Changes

- 🤔 syn-header label uses wrong text color ([#487](https://github.com/synergy-design-system/synergy-design-system/issues/487)) ([a09ea5e](https://github.com/synergy-design-system/synergy-design-system/commit/a09ea5ea26610b3e1107ed9b742050a4f53c0947))

## 1.24.0

(Released on: 2024-05-13)

### Minor Changes

- ✨ expose native element in vue and angular wrapper ([#478](https://github.com/synergy-design-system/synergy-design-system/issues/478)) ([c70a7d6](https://github.com/synergy-design-system/synergy-design-system/commit/c70a7d6c88709fa9262279092eebc653d1e2402d))

## 1.23.1

(Released on: 2024-05-08)

### Patch Changes

- 🤔 Syn-Checkbox uses wrong line-height when in multi-line mode ([#456](https://github.com/synergy-design-system/synergy-design-system/issues/456)) ([b072591](https://github.com/synergy-design-system/synergy-design-system/commit/b072591bb1c8e6052cbff96936905c173ec64ce5))

## 1.23.0

(Released on: 2024-05-08)

### Minor Changes

- ✨ syn-dialog ([#458](https://github.com/synergy-design-system/synergy-design-system/issues/458)) ([7247f0c](https://github.com/synergy-design-system/synergy-design-system/commit/7247f0cca654ea10ec5968d92175e546c43515cd))

## 1.22.0

(Released on: 2024-04-29)

### Minor Changes

- ✨ syn-spinner ([#421](https://github.com/synergy-design-system/synergy-design-system/issues/421)) ([455400f](https://github.com/synergy-design-system/synergy-design-system/commit/455400f17a4862e85a7464c5507ee09623dff3fd))

## 1.21.0

(Released on: 2024-04-26)

### Minor Changes

- ✨ tooltip ([#451](https://github.com/synergy-design-system/synergy-design-system/issues/451)) ([b6f3958](https://github.com/synergy-design-system/synergy-design-system/commit/b6f395846b00598273d0287daa98a64f82b75699))

## 1.20.2

(Released on: 2024-04-26)

### Patch Changes

- 🤔 chevron of syn-nav-item using wrong symbol ([#447](https://github.com/synergy-design-system/synergy-design-system/issues/447)) ([f1c2023](https://github.com/synergy-design-system/synergy-design-system/commit/f1c202329eebb7d4c480bceab2f7d63adf267c64))

## 1.20.1

(Released on: 2024-04-23)

### Patch Changes

- 🤔 Flickering of side-nav if changing its width via css variable ([#445](https://github.com/synergy-design-system/synergy-design-system/issues/445)) ([4c98710](https://github.com/synergy-design-system/synergy-design-system/commit/4c98710d4dec9005340ed329086972f9da0ab1e9))

## 1.20.0

(Released on: 2024-04-23)

### Minor Changes

- ✨ syn-alert ([#427](https://github.com/synergy-design-system/synergy-design-system/issues/427)) ([961f16c](https://github.com/synergy-design-system/synergy-design-system/commit/961f16c08da28958e5854270b98c096f0127bdad))

## 1.19.0

(Released on: 2024-04-23)

### Minor Changes

- ✨ progress-bar ([#423](https://github.com/synergy-design-system/synergy-design-system/issues/423)) ([587d2ad](https://github.com/synergy-design-system/synergy-design-system/commit/587d2adad36266d5e2bd3aadad2c7350c5b8aa34))

## 1.18.0

(Released on: 2024-04-23)

### Minor Changes

- ✨ progress ring ([#422](https://github.com/synergy-design-system/synergy-design-system/issues/422)) ([d7606fe](https://github.com/synergy-design-system/synergy-design-system/commit/d7606fe56e24f4a7cf82c6670f00b18977d3784b))

## 1.17.2

(Released on: 2024-04-23)

### Patch Changes

- 🤔 update dependencies ([#438](https://github.com/synergy-design-system/synergy-design-system/issues/438)) ([f3d648b](https://github.com/synergy-design-system/synergy-design-system/commit/f3d648b2071214cd6d58ff18d66e434dd32bfc76))

## 1.17.1

(Released on: 2024-04-23)

### Patch Changes

- 🤔 syn-text-area may throw an error when unmounted too quick ([#437](https://github.com/synergy-design-system/synergy-design-system/issues/437)) ([096f99f](https://github.com/synergy-design-system/synergy-design-system/commit/096f99fb92c13508ea3a32bc648ff555dd36fad1))

## 1.17.0

(Released on: 2024-04-19)

### Minor Changes

- ✨ Angular: Allow two way data binding component wrappers ([#420](https://github.com/synergy-design-system/synergy-design-system/issues/420)) ([7c9c6a6](https://github.com/synergy-design-system/synergy-design-system/commit/7c9c6a6aab568c868c337c1c117c66cca141b694))

## 1.16.0

(Released on: 2024-04-12)

### Minor Changes

- ✨ upgrade shoelace to 2.15.0 ([#411](https://github.com/synergy-design-system/synergy-design-system/issues/411)) ([6d4eba7](https://github.com/synergy-design-system/synergy-design-system/commit/6d4eba7ca73a8959cb25e6d9d3a8d33468be61d3))
  - See detailed changelog at https://shoelace.style/resources/changelog#id_2_15_0.
  - Added the sync property to `<syn-dropdown>` so the menu can easily sync sizes with the trigger element
  - Fixed a bug in `<syn-icon>` that did not properly apply mutators to spritesheets
  - Fixed a bug in .syn-scroll-lock causing layout shifts
  - Fixed a bug in `<syn-select>` that caused the menu to not close when rendered in a shadow root
  - Fixed a bug in the submenu controller that allowed two submenus to be open at the same time
  - Fixed a bug in `<syn-select>` where the tag size wouldn’t update with the control’s size
  - Fixed a bug in `<syn-checkbox>` and `<syn-switch>` where the color of the required content wasn’t applying correctly
  - Fixed a bug in `<syn-checkbox>` where help text was incorrectly styled
  - Fixed a bug in `<syn-input>` that prevented the control from receiving focus when clicking over the clear button

## 1.15.0

(Released on: 2024-04-08)

### Minor Changes

- ✨ add syn-side-nav, syn-nav-item, syn-prio-nav ([#364](https://github.com/synergy-design-system/synergy-design-system/issues/364)) ([fd9b821](https://github.com/synergy-design-system/synergy-design-system/commit/fd9b82138385f2708003ce18d9c118b7a8fb7925))

## 1.14.0

(Released on: 2024-03-28)

### Minor Changes

- ✨ syn-badge ([#390](https://github.com/synergy-design-system/synergy-design-system/issues/390)) ([a44d683](https://github.com/synergy-design-system/synergy-design-system/commit/a44d683b35e984bfbdac093dba5abd04c74f33c0))

## 1.13.0

(Released on: 2024-03-25)

### Minor Changes

- ✨ syn-divider in syn-dropdown should have a color syn-color-neutral-200 ([#386](https://github.com/synergy-design-system/synergy-design-system/issues/386)) ([b9fc00b](https://github.com/synergy-design-system/synergy-design-system/commit/b9fc00bba664b5e3a550df3d8bcca544ad6e04ed))

## 1.12.0

(Released on: 2024-03-18)

### Minor Changes

- ✨ drop-down ([#367](https://github.com/synergy-design-system/synergy-design-system/issues/367)) ([562daf8](https://github.com/synergy-design-system/synergy-design-system/commit/562daf8b06627b7d44a3f06210b3202c7eee9540))

## 1.11.0

(Released on: 2024-03-07)

### Minor Changes

- ✨ add border-radius and roundings to syn-tag ([#357](https://github.com/synergy-design-system/synergy-design-system/issues/357)) ([72ca994](https://github.com/synergy-design-system/synergy-design-system/commit/72ca994be047a04c07c49873578d74ed6adbe548))

## 1.10.1

(Released on: 2024-03-07)

### Patch Changes

- 🤔 syn-icon-button has a border-radius ([#358](https://github.com/synergy-design-system/synergy-design-system/issues/358)) ([fc59185](https://github.com/synergy-design-system/synergy-design-system/commit/fc591858578f2a7f64a38548e98a14abee4621ac))

## 1.10.0

(Released on: 2024-02-28)

### Minor Changes

- ✨ Create syn-header ([#331](https://github.com/synergy-design-system/synergy-design-system/issues/331)) ([acde61d](https://github.com/synergy-design-system/synergy-design-system/commit/acde61d762dd4123aae553227f3af2015e824208))

## 1.9.0

(Released on: 2024-02-28)

### Minor Changes

- ✨ upgrade shoelace to 2.14.0 ([#348](https://github.com/synergy-design-system/synergy-design-system/issues/348)) ([a00dcb9](https://github.com/synergy-design-system/synergy-design-system/commit/a00dcb9fd85e7271c8923d8256a6fea3ecdcb5d6))
  - See detailed changelog at https://shoelace.style/resources/changelog#id_2_14_0.
  - Added help text to `<syn-checkbox>`
  - Added help text to `<syn-switch>`
  - Fixed a bug in `<syn-option>` that caused HTML tags to be included in getTextLabel()
  - Fixed a bug in `<syn-option>` that caused slotted content to show up when calling getTextLabel()
  - Fixed a bug in `<syn-input>` and `<syn-textarea>` that made it work differently from `<input>` and `<textarea>` when using defaults
  - Fixed a bug in `<syn-select>` that prevented it from closing when tabbing to another select inside a shadow root
  - Fixed a bug that caused form controls to submit even after they were removed from the DOM
  - Fixed a bug that caused empty `<syn-radio-group>` elements to log an error in the console
  - Improved “close” behavior of multiple components in supportive browsers using the CloseWatcher API

## 1.8.0

(Released on: 2024-02-27)

### Minor Changes

- ✨ syn-drawer ([#320](https://github.com/synergy-design-system/synergy-design-system/issues/320)) ([ce20a42](https://github.com/synergy-design-system/synergy-design-system/commit/ce20a42f9f90eb5b38c0ae84f99d4a8db2e08613))

## 1.7.0

(Released on: 2024-02-09)

### Minor Changes

- ✨ Improve events export in framework wrapper ([#307](https://github.com/synergy-design-system/synergy-design-system/issues/307)) ([fc33867](https://github.com/synergy-design-system/synergy-design-system/commit/fc33867dcbb3e602479b67999f76234d51ff31aa))

## 1.6.1

(Released on: 2024-02-07)

### Patch Changes

- 🤔 Vue two way data binding does not honor the provided default value ([#308](https://github.com/synergy-design-system/synergy-design-system/issues/308)) ([507f0ca](https://github.com/synergy-design-system/synergy-design-system/commit/507f0ca31d8bfb301edc47582aefbece6decab40))

## 1.6.0

(Released on: 2024-02-01)

### Minor Changes

- ✨ update number input ([#287](https://github.com/synergy-design-system/synergy-design-system/issues/287)) ([123bffd](https://github.com/synergy-design-system/synergy-design-system/commit/123bffd3ec2d915e9fde84ed987da9e97d407563))

## 1.5.1

(Released on: 2024-01-31)

### Patch Changes

- 🤔 disabled button uses wrong color ([#284](https://github.com/synergy-design-system/synergy-design-system/issues/284)) ([028fbd1](https://github.com/synergy-design-system/synergy-design-system/commit/028fbd158f0e8e36c908054fdc672d267ad3503e))

## 1.5.0

(Released on: 2024-01-30)

### Minor Changes

- ✨ syn-select / syn-option / syn-optgroup ([#274](https://github.com/synergy-design-system/synergy-design-system/issues/274)) ([25c6788](https://github.com/synergy-design-system/synergy-design-system/commit/25c678829e58a173c0fc23005a4f724b6d792dd7))

## 1.4.1

(Released on: 2024-01-24)

### Patch Changes

- 🤔 Update project dependencies ([#276](https://github.com/synergy-design-system/synergy-design-system/issues/276)) ([9aa94be](https://github.com/synergy-design-system/synergy-design-system/commit/9aa94beb8f1191862d7cf48617af2d1994a6df9c))

## 1.4.0

(Released on: 2024-01-22)

### Minor Changes

- ✨ add syn-divider ([#271](https://github.com/synergy-design-system/synergy-design-system/issues/271)) ([2848dea](https://github.com/synergy-design-system/synergy-design-system/commit/2848dea5fb5c976909b18fd20d66f5d7015724be))

## 1.3.0

(Released on: 2024-01-19)

### Minor Changes

- ✨update icons ([#273](https://github.com/synergy-design-system/synergy-design-system/issues/273)) ([8677925](https://github.com/synergy-design-system/synergy-design-system/commit/8677925421d09f65c3aa8e056013b0cba8354f9a))

## 1.2.2

(Released on: 2024-01-15)

### Patch Changes

- 🤔 Update to shoelace 2.12.0 ([#257](https://github.com/synergy-design-system/synergy-design-system/issues/257)) ([42b1c26](https://github.com/synergy-design-system/synergy-design-system/commit/42b1c268688a32290ab67795c758c96b5a382aff))
  - See detailed changelog at https://shoelace.style/resources/changelog#id_2_12_0.
  - Added the ability to call form.checkValidity() and it will use Shoelace’s custom checkValidity() handler.
  - Fixed a bug with form controls removing the custom validity handlers from the form
  - Fixed a bug in form control components that used a form property, but not an attribute

## 1.2.1

(Released on: 2024-01-15)

### Patch Changes

- 🤔 Syn-Button Spacing ([#254](https://github.com/synergy-design-system/synergy-design-system/issues/254)) ([808db09](https://github.com/synergy-design-system/synergy-design-system/commit/808db09668e0bd1871d894cfaf3433d39ce41637))

## 1.2.0

(Released on: 2024-01-12)

### Minor Changes

- ✨ add syn-tag ([#217](https://github.com/synergy-design-system/synergy-design-system/issues/217)) ([da91945](https://github.com/synergy-design-system/synergy-design-system/commit/da91945d1e7f4e5bb5cc2efd36e70f790c5663ad))

## 1.1.0

(Released on: 2024-01-11)

### Minor Changes

- ✨ add syn-icon-button ([#211](https://github.com/synergy-design-system/synergy-design-system/issues/211)) ([2a460be](https://github.com/synergy-design-system/synergy-design-system/commit/2a460be6bdad09c3a7b0fb211e92b26d71d5408e))

## 1.0.2

(Released on: 2023-12-14)

### Patch Changes

- 📚 improve links in documentation ([#224](https://github.com/synergy-design-system/synergy-design-system/issues/224)) ([f55934c](https://github.com/synergy-design-system/synergy-design-system/commit/f55934c34c6c53b0f7c9a5afa8d91bc520df4fdf))

## 1.0.1

(Released on: 2023-12-06)

### Patch Changes

- improve changelogs ([#213](https://github.com/synergy-design-system/synergy-design-system/issues/213)) ([3674aed](https://github.com/synergy-design-system/synergy-design-system/commit/3674aed156b3f604a220be23957ca2da05717472))

# @synergy-design-system/components-v1.0.0 (2023-12-06)

### Features

- init first release ([#210](https://github.com/synergy-design-system/synergy-design-system/issues/210)) ([55fe07e](https://github.com/synergy-design-system/synergy-design-system/commit/55fe07e9454ec159506f24223222786f315e800c))
- ✨ add syn-button, syn-checkbox, syn-icon, syn-input, syn-radio, syn-radio-group, syn-switch, syn-textarea
- ✨ add Angular, React and Vue wrappers
