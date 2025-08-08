Icons are small standard symbols that are primarily used in screen design.
Due to their intended use, the icons must be recognizable min size of 16 x 16 pixels.

> 👩‍💻 **Looking for a specific icon?**<br />
> Use our [icon search](https://synergy-design-system.github.io/?path=/docs/icon-search--docs) to find a matching icon for your need!

## Package installation

In order for the `syn-icon` component to work, the `@synergy-design-system/assets` package has to be installed.

Run the following command to install the required package.

```bash
# Install the assets library
npm install --save @synergy-design-system/assets
```

## Libraries

You can register additional icons to use with the <syn-icon> component through icon libraries.
Icon files can exist locally or on a CORS-enabled endpoint (e.g. a CDN).
There is no limit to how many icon libraries you can register and there is no cost associated with registering them, as individual icons are only requested when they're used.
The default icon library contains all of the icons by Synergy Design System, which are based on the [Material Icons](https://fonts.google.com/icons).

### How to use the Synergy Design System icons

The default base path of the icon library is set to **assets/icons/**.
To make the <syn-icon> work out of the box, without configuring anything, the used icons can be copied to this path in you application.
This can either be done manually or with the help of the bundler.

### Differences in icon usage between Synergy 2.0 and Synergy 3.0

With the upgrade to Synergy 3.0, new icons will be used.
Those icons are already available as assets in the \`@synergy-design-system/assets\` package.
When using the new icons, you have to make sure that the icons are available in the \`assets/icons/\` directory of your project as outlined below.

System icons come bundled with the \`@synergy-design-system/components\` package. You may switch to the new icons with the new \`setSystemIconLibrary\` utility provided.
Please have a look at the following example to see how to switch the icon library.
Note that if you do not call this function, it will default to the 2018 icon library, which is used in Synergy 2.0 until Synergy 3.0 is released.

```javascript
import { setSystemIconLibrary } from '@synergy-design-system/components';

// Switch to the 2025 icon library
setDefaultIconLibrary('sick2025');

// Switch back to the 2018 icon library
setDefaultIconLibrary('sick2018');

// Switch to the default icon library (2018 for Synergy 2.0, 2025 for Synergy 3.0)
setDefaultIconLibrary();
```


#### Angular + Webpack

Including assets from another library can be achieved in angular via configuring the assets configuration in the angular.json file.
For more information have a look at the [angular documentation](https://angular.io/guide/workspace-config#asset-config).

Here's an example that copies the Synergy icons to the path **assets/icons/** of an angular project:

```json
"assets": [
  {
    "glob": "**/*",
    "input": "./node_modules/@synergy-design-system/assets/src/icons",
    "output": "/assets/icons"
  }
],
```

#### Vite

Including assets from another library in vite project can be achieved via using the [vite-plugin-static-copy plugin](https://www.npmjs.com/package/vite-plugin-static-copy).
Here's an example with adapted vite.config.ts that copies the Synergy icons to the path **assets/icons/** of a vite project:

```js
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "node_modules/@synergy-design-system/assets/src/icons/*",
          dest: "./assets/icons/",
        },
      ],
    }),
  ],
});
```

### How to use a custom icon library

To register an additional icon library, use the `registerIconLibrary()` function that's exported from `utilities/icon-library.js`.
At a minimum, you must provide a name and a resolver function. The resolver function translates an icon name to a URL where the corresponding SVG file exists.
Refer to the examples below to better understand how it works.

If necessary, a mutator function can be used to mutate the SVG element before rendering. This is necessary for some libraries due to the many possible ways SVGs are crafted.
For example, icons should ideally inherit the current text color via currentColor, so you may need to apply fill="currentColor" or stroke="currentColor" to the SVG element using this function.

#### Custom icon library provided locally

Here's an example that registers an icon library located in the /assets/icons directory.

```html
<script type="module">
  import { registerIconLibrary } from "@synergy-design-system/components";

  registerIconLibrary("my-icons", {
    resolver: name => `/assets/icons/\${name}.svg`,
    mutator: svg => svg.setAttribute("fill", "currentColor"),
  });
