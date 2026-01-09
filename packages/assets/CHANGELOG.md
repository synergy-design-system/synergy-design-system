# Changelog

## 1.25.1

### Patch Changes

- [#1148](https://github.com/synergy-design-system/synergy-design-system/pull/1148) [`73b7011`](https://github.com/synergy-design-system/synergy-design-system/commit/73b70118ae21bc58c83cbfeb9e2e8447873803a6) Thanks [@schilchSICKAG](https://github.com/schilchSICKAG)! - Released on: 2026-01-08

  fix: 🐛 Minor dependency updates (#258)

## 1.25.0

### Minor Changes

- [#1105](https://github.com/synergy-design-system/synergy-design-system/pull/1105) [`27adaae`](https://github.com/synergy-design-system/synergy-design-system/commit/27adaaeab60487ca4c92be8fd15b09eb4f09fdc6) Thanks [@schilchSICKAG](https://github.com/schilchSICKAG)! - Released on: 2025-11-28

  feat: ✨ add new error icon (#1101)

## 1.24.0

### Minor Changes

- [#1082](https://github.com/synergy-design-system/synergy-design-system/pull/1082) [`e27f95b`](https://github.com/synergy-design-system/synergy-design-system/commit/e27f95ba3e5bd1f494db80ad51d0c1957b8d2204) Thanks [@schilchSICKAG](https://github.com/schilchSICKAG)! - Released on: 2025-11-27

  feat: ✨ Brand updates for `<syn-tab-group>`, `<syn-tab-panel>` and `<syn-tab>` (#969)

## 1.23.0

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

## 1.22.0

### Minor Changes

- [#1086](https://github.com/synergy-design-system/synergy-design-system/pull/1086) [`515226c`](https://github.com/synergy-design-system/synergy-design-system/commit/515226c44f8bba7b2b4b80cdd0f21f3237f0670d) Thanks [@schilchSICKAG](https://github.com/schilchSICKAG)! - Released on: 2025-11-19

  feat: ✨ Brand updates for `<syn validate>` (#973)

## 1.21.0

### Minor Changes

- [#1039](https://github.com/synergy-design-system/synergy-design-system/pull/1039) [`bc0bc63`](https://github.com/synergy-design-system/synergy-design-system/commit/bc0bc639a996fc75c57194244596d5733097389d) Thanks [@schilchSICKAG](https://github.com/schilchSICKAG)! - Released on: 2025-11-04

  feat: ✨ changesets migration (#928)

  This PR migrates Synergies ci/cd system from `semantic-release` to `changesets`.

## 1.20.1

(Released on: 2025-10-15)

### Patch Changes

- 🐛 Upgrade packages to latest versions - 10/25 ([#1035](https://github.com/synergy-design-system/synergy-design-system/issues/1035)) ([2fb5693](https://github.com/synergy-design-system/synergy-design-system/commit/2fb5693e536df706ea2c99a8ffc6e4d853442bbf))

## 1.20.0

(Released on: 2025-10-02)

### Minor Changes

- ✨ CD update for syn-divider, syn-tag, syn-accordion, syn-details ([#1028](https://github.com/synergy-design-system/synergy-design-system/issues/1028)) ([b43a81a](https://github.com/synergy-design-system/synergy-design-system/commit/b43a81ab651da6b41668e481981ccbdcc1f07254))

## 1.19.0

(Released on: 2025-09-12)

### Minor Changes

- ✨ add new logos for sick2025 ([#1017](https://github.com/synergy-design-system/synergy-design-system/issues/1017)) ([d9eec10](https://github.com/synergy-design-system/synergy-design-system/commit/d9eec1045812f0538d686269254dfc33414d0667))

## 1.18.0

(Released on: 2025-08-08)

### Minor Changes

- ✨ syn-icon: Provide a function to switch the icon set to brand2025 ([#974](https://github.com/synergy-design-system/synergy-design-system/issues/974)) ([1482e34](https://github.com/synergy-design-system/synergy-design-system/commit/1482e34f21ce80b9ad6f25e760f87de13d5f70db))

## 1.17.0

(Released on: 2025-07-14)

### Minor Changes

- ✨ export new icons ([#919](https://github.com/synergy-design-system/synergy-design-system/issues/919)) ([ad148f9](https://github.com/synergy-design-system/synergy-design-system/commit/ad148f9681822f18c0959664e55ec72e343afa9b))

## 1.16.1

(Released on: 2025-06-20)

### Patch Changes

- 🐛 Upgrade packages to latest versions ([#905](https://github.com/synergy-design-system/synergy-design-system/issues/905)) ([64de3cd](https://github.com/synergy-design-system/synergy-design-system/commit/64de3cd72f7ab3c7eeb727a9de85d9d980b27055))

## 1.16.0

(Released on: 2025-06-06)

### Minor Changes

- ✨ assets: Provide infrastructure for fetching new icon sets ([#888](https://github.com/synergy-design-system/synergy-design-system/issues/888)) ([f051b6f](https://github.com/synergy-design-system/synergy-design-system/commit/f051b6f5ed256dcdb5e39ae653c22fc602a7fe5f))

## 1.15.1

(Released on: 2025-06-03)

### Patch Changes

- 🐛 Fix broken icons ([#891](https://github.com/synergy-design-system/synergy-design-system/issues/891)) ([d734c89](https://github.com/synergy-design-system/synergy-design-system/commit/d734c89ba6e9d0062c8d65b9fac724a07e42398f))

## 1.15.0

(Released on: 2025-06-03)

### Minor Changes

- ✨added Overview page ([#880](https://github.com/synergy-design-system/synergy-design-system/issues/880)) ([5527ad5](https://github.com/synergy-design-system/synergy-design-system/commit/5527ad535c4f801a1f7083b68e29996b17e7f4bc))

## 1.14.0

(Released on: 2025-05-21)

### Minor Changes

- ✨ Add variant="sticky" to syn-side-nav ([#855](https://github.com/synergy-design-system/synergy-design-system/issues/855)) ([0004497](https://github.com/synergy-design-system/synergy-design-system/commit/0004497ff3c35fab1de65fdd70730f5962ffd748))

## 1.13.1

(Released on: 2025-03-31)

### Patch Changes

- 🐛 Upgrade packages to latest versions ([#830](https://github.com/synergy-design-system/synergy-design-system/issues/830)) ([f5fe54f](https://github.com/synergy-design-system/synergy-design-system/commit/f5fe54fb55732b1e3efdf3062d55ee517aef4e81))

## 1.13.0

(Released on: 2025-03-11)

### Minor Changes

- ✨ Add new material icons ([#802](https://github.com/synergy-design-system/synergy-design-system/issues/802)) ([eb7c044](https://github.com/synergy-design-system/synergy-design-system/commit/eb7c044e1d4175b273663ea2c3f406067b828c33))

## 1.12.0

(Released on: 2025-02-10)

### Minor Changes

- ✨Update shoelace and deps to latest version ([#769](https://github.com/synergy-design-system/synergy-design-system/issues/769)) ([143d88f](https://github.com/synergy-design-system/synergy-design-system/commit/143d88f0a50c47a996be0cb1527629802266800e))

## 1.11.2

(Released on: 2024-12-02)

### Patch Changes

- 🐛 Assets release process ([#700](https://github.com/synergy-design-system/synergy-design-system/issues/700)) ([c28647f](https://github.com/synergy-design-system/synergy-design-system/commit/c28647fa3fbde952e649c67bf7d98df6060ac78b))

## 1.11.1

(Released on: 2024-12-02)

### Patch Changes

- 🐛 Added missing dist from files ([#699](https://github.com/synergy-design-system/synergy-design-system/issues/699)) ([82d8ae0](https://github.com/synergy-design-system/synergy-design-system/commit/82d8ae0237051923fdbb4e4e753dc0ba2fdd30fb))

## 1.11.0

(Released on: 2024-12-02)

### Minor Changes

- ✨ provide a way to bundle svg assets ([#692](https://github.com/synergy-design-system/synergy-design-system/issues/692)) ([081f3ed](https://github.com/synergy-design-system/synergy-design-system/commit/081f3ed0c1a20d4a10acfdf18dde3ff698fc4d5d))

## 1.10.0

(Released on: 2024-11-21)

### Minor Changes

- ✨ provide accessible solution for validation ([#599](https://github.com/synergy-design-system/synergy-design-system/issues/599)) ([f8ef81a](https://github.com/synergy-design-system/synergy-design-system/commit/f8ef81a4a61af27fcb6de2c03ce13ef502fcb732))

## 1.9.0

(Released on: 2024-10-11)

### Minor Changes

- ✨ Update Shoelace to 2.17.1 ([#641](https://github.com/synergy-design-system/synergy-design-system/issues/641)) ([86fd83b](https://github.com/synergy-design-system/synergy-design-system/commit/86fd83b528be24abc8dd8427604c7fd62e8c1ff2))

## 1.8.0

(Released on: 2024-08-23)

### Minor Changes

- ✨ Upgrade packages to latest versions ([#592](https://github.com/synergy-design-system/synergy-design-system/issues/592)) ([e43c563](https://github.com/synergy-design-system/synergy-design-system/commit/e43c5630b6c43ef855af6815604c7649376104ee)), closes [#2078](https://github.com/synergy-design-system/synergy-design-system/issues/2078) [#2063](https://github.com/synergy-design-system/synergy-design-system/issues/2063) [#2041](https://github.com/synergy-design-system/synergy-design-system/issues/2041) [#2041](https://github.com/synergy-design-system/synergy-design-system/issues/2041) [#2116](https://github.com/synergy-design-system/synergy-design-system/issues/2116) [#2121](https://github.com/synergy-design-system/synergy-design-system/issues/2121) [#1992](https://github.com/synergy-design-system/synergy-design-system/issues/1992) [#2079](https://github.com/synergy-design-system/synergy-design-system/issues/2079) [#2009](https://github.com/synergy-design-system/synergy-design-system/issues/2009) [#1967](https://github.com/synergy-design-system/synergy-design-system/issues/1967) [#1947](https://github.com/synergy-design-system/synergy-design-system/issues/1947) [#1974](https://github.com/synergy-design-system/synergy-design-system/issues/1974) [#1985](https://github.com/synergy-design-system/synergy-design-system/issues/1985) [#2001](https://github.com/synergy-design-system/synergy-design-system/issues/2001)

## 1.7.0

(Released on: 2024-08-19)

### Minor Changes

- ✨ create syn-file ([#563](https://github.com/synergy-design-system/synergy-design-system/issues/563)) ([181f121](https://github.com/synergy-design-system/synergy-design-system/commit/181f121ee87e43ba0381ec4288470d3414467d8e))

## 1.6.0

(Released on: 2024-06-18)

### Minor Changes

- ✨ syn-tab ([#496](https://github.com/synergy-design-system/synergy-design-system/issues/496)) ([921299e](https://github.com/synergy-design-system/synergy-design-system/commit/921299e8f37db2b0a5f3e53a891f8f03ce39e12d))

## 1.5.1

(Released on: 2024-04-23)

### Patch Changes

- 🤔 update dependencies ([#438](https://github.com/synergy-design-system/synergy-design-system/issues/438)) ([f3d648b](https://github.com/synergy-design-system/synergy-design-system/commit/f3d648b2071214cd6d58ff18d66e434dd32bfc76))

## 1.5.0

(Released on: 2024-04-08)

### Minor Changes

- ✨ add syn-side-nav, syn-nav-item, syn-prio-nav ([#364](https://github.com/synergy-design-system/synergy-design-system/issues/364)) ([fd9b821](https://github.com/synergy-design-system/synergy-design-system/commit/fd9b82138385f2708003ce18d9c118b7a8fb7925))

## 1.4.0

(Released on: 2024-02-28)

### Minor Changes

- ✨ Create syn-header ([#331](https://github.com/synergy-design-system/synergy-design-system/issues/331)) ([acde61d](https://github.com/synergy-design-system/synergy-design-system/commit/acde61d762dd4123aae553227f3af2015e824208))

## 1.3.0

(Released on: 2024-01-30)

### Minor Changes

- ✨ syn-select / syn-option / syn-optgroup ([#274](https://github.com/synergy-design-system/synergy-design-system/issues/274)) ([25c6788](https://github.com/synergy-design-system/synergy-design-system/commit/25c678829e58a173c0fc23005a4f724b6d792dd7))

## 1.2.1

(Released on: 2024-01-24)

### Patch Changes

- 🤔 Update project dependencies ([#276](https://github.com/synergy-design-system/synergy-design-system/issues/276)) ([9aa94be](https://github.com/synergy-design-system/synergy-design-system/commit/9aa94beb8f1191862d7cf48617af2d1994a6df9c))

## 1.2.0

(Released on: 2024-01-19)

### Minor Changes

- ✨update icons ([#273](https://github.com/synergy-design-system/synergy-design-system/issues/273)) ([8677925](https://github.com/synergy-design-system/synergy-design-system/commit/8677925421d09f65c3aa8e056013b0cba8354f9a))

## 1.1.0

(Released on: 2024-01-12)

### Minor Changes

- ✨ add syn-tag ([#217](https://github.com/synergy-design-system/synergy-design-system/issues/217)) ([da91945](https://github.com/synergy-design-system/synergy-design-system/commit/da91945d1e7f4e5bb5cc2efd36e70f790c5663ad))

## 1.0.2

(Released on: 2023-12-14)

### Patch Changes

- 📚 improve links in documentation ([#224](https://github.com/synergy-design-system/synergy-design-system/issues/224)) ([f55934c](https://github.com/synergy-design-system/synergy-design-system/commit/f55934c34c6c53b0f7c9a5afa8d91bc520df4fdf))

## 1.0.1

(Released on: 2023-12-06)

### Patch Changes

- improve changelogs ([#213](https://github.com/synergy-design-system/synergy-design-system/issues/213)) ([3674aed](https://github.com/synergy-design-system/synergy-design-system/commit/3674aed156b3f604a220be23957ca2da05717472))

# @synergy-design-system/assets-v1.0.0 (2023-12-06)

### Features

- init first release ([#210](https://github.com/synergy-design-system/synergy-design-system/issues/210)) ([55fe07e](https://github.com/synergy-design-system/synergy-design-system/commit/55fe07e9454ec159506f24223222786f315e800c))
- ✨ add SICK logos, Material Icons and System Icons
