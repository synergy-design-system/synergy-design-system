# Changelog

## 1.0.3

### Patch Changes

- [#1182](https://github.com/synergy-design-system/synergy-design-system/pull/1182) [`460f8c2`](https://github.com/synergy-design-system/synergy-design-system/commit/460f8c22dfdc305d3990ba0af4b4aefc451fa8ea) Thanks [@kirchsuSICKAG](https://github.com/kirchsuSICKAG)! - Released on: 2026-02-19

  fix: 🐛 Dependency updates (#258)

## 1.0.2

### Patch Changes

- [#1148](https://github.com/synergy-design-system/synergy-design-system/pull/1148) [`73b7011`](https://github.com/synergy-design-system/synergy-design-system/commit/73b70118ae21bc58c83cbfeb9e2e8447873803a6) Thanks [@schilchSICKAG](https://github.com/schilchSICKAG)! - Released on: 2026-01-08

  fix: 🐛 Minor dependency updates (#258)

## 1.0.1

### Patch Changes

- [#1137](https://github.com/synergy-design-system/synergy-design-system/pull/1137) [`f7c0662`](https://github.com/synergy-design-system/synergy-design-system/commit/f7c0662d80dacd3aae6f4bd8559aadc399025858) Thanks [@schilchSICKAG](https://github.com/schilchSICKAG)! - Released on: 2025-12-16

  fix: 🐛 SICK Intl Semibold does not display correctly on Windows (#1124)

  This release fixes an issue that only appears when using Windows 10 and 11.
  The exported font used cleartype annotations which lead to broken renderings on certain font sizes.

  > We are still in the process of optimizing `SICK Intl` and are actively working on a solution for current problems like blurry rendering.

## 1.0.0

### Major Changes

- [#1099](https://github.com/synergy-design-system/synergy-design-system/pull/1099) [`fc1e550`](https://github.com/synergy-design-system/synergy-design-system/commit/fc1e550fb4aa28eabf0bef6b089993a1dd939ff2) Thanks [@schilchSICKAG](https://github.com/schilchSICKAG)! - Released on: 2025-12-04

  feat: ✨ add sick intl to fonts (#1085)

  Add an optimized variant of the `SICK Intl` font as a shared asset to the new `@synergy-design-system/fonts` package.
  It also adds the fonts package to the Synergy MCP server.
