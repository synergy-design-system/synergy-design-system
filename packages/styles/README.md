# @synergy-design-system/styles

This package provides easy to use standalone helper classes based on the [Synergy Design Tokens](https://synergy-design-system.github.io/?path=/docs/packages-tokens--docs).

---

## 1. Installation

Please make sure to install the package as a dependency:

```bash
npm install --save @synergy-design-system/styles

# Install the required design tokens
# (only needed if you do not install peerDeps automatically)
npm install --save @synergy-design-system/tokens
```

---

## 2. Loading the provided stylesheets

### 2.1 Loading all styles (Recommended)

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

### 2.2 Loading single modules

It is also possible to load only parts of the provided functionality.
For example it is possible to load the `typography` helpers needed.

This can be archived in the following way:

```html
<!DOCTYPE html>
  <head>
    <link rel="stylesheet" href="/node_modules/@synergy-design-system/styles/src/typography.css" />
  </head>
  <body>
  </body>
</html>
```

```javascript
import '@synergy-design-system/styles/css/typography.css';
```

---

## 3. Available modules

### 3.1. Typography

The typography module holds classes that apply typographic behavior (e.g. `font-size` or `line-height`) to elements.

#### Installation

```javascript
import '@synergy-design-system/styles/css/typography.css';
```

#### Usage

```html
<!--
  -- Available headlines
  -- Note that semantics and spacings are up to the developer, classes apply font styling only!
-->
<h1 class="syn-heading-3x-large">Very Large Headline</h1>
<h2 class="syn-heading-2x-large">Large Headline</h2>
<h4 class="syn-heading-x-large">Medium Headline</h4>
<h5 class="syn-heading-large">Small Headline</h5>

<!-- Body Copy -->
<p class="syn-body-large">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
<p class="syn-body-medium">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
<p class="syn-body-small">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
<p class="syn-body-x-small">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
```

---

## Documentation

### Building the styles

This package makes use of `postcss` for creating a unified bundle for easier consumption in applications. Please run `pnpm build` in the root of this package to recreate the bundle file `dist/index.css`.
