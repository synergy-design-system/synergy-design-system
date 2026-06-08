# Changelog

## 3.12.0

### Patch Changes

- [#1298](https://github.com/synergy-design-system/synergy-design-system/pull/1298) [`49e5b92`](https://github.com/synergy-design-system/synergy-design-system/commit/49e5b92f06c0600c5e8612834cb34e0f7c2a474a) Thanks [@schilchSICKAG](https://github.com/schilchSICKAG)! - Released on: 2026-06-08

  fix: 🐛 `<syn-select>` and `<syn-dropdown>` not opening correctly when slotted in `<syn-dialog>` or `<syn-drawer>` ([#1297](https://github.com/synergy-design-system/synergy-design-system/issues/1297))

  This release fixes an issue with multiple Synergy components automatically closing when opened in a `<syn-dialog>` or `<syn-drawer>` element in Chromium based browsers. This happens because Chromium now uses a more aggressive method of checking the active focused element when using `popover`.

## 3.11.1

### Patch Changes

- [#1293](https://github.com/synergy-design-system/synergy-design-system/pull/1293) [`513e931`](https://github.com/synergy-design-system/synergy-design-system/commit/513e931c88a46e1e71a3a4d8ca7ac3c3a85b2189) Thanks [@schilchSICKAG](https://github.com/schilchSICKAG)! - Released on: 2026-06-03

  fix: 🐛 dependency updates ([#258](https://github.com/synergy-design-system/synergy-design-system/issues/258))

## 3.11.0

### Patch Changes

- [#1296](https://github.com/synergy-design-system/synergy-design-system/pull/1296) [`4fdb69a`](https://github.com/synergy-design-system/synergy-design-system/commit/4fdb69aec5ddb0ddfa76a948c87eaf84be6fd670) Thanks [@schilchSICKAG](https://github.com/schilchSICKAG)! - Released on: 2026-06-03

  fix: 🐛 `<syn-menu>` multiple issues ([#1295](https://github.com/synergy-design-system/synergy-design-system/issues/1295))

  This release fixes multiple issues when using `<syn-menu>`:
  - submenus no longer stay open when leaving the browser window ([#882](https://github.com/synergy-design-system/synergy-design-system/issues/882))
  - `<syn-menu-item>` wrapped in tooltip can now be used reliably (including navigation and selection) ([#1162](https://github.com/synergy-design-system/synergy-design-system/issues/1162))
  - `<syn-menu-item>` no longer steals focus on hover ([#1286](https://github.com/synergy-design-system/synergy-design-system/issues/1286))

## 3.10.0

### Minor Changes

- Released on: 2026-06-02

  chore: ✨ Update Metadata and MCP with latest metadata

## 3.9.0

### Minor Changes

- [#1271](https://github.com/synergy-design-system/synergy-design-system/pull/1271) [`74917ea`](https://github.com/synergy-design-system/synergy-design-system/commit/74917ea30e2d26780202c382c7f157c63e3833ef) Thanks [@kirchsuSICKAG](https://github.com/kirchsuSICKAG)! - Released on: 2026-05-28

  feat: ✨ `<syn-chart>` ([#1205](https://github.com/synergy-design-system/synergy-design-system/issues/1205))

  This release adds an experimental MVP for the new `<syn-chart>` component for data visualization based on [Apache ECharts](https://echarts.apache.org).
  It is available for Web Component, React, Angular and Vue

  > ⚠️ **Experimental:** The API or behavior may change in future releases without a major version bump.

## 3.8.0

### Minor Changes

- [#1276](https://github.com/synergy-design-system/synergy-design-system/pull/1276) [`a6b68f2`](https://github.com/synergy-design-system/synergy-design-system/commit/a6b68f2126ee0c63f2e9f5a91d96e97c2486e3c9) Thanks [@schilchSICKAG](https://github.com/schilchSICKAG)! - Released on: 2026-05-21

  feat: ✨ component context guidelines ([#1187](https://github.com/synergy-design-system/synergy-design-system/issues/1187))
  - Correct `@since` flags for all components
  - Updated component usage rules (beta)
  - Add missing rules files
  - Create overviews for all components

## 3.7.0

## 3.6.0

### Patch Changes

- [#1281](https://github.com/synergy-design-system/synergy-design-system/pull/1281) [`a4b0e11`](https://github.com/synergy-design-system/synergy-design-system/commit/a4b0e1139dfc644d5607b7bfd08fd20158ace570) Thanks [@schilchSICKAG](https://github.com/schilchSICKAG)! - Released on: 2026-05-06

  fix: 🐛 syn-range now emits syn-change after programmatic value updates ([#1272](https://github.com/synergy-design-system/synergy-design-system/issues/1272))

  This release fixes an issue where `syn-change` events where not fired for subsequent user interactions after a value was set in code.

## 3.5.0

### Patch Changes

- [#1279](https://github.com/synergy-design-system/synergy-design-system/pull/1279) [`de1f21e`](https://github.com/synergy-design-system/synergy-design-system/commit/de1f21e46ac3092e8bd3a1911e1284936b3354cf) Thanks [@schilchSICKAG](https://github.com/schilchSICKAG)! - Released on: 2026-05-06

  fix: 🐛 `<syn-select>` and `<syn-combobox>` have invalid selected value if the selected option changes ([#1265](https://github.com/synergy-design-system/synergy-design-system/issues/1265))

  This release ensures `<syn-select>` and `<syn-combobox>` always show the current selected option text.
  If a selected option name changes, the field now updates right away instead of showing outdated text.

## 3.4.0

### Minor Changes

- Released on: 2026-05-05

  chore: ✨ Update Metadata and MCP with latest metadata

## 3.3.0

### Patch Changes

- [#1278](https://github.com/synergy-design-system/synergy-design-system/pull/1278) [`e84b97a`](https://github.com/synergy-design-system/synergy-design-system/commit/e84b97ae70affae71afcc85725e56b3f690a445e) Thanks [@schilchSICKAG](https://github.com/schilchSICKAG)! - Released on: 2026-05-04

  fix: 🐛 `<syn-option>` slotted icons not visible on hover ([#1277](https://github.com/synergy-design-system/synergy-design-system/issues/1277))

  This release fixes a bug that accidentally set the color of slotted elements in `<syn-option>` to white which lead to the icons appear to be invisible.

## 3.2.0

### Patch Changes

- [#1267](https://github.com/synergy-design-system/synergy-design-system/pull/1267) [`2444517`](https://github.com/synergy-design-system/synergy-design-system/commit/2444517aaedc22b115d9572dd14d47c43189ec5d) Thanks [@schilchSICKAG](https://github.com/schilchSICKAG)! - Released on: 2026-04-29

  fix: 🐛 `<syn-icon-button>` is not visible when `disabled` in dark mode ([#1257](https://github.com/synergy-design-system/synergy-design-system/issues/1257))

  This release fixes an issue where disabled `<syn-icon-button>` components were appearing too light in dark mode, making them difficult to see. The disabled state styling now properly contrasts with the dark background.

## 3.1.0

### Minor Changes

- [#1273](https://github.com/synergy-design-system/synergy-design-system/pull/1273) [`930328a`](https://github.com/synergy-design-system/synergy-design-system/commit/930328af3af87ba91738b89984ad7b11edd78ec5) Thanks [@schilchSICKAG](https://github.com/schilchSICKAG)! - Released on: 2026-04-29

  feat: ✨ add new headline styles ([#1268](https://github.com/synergy-design-system/synergy-design-system/issues/1268))

  This Release adds missing typographic classes:
  - `.syn-heading--medium`
  - `.syn-heading--4x-large`
  - `.syn-body--2x-small`

## 3.0.1

### Patch Changes

- [#1263](https://github.com/synergy-design-system/synergy-design-system/pull/1263) [`f422a1f`](https://github.com/synergy-design-system/synergy-design-system/commit/f422a1f5e7c8d8970b086d914dbba3a5b3bb8d0b) Thanks [@schilchSICKAG](https://github.com/schilchSICKAG)! - Released on: 2026-04-28

  fix: 🐛 dependency updates ([#258](https://github.com/synergy-design-system/synergy-design-system/issues/258))

## 3.0.0

### Major Changes

- [#1255](https://github.com/synergy-design-system/synergy-design-system/pull/1255) [`6160660`](https://github.com/synergy-design-system/synergy-design-system/commit/6160660f497e0a791ea6794cd3ffeb657418b46c) Thanks [@schilchSICKAG](https://github.com/schilchSICKAG)! - Released on: 2026-04-27

  major: 💥 metadata package (#1241)
