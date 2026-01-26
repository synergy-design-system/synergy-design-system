# @synergy-design-system/assets

This package provides assets like:

- **logos:** a collection of various logos (such as the variants of the SICK brand logo)
- **icons:** the standard icons based on [Material Icons](https://fonts.google.com/icons)
- **system-icons:** a small subset of icons, that are internally used by the Synergy components
- **component-thumbnails:** preview icons of components, used in the Synergy documentation page

The source of the assets can be found at [Figma](https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=104-233&mode=design&t=GPu4VVd9yffLLAaS-0)

### Installation

Please make sure to install the assets package as `devDependency` or `dependency`:

```bash
# If you are only interested in the filesystem based icons,
# install as a devDependency
npm install --save-dev @synergy-design-system/assets

# If you are using javascript imports in your code directly,
# install as a dependency
npm install --save @synergy-design-system/assets
```

### Usage

#### Icons

All icons are provided as SVG files. The assets package is organized with brand-specific namespaces to ensure clear separation between different icon sets.

The recommended way of using the icons is with the [<syn-icon> Synergy component](https://synergy-design-system.github.io/?path=/docs/components-syn-icon--docs). Here you will also get more information about setting up the assets package on bundlers like vite.

```html
<syn-icon name="warning"></syn-icon>
```

#### Programmatic Access

You can also import icon sets programmatically:

```javascript
import { sick2025Icons, sick2018Icons } from "@synergy-design-system/assets";
// or import the default icon set (currently sick2025Icons)
import { defaultIcons } from "@synergy-design-system/assets";

// Access specific icons
const warningIcon = sick2025Icons.warning;
```

---

## Development

This package provides assets from Figma organized in a clear brand-based hierarchy.
The folder structure corresponds to the brand revisions and their respective usage.

- **src/component-thumbnails:** Contains thumbnails from Figma components used in Storybook
- **src/sick2025:** Contains the SICK 2025 brand revision assets
  - **icons/outline:** Outline variant icons based on [Material Icons](https://fonts.google.com/icons). These are the preferred icons for applications.
  - **icons/fill:** Filled variant icons based on [Material Icons](https://fonts.google.com/icons). Should be used where alternatives are needed only.
  - **js:** Javascript export of the sick2025 icons
  - **logos:** Contains variants of the SICK brand logo for the SICK 2025 brand revision
  - **system-icons:** Internal icons used by Synergy components (v3+)
- **src/sick2018:** Contains the SICK 2018 brand revision assets (legacy)
  - **icons:** Standard icons based on [Material Icons](https://fonts.google.com/icons) (v2)
  - **js:** Javascript export of the sick2018 icons
  - **logos:** Contains variants of the SICK brand logo for the SICK 2018 brand revision
  - **system-icons:** Internal icons used by Synergy components (v2)

> **Note:** All assets from figma, which should not appear in this package (e.g. documentation), will start with an underscore (e.g. \_my-doc-for-an-asset). This assets are getting filtered and ignored by this package.

### Setup

To update the assets from Figma, first of all a personal access token in Figma needs to be created.
The documentation how this can be achieved can be found [here](https://www.figma.com/developers/api#access-tokens).
The only needed scope is "File content" set to readonly.

After the creation of the personal access token, it needs to be saved in a **_.env_** file with the variable **_"FIGMA_TOKEN"_**.
It should look like following:

```bash
FIGMA_TOKEN = "my-personal-access-token"
```

### Update assets from Figma

If something in the Figma assets got changed, the assets of this package also needs to be updated.
To update the assets run following in the terminal of the assets package folder:

```bash
pnpm build:all
```

This will:

- Clean up the `src` directory
- Download all assets from Figma into brand-specific namespaces
- Build TypeScript exports for programmatic access
- Create the migration iconsets for Synergy 2018 to 2025 via `pnpm create-migration-iconset`
- Recreate the license files in the different folders
- Create [code connect files](https://www.figma.com/code-connect-docs/html) for all icons. Please be aware you have to call `pnpm figma-export:icons` in the components package to publish the icons!
- Create the default export for the SICK 2025 icons located in `src/sick2025/js/index.ts`
