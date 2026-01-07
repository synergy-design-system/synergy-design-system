# Changelog

## 2.48.1

### Patch Changes

- [#1147](https://github.com/synergy-design-system/synergy-design-system/pull/1147) [`8e3230c`](https://github.com/synergy-design-system/synergy-design-system/commit/8e3230cc351c62e2e9485c5234675d40ac7ac175) Thanks [@schilchSICKAG](https://github.com/schilchSICKAG)! - Released on: 2026-01-07

  fix: 🐛 adjust syn button tokens (#1145)

  The original tokens used `inherit` as a fallback value, which did not have any effect but to fall back to the original value.
  This is now made explicit to allow the use of button variables in code directly.

## 2.48.0

### Minor Changes

- [#1138](https://github.com/synergy-design-system/synergy-design-system/pull/1138) [`dc56e6f`](https://github.com/synergy-design-system/synergy-design-system/commit/dc56e6f0ebc08e44b23bdbdaa6fffa03abc26e9e) Thanks [@schilchSICKAG](https://github.com/schilchSICKAG)! - Released on: 2025-12-18

  feat: ✨ form element active states (#433)

  This release adds adjustments for `:active` states for various form elements.
  - `<syn-checkbox>` now has new active states, dependent on if it is checked and unchecked.
  - `<syn-nav-item>` now has a new active state
  - `<syn-radio>` will show its active indicator when pressing the associated label, too.
  - `<syn-switch>` now has new active states, dependent on if it is checked and unchecked.

## 2.47.0

### Minor Changes

- [#1109](https://github.com/synergy-design-system/synergy-design-system/pull/1109) [`6b4b7e2`](https://github.com/synergy-design-system/synergy-design-system/commit/6b4b7e2940b5c87e44d5da6030354ec0e21f2f38) Thanks [@schilchSICKAG](https://github.com/schilchSICKAG)! - Released on: 2025-12-16

  feat: ✨ Brand updates for `<syn-button>` (#871)
  feat: ✨ Brand updates for `<syn-dropdown>` (#949)

## 2.46.0

### Minor Changes

- [#1122](https://github.com/synergy-design-system/synergy-design-system/pull/1122) [`740816b`](https://github.com/synergy-design-system/synergy-design-system/commit/740816b1a86768e7f2fed5516241bdb3a9df4ef7) Thanks [@schilchSICKAG](https://github.com/schilchSICKAG)! - Released on: 2025-12-11

  feat: ✨ adjust sizes of form elements (#1083)
  - `<syn-checkbox>` Bigger checkbox in small and medium
  - `<syn-radio>` Bigger radio control in small and medium
  - `<syn-switch>` Larger label and bigger switch control in all sizes

## 2.45.0

### Minor Changes

- [#1092](https://github.com/synergy-design-system/synergy-design-system/pull/1092) [`b82f1d9`](https://github.com/synergy-design-system/synergy-design-system/commit/b82f1d961aa4c2898f41b7c55eb3b7d43220878c) Thanks [@kirchsuSICKAG](https://github.com/kirchsuSICKAG)! - Released on: 2025-11-28

  feat: ✨ Brand update for `syn-file` (#953)

## 2.44.0

### Minor Changes

- [#1074](https://github.com/synergy-design-system/synergy-design-system/pull/1074) [`ac24e63`](https://github.com/synergy-design-system/synergy-design-system/commit/ac24e6379862c7e60b5d5293614f0d804eeb7388) Thanks [@schilchSICKAG](https://github.com/schilchSICKAG)! - Released on: 2025-11-27

  feat: ✨ Brand updates for `<syn-menu>`, `<syn-menu-item>` and `<syn-menu-label>` (#958)

## 2.43.0

### Minor Changes

- [#1086](https://github.com/synergy-design-system/synergy-design-system/pull/1086) [`515226c`](https://github.com/synergy-design-system/synergy-design-system/commit/515226c44f8bba7b2b4b80cdd0f21f3237f0670d) Thanks [@schilchSICKAG](https://github.com/schilchSICKAG)! - Released on: 2025-11-19

  feat: ✨ Brand updates for `<syn validate>` (#973)

## 2.42.0

### Minor Changes

- [#1076](https://github.com/synergy-design-system/synergy-design-system/pull/1076) [`1392ed2`](https://github.com/synergy-design-system/synergy-design-system/commit/1392ed23aba2b628344356adba0a78e1e8beff84) Thanks [@schilchSICKAG](https://github.com/schilchSICKAG)! - Released on: 2025-11-18

  feat: ✨ Brand updates for `<syn-side-nav>`, `<syn-prio-nav>` and `<syn-nav-item>` (#967, #960)

## 2.41.0

### Minor Changes

- [#1063](https://github.com/synergy-design-system/synergy-design-system/pull/1063) [`6e616f5`](https://github.com/synergy-design-system/synergy-design-system/commit/6e616f51007ebde567eeb33190518159becc7c32) Thanks [@kirchsuSICKAG](https://github.com/kirchsuSICKAG)! - Released on: 2025-11-17

  feat: ✨ Brand update for syn-range and syn-range-tick (#966)

## 2.40.0

### Minor Changes

- [#1072](https://github.com/synergy-design-system/synergy-design-system/pull/1072) [`81dae1e`](https://github.com/synergy-design-system/synergy-design-system/commit/81dae1e912bcbdefb4346b4a3bbc245f7fac9f12) Thanks [@schilchSICKAG](https://github.com/schilchSICKAG)! - Released on: 2025-11-07

  feat: ✨ Brand updates for `<syn-card>` (#942)

## 2.39.0

### Minor Changes

- [#1073](https://github.com/synergy-design-system/synergy-design-system/pull/1073) [`0ae632c`](https://github.com/synergy-design-system/synergy-design-system/commit/0ae632c5331f0583ba652add18755df01766cbf5) Thanks [@schilchSICKAG](https://github.com/schilchSICKAG)! - Released on: 2025-11-07

  feat: ✨ Brand updates for `<syn-dialog>` (#946)

  Also made sure to have smaller `blur` settings as the token has double the size in Figma.

## 2.38.0

### Minor Changes

- [#1039](https://github.com/synergy-design-system/synergy-design-system/pull/1039) [`bc0bc63`](https://github.com/synergy-design-system/synergy-design-system/commit/bc0bc639a996fc75c57194244596d5733097389d) Thanks [@schilchSICKAG](https://github.com/schilchSICKAG)! - Released on: 2025-11-04

  feat: ✨ changesets migration (#928)

  This PR migrates Synergies ci/cd system from `semantic-release` to `changesets`.

## 2.37.0

(Released on: 2025-11-03)

### Minor Changes

- ✨CD update for syn-alert ([#1064](https://github.com/synergy-design-system/synergy-design-system/issues/1064)) ([f9c0656](https://github.com/synergy-design-system/synergy-design-system/commit/f9c0656a268a71ea676ed0b937d8ca77cca2c924))

## 2.36.0

(Released on: 2025-10-29)

### Minor Changes

- ✨ CD update for syn-switch ([#1046](https://github.com/synergy-design-system/synergy-design-system/issues/1046)) ([088ce44](https://github.com/synergy-design-system/synergy-design-system/commit/088ce44da4e948099f10c66d29ca48dc6da3b5bb))

## 2.35.0

(Released on: 2025-10-28)

### Minor Changes

- ✨ CD update for syn-radio ([#1051](https://github.com/synergy-design-system/synergy-design-system/issues/1051)) ([b245f1f](https://github.com/synergy-design-system/synergy-design-system/commit/b245f1f90836a68594ecc8fdc026ecb8b3d284a9))

## 2.34.0

(Released on: 2025-10-27)

### Minor Changes

- ✨ CD update for syn-badge ([#1049](https://github.com/synergy-design-system/synergy-design-system/issues/1049)) ([894e541](https://github.com/synergy-design-system/synergy-design-system/commit/894e5416653a66f5ef81acaaee8b74a1adf7f3ab))

## 2.33.0

(Released on: 2025-10-23)

### Minor Changes

- ✨ CD update for syn-checkbox ([#1050](https://github.com/synergy-design-system/synergy-design-system/issues/1050)) ([1054c71](https://github.com/synergy-design-system/synergy-design-system/commit/1054c71415f36233ba1e242433806aac21d4d19b))

## 2.32.0

(Released on: 2025-10-23)

### Minor Changes

- ✨ CD update for syn-icon-button ([#1048](https://github.com/synergy-design-system/synergy-design-system/issues/1048)) ([d740a54](https://github.com/synergy-design-system/synergy-design-system/commit/d740a5495abd1b36bbe1c1c47fc69ca6a6480549))

## 2.31.0

(Released on: 2025-10-23)

### Minor Changes

- ✨ CD update for syn-breadcrumb ([#1045](https://github.com/synergy-design-system/synergy-design-system/issues/1045)) ([46383b2](https://github.com/synergy-design-system/synergy-design-system/commit/46383b2557d284328cfb49d476a052986cb47d75))

## 2.30.0

(Released on: 2025-10-22)

### Minor Changes

- ✨ CD update for syn-header ([#1047](https://github.com/synergy-design-system/synergy-design-system/issues/1047)) ([6841148](https://github.com/synergy-design-system/synergy-design-system/commit/684114811f939b91a13302cc85300fd1b9b1670e))

## 2.29.0

(Released on: 2025-10-20)

### Minor Changes

- ✨ CD update for syn-drawer ([#1043](https://github.com/synergy-design-system/synergy-design-system/issues/1043)) ([214b367](https://github.com/synergy-design-system/synergy-design-system/commit/214b367e8e603e264ec2718772087601f463439e))

## 2.28.0

(Released on: 2025-10-13)

### Minor Changes

- ✨ CD update for syn-progress-ring ([#1033](https://github.com/synergy-design-system/synergy-design-system/issues/1033)) ([ba51374](https://github.com/synergy-design-system/synergy-design-system/commit/ba51374977ad486c2a8020586718740e60da7f51))

## 2.27.0

(Released on: 2025-10-02)

### Minor Changes

- ✨ CD update for syn-divider, syn-tag, syn-accordion, syn-details ([#1028](https://github.com/synergy-design-system/synergy-design-system/issues/1028)) ([b43a81a](https://github.com/synergy-design-system/synergy-design-system/commit/b43a81ab651da6b41668e481981ccbdcc1f07254))

## 2.26.1

(Released on: 2025-09-30)

### Patch Changes

- 🐛 Synergy element which use syn-popup may break if used in a stacking context ([#1034](https://github.com/synergy-design-system/synergy-design-system/issues/1034)) ([8d23dc7](https://github.com/synergy-design-system/synergy-design-system/commit/8d23dc737e36065a0208bc01a98981541540d0ef))

## 2.26.0

(Released on: 2025-09-24)

### Minor Changes

- ✨ CD update for syn-tooltip ([#1025](https://github.com/synergy-design-system/synergy-design-system/issues/1025)) ([b02ec3d](https://github.com/synergy-design-system/synergy-design-system/commit/b02ec3d7d720a869975dcd19dd29f096b8fd2035))

## 2.25.0

(Released on: 2025-09-23)

### Minor Changes

- ✨ CD update for syn-spinner, syn-textarea, syn-link, syn-table ([#1010](https://github.com/synergy-design-system/synergy-design-system/issues/1010)) ([c472bab](https://github.com/synergy-design-system/synergy-design-system/commit/c472bab888e5fb9efd368456e1b8f60953970b63))

## 2.24.0

(Released on: 2025-08-28)

### Minor Changes

- ✨CD update for syn-input ([#1001](https://github.com/synergy-design-system/synergy-design-system/issues/1001)) ([52f42f8](https://github.com/synergy-design-system/synergy-design-system/commit/52f42f8d1f494c54492e54b6ddafc6693dcdb0bb))

## 2.23.0

(Released on: 2025-08-19)

### Minor Changes

- ✨ export new sick2025 themes ([#985](https://github.com/synergy-design-system/synergy-design-system/issues/985)) ([148730d](https://github.com/synergy-design-system/synergy-design-system/commit/148730d68037ea74dc241ca6627aa6a32af876ab))

## 2.22.0

(Released on: 2025-08-07)

### Minor Changes

- ✨ Synchronize tokens via Figma API to github ([#929](https://github.com/synergy-design-system/synergy-design-system/issues/929)) ([51f6aeb](https://github.com/synergy-design-system/synergy-design-system/commit/51f6aeb2e9407c1d808ee0be02d279ada0e3cac7))

## 2.21.0

(Released on: 2025-07-09)

### Minor Changes

- ✨ Add restricted options to syn-combobox ([#914](https://github.com/synergy-design-system/synergy-design-system/issues/914)) ([d1b2e4d](https://github.com/synergy-design-system/synergy-design-system/commit/d1b2e4d0d63bf9f132fa179cc3954e9b21b4ea72))

## 2.20.1

(Released on: 2025-06-20)

### Patch Changes

- 🐛 Upgrade packages to latest versions ([#905](https://github.com/synergy-design-system/synergy-design-system/issues/905)) ([64de3cd](https://github.com/synergy-design-system/synergy-design-system/commit/64de3cd72f7ab3c7eeb727a9de85d9d980b27055))

## 2.20.0

(Released on: 2025-05-26)

### Minor Changes

- ✨ number-input - allow clamping via property ([#853](https://github.com/synergy-design-system/synergy-design-system/issues/853)) ([674f310](https://github.com/synergy-design-system/synergy-design-system/commit/674f310b19aad7e02e8b6d0e6346c8cff1a89d94))

## 2.19.0

(Released on: 2025-05-21)

### Minor Changes

- ✨ Add variant="sticky" to syn-side-nav ([#855](https://github.com/synergy-design-system/synergy-design-system/issues/855)) ([0004497](https://github.com/synergy-design-system/synergy-design-system/commit/0004497ff3c35fab1de65fdd70730f5962ffd748))

## 2.18.1

(Released on: 2025-03-31)

### Patch Changes

- 🐛 Upgrade packages to latest versions ([#830](https://github.com/synergy-design-system/synergy-design-system/issues/830)) ([f5fe54f](https://github.com/synergy-design-system/synergy-design-system/commit/f5fe54fb55732b1e3efdf3062d55ee517aef4e81))

## 2.18.0

(Released on: 2025-02-10)

### Minor Changes

- ✨Update shoelace and deps to latest version ([#769](https://github.com/synergy-design-system/synergy-design-system/issues/769)) ([143d88f](https://github.com/synergy-design-system/synergy-design-system/commit/143d88f0a50c47a996be0cb1527629802266800e))

## 2.17.0

(Released on: 2025-01-10)

### Minor Changes

- ✨ range: restrain knobs via property ([#725](https://github.com/synergy-design-system/synergy-design-system/issues/725)) ([3dcbfe2](https://github.com/synergy-design-system/synergy-design-system/commit/3dcbfe224ede07866358c86b07e48744969e5ec4))

## 2.16.0

(Released on: 2025-01-08)

### Minor Changes

- ✨ syn-select: dropdown items should be same size as the select itself ([#707](https://github.com/synergy-design-system/synergy-design-system/issues/707)) ([a4e5703](https://github.com/synergy-design-system/synergy-design-system/commit/a4e5703b9c1280ad1711f748d3825ee4f6e3806c))

## 2.15.1

(Released on: 2024-12-05)

### Patch Changes

- 🐛 Upgrade style-dictionary to new major version ([#702](https://github.com/synergy-design-system/synergy-design-system/issues/702)) ([723aefa](https://github.com/synergy-design-system/synergy-design-system/commit/723aefabd13d54d4e05ef2a352c884de9d36cd8f))

## 2.15.0

(Released on: 2024-11-27)

### Minor Changes

- ✨ Create styles for a syn-link-list ([#678](https://github.com/synergy-design-system/synergy-design-system/issues/678)) ([ca3b99a](https://github.com/synergy-design-system/synergy-design-system/commit/ca3b99a828e2a078b538881f74324d0bee8fde66))

## 2.14.0

(Released on: 2024-11-21)

### Minor Changes

- ✨ provide accessible solution for validation ([#599](https://github.com/synergy-design-system/synergy-design-system/issues/599)) ([f8ef81a](https://github.com/synergy-design-system/synergy-design-system/commit/f8ef81a4a61af27fcb6de2c03ce13ef502fcb732))

## 2.13.0

(Released on: 2024-10-11)

### Minor Changes

- ✨ Update Shoelace to 2.17.1 ([#641](https://github.com/synergy-design-system/synergy-design-system/issues/641)) ([86fd83b](https://github.com/synergy-design-system/synergy-design-system/commit/86fd83b528be24abc8dd8427604c7fd62e8c1ff2))

## 2.12.1

(Released on: 2024-10-11)

### Patch Changes

- 🐛 Various issues with syn-prio-nav ([#645](https://github.com/synergy-design-system/synergy-design-system/issues/645)) ([f509e94](https://github.com/synergy-design-system/synergy-design-system/commit/f509e94672d494aa6393cf3287a749ca8eeee1ed))

## 2.12.0

(Released on: 2024-10-02)

### Minor Changes

- ✨ syn-radio-group should allow to set focus programmatically ([#638](https://github.com/synergy-design-system/synergy-design-system/issues/638)) ([6a81714](https://github.com/synergy-design-system/synergy-design-system/commit/6a81714e1ec29ccffe0324e78cba693d1f64091d))

## 2.11.0

(Released on: 2024-09-27)

### Minor Changes

- ✨ add support for folder dnd in syn-file ([#616](https://github.com/synergy-design-system/synergy-design-system/issues/616)) ([114893b](https://github.com/synergy-design-system/synergy-design-system/commit/114893b7422ae86acd5893fc3f212054ce7e297e))

## 2.10.0

(Released on: 2024-09-24)

### Minor Changes

- ✨add syn-combobox ([#542](https://github.com/synergy-design-system/synergy-design-system/issues/542)) ([9be251b](https://github.com/synergy-design-system/synergy-design-system/commit/9be251b327f9ea63fb29c1194d2471d87c195ed4))

## 2.9.0

(Released on: 2024-08-26)

### Minor Changes

- ✨ link css ([#589](https://github.com/synergy-design-system/synergy-design-system/issues/589)) ([cdf54fc](https://github.com/synergy-design-system/synergy-design-system/commit/cdf54fcb348cc3b5a41993cff530424bdf6b6802))

## 2.8.0

(Released on: 2024-08-23)

### Minor Changes

- ✨ Upgrade packages to latest versions ([#592](https://github.com/synergy-design-system/synergy-design-system/issues/592)) ([e43c563](https://github.com/synergy-design-system/synergy-design-system/commit/e43c5630b6c43ef855af6815604c7649376104ee)), closes [#2078](https://github.com/synergy-design-system/synergy-design-system/issues/2078) [#2063](https://github.com/synergy-design-system/synergy-design-system/issues/2063) [#2041](https://github.com/synergy-design-system/synergy-design-system/issues/2041) [#2041](https://github.com/synergy-design-system/synergy-design-system/issues/2041) [#2116](https://github.com/synergy-design-system/synergy-design-system/issues/2116) [#2121](https://github.com/synergy-design-system/synergy-design-system/issues/2121) [#1992](https://github.com/synergy-design-system/synergy-design-system/issues/1992) [#2079](https://github.com/synergy-design-system/synergy-design-system/issues/2079) [#2009](https://github.com/synergy-design-system/synergy-design-system/issues/2009) [#1967](https://github.com/synergy-design-system/synergy-design-system/issues/1967) [#1947](https://github.com/synergy-design-system/synergy-design-system/issues/1947) [#1974](https://github.com/synergy-design-system/synergy-design-system/issues/1974) [#1985](https://github.com/synergy-design-system/synergy-design-system/issues/1985) [#2001](https://github.com/synergy-design-system/synergy-design-system/issues/2001)

## 2.7.0

(Released on: 2024-08-23)

### Minor Changes

- ✨ syn-range ([#551](https://github.com/synergy-design-system/synergy-design-system/issues/551)) ([ee0f1fa](https://github.com/synergy-design-system/synergy-design-system/commit/ee0f1fa27dbaf8fe2fac840fba9cc2274715e377))

## 2.6.0

(Released on: 2024-08-19)

### Minor Changes

- ✨ create syn-file ([#563](https://github.com/synergy-design-system/synergy-design-system/issues/563)) ([181f121](https://github.com/synergy-design-system/synergy-design-system/commit/181f121ee87e43ba0381ec4288470d3414467d8e))

## 2.5.0

(Released on: 2024-07-11)

### Minor Changes

- ✨ add table stylings ([#522](https://github.com/synergy-design-system/synergy-design-system/issues/522)) ([18a030b](https://github.com/synergy-design-system/synergy-design-system/commit/18a030be92344a9f0d038e5518c8347f0fbebb4e))

## 2.4.0

(Released on: 2024-07-01)

### Minor Changes

- ✨ Added help-text for checkbox and switch ([#520](https://github.com/synergy-design-system/synergy-design-system/issues/520)) ([7914402](https://github.com/synergy-design-system/synergy-design-system/commit/79144026cae9d283ea37c861ede2836aab1173b3))

## 2.3.1

(Released on: 2024-06-25)

### Patch Changes

- 🤔 added invalid state to syn-select ([#517](https://github.com/synergy-design-system/synergy-design-system/issues/517)) ([ac290d1](https://github.com/synergy-design-system/synergy-design-system/commit/ac290d16dd208342d2c2565259895bf8eca62a96))

## 2.3.0

(Released on: 2024-06-21)

### Minor Changes

- ✨ syn-details ([#468](https://github.com/synergy-design-system/synergy-design-system/issues/468)) ([e064922](https://github.com/synergy-design-system/synergy-design-system/commit/e064922ef435f3173db12548375e6032d281421a))

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

## 1.20.0

(Released on: 2024-06-05)

### Minor Changes

- ✨ icon-only button ([#498](https://github.com/synergy-design-system/synergy-design-system/issues/498)) ([d223e2c](https://github.com/synergy-design-system/synergy-design-system/commit/d223e2cd649fce2bb9109798613d4b7c60ce2117))

## 1.19.0

(Released on: 2024-05-15)

### Minor Changes

- ✨ syn-breadcrumb ([#470](https://github.com/synergy-design-system/synergy-design-system/issues/470)) ([3f15e28](https://github.com/synergy-design-system/synergy-design-system/commit/3f15e28c60829f344d07c3751d19e1cf8787e64e))

## 1.18.0

(Released on: 2024-05-15)

### Minor Changes

- ✨ syn-card ([#467](https://github.com/synergy-design-system/synergy-design-system/issues/467)) ([6fa03de](https://github.com/synergy-design-system/synergy-design-system/commit/6fa03def4564236b737df851880902da03b4f47d))

## 1.17.0

(Released on: 2024-05-08)

### Minor Changes

- ✨ syn-dialog ([#458](https://github.com/synergy-design-system/synergy-design-system/issues/458)) ([7247f0c](https://github.com/synergy-design-system/synergy-design-system/commit/7247f0cca654ea10ec5968d92175e546c43515cd))

## 1.16.0

(Released on: 2024-05-02)

### Minor Changes

- ✨ adjust syn opacity token ([#457](https://github.com/synergy-design-system/synergy-design-system/issues/457)) ([0f44c01](https://github.com/synergy-design-system/synergy-design-system/commit/0f44c012d05930d3c01b62756f761563ee24d684))

## 1.15.0

(Released on: 2024-04-26)

### Minor Changes

- ✨ tooltip ([#451](https://github.com/synergy-design-system/synergy-design-system/issues/451)) ([b6f3958](https://github.com/synergy-design-system/synergy-design-system/commit/b6f395846b00598273d0287daa98a64f82b75699))

## 1.14.0

(Released on: 2024-04-23)

### Minor Changes

- ✨ progress-bar ([#423](https://github.com/synergy-design-system/synergy-design-system/issues/423)) ([587d2ad](https://github.com/synergy-design-system/synergy-design-system/commit/587d2adad36266d5e2bd3aadad2c7350c5b8aa34))

## 1.13.0

(Released on: 2024-04-23)

### Minor Changes

- ✨ progress ring ([#422](https://github.com/synergy-design-system/synergy-design-system/issues/422)) ([d7606fe](https://github.com/synergy-design-system/synergy-design-system/commit/d7606fe56e24f4a7cf82c6670f00b18977d3784b))

## 1.12.1

(Released on: 2024-04-23)

### Patch Changes

- 🤔 update dependencies ([#438](https://github.com/synergy-design-system/synergy-design-system/issues/438)) ([f3d648b](https://github.com/synergy-design-system/synergy-design-system/commit/f3d648b2071214cd6d58ff18d66e434dd32bfc76))

## 1.12.0

(Released on: 2024-04-18)

### Minor Changes

- ✨ opacity-token 50% ([#428](https://github.com/synergy-design-system/synergy-design-system/issues/428)) ([ec1493d](https://github.com/synergy-design-system/synergy-design-system/commit/ec1493d8c0cedaf6568be970e8d9a5c0c1ab82fa))

## 1.11.0

(Released on: 2024-04-08)

### Minor Changes

- ✨ add syn-side-nav, syn-nav-item, syn-prio-nav ([#364](https://github.com/synergy-design-system/synergy-design-system/issues/364)) ([fd9b821](https://github.com/synergy-design-system/synergy-design-system/commit/fd9b82138385f2708003ce18d9c118b7a8fb7925))

## 1.10.0

(Released on: 2024-03-28)

### Minor Changes

- ✨ syn-badge ([#390](https://github.com/synergy-design-system/synergy-design-system/issues/390)) ([a44d683](https://github.com/synergy-design-system/synergy-design-system/commit/a44d683b35e984bfbdac093dba5abd04c74f33c0))

## 1.9.1

(Released on: 2024-03-26)

### Patch Changes

- 🤔: Adjust syn-color-neutral-100 ([#391](https://github.com/synergy-design-system/synergy-design-system/issues/391)) ([bec9459](https://github.com/synergy-design-system/synergy-design-system/commit/bec945987fddf571fc8c2da940a9b7b279f0bb82))

## 1.9.0

(Released on: 2024-03-18)

### Minor Changes

- ✨ drop-down ([#367](https://github.com/synergy-design-system/synergy-design-system/issues/367)) ([562daf8](https://github.com/synergy-design-system/synergy-design-system/commit/562daf8b06627b7d44a3f06210b3202c7eee9540))

## 1.8.0

(Released on: 2024-02-28)

### Minor Changes

- ✨ Create syn-header ([#331](https://github.com/synergy-design-system/synergy-design-system/issues/331)) ([acde61d](https://github.com/synergy-design-system/synergy-design-system/commit/acde61d762dd4123aae553227f3af2015e824208))

## 1.7.1

(Released on: 2024-02-27)

### Patch Changes

- 🤔 Fix broken theme tokens and add automatic check ([#342](https://github.com/synergy-design-system/synergy-design-system/issues/342)) ([3fea98a](https://github.com/synergy-design-system/synergy-design-system/commit/3fea98a242d0994f8c3aa9be81ef38a9cd43e48e))

## 1.7.0

(Released on: 2024-02-27)

### Minor Changes

- ✨ syn-drawer ([#320](https://github.com/synergy-design-system/synergy-design-system/issues/320)) ([ce20a42](https://github.com/synergy-design-system/synergy-design-system/commit/ce20a42f9f90eb5b38c0ae84f99d4a8db2e08613))

## 1.6.0

(Released on: 2024-02-26)

### Minor Changes

- ✨ added tokens for roundings ([#338](https://github.com/synergy-design-system/synergy-design-system/issues/338)) ([48e01cb](https://github.com/synergy-design-system/synergy-design-system/commit/48e01cbe074726a5bd2abf67fce7bd8d784f1c47))

## 1.5.0

(Released on: 2024-02-22)

### Minor Changes

- ✨ adjust the size tokens for syn-Input and syn-Button ([#324](https://github.com/synergy-design-system/synergy-design-system/issues/324)) ([ac00d58](https://github.com/synergy-design-system/synergy-design-system/commit/ac00d58db394490e852c627f90209e37bfb8a4bb))

## 1.4.0

(Released on: 2024-02-15)

### Minor Changes

- ✨ Added text-styles for typography ([#318](https://github.com/synergy-design-system/synergy-design-system/issues/318)) ([a9758ee](https://github.com/synergy-design-system/synergy-design-system/commit/a9758ee7c8242fac4b0e6e6d7d4006d9b59cc51d))

## 1.3.2

(Released on: 2024-02-15)

### Patch Changes

- 🤔 color tokens to variables sync ([#321](https://github.com/synergy-design-system/synergy-design-system/issues/321)) ([41c7195](https://github.com/synergy-design-system/synergy-design-system/commit/41c719571cf4905125420343e91a349597da16d5))

## 1.3.1

(Released on: 2024-02-09)

### Patch Changes

- 🤔 adjust synergy form template ([#314](https://github.com/synergy-design-system/synergy-design-system/issues/314)) ([595de16](https://github.com/synergy-design-system/synergy-design-system/commit/595de16fd9afd43a920045274c9ced16bbd6e5d8))

## 1.3.0

(Released on: 2024-01-30)

### Minor Changes

- ✨ syn-select / syn-option / syn-optgroup ([#274](https://github.com/synergy-design-system/synergy-design-system/issues/274)) ([25c6788](https://github.com/synergy-design-system/synergy-design-system/commit/25c678829e58a173c0fc23005a4f724b6d792dd7))

## 1.2.3

(Released on: 2024-01-29)

### Patch Changes

- 🤔 SCSS tokens cannot be loaded via postcss because of defunct exports map ([#286](https://github.com/synergy-design-system/synergy-design-system/issues/286)) ([cc6a9c1](https://github.com/synergy-design-system/synergy-design-system/commit/cc6a9c1cee33377c313611c89bfa98119e0c2377))

## 1.2.2

(Released on: 2024-01-24)

### Patch Changes

- 🤔 Update project dependencies ([#276](https://github.com/synergy-design-system/synergy-design-system/issues/276)) ([9aa94be](https://github.com/synergy-design-system/synergy-design-system/commit/9aa94beb8f1191862d7cf48617af2d1994a6df9c))

## 1.2.1

(Released on: 2024-01-17)

### Patch Changes

- 🤔 Tokens of the radio get lost when pushing to GitHub ([#265](https://github.com/synergy-design-system/synergy-design-system/issues/265)) ([0643335](https://github.com/synergy-design-system/synergy-design-system/commit/06433355792459a382492b4ebc32d0de08b73030))

## 1.2.0

(Released on: 2024-01-15)

### Minor Changes

- ✨ Implement dark mode for components and documentation ([#238](https://github.com/synergy-design-system/synergy-design-system/issues/238)) ([3defbb2](https://github.com/synergy-design-system/synergy-design-system/commit/3defbb25bdf6432d72e6ec7971628a3990b7a970))

## 1.1.0

(Released on: 2024-01-11)

### Minor Changes

- ✨ add syn-icon-button ([#211](https://github.com/synergy-design-system/synergy-design-system/issues/211)) ([2a460be](https://github.com/synergy-design-system/synergy-design-system/commit/2a460be6bdad09c3a7b0fb211e92b26d71d5408e))

## 1.0.3

(Released on: 2024-01-10)

### Patch Changes

- 🤔 Replace primitive tokens of 'input.icon.icon-clearable' with core tokens ([#240](https://github.com/synergy-design-system/synergy-design-system/issues/240)) ([c2b8c18](https://github.com/synergy-design-system/synergy-design-system/commit/c2b8c18f6852c1abf95d2319730a321667435c0b))

## 1.0.2

(Released on: 2023-12-14)

### Patch Changes

- 📚 improve links in documentation ([#224](https://github.com/synergy-design-system/synergy-design-system/issues/224)) ([f55934c](https://github.com/synergy-design-system/synergy-design-system/commit/f55934c34c6c53b0f7c9a5afa8d91bc520df4fdf))

## 1.0.1

(Released on: 2023-12-06)

### Patch Changes

- improve changelogs ([#213](https://github.com/synergy-design-system/synergy-design-system/issues/213)) ([3674aed](https://github.com/synergy-design-system/synergy-design-system/commit/3674aed156b3f604a220be23957ca2da05717472))

# @synergy-design-system/tokens-v1.0.0 (2023-12-06)

### Features

- init first release ([#210](https://github.com/synergy-design-system/synergy-design-system/issues/210)) ([55fe07e](https://github.com/synergy-design-system/synergy-design-system/commit/55fe07e9454ec159506f24223222786f315e800c))
- ✨ add CSS theme (light & dark)
- ✨ add tokens for JS, SCSS