</script>
```

To display an icon, set the library and name attributes of an syn-icon element.

```html
<!-- This will show the icon located at /assets/icons/smile.svg -->
<syn-icon library="my-icons" name="smile"></syn-icon>
```

## Referencing Assets

Most of the magic behind assets is handled internally by Synergy, but if you need to reference the base path for any reason, there is an exported function called getBasePath(). An optional string argument can be passed, allowing you to get the full path to any asset.

```html
<script type="module">
  import { getBasePath, setBasePath } from "@synergy-design-system/components";

  setBasePath("/path/to/assets");

  // ...

  // Get the base path, e.g. /path/to/assets
  const basePath = getBasePath();

  // Get the path to an asset, e.g. /path/to/assets/file.ext
  const assetPath = getBasePath("file.ext");
</script>
```

---

## Creating a custom spritesheet

For performance reasons, it may be beneficial to create a spritesheet from multiple icons.
This can be done in multiple ways:

### 1. Using the `createSpriteSheet` function

The `createSpriteSheet` function is provided by the `@synergy-design-system/assets` package.
It takes an array of icon keys and returns a string representation of the SVG sprite sheet, intended to be saved into the file system.
You may also provide an optional second argument to specify the icon set to use, either `sick2018` or `sick2025`. If not provided, it will default to `sick2018` for Synergy V2 and `sick2025` for Synergy V3.
As we do not know how exactly you want to use the spritesheet, we will just print it to the console in the following example.

```typescript
import { createSpriteSheet } from "@synergy-design-system/assets";

const icons = [
  "warning",
  "inventory",
  "battery_charging_full",
  "notifications",
];

// V2 iconsheet
const sheet = createSpriteSheet(icons, 'sick2018');

// V3 iconsheet
const sheet = createSpriteSheet(icons, 'sick2025');

// Automatically chooses the default, depending on the version of Synergy you are using
const sheet = createSpriteSheet(icons);

console.log(sheet);
```

### 2. Using the the `syn-create-spritesheet` command line utility

```bash
# Move to the root of your project
cd my-project

# Create the spritesheet on the command line.
# You will need to provide a list of icons to include in the spritesheet.
# Provide the wanted iconset with the --iconset flag.
# The following command will make sure to save the spritesheet to the file icons.svg

# Generates the icons from the 2025 iconset
npx syn-create-spritesheet --icons=warning,inventory,battery_charging_full,notifications --iconset=sick2025 > public/icons.svg

npx syn-create-spritesheet --icons=warning,inventory,battery_charging_full,notifications > public/icons.svg
```

### 3. Directly generating the spritesheet in vite

The following example demonstrates how to generate a spritesheet directly in a vite project, running on every start of the development server.

```typescript
import fs from "node:fs";
import { defineConfig } from "vite";
import { createSpriteSheet } from "@synergy-design-system/assets";

type SynSpriteSheetOptions = {
  /**
   * The output file name. Make sure the path exists
   */
  outFileName: string;

  /**
   * List of icons to include in the sprite sheet
   */
  icons: Parameters<typeof createSpriteSheet>[0];
};

const defaultOptions: SynSpriteSheetOptions = {
  icons: [],
  outFileName: "./public/synergy-icon-sprites.svg",
};

const synSpriteSheetCreator = (
  options: Partial<SynSpriteSheetOptions> = {},
) => ({
  buildStart: () => {
    const finalOptions = {
      ...defaultOptions,
      ...options,
    };
    const { icons, outFileName } = finalOptions;

    const sheet = createSpriteSheet(icons);

    // Create the output file
    fs.writeFileSync(outFileName, sheet);
  },
  name: "syn-sprite-sheet-creator",
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    synSpriteSheetCreator({
      icons: ["warning", "inventory", "battery_charging_full", "notifications"],
    }),
  ],
  server: {
    port: 5173,
  },
});
```

### 4. Creating sprites for angular usage

In an angular project, you can use the following code to create a spritesheet.

```typescript
// Save this to a file called create-spritesheet.ts in your angular project
import fs from "node:fs";
import { createSpriteSheet } from "@synergy-design-system/assets";

const icons = [
  "warning",
  "inventory",
  "battery_charging_full",
  "notifications",
];
const sheet = createSpriteSheet(icons);

// Everything in the src/assets dir will be copied by angular per default.
// Please refer to https://angular.io/guide/workspace-config#assets-configuration
// for more information about how to configure this setting.
fs.writeFileSync("src/assets/icons.svg", sheet);
```
