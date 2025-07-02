# @synergy-design-system/mcp

Synergy MCP Server – Multi-Framework Component Metadata & Tooling

---

The `@synergy-design-system/mcp` package provides a server-side interface for Synergy Design System components. It enables integration and documentation of component metadata, code samples, and tooling for Angular, React, Vue, and Web Components. The MCP tools deliver structured information and code samples for using Synergy components across frameworks.

## Features
- Unified API for component metadata and code samples
- Support for Angular, React, Vue, and Web Components
- Tools for querying component information and lists
- Easily extensible for additional frameworks and metadata sources

## Available Tools

### 1. `component-list`
**Description:**
Returns a list of all available Synergy components.

**Example Response:**
```json
[
  "syn-button",
  "syn-input",
  ...
]
```

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

### `tsconfig.json` (in the project root or MCP server package)
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

## License
MIT

---

*Last updated: July 2, 2025*

