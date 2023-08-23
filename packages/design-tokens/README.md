# @sick-design-system/design-tokens

This package provides the low level [design tokens](https://www.invisionapp.com/inside-design/design-tokens/) that form the core of the SICK Design System. It uses [style-dictionary](https://amzn.github.io/style-dictionary) to provide various output formats, as detailed below and allows bidirectional syncs between the original JSON files and [Figma Tokens Studio](https://tokens.studio/).

---

## Installation

You may install this package using one of the following ways:

```bash
npm install --save @sick-design-system/design-tokens
yarn add @sick-design-system/design-tokens
pnpm i @sick-design-system/design-tokens
```

## Workflow for usage

> This guide assumes you have already [set up your GitHub Repository for syncing with Figma Tokens Studio](https://docs.tokens.studio/sync/github). Please make sure to follow the steps for setting up the sync first!

### From a designers point of view

1. 🌟 Make sure to install the [Figma Tokens Studio](https://tokens.studio/) into your Figma board.
2. ⚙️ If not already done, [set up your GitHub Repository for syncing with Figma Tokens Studio](https://docs.tokens.studio/sync/github). Configure it to use the branch `main` and file path `packages/design-tokens/tokens`.  
2. 🎨 Configure your design tokens in the plugin.
3. ✍️ Build some components using the plugin.
4. 💾 Save your work.
5. ✨ Tokens should now automatically be pushed to the configured repository location.

### From a developers point of view

1. 🌟 Run `pnpm i -r` in the root of this repository.
2. 🎨 Add some changes to the tokens in the `tokens` directory.
3. 💾 Save your changes and commit them.
4. 🚀 Push your changes to the `main` branch.
5. ✨ Tokens should now automatically be pushed to your Figma Board.

---

## Using the design tokens

We currently ship design tokens in the following ways:

### 1. CSS Custom Properties (aka. CSS variables)

This is the preferred way to use the SDS design tokens. Custom-Properties have the advantage to have widespread browser adoption, are framework agnostic and do not need a special build system to work. Just add a link to the tokens and you are set.

```html
<head>
<!-- Example 1: Referencing directly in a HTML document -->
<!-- Make sure to add the stylesheet before using any components -->
<link rel="stylesheet" href="/node_modules/@sick-design-system/design-tokens/build/css/tokens.css" />
</head>
<body>
  <div style="background: var(--sds-color-primary-500)">Content</div>"
</body>
```

```javascript
// Example 2: Referencing via javascript, e.g. when using webpack or vite
// Note your bundler may need to be setup to allow css files!
import '@sick-design-system/design-tokens/css/tokens.css';
```

### 2. SASS

If you already have a SASS toolchain, you may also use our scss variables. Use the following statement to use the variables:

```scss
// Import the variables first
// If not using webpack sass loader, you may need a sass import helper like
// https://www.npmjs.com/package/node-sass-package-importer
// to make it work.
@import '~sick-design-system/design-tokens/build/scss/tokens.scss';

// You may now use the variables in your sass files
.box {
  background: $sds-color-primary-500;
}
```

### 3. Javascript constants

We also provide all tokens as javascript constants. This may be needed when you want to use the variables in Javascript based animations or calculations that use our sizings.

> Beware! Custom Properties and the JavaScript export are NOT synced.
> If you have overridden a css custom property in the project, the JavaScript exports will still point to the original value!

```javascript
// Note! We do NOT provide a default export, so you will have to use one of the syntaxes below to import a token.
import * as allTokens from '@sick-design-system/design-tokens';
import { sdsColorPrimary500 } from '@sick-design-system/design-tokens';

console.log(allTokens.sdsColorPrimary500); // <- #007CC1
console.log(sdsColorPrimary500);           // <- #007CC1
```
