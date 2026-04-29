# @synergy-design-system/tokens

This package provides the design tokens that form the base for all components of the Synergy Design System.
It provides exports for colors, spacings, shadows, sizings, typography and more that can be also consumed by applications directly.

The source of the tokens can be found at [Figma](https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=104-235&mode=design&t=GPu4VVd9yffLLAaS-0)

In addition, it ships dedicated color palettes that can be used for charts components.
The source of the chart tokens can be found at [Figma](https://www.figma.com/design/9IpXnDH4GFziUH9sOpnK8V/Chart-Library?node-id=15-221&p=f&t=rVC9uEQgFFNLGUcL-0)

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

### Using chart tokens

The tokens package also ships a dedicated set of **chart tokens** for data-visualization use cases (e.g. for the `syn-chart` component). They follow the same theme/mode structure as the component tokens.

Chart tokens are served from a separate output path: `dist/charts/themes/`. Like the component tokens, they provide theme-specific files as well as generic `light.css` and `dark.css` aliases pointing to the current default theme (`sick2025`).

#### Available chart token files

| Theme    | Mode  | Stylesheet to use                              | Corresponding classNames                |
| :------- | :---- | :--------------------------------------------- | :-------------------------------------- |
| sick2025 | light | `tokens/dist/charts/themes/sick2025_light.css` | `syn-theme-light`, `syn-sick2025-light` |
| sick2025 | dark  | `tokens/dist/charts/themes/sick2025_dark.css`  | `syn-theme-dark`, `syn-sick2025-dark`   |

The generic aliases always point to the current default theme:

| Alias       | Points to                               |
| :---------- | :-------------------------------------- |
| `light.css` | `dist/charts/themes/sick2025_light.css` |
| `dark.css`  | `dist/charts/themes/sick2025_dark.css`  |

#### Loading chart tokens

Chart tokens **must be loaded in addition to the regular component tokens**, as they reference CSS variables defined there.

```html
<!DOCTYPE html>
  <head>
    <!-- 1. Load component tokens first (required base) -->
    <link rel="stylesheet" href="/node_modules/@synergy-design-system/tokens/dist/themes/light.css" />

    <!-- 2. Load chart tokens on top -->
    <link rel="stylesheet" href="/node_modules/@synergy-design-system/tokens/dist/charts/themes/light.css" />
  </head>
</html>
```

```javascript
// When using a bundler
import "@synergy-design-system/tokens/themes/light.css";
import "@synergy-design-system/tokens/charts/themes/light.css";
```

Chart tokens expose CSS custom properties with the `--syn-` prefix, for example:

```css
/* Categorical color series (01–12) */
--syn-categorical-01: var(--syn-color-primary-400);
--syn-categorical-02: var(--syn-color-accent-700);
/* … */

/* Sequential and diverging palette tokens are also provided */
```

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

#### Component tokens

```
Figma (main file: bZFqk9urD3NlghGUKrkKCR)
    ↓
Figma REST API
    ↓
Raw JSON Files (src/figma-variables/variableTokens.json + styleTokens.json)
    ↓
Transform Scripts (scripts/figma/)
    ↓
Style Dictionary-compatible JSON Files (src/figma-variables/output/)
    ↓
Style Dictionary Processing (scripts/build-components.js)
    ↓
Build Output (dist/themes/, dist/js/, dist/scss/)
```

#### Chart tokens

```
Figma (chart file: 9IpXnDH4GFziUH9sOpnK8V)
    ↓
Figma REST API
    ↓
Raw JSON File (src/figma-charts/chartTokens.json)
    ↓
Transform Script (scripts/figma/transformer-variables-generic.js)
    ↓
Style Dictionary-compatible JSON Files (src/figma-charts/output/)
    ↓
Style Dictionary Processing (scripts/build-charts.js)
    ↓
Build Output (dist/charts/themes/, dist/charts/js/, dist/charts/scss/)
```

### Building the tokens

Tokens are a mix of [Figma Variables](https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma) and [Figma styles](https://help.figma.com/hc/en-us/articles/360039238753-Styles-in-Figma-Design). They are fetched from Figma via [Figma API](https://www.figma.com/developers/api).

To trigger a new fetching use `pnpm fetch:figma`, to update the tokens.
This scripts needs the figma access token and optionally the figma file id, so it knows, where it should fetch the tokens from. If not available, it fetches the tokens from the main (_bZFqk9urD3NlghGUKrkKCR_).

```bash
# Required: Figma Personal Access Token
export FIGMA_TOKEN="your_figma_token_here"

# Optional: Specific Figma File/Branch ID for component tokens (Default: Main Branch)
export FIGMA_FILE_ID="your_figma_file_id"

# Optional: Specific Figma File/Branch ID for chart tokens (Default: Chart file)
export FIGMA_CHARTING_FILE_ID="your_figma_charting_file_id"
```

```bash
# Fetch all Figma data (component variables, chart variables + styles)
pnpm fetch:figma

# Only fetch component + chart variables and transform into Style Dictionary format
pnpm fetch:variables

# Only fetch styles and transform into Style Dictionary format
pnpm fetch:styles

# Transform already fetched component variables into Style Dictionary format
pnpm build:variables

# Transform already fetched styles into Style Dictionary format
pnpm build:styles

# Build component and chart tokens (final CSS/JS/SCSS output in dist/)
pnpm build

# Or do it all at once
FIGMA_FILE_ID="FILE_ID" FIGMA_CHARTING_FILE_ID="CHART_FILE_ID" FIGMA_TOKEN="FIGMA_TOKEN" pnpm build:all
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

#### `/src/figma-charts/`

- **`chartTokens.json`**: Raw data of Figma Chart Variables, directly fetched from the charting Figma file
- **`output/`**: Transformed chart token files in Style Dictionary-compatible formats
  - `sick2025-light.json`: Light Chart Tokens for SICK 2025
  - `sick2025-dark.json`: Dark Chart Tokens for SICK 2025

#### `/scripts/figma/`

- **`fetch-variables.js`**: Downloads Figma Variables (component **and** chart tokens) via the REST API
- **`style-dict-outputter.js`**: Custom outputter for Figma Styles export
- **`transformer-variables-generic.js`**: Transforms Figma Variables into Style Dictionary format (shared by component and chart pipelines)
- **`transform-styles.js`**: Transforms Figma Styles into Style Dictionary format
- **`helpers.js`**: Utility functions

#### `/scripts/build-components.js`

Runs the Style Dictionary pipeline for component tokens and writes output to `dist/themes/`, `dist/js/`, and `dist/scss/`.

#### `/scripts/build-charts.js`

Runs the Style Dictionary pipeline for chart tokens and writes output to `dist/charts/themes/`, `dist/charts/js/`, and `dist/charts/scss/`. Chart tokens reference component token variables for resolution but only emit chart-specific CSS custom properties in the final output.

#### `/scripts/add-missing-tokens.js`

**Purpose**:  
This script is designed to inspect and append missing CSS variables based on a given prefix.

- It reads from a source directory containing fallback styles and checks against a target directory for missing variables.
- Variables are extracted based on a specified prefix.
- Missing variables are appended to the target files.

**Key Functions**:

- `extractVariables(data)`: Extracts CSS variable declarations from the provided CSS string.
- `appendVariables(targetFilePath, variables)`: Appends missing variables to the target CSS file, skipping any that already exist.
- `addMissingTokens(targetDir)`: Main function that iterates over all CSS files in the target directory and appends any missing variables.

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

- **`test/sick2018_light.css`** / **`test/sick2018_dark.css`**: Reference files for the SICK 2018 component themes
- **`test/sick2025_light.css`** / **`test/sick2025_dark.css`**: Reference files for the SICK 2025 component themes
- **`test/sick2025_light_charts.css`** / **`test/sick2025_dark_charts.css`**: Reference files for the SICK 2025 chart themes
- **`test/test-css-variables.js`**: Test script that compares built files against all reference files

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
   # Copy the newly built component theme files to serve as new reference files
   cp dist/themes/sick*.css test

   # Copy the newly built chart theme files to serve as new reference files
   cp dist/charts/themes/sick*.css test
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
