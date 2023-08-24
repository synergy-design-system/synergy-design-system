# @sick-design-system/stylelint-config-sds

This package provides common linting rules for CSS used throughout the SICK Design System. It is primarily based on `stylelint-config-standard` and supports JavaScript and TypeScript projects.

---

## Installation

Please issue one of the following commands to install the linting toolchain:

```bash
npm install --save-dev stylelint @sick-design-system/styling-config-sds
yarn add --dev stylelint @sick-design-system/styling-config-sds
pnpm i -D stylelint @sick-design-system/styling-config-sds
```

## Configuration

Create a new `.stylelintrc.json` file with the following content:

```json
{
  "extends": "@sick-design-system/stylelint-config-sds",
  "rules": {
    "example-rule": null
  }
}
```

You may extend the configuration as you like by adding your own overrides via the `rules` key as [described in the stylelint configuration](https://stylelint.io/user-guide/configure#rules).
