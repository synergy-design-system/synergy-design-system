# @synergy-design-system/mcp

Synergy MCP Server – Multi-Framework Component Metadata & Tooling

---

The `@synergy-design-system/mcp` package provides a Model Context Protocol (MCP) server for the Synergy Design System. It enables AI assistants and development tools to access structured information about Synergy components, design tokens, icons, and migration guides across multiple frameworks (Angular, React, Vue, and vanilla Web Components).

## Quick Start

### Installation

```bash
npm install @synergy-design-system/mcp
```

### Running the Server

The MCP server can be started using the `syn-mcp` binary:

```bash
# Run directly
npx @synergy-design-system/mcp

# Or if installed globally
syn-mcp
```

### VS Code Integration

To integrate with VS Code and AI assistants, add this configuration to your VS Code `settings.json` under the `mcp.servers` section:

```jsonc
{
  "mcp": {
    "servers": {
      "synergy": {
        "type": "stdio",
        "command": "npx",
        "args": ["@synergy-design-system/mcp"],
      },
    },
  },
}
```

### Claude Desktop Integration

For Claude Desktop, add this to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "synergy": {
      "command": "npx",
      "args": ["@synergy-design-system/mcp"]
    }
  }
}
```

## Features

- **Component Information**: Get detailed usage information for Synergy components across frameworks
- **Icon Assets**: Search and discover available icons from multiple icon sets
- **Design Tokens**: Access CSS and JavaScript design tokens
- **Style Utilities**: Information about available CSS utility classes
- **Migration Guides**: DaVinci to Synergy component migration assistance
- **Framework Support**: Specific documentation for Angular, React, Vue, and vanilla Web Components
- **MCP Protocol**: Standard Model Context Protocol interface for AI assistant integration

## Available Tools

The MCP server provides the following tools that can be invoked by AI assistants:

### 1. `component-list`

**Description:** Outputs a list of all available components in the Synergy Design System.

**Parameters:** None

**Example prompts:**

- "Show me all available Synergy components"
- "What components are available in the Synergy Design System?"
- "List all syn-\* components"

### 2. `component-info`

**Description:** Get detailed information about the usage of a specific component in the Synergy Design System.

**Parameters:**

- `component` (string, required): The name of the component (must start with `syn-`, e.g., `syn-button`)
- `framework` (string, optional): The framework (`react`, `vue`, `angular`, `vanilla`). Defaults to `vanilla`

**Example prompts:**

- "How do I use the syn-button component in React?"
- "Show me the syn-input component documentation"
- "What props does syn-dialog support in Vue?"
- "Give me an example of syn-card in Angular"

### 3. `asset-info`

**Description:** Get information about available icons in the Synergy Design System.

**Parameters:**

- `filter` (string, optional): Filter icon names by substring match
- `iconset` (string, optional): Icon set to search (`current`, `legacy`, `v2`, `synergy2018`, `brand2018`, `brand2025`, `synergy2025`, `new`, `next`). Defaults to `current`
- `limit` (number, optional): Maximum number of icons to return. Defaults to 5

**Example prompts:**

- "Show me icons with 'add' in the name"
- "What icons are available for cancel actions?"
- "List 10 icons from the new iconset"
- "Find icons related to 'close' in the current iconset"

### 4. `token-info`

**Description:** Get information about design tokens available in the Synergy Design System.

**Parameters:**

- `type` (string, optional): Token type (`javascript` or `css`). Defaults to `css`

**Example prompts:**

- "Show me the available CSS design tokens"
- "What JavaScript design tokens are available?"
- "List all design tokens for styling"

### 5. `styles-list`

**Description:** Outputs a list of available styles in the Synergy Design System.

**Parameters:** None

**Example prompts:**

- "What styles are available in Synergy?"
- "Show me all available CSS utility classes"
- "List all style modules"

### 6. `styles-info`

**Description:** Get information about CSS utilities available in the Synergy Design System.

**Parameters:** None

**Example prompts:**

- "Show me information about Synergy CSS utilities"
- "What CSS utilities does Synergy provide?"
- "Tell me about the styles package"

### 7. `davinci-migrate-list`

**Description:** Get a list of all components that have migration information from DaVinci to Synergy.

**Parameters:** None

**Example prompts:**

- "What DaVinci components can be migrated to Synergy?"
- "Show me all available migration guides"
- "List components with migration information"

### 8. `davinci-migrate-component`

**Description:** Get information about the migration of a specific component from DaVinci to Synergy.

**Parameters:**

- `component` (string, required): Name of the DaVinci component (must start with `davinci-`, e.g., `davinci-button`)

**Example prompts:**

- "How do I migrate from davinci-button to Synergy?"
- "Show me the migration guide for davinci-input"
- "What's the Synergy equivalent of davinci-card?"

### 9. `framework-info`

**Description:** Get information about a specific framework package that the Synergy Design System supports.

**Parameters:**

- `framework` (string, optional): Framework name (`react`, `vue`, `angular`, `vanilla`). Defaults to `vanilla`

**Example prompts:**

- "How do I set up Synergy with React?"
- "Show me the Angular integration guide"
- "What's needed to use Synergy with Vue?"
- "How do I install Synergy for vanilla JavaScript?"

## Developer Documentation

### Project Structure

```
src/
├── bin/
│   └── start.ts          # CLI entry point (syn-mcp command)
├── build/
│   └── build.js          # Build script for metadata
├── server.ts             # MCP server setup and tool registration
├── tools/                # Tool implementations
│   ├── assets.ts         # Icon and asset information
│   ├── component-info.ts # Individual component details
│   ├── component-list.ts # List all components
│   ├── davinci-migration.ts # Migration guides
│   ├── package-info.ts   # Framework-specific information
│   ├── styles-info.ts    # CSS utilities information
│   ├── styles-list.ts    # List all styles
│   ├── tokens.ts         # Design tokens
│   └── index.ts          # Tool exports
└── utilities/            # Helper functions and metadata loaders
metadata/                 # Static metadata files
├── davinci-migration/    # DaVinci to Synergy migration guides
├── packages/             # Synergy package specific information
└── static/               # Static metadata for tools
```

### Available Scripts

The following npm scripts are available for development:

```bash
# Build the entire project (TypeScript + metadata + Storybook docs)
pnpm build

