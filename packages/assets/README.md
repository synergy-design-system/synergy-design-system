## Documentation

---

### `FigmaValidator`

**Purpose**:  
This class serves as a utility to interact with the Figma API, providing functionalities specific to the validation of Figma documents.

- It fetches page names from a given Figma file.
- It checks if essential pages like 'Assets', 'Tokens', and 'Components' are missing from the provided Figma file.

**Key Functions**:

- `getPageNames(fileId)`: Fetches and returns the names of all pages in a given Figma file.
- `getMissingPages(fileId)`: Checks and returns any of the required pages (Assets, Tokens, Components) that are missing from the Figma file.

---

### `optimizeSVGs`

**Purpose**:  
This function optimizes SVG files in a given directory, improving their performance and reducing their file size.

- It uses the SVGO library to carry out optimizations.
- It is set to remove any `fill` attributes and add a default `fill` attribute set to `currentColor`.

**Key Function**:

- `optimizeSVGs(svgDirPath)`: Iterates over SVG files in a specified directory, and optimizes them.

---

### `fetchAssets`

**Purpose**:  
This script automates the process of fetching design assets from Figma and saving them to a local directory.

- It makes use of the `FigmaExporter` class to fetch assets.
- It processes PNG and SVG assets differently and ensures that unwanted assets (those starting with `_`) are not fetched.
- At the end of the process, it clears the target directory (`./src`) and then fetches the assets anew.
- If any SVGs are found in the `./src/icons` directory after fetching, they are optimized using the previously mentioned `optimizeSVGs` function.

**Key Function**:

- `fetchAssets()`: The main function that orchestrates the fetching, filtering, and saving of design assets from Figma.

**To run this script and fetch the assets you will have to navigate to the *assets* package folder and write on the terminal: *'pnpm fetch-assets'*. This command will first remove everything on the *src* folder and then fetch the assets from Figma and create the folders *logos* and *icons* and store them accordingly.**

- Also important to note, for this action to work you will need to have an ***.env*** file with the string variable ***"FIGMA_PERSONAL_ACCESS_TOKEN"*** on it.
