# @synergy-design-system/tokens

This package provides the design tokens that form the base for all components of the Synergy Design System.
It provides exports for colors, spacings, shadows, sizings, typography and more that can be also consumed by applications directly.

The source of the tokens can be found at [Figma](https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=104-235&mode=design&t=GPu4VVd9yffLLAaS-0)

---

## Installation

Please make sure to install the tokens package as a dependency:

```bash
npm install --save @synergy-design-system/tokens
```

> For best compliance, please make sure to install the same version that is also used in your `@synergy-design-system/components` package!

---

## Provided tokens

As projects may use various forms of applying styles, we provide different ways to consume our tokens.

### Using CSS themes

Provides the css variables that are used in synergy components as css variables and is **required** if you are using `@synergy-design-system/components` or one of the framework packages like `@synergy-design-system/react`.
The tokens package ships two **themes** (sick2018 and sick2025), with each providing two **modes**: 🌞 light and 🌛 dark.

> The css styles are used as a single source of truth, also when working with the provided JavaScript or SASS exports!
> Always make sure to load one of the css themes!

```html
<!DOCTYPE html>
  <head>
    <!-- Example 1: Referencing directly in a HTML document -->
    <!-- Make sure to add the stylesheet before using any components -->
    <!-- Note that "light.css" will point to the default theme of the tokens package. See table below for defaults -->
    <link rel="stylesheet" href="/node_modules/@synergy-design-system/tokens/dist/themes/light.css" />

    <!-- Alternative: Use the dark theme -->
    <!-- Note that "dark.css" will point to the default theme of the tokens package. See table below for defaults -->
    <link rel="stylesheet" href="/node_modules/@synergy-design-system/tokens/dist/themes/dark.css" />
  </head>
  <body>
    <div style="background: var(--syn-color-primary-500)">
      Content
    </div>
  </body>
</html>
```

#### Switching themes during runtime

You are also able to switch themes during the runtime. For the time being, we do not ship a utility function for this, as it is easy to implement. Each theme applies the variables via a `:root` selector, as well as a `className` that may be added to the `document.body`.

| Theme    | Mode  | Stylesheet to use                  | Corresponding classNames                | Default for Version |
| :------- | :---- | :--------------------------------- | :-------------------------------------- | :-----------------: |
| sick2018 | light | `tokens/themes/sick2018_light.css` | `syn-theme-light`, `syn-sick2018-light` |       `2.0.0`       |
| sick2018 | dark  | `tokens/themes/sick2018_dark.css`  | `syn-theme-dark`, `syn-sick2018-dark`   |                     |
| sick2025 | light | `tokens/themes/sick2025_light.css` | `syn-sick2025-light`                    |       `3.0.0`       |
| sick2025 | dark  | `tokens/themes/sick2025_dark.css`  | `syn-sick2025-dark`                     |                     |

To switch the theme, proceed in the following way:

```html
<!DOCTYPE html>
  <head>
    <!--
      -- Load both themes initially.
      -- The last theme will be the default, in this case the light theme
    -->
    <link rel="stylesheet" href="/node_modules/@synergy-design-system/tokens/dist/themes/dark.css" />
    <link rel="stylesheet" href="/node_modules/@synergy-design-system/tokens/dist/themes/light.css" />
  </head>
  <body>
    <button id="theme-switch">Switch Theme</button>
    <script>
    const switchTheme = ({ target }) => {
      const { body } = document;
      const currentTheme = body.classList.contains('syn-theme-dark') ? 'dark' : 'light';

      if (currentTheme === 'light') {
        // Light theme
        body.classList.remove('syn-theme-light');
        body.classList.add('syn-theme-dark');
        target.innerText = 'Switch to light theme';
      } else {
        // Dark theme
        body.classList.remove('syn-theme-dark');
        body.classList.add('syn-theme-light');
        target.innerText = 'Switch to dark theme';
      }
    }

    document
      .querySelector('#theme-switch')
      .addEventListener('click', switchTheme);
    </script>
  </body>
</html>

```

```javascript
// Example 2: Importing for bundlers
// In most build systems, you will be able to import css files directly
// Use this way when you already use a build system like webpack or vite
// to make it part of your bundle.
// Note this import should happen BEFORE you render any components!

// Light theme
import "@synergy-design-system/tokens/themes/light.css";

// Dark theme
import "@synergy-design-system/tokens/themes/dark.css";
```

---

### Usage in JavaScript

We provide JavaScript exports for the design tokens.
All tokens map to the corresponding css variables to make sure we have a single source of truth.

```javascript
// Using variables in JavaScript

// Import the css variables first as they are our single source of truth
import "@synergy-design-system/tokens/themes/light.css";

// Imports all tokens
import * as tokens from "@synergy-design-system/tokens";

// Set the background color of a queried div via JavaScript
const elm = document.querySelector("div");
div.style.backgroundColor = tokens.SynColorPrimary500;

// Get the value
console.log(div.style.backgroundColor);
// Will print 'var(--syn-color-primary-500)'
```

