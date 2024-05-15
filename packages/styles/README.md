# @synergy-design-system/styles

This package provides easy to use helper classes that css utility functions using [Synergy Design Tokens](https://synergy-design-system.github.io/?path=/docs/packages-tokens--docs).

It currently provides the following utilities:

- Typography

---

## Installation

Please make sure to install the package as a dependency:

```bash
npm install --save @synergy-design-system/styles
```

---

## Loading all styles (Recommended)

To load all provided css classes at once, just include the default export into your application.
It contains all styles found in the `src` directory.

```html
<!DOCTYPE html>
  <head>
    <link rel="stylesheet" href="/node_modules/@synergy-design-system/styles/dist/index.css" />
  </head>
  <body>
  </body>
</html>
```

We also provide a default export that points to the created `dist/index.css` file.
This will be picked up and served when using a bundler (e.g. webpack or vite).
For this to work, import the module directly in your project like this.

```javascript
import '@synergy-design-system/styles';
```

---

## Loading single modules

---

## Documentation

### Building the styles

This package makes use of `postcss` for creating a unified bundle for easier consumption in applications. Please run `pnpm build` in the root of this package to recreate the bundle file `dist/index.css`.
