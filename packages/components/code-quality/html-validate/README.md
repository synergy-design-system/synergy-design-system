# Linting HTML

The components package also comes with its own set of linting rules that make it possible to automatically check for invalid, deprecated or removed properties. This feature uses [html-validate](https://html-validate.org/) underneath. Rule updates are always shipped with the component release of Synergy to make sure rules are always running against your current Synergy version.

> Linting is only available for static HTML assets. When running `html-validate` via command line, it will only check files with an ending of `.htm` and `.html`.
> It is currently not planned to support custom framework languages like `JSX` or `VUE`!

## 1. Features

The Synergy ruleset include various rules that make it more secure to use Synergy Web-Components in context of static HTML:

### Property type checking

All attributes are checked for their type (e.g. `Boolean`).
Also, if the attribute only allows a list of predefined values, it will also show errors via the [`attribute-allowed-values rule`](https://html-validate.org/rules/attribute-allowed-values.html) when providing an unknown value.

### Future deprecations

Future deprecations are flagged as warnings via the [`no-deprecated-attr rule`](https://html-validate.org/rules/no-deprecated-attr.html).
This will make it easier to spot deprecations for future major releases of Synergy.

### Deprecated attributes

Flags attributes that where removed in major versions as removed via the [`attribute-misuse rule`](https://html-validate.org/rules/attribute-misuse.html). This will help you identify any attributes that have been removed following a major update of Synergy.

## 2. Installation

Please issue one of the following commands to install the linting toolchain (assuming `@synergy-design-system/components` is already installed):

```bash
npm install --save-dev html-validate
yarn add --dev html-validate
pnpm i -D html-validate
```

## 3. Configuration

### Using the Synergy Default Configuration

The default configuration that may be used as a drop-in setting for getting started. It is based on the [html-validate recommended settings](https://html-validate.org/rules/presets.html#html-validate-recommended). You may use it in the following way:

1. Make sure you have `type="module"` set in your projects `package.json`.
2. Create a new file `.htmlvalidate.js`
3. Open the new file and load the synergy configuration: `import synConfig from '@synergy-design-system/components/html-validate.js'; export default synConfig;`

### Adjusting an existing configuration

If you already have a configuration for `html-validate` in place, just add the missing elements to your configuration:

```javascript
// .htmlvalidate.js
import { defineConfig } from "html-validate";
import { createElements } from "@synergy-design-system/components/html-validate/scripts/createElements.js";

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