---

### Usage in SCSS:

Our variables are also available as scss variables that make it possible to consume them in sass based projects.

> Note that because of the complexity of sass based toolchains (e.g. vite ones differ from webpack ones and there are [multiple](https://www.npmjs.com/package/node-sass-package-importer) [loaders](https://www.npmjs.com/package/sass-module-importer) for `node_modules`), we only show examples using the **relative path** to the filesystem.
> Configuration for those systems is NOT part of this guide.

```scss
// ! All paths are relative, we assume your input file is named src/example.scss

// Import the design tokens first.
// This can be done in a sass file or in any other way described above.
// Make sure to NOT add the .css file suffix, this will not work in sass
@import "../node_modules/@synergy-design-system/tokens/dist/themes/light";

// Import the scss variables
@import "../node_modules/@synergy-design-system/tokens/dist/scss/tokens";

// You are now able to use the provided tokens
div {
  background: $SynColorPrimary500;
}

// When compiled, this should render the following output
:root,
.syn-theme-light {
  // Other syn- variables truncated
  --syn-color-primary-500: #0ca2eb;
}

div {
  background: var(--syn-color-primary-500);
}
```

### JSON files

Currently the raw .json tokens files are exported under `/src/figma-tokens/*/`.

> Note:
> These files are deprecated and will be removed in the new major version of Synergy, as the whole tokens structures are getting refactored.

---

## Optional: Configuring tokens in VSCode

Using VSCode?
You may also want to install `vunguyentuan.vscode-css-variables` to include css variable auto completion in your project.
Just make sure to add a valid path to the light theme in the `.vscode/settings.json` file like this:

```json
"cssVariables.lookupFiles": [
    "node_modules/@synergy-design-system/tokens/dist/themes/light.css"
],
```

---

## Developer Documentation

### Architecture and Data Flow

```
Figma
    ↓
Figma REST API
    ↓
Raw JSON Files (src/figma-variables/variableTokens.json + styleTokens.json)
    ↓
Transform Scripts (scripts/figma/)
    ↓
Style Dictionary compliant JSON Files (src/figma-variables/output/)
    ↓
Style Dictionary Processing (scripts/build.js)
    ↓
Build Output (dist/)
```

### Building the tokens

Tokens are a mix of [Figma Variables](https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma) and [Figma styles](https://help.figma.com/hc/en-us/articles/360039238753-Styles-in-Figma-Design). They are fetched from Figma via [Figma API](https://www.figma.com/developers/api).

To trigger a new fetching use `pnpm fetch:figma`, to update the tokens.
This scripts needs the figma access token and optionally the figma file id, so it knows, where it should fetch the tokens from. If not available, it fetches the tokens from the main (_bZFqk9urD3NlghGUKrkKCR_).

```bash
# Required: Figma Personal Access Token
export FIGMA_TOKEN="your_figma_token_here"

# Optional: Specific Figma File/Branch ID (Default: Main Branch)
export FIGMA_FILE_ID="your_figma_file_id"
```

```bash
# Fetch all Figma data (Variables + Styles)
pnpm fetch:figma

# Only fetch variables and transform into Style Dictionary format
pnpm fetch:variables

# Only fetch styles and transform into Style Dictionary format
pnpm fetch:styles

# Transform already fetched variables into Style Dictionary format
pnpm build:variables

# Transform already fetched styles into Style Dictionary format
pnpm build:styles

# Process transformed tokens with Style Dictionary (build final output)
pnpm build

# Or do it all at once
FIGMA_FILE_ID="FILE_ID" FIGMA_TOKEN="FIGMA_TOKEN" pnpm build:all
```

#### Figma variables

The variables are created to support several modes.
Currently supported modes are:

- **sick2018-light**
- **sick2018-dark**
- **sick2025-light**
- **sick2025-dark**

For each mode a json file is created, with the corresponding tokens and values.

#### Figma styles

For the styles a separate `styles.json` is created.

#### Output

Outputs of the tokens are created using [Style Dictionary](https://amzn.github.io/style-dictionary/).
You can trigger a build using `pnpm build` in the `tokens` package root. This will create the css themes (located in `dist/themes/` with files like `light.css`, `dark.css`, `sick2018_light.css`, `sick2018_dark.css`, `sick2025_light.css`, and `sick2025_dark.css`), as well as the JavaScript exports (located at `dist/js/index.js`) and scss variables (`dist/scss/_tokens.scss`).

---

### Project structure

#### `/src/figma-variables/`

- **`variableTokens.json`**: Raw data of Figma Variables and Collections, directly fetched from the Figma API
- **`styleTokens.json`**: Raw data of Figma Styles, directly fetched from the Figma API
- **`output/`**: Transformed token files in Style Dictionary-compatible formats
  - `sick2018-light.json`: Light Theme Tokens for SICK 2018
  - `sick2018-dark.json`: Dark Theme Tokens for SICK 2018
  - `sick2025-light.json`: Light Theme Tokens for SICK 2025
  - `sick2025-dark.json`: Dark Theme Tokens for SICK 2025

#### `/scripts/figma/`

- **`fetch-variables.js`**: Downloads Figma Variables via the REST API
- **`style-dict-outputter.js`**: Custom outputter for Figma Styles export
- **`transform-tokens.js`**: Transforms Figma Variables into Style Dictionary format
- **`transform-styles.js`**: Transforms Figma Styles into Style Dictionary format
- **`helpers.js`**: Utility functions

#### `/scripts/add-missing-tokens.js`

**Purpose**:  
This script is designed to inspect and append missing CSS variables based on a given prefix.

- It reads from a source directory containing fallback styles and checks against a target directory for missing variables.
- Variables are extracted based on a specified prefix.
- Missing variables are appended to the target files.

**Key Functions**:

- `extractVariables(data, prefix)`: Extracts variables from the provided data based on the prefix.
- `compareAndAppendVariables(sourceFilePath, targetFilePath, prefix)`: Compares source and target files for missing variables and appends them.
- `addMissingTokens(prefix)`: Main function that loops through target files and checks for missing variables.

### Github Action

The **Sync Figma variables to tokens** workflow (`.github/workflows/sync-figma-to-tokens.yml`) provides an automated way to synchronize design tokens from Figma to the codebase via GitHub Actions.

**Purpose**:  
This workflow fetches the latest Figma variables and styles, transforms them into the appropriate token formats, runs tests to ensure integrity, and creates a pull request with the updated tokens.

**Trigger**:  
The workflow is manually triggered using `workflow_dispatch` with configurable inputs.

**Input Parameters**:

- **`figma_file_id`** (required): The Figma file or branch ID to sync from
  - Default: `"bZFqk9urD3NlghGUKrkKCR"` (main Synergy Design System file)
  - Can be either a branch ID or the main file ID
- **`branch_name`** (required): Name for the new Git branch
  - Default: `"feat/update-tokens-from-figma"`
- **`pull_request_name`** (required): Title for the pull request
  - Default: `"feat: ✨ Update tokens from Figma"`

**Workflow Steps**:

1. **Repository Setup**: Checks out the repository with full history
2. **Environment Setup**: Installs pnpm, Node.js 22, and project dependencies
3. **Token Synchronization**: Runs `pnpm -C ./packages/tokens fetch:figma && pnpm -C ./packages/tokens build:figma` to fetch and transform Figma data
4. **Quality Assurance**: Builds and tests the updated tokens to ensure integrity
5. **Pull Request Creation**: Creates a new branch and pull request with the changes

**Required Secrets**:

- **`FIGMA_TOKEN`**: Personal Access Token from Figma (required for API access)

**Permissions**:

The workflow requires the following permissions:

- `contents: write` - To create branches and commits
- `pull-requests: write` - To create pull requests

**Usage Example**:

1. Navigate to the Actions tab in the GitHub repository
2. Select "Sync Figma variables to tokens"
3. Click "Run workflow"
4. Configure the input parameters as needed
5. Click "Run workflow" to start the process

The workflow will automatically create a pull request with reviewers assigned (`kirchsuSICKAG`, `schilchSICKAG`) for review and approval.

---

### Updating Test Files

When adding new tokens or changing existing token values, the test reference files in `packages/tokens/test/` must be updated to maintain test integrity.

#### Test System Overview

The token package includes a test system that validates the consistency between the built token files and reference files:

- **`test/light.css`**: Reference file containing expected CSS variables for the light theme
- **`test/dark.css`**: Reference file containing expected CSS variables for the dark theme
- **`test/test-css-variables.js`**: Test script that compares built files against reference files

#### When to Update Test Files

Test files need to be updated in the following scenarios:

1. **Adding new tokens**: When new design tokens are added to Figma and fetched
2. **Changing token values**: When existing token values are modified in Figma
3. **Removing tokens**: When tokens are deprecated or removed from the design system

#### How to Update Test Files

After the new / updated tokens are fetched and build:

1. **Build the tokens**: Ensure the latest tokens are built

   ```bash
   cd packages/tokens
   pnpm build
   ```

2. **Run the comparison test**: This will show differences between built and reference files

   ```bash
   pnpm compare
   ```

3. **Update reference files**: If the changes are intentional, copy the built files to the test directory or update the files manually with the changes

   ```bash
   # Copy the newly built files to serve as new reference files
   cp dist/themes/sick*.css test
   ```

4. **Verify the update**: Run the test again to ensure everything matches
   ```bash
   pnpm compare
   ```

#### Test Output

The test script provides detailed feedback:

- ✅ **Success**: When all variables match between built and reference files
- 🚫 **Missing variables**: Variables present in reference but missing in built files
- ➕ **Extra variables**: New variables in built files not present in reference
- 🔄 **Different values**: Variables with changed values between built and reference files

#### Important Notes

- Always review the test output carefully before updating reference files
- The reference files serve as a safeguard against unintended token changes

---
