# Handling breaking changes between major versions

This guide holds the required information for migrating from one major version of `@synergy-design-system/assets` to the next.

> ⚠️ Migrations **must** always be done from one major version to the next to prevent issues (e.g. with types and property changes)
> This means when moving from `@synergy-design-system/assets` v1.x to v3.x,
> you will **have to apply** the changes from v1.x to v2.x first!

---

## Version 3.0

<h3 id="fs-layout-v3">BREAKING! Changes to the filesystem layout</h3>

#### ⚠️ Introducing a new filesystem structure

**Associated Ticket(s)**:

- [#1149](https://github.com/synergy-design-system/synergy-design-system/issues/1149)

**Reason**:

During the migration process it became clear that the layout of the filesystem had to be cleaned up for easier usage and extendability.
The old flat separation on the top level of the `src` folder was poorly structured and hard to reason about. Are the icons the user needs located in `src/icons` or `src/icons-2025`? Does he need `system-icons` or `system-icons-2025`? It even got worse with the packages export map: Where should `icons` be pointed with the new default icon set of `SICK 2025`?

Because of those problems, the filesystem structure was restructured like shown below:

| Content                       | Location (2.x)                | Location (3.x)             |
| ----------------------------- | ----------------------------- | -------------------------- |
| SICK 2018 System Icons (svg)  | src/system-icons              | src/sick2018/system-icons  |
| SICK 2018 Icons (svg)         | src/icons                     | src/sick2018/icons         |
| SICK 2018 Default Icons (js)  | src/default-icons.ts          | src/sick2018/js/index.js   |
| SICK 2025 System Icons (svg)  | src/system-icons-sick2025     | src/sick2025/system-icons  |
| SICK 2025 Icons filled (svg)  | src/sick2025/fill             | src/sick2025/icons/fill    |
| SICK 2025 Filled Icons (js)   | src/sick2025-filled-icons.ts  | src/sick2025/js/filled.js  |
| SICK 2025 Icons outline (svg) | src/sick2025/outline          | src/sick2025/icons/outline |
| SICK 2025 Outline Icons (js)  | src/sick2025-outline-icons.ts | src/sick2025/js/outline.js |

**Migration Steps**:

When using a copy script to copy the assets to your build destination, use the following map for the new paths. Note that the **name of the svgs have not changed** and should work regardless.

**Example (before)**:

```javascript
// Default configuration for SICK 2018 icons and @synergy-design-system/assets@2.x.
export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        // Old path for 2018 icons
        {
          src: 'node_modules/@synergy-design-system/assets/src/icons/*',
          dest: './assets/icons/sick2018',
        },
        // Old path for 2025 icons
        {
          src: 'node_modules/@synergy-design-system/assets/src/sick2025/outline/*',
          dest: './assets/icons/sick2025',
        },
    }),
  ],
})
```

**Example (after)**:

```javascript
// Default configuration for SICK 2018 icons and @synergy-design-system/assets@3.x.
export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        // New path for 2018 icons
        {
          src: "node_modules/@synergy-design-system/assets/src/sick2018/icons/*",
          dest: "./assets/icons/sick2018",
        },
        // New path for 2025 icons
        {
          src: "node_modules/@synergy-design-system/assets/src/sick2025/icons/outline/*",
          dest: "./assets/icons/sick2025",
        },
      ],
    }),
  ],
});
```

---

<h3 id="deprecate-sick2018-v3">SICK 2018 icons</h3>

#### ⚠️ Future deprecation of the SICK 2018 icons

**Associated Ticket(s)**:

- [#1149](https://github.com/synergy-design-system/synergy-design-system/issues/1149)

**Reason**:

With the release of Synergy version 3, the SICK 2025 icons are now the default icons for new applications. This is reflected in all of our documentation and demos. Still providing the SICK 2018 icons in the future leads to a very large package payload (approx. 55mb). We therefore marked all utilities and types using the SICK 2018 icons as deprecated in code and will remove the SICK 2018 icons and their types in a future major release.

> We plan to keep the SICK 2018 icons available until at least the beginning of 2027.
> They will likely be removed in the first major release after 2027.

**Migration Steps**:

- Upgrade your application to use the new SICK 2025 iconset.
- Optionally use the `createMigrationLibrary` helper to migrate from 2018 icon names to the new ones seamlessly.

**Example (before)**:

```javascript
import { createSpriteSheet } from "@synergy-design-system/assets";

const icons = createSpriteSheet(["wallpaper"], "sick2018");
```

**Example (after)**:

```javascript
import { createSpriteSheet } from "@synergy-design-system/assets";

const icons = createSpriteSheet(["wallpaper"], "sick2025");
```

---

<h3 id="cli-defaults-v3">`createSpriteSheet`</h3>

#### ⚠️ Changed defaults from SICK 2018 to SICK 2025 theme

**Associated Ticket(s)**:

- [#1149](https://github.com/synergy-design-system/synergy-design-system/issues/1149)

**Reason**:

With the migration from SICK 2018 to SICK 2025, all default parameters using a theme were updated from SICK 2018 to SICK 2025.

**Migration Steps**:

Check if you are using `createSpriteSheet` (js) or `syn-create-spritesheet` (command line). Both use SICK 2025 icons now by default.

**Example (before)**:

```bash
# Returns images from sick 2018 in version 2
npx @synergy-design-system/assets/syn-create-spritesheet --list=wallpaper
```

**Example (after)**:

```bash
# Returns images from sick 2025 in version 3
npx @synergy-design-system/assets/syn-create-spritesheet --list=wallpaper

# Returns images from sick 2018 in version 3
npx @synergy-design-system/assets/syn-create-spritesheet --list=wallpaper --iconset=sick2018
```

---

<h3 id="exports-change-v3">Exports</h3>

#### ⚠️ Updated mappings of exported scripts

**Associated Ticket(s)**:

- [#1149](https://github.com/synergy-design-system/synergy-design-system/issues/1149)

**Reason**:

This was needed because of the filesystem reorganization that was necessary.

**Migration Steps**:

Make sure to adapt your imports for the main export to use `sick2018.js` when you still have to use the SICK 2018 icons. The default export now serves the SICK 2025 icons, and specific icon sets can be imported via their respective endpoints.

**Example (before)**:

```javascript
// Load SICK 2018 icons (default in v2)
import sick2018Icons from "@synergy-design-system/assets";

// Load SICK 2025 icons (explicit in v2)
import sick2025Icons from "@synergy-design-system/assets/sick2025.js";

// Default icon import loads SICK 2018 icons in v2
import defaultIcons from "@synergy-design-system/assets";

console.log(sick2018Icons, sick2025Icons, defaultIcons);
```

**Example (after)**:

```javascript
// Load SICK 2018 icons
import sick2018Icons from "@synergy-design-system/assets/sick2018.js";

// Load SICK 2025 icons
import sick2025Icons from "@synergy-design-system/assets/sick2025.js";

// Default icon import loads SICK 2025 icons in v3
import defaultIcons from "@synergy-design-system/assets";

console.log(sick2018Icons, sick2025Icons, defaultIcons);
```

---

<!-- USE THIS AS A TEMPLATE FOR ADDITIONAL MIGRATION STEPS

<h3 id="change-VERSION">`Change`</h3>

#### ⚠️ DESCRIBE THE CHANGE HERE

**Associated Ticket(s)**:

- [#1](https://github.com/synergy-design-system/synergy-design-system/issues/1)

**Reason**:

DESCRIBE THE REASON FOR THIS CHANGE

**Migration Steps**:

MIGRATION IN TEXT FORM

**Example (before)**:

```javascript
EXAMPLE BEFORE THE CHANGE
```

**Example (after)**:

```javascript
EXAMPLE AFTER THE CHANGE
```

---

-->
