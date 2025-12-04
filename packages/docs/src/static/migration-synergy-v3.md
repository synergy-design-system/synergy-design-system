# Synergy 3.0 Migration Guide

> ⚠️ **Migration in progress:** Some features may not be fully implemented yet. See the [GitHub migration board](https://github.com/orgs/synergy-design-system/projects/2/views/37) for updates.

> It is currently not advised to use the new version in production, as we are still finalizing the migration process.
> However, you can start preparing your codebase for the upcoming changes.

---

## Migration Checklist: Quick Overview

- [ ] Update Synergy packages to the latest version
- [ ] Call `setSystemIconLibrary('sick2025')` before rendering components
- [ ] Copy new icons to `/assets/icons/`
- [ ] Import new CSS themes (`sick2025_light.css`, `sick2025_dark.css`)
- [ ] Update theme switching logic to use new class names
- [ ] Add SICK Intl font (via `@synergy-design-system/fonts`, CDN, or brand portal)

---

## Release Highlights: Synergy 3.0

- **Brand appearance:** Updated colors, roundings, and overall look
- **Fonts:** New SICK Intl font replaces Open Sans
- **Icon library:** New outline and filled icons, new naming
- **CSS tokens/themes:** New theme files and class names

---

## Migration Steps: Detailed Guide

### 1. Update Synergy packages

Use your package manager to update all `@synergy-design-system/*` packages.
Also make sure to install `@synergy-design-system/fonts` for the new `SICK Intl` font.

---

### 2. Set the system icon library

Call `setSystemIconLibrary('sick2025')` before rendering any Synergy components.

**Example:**

```js
import { setSystemIconLibrary } from "@synergy-design-system/components";
setSystemIconLibrary("sick2025");
```

---

### 3. Copy new icons to your build output

Use your bundler (e.g., Vite) to copy icons from `@synergy-design-system/assets` to `/assets/icons/`.

**Example (Vite):**

```js
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
});
```

---

### 4. Import new CSS themes

Replace old theme imports with:

```js
import "@synergy-design-system/tokens/themes/sick2025_light.css";
import "@synergy-design-system/tokens/themes/sick2025_dark.css";
```

---

### 5. Update theme switching logic

Use new class names: `syn-sick2025-light` and `syn-sick2025-dark`.

**Example:**

```js
// Theme switcher
const { body } = document;
if (body.classList.contains("syn-sick2025-dark")) {
  body.classList.remove("syn-sick2025-dark");
  body.classList.add("syn-sick2025-light");
} else {
  body.classList.remove("syn-sick2025-light");
  body.classList.add("syn-sick2025-dark");
}
```

---

### 6. Add the SICK Intl font

Use one of the following options:

**Synergy fonts package (recommended):**

```javascript
import "@synergy-design-system/fonts";
```

**SICK CDN:**

```css
@font-face {
  font-display: swap;
  font-family: "SICK Intl";
  font-style: normal;
  font-weight: 400;
  src: url("https://www.sick.com/media/fonts/sickintl-v2/SICKIntl-Regular.woff2")
    format("woff2");
}
@font-face {
  font-display: swap;
  font-family: "SICK Intl";
  font-style: normal;
  font-weight: 600;
  src: url("https://www.sick.com/media/fonts/sickintl-v2/SICKIntl-Semibold.woff2")
    format("woff2");
}
```

**Brand portal:** Download and host the font yourself, then use a local path in `@font-face`.

---

## Migration: Breaking Changes & Details

### Breaking Changes: Icons

- **System icon library:** Synergy now ships two system icon libraries for compatibility. Use `setSystemIconLibrary` to switch to the new set.
- **New SICK 2025 icons:** Outline and filled icons, new naming. Use `<syn-icon name="home">` and `<syn-icon name="home_fill">`.
- **Migration utilities:** Use `setupIcons("sick2025")` for easy migration, or `migrateIconName` for custom setups.

### Breaking Changes: Tokens & Themes

- New theme files: `sick2025_light.css`, `sick2025_dark.css`
- New theme class names: `.syn-sick2025-light`, `.syn-sick2025-dark`
- Significant visual changes: colors, roundings, font

### Breaking Changes: SICK Intl Fonts

- New font: SICK Intl (Regular 400, Semi Bold 600)
- Provided directly by Synergy via `@synergy-design-system/fonts`, CDN, or brand portal

---

## Migration: Troubleshooting

- **Icons not showing?** Check asset paths and icon names.
- **Fonts not loading?** Verify font-face URLs and file locations.
- **Theme not switching?** Check class names and CSS imports.

---

## Migration: References & Further Reading

- [Synergy Docs](https://synergy-design-system.github.io/)
- [SICK Brand Portal](https://brand.sick.com/document/145#/basiselemente/typografie/sick-intl)
- [GitHub migration board](https://github.com/orgs/synergy-design-system/projects/2/views/37)

### Reference: Icons

#### Reference: System Icon Library

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
import { setSystemIconLibrary } from "@synergy-design-system/components";
setSystemIconLibrary("sick2025");
```

#### Reference: New SICK 2025 Icons

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

#### Reference: Migrating Icon Names

Applications that are migrating from Synergy 2 may have used icons that have been renamed in the migration process.
Those icons will **not** show up after the switch to the new icon library.
For this reason, Synergy provides some new utilities that help migrating your applications:

##### Example 1: Easy migration via `setupIcons`

The easiest type of migration. If you have an icon setup as recommended in this documentation (e.g. copying the assets to a default location), you may just use the new `setupIcons` function and call it:

```javascript
import { setupIcons } from "@synergy-design-system/components";
setupIcons("sick2025");
```

This will make sure to set the system icons to the new `sick2025` theme and also sets up a new `default` icon library that includes a static map from old icon names to the new ones.

> Note you will **not** have to call `setSystemIconLibrary` as Synergy will do this internally!

##### Custom setup: Using `migrateIconName` directly

Synergy now ships with a new basic utility function `migrateIconName`.
This function is able to map an icons name from the `sick2018` to the new `sick2025` icon set. It does so via a static map, returning the new names for icons.

You may use this directly, if you have overwritten the default icon library via the `registerIconLibrary` method:

```javascript
import {
  registerIconLibrary,
  setSystemIconLibrary,
  // Default icon set (outline)
  migrateIconName,
  // Alternative icon set (filled)
  migrateIconNameFilled,
} from "@synergy-design-system/components";

// Manually override the default icon library to use migrateIconName
// This is the default for the outline icon set.
const customIconLibrary = {
  name: "default",
  resolver: name => {
    const mappedName = migrateIconName(name);
    return getBasePath(`assets/icons/${mappedName}.svg`);
  },
};

// If you want to use filled icons instead, you may also append
// "_fill" to the svg name to use those icons instead.
const customIconLibraryFilled = {
  name: "default",
  resolver: name => {
    const mappedName = migrateIconNameFilled(name);
    return getBasePath(`assets/icons/${mappedName}.svg`);
  },
};

// Enable your new library.
// Do not forget to set the system icon library!
registerIconLibrary("default", customIconLibrary);
setSystemIconLibrary("sick2025");
```

### Reference: Tokens & Themes

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

### Reference: SICK Intl Fonts

The SICK 2025 theme introduces a new typeface called **SICK Intl** that replaces the previously used Open Sans font. When migrating to Synergy 3.0 with the SICK 2025 theme, you'll need to ensure this font is properly loaded in your application.

> **Important**: The SICK Intl font is now provided via the dedicated `@synergy-design-system/fonts` package for easy integration.

#### Font Requirements

The SICK 2025 theme requires the following font weights:

- **Regular (400)**: Used for standard text content
- **Semi Bold (600)**: Used for emphasized text and headings

For detailed information about when and how to use the different font styles, refer to the [SICK Brand Portal](https://brand.sick.com/document/145#/basiselemente/typografie/sick-intl).

#### Usage

You have several options to include the SICK Intl font in your project.
Each of those has its own advantages.

| Option            | Advantages                                                                         | Disadvantages                                                                                                                                                                                 |
| :---------------- | :--------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fonts Package     | Easy integration, works offline, updates under your control, automatic CSS imports | Requires npm package installation.                                                                                                                                                            |
| CDN               | Fast delivery when online, automatic update via CDN                                | Only works for services that have online connection, font updates may break application layouts.                                                                                              |
| Brand&nbsp;Portal | Installation from the official source                                              | File exports (other than the original TTF) from the official source are currently misaligned, leading to issues with vertical alignment, especially for components that support or use icons. |

> If you are not sure, we recommend you to use Option 1 as outlined below.

##### Option 1: Using @synergy-design-system/fonts (Recommended!)

Synergy now provides the SICK Intl font via the dedicated `@synergy-design-system/fonts` package.

**Installation:**

```bash
npm install @synergy-design-system/fonts
```

**Usage:**

```javascript
import "@synergy-design-system/fonts";
```

This automatically imports all required font-face declarations and makes the SICK Intl font available in your application.

##### Option 2: Using the SICK CDN

For the quickest setup, load the fonts directly from the SICK CDN:

```css
/* Regular */
@font-face {
  font-display: swap;
  font-family: "SICK Intl";
  font-style: normal;
  font-weight: 400;
  src: url("https://www.sick.com/media/fonts/sickintl-v2/SICKIntl-Regular.woff2")
    format("woff2");
}

/* Semi Bold */
@font-face {
  font-display: swap;
  font-family: "SICK Intl";
  font-style: normal;
  font-weight: 600;
  src: url("https://www.sick.com/media/fonts/sickintl-v2/SICKIntl-Semibold.woff2")
    format("woff2");
}
```

For better performance, you can also preload the font:

```html
<link
  rel="preload"
  href="https://www.sick.com/media/fonts/sickintl-v2/SICKIntl-Regular.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
<link
  rel="preload"
  href="https://www.sick.com/media/fonts/sickintl-v2/SICKIntl-Semibold.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

##### Option 3: Local Installation from brand portal (not recommended!)

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

## Migration Steps

These steps are only needed when switching to the new Synergy 3.0 layout.

1. Always make sure to use the latest versions of the Synergy packages. You can check for updates using your package manager.
2. Call `setSystemIconLibrary` with `sick2025` to enable the new system icons.
3. Adjust your bundler to copy the new icons to your build output. This is necessary to ensure that the new icons are available in your application.
4. **Update CSS theme imports** to use the new `sick2025_light.css` and `sick2025_dark.css` files instead of the legacy theme files.
5. **Update theme class names** in your JavaScript theme switching logic to use `syn-sick2025-light` and `syn-sick2025-dark`.
6. **Add the SICK Intl font** by either using the dedicated `@synergy-design-system/fonts` package (recommended), using the SICK CDN, or downloading it locally. The fonts package automatically provides all required font-face declarations for Regular (400) and Semi Bold (600) weights.
