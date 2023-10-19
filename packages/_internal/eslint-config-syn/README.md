# @synergy-design-system/eslint-config-syn

This package provides common linting rules used throughout the Synergy Design System. It is primarily based on `eslint-config-airbnb` and supports JavaScript and TypeScript projects.

---

## Installation

Please issue one of the following commands to install the linting toolchain:

```bash
npm install --save-dev eslint @synergy-design-system/eslint-config-syn
yarn add --dev eslint @synergy-design-system/eslint-config-syn
pnpm i -D eslint @synergy-design-system/eslint-config-syn
```

## Configuration

### for JavaScript projects:

Create a new `.eslintrc.json` file with the following content:

```json
{
  "extends": "@synergy-design-system/eslint-config-syn"
}
```

You may extend the configuration as you like by adding your own overrides via the `rules` key as [described in the eslint configuration](https://eslint.org/docs/latest/use/configure/rules).

### for TypeScript projects:

Create a new `.eslintrc.json` file with the following content:

```json
{
  "extends": "@synergy-design-system/eslint-config-syn/ts",
  "parserOptions": {
    "project": "./tsconfig.json"
  }
}
```

You may extend the configuration as you like by adding your own overrides via the `rules` key as [described in the eslint configuration](https://eslint.org/docs/latest/use/configure/rules).

> ⚠️ Make sure to point the `parserOptions.project` configuration key to a valid typescript configuration file.
> The linter will not work if you omit this step! 
