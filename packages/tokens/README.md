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

---

## Provided tokens

As projects may use various forms of applying styles, we provide different ways to consume our tokens.

### Using CSS themes

Provides the css variables that are used in synergy components as css variables and is **required** if you are using `@synergy-design-system/components` or a derived package like `@synergy-design-system/react`.
The tokens package ships with two themes: 🌞 light and 🌛 dark.

> The css styles are used as a single source of truth, also when working with the provided JavaScript or SASS exports!
> Always make sure to load one of the css themes!

```html
<!DOCTYPE html>
  <head>
    <!-- Example 1: Referencing directly in a HTML document -->
    <!-- Make sure to add the stylesheet before using any components -->
    <link rel="stylesheet" href="/node_modules/@synergy-design-system/tokens/dist/themes/light.css" />

    <!-- Alternative: Use the dark theme -->
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

| Theme | Stylesheet to use         | Body className    |
| :---- | :------------------------ | :---------------- |
| light | `tokens/themes/light.css` | `syn-theme-light` |
| dark  | `tokens/themes/dark.css`  | `syn-theme-dark`  |

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
import "@synergy-design-system/tokens/themes/light.css";
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
Raw JSON Files (src/figma-variables/)
    ↓
Transform Scripts (scripts/figma/)
    ↓
Style Dictionary compliant JSON Files (src/figma-variables/output)
    ↓
Style Dictionary Processing
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

# Only fetch styles
pnpm fetch:styles
```

#### Figma variables

The variables are created to support several modes.
Currently supported modes are:

- **sick2018-light**
- **sick2018-dark**

For each mode a json file is created, with the corresponding tokens and values.

#### Figma styles

For the styles a separate `styles.json` is created.

#### Output

Outputs of the tokens are created using [Style Dictionary](https://amzn.github.io/style-dictionary/).
You can trigger a build using `pnpm build` in the `tokens` package root. This will create the css themes (located in `dist/themes/light.css` and `dist/themes/dark.css`), as well as the JavaScript exports (located at `dist/js/index.js`) and scss variables (`dist/scss/_tokens.scss`).

---

### Project structure

#### `/src/figma-variables/`

- **`tokens.json`**: Raw data of Figma Variables and Collections, directly fetched from the Figma API
- **`output/`**: Transformed token files in Style Dictionary-compatible formats
  - `sick2018-light.json`: Light Theme Tokens
  - `sick2018-dark.json`: Dark Theme Tokens
  - `styles.json`: Figma Styles (Typography, Shadows, etc.)

#### `/scripts/figma/`

- **`fetch-variables.js`**: Downloads Figma Variables via the REST API
- **`transform-tokens.js`**: Transforms Figma Variables into Style Dictionary format
- **`style-dict-outputter.js`**: Custom outputter for Figma Styles export
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
3. **Token Synchronization**: Runs `pnpm -C ./packages/tokens fetch:figma` to fetch and transform Figma data
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
