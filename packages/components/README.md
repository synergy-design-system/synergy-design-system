# @synergy-design-system/components

This package provides the base of the Synergy Design System as native web components.
It uses [lit](https://www.lit.dev) and parts of [shoelace](https://shoelace.style/). Synergy officially supports the latest two versions of all major browsers (as defined by browserslist) and is actively linted and integration tested against those targets.

## Known issues and limitations

Got any problems using our components? Please take a look at [our list of known issues and limitations](https://synergy-design-system.github.io/?path=/docs/limitations-known-issues-and-limitations--docs) before [creating a ticket](https://github.com/synergy-design-system/synergy-design-system/issues/new?assignees=&labels=&projects=&template=generic-bug.md&title=fix%3A+%F0%9F%90%9B+).

## Getting started

### 1. Package installation

Run the following steps to install the required packages.

```bash
# Install the base library
npm install --save @synergy-design-system/components

# Install the required design tokens
# (only needed if you do not install peerDeps automatically)
npm install --save @synergy-design-system/tokens
```

---

### 2. Load the design tokens (required) and utility classes (recommended)

The shipped components make heavy use of design tokens, which are provided via [@synergy-design-system/tokens](https://github.com/synergy-design-system/synergy-design-system/tree/main/packages/tokens). Make sure to follow the installation steps there for help on setting the tokens up. Usually it is enough to load the light or dark theme included there.

This package also comes with css utilities that are required to make synergy work.
You may either load all of them in one bundle (recommended) or just include the bits that you need.

> When loading custom bits, please make sure to always include `dist/styles/utility.css`!
> Without these utilities, fullscreen components **will** not work as intended!

##### List of available css utilities

| Utility | Required? | Path                      | Description                                                                                                                                                                                                                                                   |
| :------ | :-------: | :------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| fouc    |           | `dist/styles/fouc.css`    | Defaults for handling [Flash of Undefined Components (FOUC)](https://www.abeautifulsite.net/posts/flash-of-undefined-custom-elements/). Scoped to only target Synergy Components to make sure it does not overlap with other custom elements already defined. |
| utility |    ✔     | `dist/styles/utility.css` | Utilities that have to be in the light DOM to make Synergy work. For example, these include scroll locking for fullscreen components. **This is required, your application layout may break if not available**!                                               |

##### 2.1. Loading all css utilities (recommended)

```html
<!-- Example 1: Loading all utility functions -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link
      rel="stylesheet"
      src="../node_modules/@synergy-design-system/components/dist/styles/index.css"
    />
  </head>
  <body></body>
</html>
```

##### 2.2. Load only parts of the utilities

```html
<!-- Example 2: Loading only the required utility functions -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link
      rel="stylesheet"
      src="../node_modules/@synergy-design-system/components/dist/styles/utility.css"
    />
  </head>
  <body></body>
</html>
```

---

### 3. Define the elements

There are multiple ways to load the components:

#### Loading all available components

To make all components available, just load the main package file. It will make sure that all components and needed dependencies are loaded and available directly.

> Please keep in mind that this way of loading the components will create larger bundle sizes!

```html
<!-- Example 1: Loading via script type module -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
  </head>
  <body>
    <div id="root">
      <syn-button variant="text">Button</syn-button>
      <syn-input></syn-input>
    </div>
    <!-- As we are loading all modules, syn-button and syn-input will render correctly -->
    <script
      type="module"
      src="../node_modules/@synergy-design-system/components/dist/synergy.js"
    ></script>
  </body>
</html>
```

When using a build system, you should load the bundle in JavaScript or TypeScript directly, for example when using vite:

```typescript
// main.ts

// Do not forget to load the design tokens!
import "@synergy-design-system/tokens/themes/light.css";

// Add the css utility functions.
import "@synergy-design-system/components/index.css";

// This will load synergy.js via the exports map
import "@synergy-design-system/components";
```

#### Loading selected components only

Use this when you need complete control about which components are loaded. This will usually lead to smaller bundle sizes, which might be preferable for your application. As a downside, you will have to remember adding missing components to your bundle.

```html
<!-- Example 1: Loading via script type module -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
  </head>
  <body>
    <div id="root">
      <syn-button variant="text">Button</syn-button>
      <syn-input></syn-input>
    </div>
    <!-- We are only loading the button, syn-input will render as an empty div! -->
    <script
      type="module"
      src="../node_modules/@synergy-design-system/components/dist/components/button/button.js"
    ></script>
  </body>
</html>
```

When using a build system, you may also load the bundle in JavaScript or TypeScript directly, for example when using vite:

```typescript
// main.ts

// Do not forget to load the design tokens!
import "@synergy-design-system/tokens/themes/light.css";

// Add the css utility functions.
import "@synergy-design-system/components/index.css";

// This will only load and define the button itself
import "@synergy-design-system/components/components/button/button.js";
```

---

### 4. Using the provided types

The components are built using typescript and provide types for elements and events out of the box. These can be used for working with the dom when working in a typescript environment. You may use them by importing the needed types and using them for elements, like shown in this example:

```typescript
// main.ts

// Do not forget to load the design tokens!
import "@synergy-design-system/tokens/themes/light.css";

// Example 1: Load the type for syn-button from the root:
import type {
  SynButton,
  SynInvalidEvent,
} from "@synergy-design-system/components";

// Example 2: Load the type from the syn-button dir directly.
// In this case you will have to load the event type from another file!
import type { SynButton } from "@synergy-design-system/components/components/button/button.component";
import type { SynInvalidEvent } from "@synergy-design-system/components/events/events";

document.addEventListener("load", () => {
  const loadedSynButtons = document.querySelectorAll<SynButton>("syn-button");

  // Attach a syn-invalid event that is fired every time a button becomes invalid
  Array.from(loadedSynButtons) // Type: SynButton[]
    .addEventListener("syn-invalid", (e: SynInvalidEvent) => {
      console.log("Button is now invalid!", e);
    });
});
```

---

### 5. Add html autocompletion to VSCode (optional)

This package ships with a [custom-elements-manifest](https://github.com/webcomponents/custom-elements-manifest) that may be used to provide typings for tags. To enable code completion, please proceed the following way:

1. Install the `@synergy-design-system/components` package.
2. If you do **not** have a `.vscode/settings.json` file yet, create it.
3. Add support for [vscode-custom-data](https://github.com/microsoft/vscode-custom-data) by adding the following setting to your `.vscode/settings.json`: `"html.customData": ["./node_modules/@synergy-design-system/components/dist/vscode.html-custom-data.json"]`
4. Restart VSCode.
5. Switch to an html (or similar) file and type `<syn`. Auto-complete now provides a list of available components along with its attributes.

> Note the path above is valid for installations using npm.
> When using another package manager, make sure to set the proper path to `vscode.html-custom-data.json`!

---

### 6. Breaking changes between major versions

Please have a look at the official [breaking changes list](https://synergy-design-system.github.io/?path=/docs/packages-components-breaking-changes--docs) for information how to update to new major versions of Synergy.

---

## Local setup

### Using the vendor cli

The vendor cli is taking care about updating our code base according to a new version of shoelace.

To change the shoelace version, that should be downloaded, change the version in the config of `./scripts/vendorism.js`.
To download it use the command `pnpm vendor.get`.
If code in our components library should be updated to this new shoelace version use `pnpm vendor.set`.

All shoelace files are per default readonly and are disabled from being changed. To change this files can be ejected. This can be done via:
`pnpm vendor.eject "src/declaration.d.ts"`.

### Adding events to the output

To add events to the component output, make sure to add them to `src/scripts/vendorism.js` into the `events` array that is defined there. After a new build run `via pnpm build`, you will see the new event files and the `events/events.ts` file will be regenerated.
