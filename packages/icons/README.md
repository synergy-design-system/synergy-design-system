# @sick-design-system/icons

This package provides [Material Icons](https://fonts.google.com/icons) that are used throughout the SICK Design System in an easy to use package. The font is loaded [as an embeddable data URI](https://oreillymedia.github.io/Using_SVG/extras/ch07-dataURI-fonts.html). Caching is still possible with this approach and you will not have to adjust your application bundlers configuration at all.

---

## Installation

You may install all styles via one of the following commands:

```bash
npm install --save @sick-design-system/icons
yarn add @sick-design-system/icons
pnpm i @sick-design-system/icons
```

## Usage

Just include the provided `font.css` file in the `build/` directory. It will have all information needed to use the icons.

```html
<head>
<!-- Example 1: Referencing directly in a HTML document -->
<!-- Make sure to add the stylesheet before using any components -->
<link rel="stylesheet" href="/node_modules/@sick-design-system/icons/build/font.css" />
</head>
<body>
  <span class="sds-icon">
    menu
  </span>
</body>
```

```javascript
// Example 2: Referencing via JavaScript, e.g. when using webpack or vite
// Note your bundler may need to be setup to allow css files!
import '@sick-design-system/icons/build/font.css';

// Example 3: If your system supports package.json exports fields (like vite does),
// you may optionally also use the following alias:
import '@sick-design-system/icons';
```

---

## Usage in Web Components

> ⚠️ There is also an `icon.css` that only includes the base class `.sds-icon`.
> This file is intended to be loaded in web components that directly require icons in the shadow root and must not be loaded in your application.

```javascript
// Using lit as an example here
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

// Vite Imports this as string only when using ?inline
import iconDefinition from '@sick-design-system/icons/icon.css?inline';
import otherStyles from './iconDemo.styles.css?inline';

@customElement('icon-demo')
export class IconDemo extends LitElement {
  
  static styles = [
    css`${iconDefinition}`,
    css`${otherStyles}`,
  ];

  protected render() {
    return html`
      <p>
        <span class="sds-icon">menu</span>
        Content
      </p>
    `;
  }
}
```
