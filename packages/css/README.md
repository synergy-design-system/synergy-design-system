# @synergy-design-system/css

This package provides css styles that may be used in new web projects. It [sets a common baseline](./src/core/baseline.css) for projects by configuring [tags with default sizes and colors](./src/core/typo.css) and provides the css variables and [fonts](./src/core/fonts.css), as well as [icons](../icons/README.md) used throughout the SICK Design System components.

---

## Installation

You may install all styles via one of the following commands:

```bash
npm install --save @synergy-design-system/css
yarn add @synergy-design-system/css
pnpm i @synergy-design-system/css
```

---

## Developing

To develop new features and test them live, open a terminal and issue the following command: `pnpm build:watch`. This will run postcss with autowatch enabled. Each time you save your work in the `src/` folder, a new build will be issued. You may then test your changes by running the [package demo](./index.html) via `pnpm demo`.

---

## Usage

This package includes two versions of the css files. You may use either of them, but make sure to **not include both** on the same page!

- `default.css` provides you with our design tokens, inlined web fonts, as well as a common configuration for typo, colors and spacing.
- `with-reset.css` provides the same data as `default.css`, but prepends `normalize.css` for a common ground styling. 👉 Use this if you do not use a css reset in your application yet.

```html
<head>
<!-- Example 1: Referencing directly in a HTML document -->
<!-- Make sure to add the stylesheet before using any components -->
<link rel="stylesheet" href="/node_modules/@synergy-design-system/css/build/default.css" />
</head>
<body>
  <div style="background: var(--sds-color-primary-500)">Content</div>
</body>
```

```html
<head>
<!-- Example 2: Using the normalize version -->
<!-- Make sure to add the stylesheet before using any components -->
<link rel="stylesheet" href="/node_modules/@synergy-design-system/css/build/with-reset.css" />
</head>
<body>
  <div style="background: var(--sds-color-primary-500)">Content</div>
</body>
```

---

## Font Support

Supporting web-fonts as an npm module is more complex than it looks, as applications use various bundlers and each of them comes with its own syntax, configuration options and support for loading static files. Because of this, `@synergy-design-system/css` comes with our chosen font [as an embeddable data URI](https://oreillymedia.github.io/Using_SVG/extras/ch07-dataURI-fonts.html). Caching is still possible with this approach and you will not have to adjust your application bundlers configuration at all.

---

## Icon Support

The package ships with a inlined version of Material Design Icons that is available as `@synergy-design-system/icons`. Just add a `className` of **sds-icon** to an element to use the icon font. You may use it in the following way:

```html
<!-- Display the material design menu glyph -->
<span class="sds-icon">menu</span>
```

---

## Animations

This package also provides some shared styles, that make it possible to add animations to elements fast. The following animations are provided:

### Fade-In: (sds-fade-in)

This animation will change the `opacity` value of an element from __0__ to __1__. It may be used in conjunction with the `--sds-animation-fade-in`, `--sds-animation-fade-in-slow` or `--sds-animation-fade-in-fast` design tokens.

```html
<!-- Example usage: -->
<style>
.sds-fade {
  /* Default fade in animation */
  /* You could also use --sds-animation-fade-in-slow or --sds-animation-fade-in-fast */
  animation: var(--sds-animation-fade-in);
}
</style>
<div class="sds-fade">
  Content to fade
</div>
```

### Rotate: (sds-rotate-360)

Provides an animation that rotates the element by 360°. It may be used in conjunction with `--sds-animation-rotate`, `--sds-animation-rotate-slow` and `--sds-animation-rotate-fast`.

```html
<!-- Example usage: -->
<style>
.sds-rotate {
  /* Default fade in animation */
  /* You could also use --sds-animation-rotate-slow or --sds-animation-rotate-fast */
  animation: var(--sds-animation-rotate);
}
</style>
<div class="sds-rotate">
  Content to rotate
</div>
```

### Scale: (sds-scale)

Provides an animation that scales an image. It may be used in conjunction with `--sds-animation-scale`.

> The default scale is set to `1.2`.
> This may be overridden individually by setting the `-animation-scale` property of the element the animation is bound to.
> See examples below

```html
<!-- Example usage: -->
<style>
.sds-scale {
  /* Default scale animation. Will use a fixed amount of 1.2 as a scale factor. */
  animation: var(--sds-animation-scale);
}

.sds-scale-custom-5 {
  /* Uses a custom scale factor, only for this element. */
  animation: var(--sds-animation-scale);
  --animation-scale=5;
}

.sds-scale-custom-10 {
  /* Custom scale factor is set via style below. */
  animation: var(--sds-animation-scale);
}
</style>

<div class="sds-scale">
  Content to scale (scale factor 1.2)
</div>

<div class="sds-scale-custom-5">
  Content to scale (scale factor 5)
</div>

<div class="sds-scale-custom-10" style="--animation-scale=10;">
  Content to scale (scale factor 10)
</div>
```