# Build only TypeScript files
pnpm build:ts

# Build metadata from source packages
pnpm build:metadata

# Build Storybook documentation
pnpm build:storybook

# Run linting
pnpm lint
pnpm lint:js

# Run tests with coverage
pnpm test

# Create a release (dry run)
pnpm release.dry

# Create a release
pnpm release
```

### Development Workflow

1. **Setup**: Install dependencies with `pnpm install`
2. **Build**: Run `pnpm build` to compile TypeScript and generate metadata
3. **Test**: Use `pnpm test` to run the test suite
4. **Run**: Start the server with `npx syn-mcp` or `node dist/bin/start.js`

### Adding New Tools

To add a new tool:

1. Create a new file in `src/tools/` (e.g., `my-tool.ts`)
2. Implement the tool following the MCP SDK patterns
3. Export the tool from `src/tools/index.ts`
4. Register the tool in `src/server.ts`

Example tool structure:

```typescript
import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export const myTool = (server: McpServer) => {
  server.registerTool(
    "my-tool",
    {
      description: "Description of what the tool does",
      inputSchema: {
        param: z.string().describe("Parameter description"),
      },
      title: "My Tool",
    },
    async ({ param }) => {
      // Tool implementation
      return {
        content: [
          {
            text: `Result for ${param}`,
            type: "text",
          },
        ],
      };
    },
  );
};
```

### Metadata Management

Metadata is stored in the `metadata/` directory and is built during the build process:

- **Static metadata**: Hand-written files in `metadata/static/`
- **Component metadata**: Generated from Synergy packages in `metadata/packages/`
- **Migration guides**: DaVinci migration information in `metadata/davinci-migration/`

The `pnpm build:metadata` script processes source packages and generates structured metadata files.

### Binary Distribution

The package includes a `syn-mcp` binary that starts the MCP server via stdio transport. This is defined in `package.json`:

```json
{
  "bin": {
    "syn-mcp": "./dist/bin/start.js"
  }
}
```

## Usage Examples

### Command Line Interface

```bash
# Start the MCP server
syn-mcp

# The server will communicate via stdio and wait for MCP protocol messages
```

### Programmatic Usage

```typescript
import { createServer } from "@synergy-design-system/mcp";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Create and start the server
const server = createServer();
const transport = new StdioServerTransport();
await server.connect(transport);
```

### AI Assistant Integration

Once configured with an AI assistant, you can use natural language prompts like:

```
"Show me how to use syn-button in React"
"What icons are available for navigation?"
"How do I migrate from davinci-card to Synergy?"
"List all available Synergy components"
"What CSS utilities does Synergy provide?"
```

The MCP server will interpret these prompts and call the appropriate tools to provide structured responses.

## Architecture

The MCP server is built using the Model Context Protocol SDK and provides a standardized interface for AI assistants to access Synergy Design System information.

### Core Components

- **Server**: MCP server instance that manages tool registration and request handling
- **Tools**: Individual tool implementations that provide specific functionality
- **Utilities**: Helper functions for metadata loading and processing
- **Metadata**: Static and generated metadata files containing component and framework information

### Data Flow

1. AI assistant sends MCP request to the server
2. Server routes request to appropriate tool
3. Tool processes request and loads relevant metadata
4. Tool returns structured response to AI assistant
5. AI assistant processes response and provides user-friendly output

## License

MIT

---

_Last updated: July 22, 2025_
