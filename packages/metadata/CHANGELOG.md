# Changelog

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
