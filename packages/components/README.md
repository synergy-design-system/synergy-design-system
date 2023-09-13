# @sick-design-system/components

SDS Web Component library based on [@microsoft/fast-foundation](https://github.com/microsoft/fast).

---

## Installation

You may install the components via one of the following commands:

```bash
npm install --save @sick-design-system/components
yarn add @sick-design-system/components
pnpm i @sick-design-system/components
```

## Usage

Using the components is as easy as using the exported `quickStart` function for a zero config quick start OR setting everything up by yourself.

> ⚠️ To use our components, you will need to define them first.
> We do **not** use `customElements.define()` in our library directly.
> This is done to make sure we [ship a side effects free bundle](https://webpack.js.org/guides/tree-shaking/).

### Zero Config Setup

This function is intended for quick testing of the library. It will provide **all** components and also load the [normalized css base file](../css/README.md) per default. This will provide you with our font setup, icons and design tokens out of the box.

Current feature set:

- [x] Define all components available.
- [ ] Add the `with-reset.css` stylesheet from `@sick-design-system/css` automatically.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script type="module">
    import { quickStart } from '@sick-design-system/components';
    quickStart();
  </script>
  <title>SICK Design System Demo</title>
</head>
<body>
  <header>
    <sds-logo></sds-logo>
  </header>
  <main>
    Count: <em>0</em>
    <sds-button variant="primary">
      <sds-icon>star</sds-icon>
      Increment
    </sds-button>
  </main>
</body>
</html>
```

### Manual Setup (Recommended)

This method of defining the elements gives you complete freedom about the components you want to use, so no unwanted files will land in your bundle.
Use this approach when you want to have control about the version of the design-tokens, styles and the available components.
It is also the suggested approach if you want to use a CDN for working with static assets (e.g. fonts).

> ⚠️ Make sure to setup icons and design-tokens before using any components!
> Components **will not load** those missing assets automatically.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- Load Open Sans via google fonts -->
  <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,300' rel='stylesheet' type='text/css'>

  <!-- Load the design tokens and icons from anywhere you like -->
  <link rel="stylesheet" href="https://path.to.cdn/@sick-design-system/design-tokens/build/tokens.css">
  <link rel="stylesheet" href="https://path.to.cdn/@sick-design-system/icons/build/font.css">
  
  <!-- or use a local version from npm -->
  <link rel="stylesheet" href="node_modules/@sick-design-system/design-tokens/build/tokens.css">
  <link rel="stylesheet" href="node_modules/@sick-design-system/icons/build/font.css">

  <script type="module">
    import { setup, SdsButton, SdsIcon, SdsLogo } from '@sick-design-system/components';
    setup([
      SDSButton,
      SdsIcon,
      SdsLogo,
    ]);
  </script>

  <title>SICK Design System Demo</title>
</head>
<body>
  <header>
    <sds-logo></sds-logo>
  </header>
  <main>
    <sds-button variant="primary">
      <sds-icon>star</sds-icon>
      Increment
    </sds-button>
  </main>
</body>
</html>
```
