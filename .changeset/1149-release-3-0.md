---
"@synergy-design-system/angular": major
"@synergy-design-system/assets": major
"@synergy-design-system/components": major
"@synergy-design-system/mcp": major
"@synergy-design-system/styles": major
"@synergy-design-system/vue": major
"@synergy-design-system/react": major
---

major: 💥 release 3.0 (#1149)

This release upgrades all Synergy packages to use the new SICK 2025 theme per default.
It does so in a way that is as sensible as possible by:

- Removing deprecated properties (e.g. the `hoist` attribute in some components)
- Creating new deprecations for future major releases (e.g. the usage of SICK 2018 icons is now deprecated)

Please have a look at the breaking changes documents for further information:

- [Assets](https://synergy-design-system.github.io/?path=/docs/packages-assets-breaking-changes--docs)
- [Components](https://synergy-design-system.github.io/?path=/docs/packages-components-breaking-changes--docs)
- [Styles](https://synergy-design-system.github.io/?path=/docs/packages-styles-breaking-changes--docs)
- [Tokens](https://synergy-design-system.github.io/?path=/docs/packages-tokens-breaking-changes--docs)

It also aligns the version numbers of the angular, components, react, vue and tokens package. This makes sure that all packages share the same version number.
