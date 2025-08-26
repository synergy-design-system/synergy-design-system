# Migration to Synergy 3.0

This document outlines the changes and migration steps required to upgrade from Synergy 2.x to the new Synergy 3.0.

> Please note that this migration is still in progress, and some features may not be fully implemented yet. We recommend reviewing the [GitHub repository](https://github.com/orgs/synergy-design-system/projects/2/views/37) for the latest updates.

## Roadmap

We are currently working on the migration to Synergy 3.0, which includes significant updates to the brand appearance, fonts and icon library.
This migration will ensure that your application remains up-to-date with the latest design standards and functionality improvements.

It is currently not advised to use the new version in production, as we are still finalizing the migration process.
However, you can start preparing your codebase for the upcoming changes.

A roadmap and current status of the migration can be found in our [GitHub repository](https://github.com/orgs/synergy-design-system/projects/2/views/37).

## Breaking Changes

### Icons

#### System Icon Library

Some Synergy components depend on a set of icons that must always be available. To make sure those components display correctly, even if the `@synergy-design-system/assets` package is not installed or configured properly, these icons are baked into Synergies core directly.

Components that use those icons include:

- `<syn-header>`: Uses the SICK logo if not told otherwise
- `<syn-select>`: Shows a caret sign to indicate the possibility to open the select box.
- `<syn-alert>`: Shows an "x" icon to be able to close the alert dialog.

As Synergy transitions to the new SICK brand, the icon library has been updated to include a new iconset.
For backwards compatibility, Synergy will ship two system icon libraries during the 2.0 support cycle.
For applications that plan to continue using Synergy 2.0, there **are no changes needed** to the icon library.
For applications that want to use the new icon library, we have added a new utility function `setSystemIconLibrary`.
After calling this function, the system icon library will be set to the new iconset.

> Make sure to call this function before rendering any components that use the system icon library!

```javascript
import { setSystemIconLibrary } from "@synergy-design-system/icons";
setSystemIconLibrary("sick2025");
```

#### New SICK 2025 icons

The new SICK 2025 theme comes with an updated icon library that includes both outline and filled versions of icons. These icons are available in the `@synergy-design-system/assets` package and can be used with the `<syn-icon>` or `<syn-icon-button>` component.

The new icon library provides two main styles:

- **Outline icons**: These are the standard outlined icons, which are the default
- **Filled icons**: These are filled versions of the same icons. The icons have the same name as the outline icons but with a suffix of `_fill`

To use the new SICK 2025 icons in your application, you have several options:

The outline and fill version can be used simultaneously.

```html
<!-- Outline version -->
<syn-icon name="home"></syn-icon>

<!-- Filled version -->
<syn-icon name="home_fill"></syn-icon>
```

```javascript
// Example vite config
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "node_modules/@synergy-design-system/assets/src/sick2025/outline/*",
          dest: "./assets/icons/",
        },
        {
          src: "node_modules/@synergy-design-system/assets/src/sick2025/fill/*",
          dest: "./assets/icons/",
        },
      ],
    }),
  ],
});
```

### Tokens

Synergy 3.0 introduces new CSS theme files that implement the updated SICK brand appearance:

- **`sick2025_light.css`**: The new light theme featuring the SICK 2025 brand identity
- **`sick2025_dark.css`**: The new dark theme featuring the SICK 2025 brand identity

These new themes include significant visual changes compared to the existing themes e.g. changed colors and new color palettes, components with roundings, new font etc.

We added new css class selectors, so it is easy to switch between different themes.

- SICK 2018 light theme: `.syn-sick2018-light`
- SICK 2018 dark theme: `.syn-sick2018-dark`
- SICK 2025 light theme: `.syn-sick2025-light`
- SICK 2025 dark theme: `.syn-sick2025-dark`

To use the new themes in your application:

1. **Replace theme imports** in your HTML or CSS:

   ```javascript
   // New Synergy 3.0 themes
   import "@synergy-design-system/tokens/themes/sick2025_light.css";
   import "@synergy-design-system/tokens/themes/sick2025_dark.css";
   ```

2. **Update theme switching logic** if you support runtime theme changes:

   ```javascript
   // Rename the class names for theme switching
   const switchTheme = () => {
     const { body } = document;
     const currentTheme = body.classList.contains("syn-sick2025-dark")
       ? "dark"
       : "light";

     if (currentTheme === "light") {
       // Light theme
       body.classList.remove("syn-sick2025-light");
       body.classList.add("syn-sick2025-dark");
     } else {
       // Dark theme
       body.classList.remove("syn-sick2025-dark");
       body.classList.add("syn-sick2025-light");
     }
   };
   ```

### Fonts

The SICK 2025 theme introduces a new typeface called **SICK Intl** that replaces the previously used Open Sans font. When migrating to Synergy 3.0 with the SICK 2025 theme, you'll need to ensure this font is properly loaded in your application.

> **Important**: Synergy does **not provide** the SICK Intl font directly. You need to include it in your own project.

#### Font Requirements

The SICK 2025 theme requires the following font weights:

- **Regular (400)**: Used for standard text content
- **Semi Bold (600)**: Used for emphasized text and headings

For detailed information about when and how to use the different font styles, refer to the [SICK Brand Portal](https://brand.sick.com/document/145#/basiselemente/typografie/sick-intl).

#### Usage

You have several options to include the SICK Intl font in your project:

##### Option 1: Local Installation

1. Download the `SICK Intl` font from the [SICK Brand Portal](https://brand.sick.com/document/145#/basiselemente/typografie/sick-intl)
2. Extract the ZIP file to a location accessible by your project (e.g., a `public` folder)
3. Add the following CSS to your project (replace `PUBLIC_PATH` with your actual path):

```css
@font-face {
  font-display: swap;
  font-family: "SICK Intl";
  font-style: normal;
  font-weight: 400;
  src: url("/PUBLIC_PATH/SICKIntl/SICKIntl-Regular.ttf") format("truetype");
}

@font-face {
  font-display: swap;
  font-family: "SICK Intl";
  font-style: normal;
  font-weight: 600;
  src: url("/PUBLIC_PATH/SICKIntl/SICKIntl-Semibold.ttf") format("truetype");
}
```

##### Option 2: Using the SICK CDN

For the quickest setup, load the fonts directly from the SICK CDN:

```css
/* Regular */
@font-face {
  font-display: swap;
  font-family: "SICK Intl";
  font-style: normal;
  font-weight: 400;
  src:
    url("https://www.sick.com/media/fonts/sickintl-v1/regular/SICKIntl-Regular.woff2")
      format("woff2"),
    url("https://www.sick.com/media/fonts/sickintl-v1/regular/SICKIntl-Regular.ttf")
      format("truetype");
}

/* Semi Bold */
@font-face {
  font-display: swap;
  font-family: "SICK Intl";
  font-style: normal;
  font-weight: 600;
  src:
    url("https://www.sick.com/media/fonts/sickintl-v1/semibold/SICKIntl-Semibold.woff2")
      format("woff2"),
    url("https://www.sick.com/media/fonts/sickintl-v1/semibold/SICKIntl-Semibold.ttf")
      format("truetype");
}
```

For better performance, you can also preload the font:

```html
<link
  rel="preload"
  href="https://www.sick.com/media/fonts/sickintl-v1/regular/SICKIntl-Regular.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

## Migration Steps

These steps are only needed when switching to the new Synergy 3.0 layout.

1. Always make sure to use the latest versions of the Synergy packages. You can check for updates using your package manager.
2. Call `setSystemIconLibrary` with `sick2025` to enable the new system icons.
3. Adjust your bundler to copy the new icons to your build output. This is necessary to ensure that the new icons are available in your application.
4. **Update CSS theme imports** to use the new `sick2025_light.css` and `sick2025_dark.css` files instead of the legacy theme files.
5. **Update theme class names** in your JavaScript theme switching logic to use `syn-sick2025-light` and `syn-sick2025-dark`.
6. **Add the SICK Intl font** by either downloading it locally or using the SICK CDN. Add the required `@font-face` declarations for Regular (400) and Semi Bold (600) weights to ensure proper typography rendering.
