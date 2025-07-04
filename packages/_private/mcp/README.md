# @synergy-design-system/mcp

Synergy MCP Server – Multi-Framework Component Metadata & Tooling

---

The `@synergy-design-system/mcp` package provides a server-side interface for Synergy Design System components. It enables integration and documentation of component metadata, code samples, and tooling for Angular, React, Vue, and Web Components. The MCP tools deliver structured information and code samples for using Synergy components across frameworks.

## Features

- Unified API for component metadata and code samples
- Support for Angular, React, Vue, and Web Components
- Tools for querying component information, lists, and migration guides
- Easily extensible for additional frameworks and metadata sources

## Available Tools

### 1. `component-list`

**Description:**  
Outputs a list of all available components in the Synergy Design System.

**Example Response:**
```
- syn-accordion
- syn-alert
- syn-badge
- syn-breadcrumb
- syn-breadcrumb-item
- syn-button
- syn-button-group
- syn-card
- syn-checkbox
- syn-combobox
- syn-details
- syn-dialog
- syn-divider
- syn-drawer
- syn-dropdown
- syn-file
- syn-header
- syn-icon
- syn-icon-button
- syn-input
- syn-menu
- syn-menu-item
- syn-menu-label
- syn-nav-item
- syn-optgroup
- syn-option
- syn-popup
- syn-prio-nav
- syn-progress-bar
- syn-progress-ring
- syn-radio
- syn-radio-button
- syn-radio-group
- syn-range
- syn-range-tick
- syn-select
- syn-side-nav
- syn-spinner
- syn-switch
- syn-tab
- syn-tab-group
- syn-tab-panel
- syn-tag
- syn-textarea
- syn-tooltip
- syn-validate
```

---

### 2. `component-info`

**Description:**  
Returns structured metadata, API information, and code samples for a specific component and framework.

**Parameters:**
- `component` (string, required): Name of the component, e.g. `syn-button`
- `framework` (optional, string): e.g. `angular`, `react`, `vue`, `vanilla`

**Example Request:**
```json
{
  "component": "syn-button",
  "framework": "angular"
}
```

**Example Response:**
```json
{
  "name": "syn-button",
  "framework": "angular",
  "api": { ... },
  "usage": "<syn-button ...></syn-button>",
  "props": [ ... ],
  "events": [ ... ],
  "codeSamples": [ ... ]
}
```

---

### 3. `davinci-migrate-list`

**Description:**  
Get a list of all components that have migration information from DaVinci to Synergy.

**Example Response:**
```
Migration information was found for the following components: davinci-button, davinci-input, ...
```

---

### 4. `davinci-migrate-component`

**Description:**  
Get information about the migration of a specific component from DaVinci to Synergy.

**Parameters:**
- `component` (string, required): Name of the DaVinci component, e.g. `davinci-button`

**Example Request:**
```json
{
  "component": "davinci-button"
}
```

**Example Response:**
```
Migration information for davinci-button: 
### davinci-button

| davinci-button | syn-button|
| -- | --|
<img src="button_davinci.png" style="width: 100px;"> | <img src="button_synergy.png" style="width: 110px;"> |

#### Examples
##### Primary
<davinci-button type="primary">Click me</davinci-button>
<!-- will become -->
<syn-button variant="filled">Click me</syn-button>
...
```

---

## Directory Structure & Metadata

- Component metadata and code samples are located in the `metadata/` folder, organized by component and framework.
- Example: `metadata/syn-button/angular.md`, `metadata/syn-button/react.md`
- The tools aggregate and serve this data as structured JSON responses.

## Best Practices for Metadata & Code Samples

- Use one Markdown or JSON file per component and framework for metadata and samples.
- Code samples should be runnable and tailored to the respective framework.
- Clearly document API information, props, events, and slots.

## VS Code Setup Recommendations

To exclude code sample folders (e.g. `metadata/`, `code-samples/`) from linting, type-checking, and autocompletion, use the following configuration:

### `tsconfig.json`
```json
{
  "exclude": [
    "metadata",
    "code-samples"
  ]
}
```

### `.vscode/settings.json`
```json
{
  "files.exclude": {
    "**/metadata": true,
    "**/code-samples": true
  },
  "search.exclude": {
    "**/metadata": true,
    "**/code-samples": true
  }
}
```

## Extension & Integration

- New tools can be added in the `src/tools/` directory.
- Metadata loaders and parsers are located in `src/utilities/`.
- The tool API is designed for easy extension to additional frameworks and components.

## Example: Tool Usage

### Query component list
```json
{
  "tool": "component-list"
}
```

### Query component info
```json
{
  "tool": "component-info",
  "component": "syn-button",
  "framework": "react"
}
```

### Query DaVinci migration info
```json
{
  "tool": "davinci-migrate-component",
  "component": "davinci-button"
}
```

## License
MIT

---

*Last updated: July 4, 2025*

