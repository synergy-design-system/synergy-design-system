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
import { createElements } from "@synergy-design-system/html-validate-config-syn/scripts/createElements";

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
