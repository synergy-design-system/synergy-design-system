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
import "@synergy-design-system/styles";
```

---

### 2.2 Loading single modules

It is also possible to load only parts of the provided functionality.
This can be archived in the following way:

```html
<!-- Loading typography only -->
<!DOCTYPE html>
  <head>
    <link rel="stylesheet" href="/node_modules/@synergy-design-system/styles/dist/typography.css" />
  </head>
  <body>
  </body>
</html>
```

```javascript
// Loading typography only
import "@synergy-design-system/styles/typography.css";
```

---

## 3. Available modules

<!-- BEGIN INLINE COMMENT -->

### 3.1 - typography

#### syn-body

Body text is used for long-form content where a paragraph or multiple lines of text are required. Body text styles are optimized for reading as a large chunk of information through line height and paragraph spacing. Inline links sit within body text styles and inherit the same font values. UI text is text used in UI components and uses the same text stylings. The default font size is medium (16 px). Synergy supports three additional font sizes for body copy. It is also possible to format the text bold or semibold for certain text passages and UI elements such as label.

#### Installation

```html
<!-- Loading typography only (without bundler) -->
<link rel="stylesheet" href="/node_modules/@synergy-design-system/styles/dist/typography.css" />
```

```javascript
// Loading typography only (with vite / webpack)
import "@synergy-design-system/styles/typography.css";
```

#### Available classes

- `.syn-body-x-small`
- `.syn-body-small`
- `.syn-body-medium`
- `.syn-body-large`

---

#### syn-heading

Heading styles come in a range of sizes, and can be used in a range of contexts, such as: <br /> <ul> <li>building page hierarchy, <li>helping users scan large chunks of text,</li> <li>providing a title to a page or piece of content,</li> <li>as subheadings or eyebrow headings, where there is still only one H1 tag per page (as per Accessibility requirements).</li> </ul> <br /> Our heading styles are consistently bold, to better address the visual hierarchy.

#### Installation

```html
<!-- Loading typography only (without bundler) -->
<link rel="stylesheet" href="/node_modules/@synergy-design-system/styles/dist/typography.css" />
```

```javascript
// Loading typography only (with vite / webpack)
import "@synergy-design-system/styles/typography.css";
```

#### Available classes

- `.syn-heading-3x-large`
- `.syn-heading-2x-large`
- `.syn-heading-x-large`
- `.syn-heading-large`

---

#### syn-weight

Definition of font weights used in synergy

#### Installation

```html
<!-- Loading typography only (without bundler) -->
<link rel="stylesheet" href="/node_modules/@synergy-design-system/styles/dist/typography.css" />
```

```javascript
// Loading typography only (with vite / webpack)
import "@synergy-design-system/styles/typography.css";
```

#### Available classes

- `.syn-weight-normal`
- `.syn-weight-semibold`
- `.syn-weight-bold`
<!-- END INLINE COMMENT -->

---

## Documentation

### Building the styles

This package makes use of `postcss` for creating a unified bundle for easier consumption in applications. Please run `pnpm build` in the root of this package to recreate the bundle file `dist/index.css`.

### Creating new modules

1. Create a new folder `src/[MODULE_NAME]`.
2. Create a new file `src/[MODULE_NAME]/index.css`.
3. Add CSS statements to your linking. **Hint**: You may also split your code into multiple css files residing in the `src/[MODULE_NAME]` folder. Make sure to **import them into your `src/[MODULE_NAME]/index.css` file** to make them part of the build.
4. Add documentations to your code to automatically add documentation to the `README.md`. This can be done by creating comments, as seen below.
5. Run `pnpm build`. You should now see the a new file `dist/[MODULE_NAME].css` that holds all your previous code.

#### Bonus: Documenting your module with css comments

When adding comments to your modules, please add a list of all variants of your module to your css file. Comments like this will take care that the documentation is automatically updated:

```css
/**
 * The "variant" syn-fieldset takes care that two classes will exist in documentation:
 * - syn-fieldset-small and
 * - syn-fieldset-large
 * @variant {small | large } syn-fieldset
 */
```
