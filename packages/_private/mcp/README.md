# @synergy-design-system/mcp

Synergy MCP Server – Multi-Framework Component Metadata & Tooling

---

The `@synergy-design-system/mcp` package provides a server-side interface for Synergy Design System components. It enables integration and documentation of component metadata, code samples, and tooling for Angular, React, Vue, and Web Components. The MCP tools deliver structured information and code samples for using Synergy components across frameworks.

## Local Setup

To run the MCP server locally, install the `@synergy-design-system/mcp` package in your project. You can launch the server using `npx @synergy-design-system/mcp` from your project directory. For integration with VS Code, add a configuration under `mcp.servers` in your `settings.json` to connect via stdio. Example configuration:

```jsonc
"mcp": {
  "servers": {
    "synergy": {
      "type": "stdio",
      "cwd": "/path/to/your/project",
      "command": "npx",
      "args": [
        "@synergy-design-system/mcp"
      ]
    }
  }
}
```

Replace `/path/to/your/project` with your actual project directory.

## Features

- Unified API for component metadata and code samples
- Support for Angular, React, Vue, and Web Components
- Tools for querying component information, lists, and migration guides
- Easily extensible for additional frameworks and metadata sources

## Available Tools

### 1. `component-list`

**Description:**  
Outputs a list of all available components in the Synergy Design System.

---

### 2. `component-info`

**Description:**  
Get information about the usage of a specific component in the Synergy Design System.

**Parameters:**
- `component` (string, required): The name of the component to get information about (e.g., `syn-button`).
- `framework` (optional, string): The framework of the component, e.g., `react`, `vue`, `angular`, `vanilla`.

---

### 3. `davinci-migrate-list`

**Description:**  
Get a list of all components that have migration information from DaVinci to Synergy.

---

### 4. `davinci-migrate-component`

**Description:**  
Get information about the migration of a specific component from DaVinci to Synergy.

**Parameters:**
- `component` (string, required): Name of the DaVinci component, e.g., `davinci-button`.

---

### 5. `framework-info`

**Description:**  
Get information about a specific framework package that the Synergy Design System supports.

**Parameters:**
- `framework` (optional, string): The framework you want information for, e.g., `react`, `vue`, `angular`, `vanilla`.

---

## Directory Structure & Metadata

- Component metadata and code samples are located in the `metadata/` folder, organized by component and framework.
- Example: `metadata/syn-button/angular.md`, `metadata/syn-button/react.md`
- The tools aggregate and serve this data as structured JSON responses.

## Best Practices for Metadata & Code Samples

- Use one Markdown or JSON file per component and framework for metadata and samples.
- Code samples should be runnable and tailored to the respective framework.
- Clearly document API information, props, events, and slots.

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

### Query framework info
```json
{
  "tool": "framework-info",
  "framework": "angular"
}
```

## License
MIT

---

*Last updated: July 11, 2025*

