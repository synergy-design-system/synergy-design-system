# Prerequisites

## Fonts

Depending on the used theme (either SICK 2018 or SICK 2025) the Synergy Design System makes use of a specific typeface:

| Theme     | Typeface    |
| --------- | ----------- |
| SICK 2018 | `Open Sans` |
| SICK 2025 | `SICK Intl` |

For the SICK 2025 theme there are some rules, how and when to use the different styles (like regular, semi-bold, bold, ...). For more information about this, have a look at the [SICK Brand Portal](https://brand.sick.com/document/145#/basiselemente/typografie/sick-intl).

Because there are various ways of loading fonts, depending on used bundler, pre- and postprocessors and usage of a CDN, Synergy does **not provide** this font.
You need to include it into your own project.

The following information may be helpful to get you started including your own copy of `Open Sans` or `SICK Intl` in your project for quicker bootstrapping:

### Local Installation

#### SICK 2018

1. Download the `Open Sans` font from the [SICK Brand Portal](https://brand.sick.com/document/49#/-/resources-1).
2. Extract the ZIP file to a destination reachable by your project (e.g. a `public` folder).
3. Include the font in your project by adding the following CSS to your project (where `PUBLIC_PATH` is the path to the folder containing the font files).

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

#### SICK 2025

1. Install `@synergy-design-system/assets`.
2. Copy the font from `node_modules/@synergy-design-system/assets/src/fonts/SickIntl` to a destination reachable by your project (e.g. a public folder).
3. Include the font in your project by adding the following CSS to your project (where `PUBLIC_PATH` is the path to the folder containing the font files).

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

### Installing via local npm package (e.g. for vite or webpack based setups)

#### SICK 2018

1. Install the `@fontsource/open-sans` package into your project.
2. Include the font in your project by adding the following import statements to your project:

```js
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/400-italic.css";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/600-italic.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/open-sans/700-italic.css";
```

#### SICK 2025

SICK Intl is available in the `@synergy-design-system/assets` package in the `src/fonts/SickIntl` folder.
You will have to provide a custom `@font-face` definition for it to work.

```css
/* Regular */
@font-face {
  font-display: swap;
  font-family: "SICK Intl";
  font-style: normal;
  font-weight: 400;
  src: url("/assets/fonts/SickIntl/SICKIntl-Regular.woff2") format("woff2");
}

/* Semi Bold */
@font-face {
  font-display: swap;
  font-family: "SICK Intl";
  font-style: normal;
  font-weight: 600;
  src: url("/assets/fonts/SickIntl/SICKIntl-Semibold.woff2") format("woff2");
}
```

### Installing via local npm package (angular)

#### SICK 2018

1. Install the `@fontsource/open-sans` package into your project.
2. Adjust your `angular.json` file to include the needed stylesheets (where project_name is the name of your project):

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

#### SICK 2025

1. Install the `@synergy-design-system/assets` package into your project.
2. Adjust your `angular.json` file to include the needed fonts (where project_name is the name of your project):

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
                "input": "./node_modules/@synergy-design-system/assets/src/fonts",
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

### Using the SICK CDN

This is the simplest default font behavior. The typefaces are loaded from the SICK CDN.

#### SICK 2018

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

For better performance, you may also add the following statement to your HTML:

```html
<link
  rel="preload"
  href="https://www.sick.com/media/fonts/opensans-v1/Regular/OpenSans-Regular.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

#### SICK 2025

```css
/* Regular */
@font-face {
  font-display: swap;
  font-family: "Open Sans";
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
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  src:
    url("https://www.sick.com/media/fonts/sickintl-v1/semibold/SICKIntl-Semibold.woff2")
      format("woff2"),
    format("woff"),
    url("https://www.sick.com/media/fonts/sickintl-v1/semibold/SICKIntl-Semibold.ttf")
      format("truetype");
}
```

For better performance, you may also add the following statement to your HTML:

```html
<link
  rel="preload"
  href="https://www.sick.com/media/fonts/sickintl-v1/regular/SICKIntl-Regular.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```
