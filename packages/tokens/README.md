## Documentation

---

### `add-missing-tokens.js`

**Purpose**:  
This script is designed to inspect and append missing CSS variables based on a given prefix.

- It reads from a source directory containing fallback styles and checks against a target directory for missing variables.
- Variables are extracted based on a specified prefix.
- Missing variables are appended to the target files.

**Key Functions**:

- `extractVariables(data, prefix)`: Extracts variables from the provided data based on the prefix.
- `compareAndAppendVariables(sourceFilePath, targetFilePath, prefix)`: Compares source and target files for missing variables and appends them.
- `addMissingTokens(prefix)`: Main function that loops through target files and checks for missing variables.

---

### `build-tokens.js`

**Purpose**:  
This script utilizes the `StyleDictionary` package to build design tokens and manage theme generation.

- It has custom transformations and formats tailored for the project's needs.
- Custom transformations include adding color names, providing fallback fonts, and others.
- A custom format for outputting the generated tokens is also defined.

**Key Classes**:

- `TokenBuilder`:  
  - `constructor({ sourcePaths, buildPath, prefix })`: Sets up paths and options for building tokens.
  - `init()`: Registers custom transforms and formats.
  - `registerTransforms()`: Registers custom token transformations.
  - `registerFormat(prefix)`: Registers a custom token format.
  - `buildTokens()`: Builds design tokens based on configurations.

---

### `create-themes.js`

**Purpose**:  
This script orchestrates the theme creation process by utilizing the `TokenBuilder` and `addMissingTokens` functionalities.

- It specifies source paths for the design tokens and the destination path for the generated themes.
- After creating the themes with `TokenBuilder`, it ensures any missing tokens are added.

**Key Functions**:

- `createThemes()`: The main function that sets up the `TokenBuilder`, initiates the token building process, and then ensures all tokens are present.

**To run this script and fetch the tokens you will have to navigate to the *tokens* package folder and write on the terminal: *'pnpm build'*.**
