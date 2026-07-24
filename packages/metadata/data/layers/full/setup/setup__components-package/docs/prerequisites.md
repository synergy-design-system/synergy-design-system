# Prerequisites

## Fonts

Synergy Design System uses these typefaces:

| Theme     | Typeface    |
| --------- | ----------- |
| SICK 2018 | `Open Sans` |
| SICK 2025 | `SICK Intl` |

For SICK 2025, see [SICK Brand Portal](https://brand.sick.com/document/145#/basiselemente/typografie/sick-intl) for style usage (regular, semi-bold, etc).

---

## SICK 2018 Theme (Open Sans)

### Using `@fontsource` npm packages (Recommended)

Install the `@fontsource/open-sans` package into your project:

```bash
npm install @fontsource/open-sans
```

#### Vite/Webpack

```javascript
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/400-italic.css";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/600-italic.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/open-sans/700-italic.css";
```

#### Angular

Add to your `angular.json` file:

```json
{
  "projects": {
    "project_name": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "@fontsource/open-sans/400.css",
              "@fontsource/open-sans/400-italic.css",
              "@fontsource/open-sans/600.css",
              "@fontsource/open-sans/600-italic.css",
              "@fontsource/open-sans/700.css",
              "@fontsource/open-sans/700-italic.css"
            ]
          }
        }
      }
    }
  }
}
```

### Using SICK CDN for Open Sans

```css
/* Regular */
@font-face {
  font-display: swap;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  src:
    url("https://www.sick.com/media/fonts/opensans-v1/Regular/OpenSans-Regular.woff2")
      format("woff2"),
    url("https://www.sick.com/media/fonts/opensans-v1/Regular/OpenSans-Regular.woff")
      format("woff"),
    url("https://www.sick.com/media/fonts/opensans-v1/Regular/OpenSans-Regular.ttf")
      format("truetype");
}

/* Semi Bold */
@font-face {
  font-display: swap;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  src:
    url("https://www.sick.com/media/fonts/opensans-v1/SemiBold/OpenSans-SemiBold.woff2")
      format("woff2"),
    url("https://www.sick.com/media/fonts/opensans-v1/SemiBold/OpenSans-SemiBold.woff")
      format("woff"),
    url("https://www.sick.com/media/fonts/opensans-v1/SemiBold/OpenSans-SemiBold.ttf")
      format("truetype");
}

/* Bold */
@font-face {
  font-display: swap;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  src:
    url("https://www.sick.com/media/fonts/opensans-v1/Bold/OpenSans-Bold.woff2")
      format("woff2"),
    url("https://www.sick.com/media/fonts/opensans-v1/Bold/OpenSans-Bold.woff")
      format("woff"),
    url("https://www.sick.com/media/fonts/opensans-v1/Bold/OpenSans-Bold.ttf")
      format("truetype");
}
```

For better performance, add this preload to your HTML:

```html
<link
  rel="preload"
  href="https://www.sick.com/media/fonts/opensans-v1/Regular/OpenSans-Regular.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

### Manual Installation

1. Download the `Open Sans` font from the [SICK Brand Portal](https://brand.sick.com/document/49#/-/resources-1).
2. Extract the ZIP file to a destination reachable by your project (e.g. a `public` folder).
3. Include the font in your project by adding the following CSS (where `PUBLIC_PATH` is the path to the folder containing the font files):

```css
@font-face {
  font-display: swap;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  src: url("/PUBLIC_PATH/Regular/OpenSans-Regular.woff2") format("woff2");
}

@font-face {
  font-display: swap;
  font-family: "Open Sans";
  font-style: italic;
  font-weight: 400;
  src: url("/PUBLIC_PATH/Italic/OpenSans-Italic.woff2") format("woff2");
}

@font-face {
  font-display: swap;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  src: url("/PUBLIC_PATH/SemiBold/OpenSans-SemiBold.woff2") format("woff2");
}

@font-face {
  font-display: swap;
  font-family: "Open Sans";
  font-style: italic;
  font-weight: 600;
  src: url("/PUBLIC_PATH/SemiBoldItalic/OpenSans-SemiBoldItalic.woff2")
    format("woff2");
}

@font-face {
  font-display: swap;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  src: url("/PUBLIC_PATH/Bold/OpenSans-Bold.woff2") format("woff2");
}

@font-face {
  font-display: swap;
  font-family: "Open Sans";
  font-style: italic;
  font-weight: 700;
  src: url("/PUBLIC_PATH/BoldItalic/OpenSans-BoldItalic.woff2") format("woff2");
}
```

---

## SICK 2025 Theme (SICK Intl)

### Using @synergy-design-system/fonts (Recommended)

Install the fonts package:

```bash
npm install @synergy-design-system/fonts
```

#### Vite/Webpack

```javascript
import "@synergy-design-system/fonts";
```

#### Angular

Import in your main styles file:

```css
/* styles.css */
@import "@synergy-design-system/fonts";
```

Or add to your `angular.json` file:

```json
{
  "projects": {
    "project_name": {
      "architect": {
        "build": {
          "options": {
            "styles": ["@synergy-design-system/fonts/src/sick-intl/font.css"]
          }
        }
      }
    }
  }
}
```

### Using SICK CDN

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

For better performance, add this preload to your HTML:

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

### Manual Installation

1. Install `@synergy-design-system/fonts`.
2. Copy the font from `node_modules/@synergy-design-system/fonts/src/sick-intl` to a destination reachable by your project (e.g. a public folder).
3. Include the font with custom CSS (where `PUBLIC_PATH` is the path to the folder containing the font files):

```css
@font-face {
  font-display: swap;
  font-family: "SICK Intl";
  font-style: normal;
  font-weight: 400;
  src: url("/PUBLIC_PATH/sick-intl/SICKIntl-Regular.woff2") format("woff2");
}

@font-face {
  font-display: swap;
  font-family: "SICK Intl";
  font-style: normal;
  font-weight: 600;
  src: url("/PUBLIC_PATH/sick-intl/SICKIntl-Semibold.woff2") format("woff2");
}
```

### Manual Installation (Angular)

1. Install the `@synergy-design-system/fonts` package.
2. Configure your `angular.json` file to include the fonts:

```json
{
  "projects": {
    "project_name": {
      "architect": {
        "build": {
          "options": {
            "assets": [
              {
                "glob": "**/*",
                "input": "./node_modules/@synergy-design-system/fonts/src/sick-intl",
                "output": "/assets/fonts"
              }
            ]
          }
        }
      }
    }
  }
}
```
