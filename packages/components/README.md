# @synergy-design-system/components

This package provides the base of the Synergy Design System as native web components.
It uses [lit](https://www.lit.dev) and parts of [shoelace](https://shoelace.style/).

## Getting started

### 1. Package installation

Run the following steps to install the required packages.

```bash
# Install the base library and required css files
npm install --save @synergy-design-system/components @synergy-design-system/tokens
```

---

### 2. Load the design tokens

The shipped components make heavy use of design tokens, which are provided via [@synergy-design-system/tokens](https://github.com/SickDesignSystem/synergy/tree/main/packages/tokens). Make sure to follow the installation steps there for help on setting the tokens up. Usually it is enough to load the light or dark theme included there.

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
    <script type="module" src="../node_modules/@synergy-design-system/components/dist/synergy.js"></script>
  </body>
</html>
```

When using a build system, you should load the bundle in JavaScript or TypeScript directly, for example when using vite:

```typescript
// main.ts

// Do not forget to load the design tokens!
import '@synergy-design-system/tokens/themes/light.css';

// This will load synergy.js via the exports map
import '@synergy-design-system/components';
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
    <script type="module" src="../node_modules/@synergy-design-system/components/dist/components/button/button.js"></script>
  </body>
</html>
```

When using a build system, you may also load the bundle in JavaScript or TypeScript directly, for example when using vite:

```typescript
// main.ts

// Do not forget to load the design tokens!
import '@synergy-design-system/tokens/themes/light.css';

// This will only load and define the button itself
import '@synergy-design-system/components/components/button/button.js';
```

---

### 4. Using the provided types

The components are built using typescript and provide types for elements and events out of the box. These can be used for working with the dom when working in a typescript environment. You may use them by importing the needed types and using them for elements, like shown in this example:

```typescript
// main.ts

// Do not forget to load the design tokens!
import '@synergy-design-system/tokens/themes/light.css';

// Example 1: Load the type for syn-button from the root:
import type { SynButton, SynInvalidEvent } from '@synergy-design-system/components';

// Example 2: Load the type from the syn-button dir directly.
// In this case you will have to load the event type from another file!
import type { SynButton } from '@synergy-design-system/components/components/button/button';
import type { SynInvalidEvent } from '@synergy-design-system/components/events/syn-invalid';

document.addEventListener('load', () => {
  const loadedSynButtons = document.querySelectorAll<SynButton>('syn-button');

  // Attach a syn-invalid event that is fired every time a button becomes invalid
  Array
    .from(loadedSynButtons) // Type: SynButton[]
    .addEventListener('syn-invalid', (e: SynInvalidEvent) => {
      console.log('Button is now invalid!', e);
    });
});
```

---

### 5. Add html autocompletion to VSCode (optional)

This package ships with a [custom-elements-manifest](https://github.com/webcomponents/custom-elements-manifest) that may be used to provide typings for tags. To enable code completion, please proceed the following way:

1. Install the `@synergy-design-system/components` package.
2. If you do **not** have a `.vscode/settings.json` file yet, create it.
3. Add support for [vscode-custom-data](https://github.com/microsoft/vscode-custom-data) by adding the following setting to your `.vscode/settings.json`: `"html.customData": ["./node_modules/@synergy-design-system/components/dist/custom-elements.json"]`
4. Restart VSCode.
5. Move to a html (or similar) file and type `<syn`. Autocomplete should now provide a list of available components from the components manifest.

> Note the path above is valid for installations using npm.
> When using another package manager, make sure to adjust the path to the custom-elements.json file to suite your needs!

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
