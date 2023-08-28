# @sick-design-system/css

This package provides css styles that may be used in new web projects. It [sets a common baseline](./src/core/baseline.css) for projects by configuring tags with default font sizes and colors and provides the css variables used throughout the SICK Design System components.

---

## Installation

You may install all styles via one of the following commands:

```bash
npm install --save @sick-design-system/css
yarn add @sick-design-system/css
pnpm i @sick-design-system/css
```

## Usage

This package includes two versions of the css files. You may use either of them, but make sure to **not include both** on the same page!

- `default.css` provides you with our design tokens, as well as a common configuration for typo, colors and spacing.
- `with-reset.css` provides the same data as `default.css`, but prepends `normalize.css` for a common ground styling. Use this if you do not use a css reset in your application yet.

```html
<head>
<!-- Example 1: Referencing directly in a HTML document -->
<!-- Make sure to add the stylesheet before using any components -->
<link rel="stylesheet" href="/node_modules/@sick-design-system/css/build/css/default.css" />
</head>
<body>
  <div style="background: var(--sds-color-primary-500)">Content</div>"
</body>
```

```html
<head>
<!-- Example 2: Using the normalize version -->
<!-- Make sure to add the stylesheet before using any components -->
<link rel="stylesheet" href="/node_modules/@sick-design-system/css/build/css/with-reset.css" />
</head>
<body>
  <div style="background: var(--sds-color-primary-500)">Content</div>"
</body>
```
