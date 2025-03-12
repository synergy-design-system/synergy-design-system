# @synergy-design-system/htmlvalidate-config-syn

This package provides support for linting native Synergy Web-Components in plain HTML, using [html-validate](https://html-validate.org/).
It provides a basic default configuration, as well as the low level elements in case there already is a configuration in place.

## Installation

Please issue one of the following commands to install the linting toolchain:

```bash
npm install --save-dev html-validate @synergy-design-system/html-validate-config-syn
yarn add --dev html-validate @synergy-design-system/html-validate-config-syn
pnpm i -D html-validate @synergy-design-system/html-validate-config-syn
```

## Configuration

### Using the Synergy Default Configuration

This module exports a default configuration that may be used as a drop-in setting. You may use it in the following way:

1. Make sure you have `type="module"` set in your projects `package.json`.
2. Create a new file `.htmlvalidate.js`
3. Open the new file and load the synergy configuration: `import synConfig from '@synergy-design-system/html-validate-config-syn'; export default synConfig;`

### Adjusting an existing configuration

When you already have a configuration for `html-validate` in place, just add the missing elements to your configuration:

```javascript
// .htmlvalidate.js
import { defineConfig } from "html-validate";
import { createElements } from "@synergy-design-system/html-validate-config-syn/scripts/createElements.js";

export default defineConfig({
  extends: ["html-validate:recommended"],
  elements: [
    "html5",
    // 👇 Add this statement to make synergy elements work
    createElements(),
  ],
  root: true,
});
```

---

## Development

Provided rules are created dynamically with some static overrides that cannot be obtained from the provided components manifest.
Each element has its own custom configuration that overrides all dynamically created settings.
Custom rules for each element can be found in `scripts/synergy-element-rules.js`.
Most of those rules adjust the [Content category](https://html-validate.org/usage/elements.html#content-categories) used for the element. It also keeps track for various other actions like flagging a custom element as [`formAssociated`](https://html-validate.org/usage/elements.html#formassociated).

> The configuration is created on the fly via a function.
> This may have to reload your IDEs plugin for the change to take effect.
> For development purposes, it is advised to rely on the command line interface instead!

### Deprecating properties for future releases

For future releases where an attribute is phased out, it is desirable to flag the attribute as [`deprecated`](https://html-validate.org/usage/elements.html#deprecated). This can be done in the custom configuration like this:

```javascript
// Example: <syn-header>
// Synergy@1.x still has the attribute show-burger-menu for syn-header,
// but we know we want to remove it in version 2.0
/**
 * @type {import('html-validate').MetaElement}
 */
const SynHeader = {
  attributes: {
    "show-burger-menu": {
      boolean: true,
      deprecated: willDeprecateInRelease(
        "2.0",
        "Will be replaced with `burger-menu`",
      ),
    },
  },
  flow: true,
  heading: true,
  sectioning: true,
};
```

When the new Synergy major version is released, you can finally deprecate the property:

```javascript
// Example: <syn-header>
// Synergy@2.x removed the attribute show-burger-menu for syn-header,
// so we replace the warning with a hard error
const SynHeader = {
  attributes: {
    "show-burger-menu": {
      allowed: deprecatedForRelease(
        "2.0",
        "Please use the `burger-menu` attribute instead.",
      ),
      boolean: true,
    },
  },
  flow: true,
  heading: true,
  sectioning: true,
};
```
