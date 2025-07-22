# @synergy-design-system/mcp

Synergy MCP Server – Multi-Framework Component Metadata & Tooling

---

The `@synergy-design-system/mcp` package provides a server-side interface for Synergy Design System components, assets, and design tokens. It enables integration and documentation of component metadata, code samples, icon information, and tooling for Angular, React, Vue, and Web Components. The MCP tools deliver structured information and code samples for using Synergy components across frameworks, along with design assets and migration guides.

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

- Unified API for component metadata, code samples, and design assets
- Support for Angular, React, Vue, and Web Components
- Icon and design token information from the Synergy Design System
- Tools for querying component information, lists, and migration guides
- DaVinci to Synergy migration assistance
- Easily extensible for additional frameworks and metadata sources

## Available Tools

### 1. `component-list`

**Description:**  
Outputs a list of all available components in the Synergy Design System.

**Example prompts:**

- "Show me all available Synergy components"
- "What components are available in the Synergy Design System?"
- "List all syn-\* components"

---

### 2. `component-info`

**Description:**  
Get information about the usage of a specific component in the Synergy Design System.

**Parameters:**

- `component` (string, required): The name of the component to get information about (must start with `syn-`, e.g., `syn-button`).
- `framework` (optional, string): The framework of the component. Options: `react`, `vue`, `angular`, `vanilla`. Defaults to `vanilla`.

**Example prompts:**

- "How do I use the syn-button component in React?"
- "Show me the syn-input component documentation"
- "What props does syn-dialog support in Vue?"
- "Give me an example of syn-card in Angular"

---

### 3. `asset-info`

**Description:**  
Get information about available icons in the Synergy Design System. Will return the full list of icons in a set or just a subset.

**Parameters:**

- `filter` (optional, string): A filter to apply to the icon names. If provided, only icons matching this filter will be returned.
- `iconset` (optional, string): The name of the icon set to retrieve icons from. Options: `current`, `legacy`, `v2`, `synergy2018`, `brand2018`, `brand2025`, `synergy2025`, `new`, `next`. Defaults to `current`.
- `limit` (optional, number): The maximum number of icons to return. Defaults to 5.

**Example prompts:**

- "Show me icons with 'add' in the name"
- "What icons are available for cancel actions?"
- "List 10 icons from the new iconset"
- "Find icons related to 'close' in the current iconset"

---

### 4. `token-info`

**Description:**  
Get information about design tokens available in the Synergy Design System.

**Parameters:**

- `type` (optional, string): The type of token to retrieve. Options: `javascript` for JS tokens or `css` for CSS tokens. Defaults to `css`.

**Example prompts:**

- "Show me the available CSS design tokens"
- "What JavaScript design tokens are available?"
- "List all design tokens for styling"

---

### 5. `styles-list`

**Description:**  
Outputs a list of available styles in the Synergy Design System.

**Example prompts:**

- "What styles are available in Synergy?"
- "Show me all available CSS utility classes"
- "List all style modules"

---

### 6. `styles-info`

**Description:**  
Get information about CSS utilities available in the Synergy Design System.

**Example prompts:**

- "Show me information about Synergy CSS utilities"
- "What CSS utilities does Synergy provide?"
- "Tell me about the styles package"

---

### 7. `davinci-migrate-list`

**Description:**  
Get a list of all components that have migration information from DaVinci to Synergy.

**Example prompts:**

- "What DaVinci components can be migrated to Synergy?"
- "Show me all available migration guides"
- "List components with migration information"

---

### 8. `davinci-migrate-component`

**Description:**  
Get information about the migration of a specific component from DaVinci to Synergy.

**Parameters:**

- `component` (string, required): Name of the DaVinci component (must start with `davinci-`, e.g., `davinci-button`).

**Example prompts:**

- "How do I migrate from davinci-button to Synergy?"
- "Show me the migration guide for davinci-input"
- "What's the Synergy equivalent of davinci-card?"

---

### 9. `framework-info`

**Description:**  
Get information about a specific framework package that the Synergy Design System supports.

**Parameters:**

- `framework` (optional, string): The framework you want information for. Options: `react`, `vue`, `angular`, `vanilla`. Defaults to `vanilla`.

**Example prompts:**

- "How do I set up Synergy with React?"
- "Show me the Angular integration guide"
- "What's needed to use Synergy with Vue?"
- "How do I install Synergy for vanilla JavaScript?"

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

```bash
"Show me all available Synergy components"
```

### Query component info

```bash
"How do I use the syn-button component in React?"
"Show me syn-input documentation for Angular"
```

### Query asset/icon info

```bash
"Show me icons with 'add' in the name"
"What icons are available for cancel actions?"
"List 10 icons from the new iconset"
```

### Query styles info

```bash
"Show me information about Synergy CSS utilities"
"What styles are available in Synergy?"
"List all style modules"
```

### Query design tokens

```bash
"Show me the available CSS design tokens"
"What JavaScript design tokens are available?"
```

### Query DaVinci migration info

```bash
"How do I migrate from davinci-button to Synergy?"
"What DaVinci components can be migrated to Synergy?"
```

### Query framework info

```bash
"How do I set up Synergy with React?"
"Show me the Angular integration guide"
```

### JSON API Examples (for programmatic access)

```json
{
  "tool": "component-list"
}
```

```json
{
  "tool": "component-info",
  "component": "syn-button",
  "framework": "react"
}
```

```json
{
  "tool": "asset-info",
  "filter": "add",
  "iconset": "current",
  "limit": 5
}
```

```json
{
  "tool": "styles-info"
}
```

```json
{
  "tool": "styles-list"
}
```

```json
{
  "tool": "token-info",
  "type": "css"
}
```

```json
{
  "tool": "davinci-migrate-component",
  "component": "davinci-button"
}
```

```json
{
  "tool": "framework-info",
  "framework": "angular"
}
```

## License

MIT

---

_Last updated: July 17, 2025_
