# @sick-design-system/stylelint-config-sds

This package provides common linting rules for CSS used throughout the SICK Design System. It is primarily based on `stylelint-config-standard` and supports css, JavaScript and TypeScript files and lit and fast css helper functions via [postcss-lit](https://github.com/43081j/postcss-lit).

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

## Adding a lint job

> ⚠️ If you add a lint job named `lint:css` to a package in this repository, it will automatically be run.

To add a lint job to your package, just add the following to the `scripts` part of your `package.json` file:

```json
"scripts": {
  "lint:css": "stylelint \"src/**/*.{css,js,ts}\"",
},
```

## Editor Support

VSCode should support the provided stylelint-configuration out of the box. Make sure to add the keys "javascript" and "typescript" to the list of checked file types in vscode. An example that should automatically load the required settings [can be seen here](../../.vscode/settings.json).
