# @synergy-design-system/mcp

The `@synergy-design-system/mcp` package provides a Model Context Protocol (MCP) server for the Synergy Design System. It exposes Synergy components, setup guidance, tokens, styles, templates, icons, and migration content to AI assistants over stdio or http.

Data is provided via the low level `@synergy-design-system/metadata` package.

## Quick Start

### Installation

```bash
npm install --save-dev @synergy-design-system/mcp
```

### Running the Server

The package ships a `syn-mcp` binary:

```bash
# Run via stdio (default, for editor integration)
npx @synergy-design-system/mcp

# Or if installed globally
syn-mcp

# Start with an explicit runtime config
syn-mcp --config ./synergy-mcp.json

# Start HTTP server on default port 9119
syn-mcp --interface http

# Start HTTP server on a custom port
syn-mcp --interface http --port 3000

# Listen on all IPv4 interfaces for container/cloud deployment
syn-mcp --interface http --host 0.0.0.0

# Start HTTPS server with TLS certificates
syn-mcp --interface http --tls-key ./server.key --tls-cert ./server.crt

# Enable local tool-call logging to a directory
syn-mcp --log ./logs

# Explicitly disable logging (also disabled when omitted)
syn-mcp --log false
```

Available CLI flags:

- `--help`, `-h`: Show usage information
- `--version`, `-v`: Print the package version
- `--config <path>`: Load runtime defaults from a `synergy-mcp.json` file
- `--interface <stdio|http>`: Server interface (default: `stdio`)
- `--port <number>`: HTTP server port (default: `9119`, only used with `--interface http`)
- `--host <address>`: HTTP bind address (default: `127.0.0.1`)
- `--log <value>`: Local tool-call log directory path, or `false` / `null` to disable
- `--tls-key <path>`: Path to TLS private key file (enables HTTPS)
- `--tls-cert <path>`: Path to TLS certificate file (enables HTTPS)

### VS Code Integration

To integrate with VS Code and AI assistants, add this configuration to your `settings.json` under `mcp.servers`:

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

For Claude Desktop, add this to `claude_desktop_config.json`:

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

### Runtime Configuration

The server can read optional runtime defaults from a `synergy-mcp.json` file passed via `--config`.

#### Server Interface

You can run the server in two modes:

- **stdio** (default): Communicate via stdin/stdout with the parent process. This is the recommended mode for editor and CLI integrations.
- **http**: Run as an HTTP/HTTPS server listening on a specified port. This enables standalone deployments.

#### Configuration File

Example:

```jsonc
{
  // Server interface mode: "stdio" (default) or "http"
  "interface": "http",

  // HTTP server port (only used when interface is "http")
  "port": 3000,

  // HTTP bind address.
  // Use 127.0.0.1 for local-only access or 0.0.0.0 for container/cloud deployments.
  "host": "127.0.0.1",

  // TLS configuration (optional, enables HTTPS)
  // Both keyPath and certPath must be provided together
  "tls": {
    "keyPath": "./server.key",
    "certPath": "./server.crt",
  },

  // Include custom ai rules for each tool.
  "includeAiRules": true,

  // Optional logging providers
  "logging": {
    "localFile": {
      // Base folder for logs (YY-MM-DD/SESSION.json)
      // Set to null to disable local file logging
      "path": "./logs",
    },
  },

  // Default parameters for each endpoint can be overridden
  "tools": {
    "assetInfo": {
      "iconset": "current",
    },
    "componentInfo": {
      // Set to angular, react or vue, depending on your framework
      "framework": "vanilla",
      // Defines which type of information to return.
      // full = filtered source files,
      // examples = markdown examples,
      // interface = markdown API overview.
      // Note that examples and interface are only available
      // for vanilla components at the moment.
      "layer": "full",
    },
    "tokenInfo": {
      // If you are preferring scss, use "sass" here
      "type": "css",
    },
  },
}
```

#### CLI Override Precedence

CLI flags take precedence over configuration file values:

```bash
# Config file specifies port 3000, but CLI overrides it to 8080
syn-mcp --config ./synergy-mcp.json --port 8080

# Config file specifies a local-only bind, but CLI overrides it for deployment
syn-mcp --config ./synergy-mcp.json --host 0.0.0.0

# Config enables logging, but CLI disables it for this run
syn-mcp --config ./synergy-mcp.json --log false
```

#### Tool-call logging

Tool-call logging is provider-based. The built-in local file provider writes one JSON entry per line to:

- `YY-MM-DD/SESSION.json`

Each entry includes:

- `timestamp`
- `toolName`
- `parameters`
- `durationMs`
- `sessionId` (`stdio` when no session id exists)
- `transport` (`stdio` or `http`)
- `success` and optional `errorMessage`
- `tokenCount` (optional, populated when tiktoken is available)

##### Optional Token Counting

The MCP server can automatically count output tokens for each tool call when the optional `tiktoken` dependency is available.

**Installation:**

Token counting is an optional feature. To enable it, install tiktoken:

```bash
npm install tiktoken
# or
pnpm add tiktoken
```

The MCP package declares tiktoken as both a dev dependency (for build/test) and optional dependency (for runtime). When installed, token counts are automatically computed and logged for every successful tool call.

**Behavior:**

- If tiktoken is installed, `tokenCount` is populated with the output token count for the tool response using the `o200k_base` encoding.
- If tiktoken is not available, `tokenCount` will be omitted from log entries.
- Token counting failure does not fail the tool call; it only results in `tokenCount` being absent from the log entry.

**Example log entry with tokenCount:**

```json
{
  "durationMs": 187.69,
  "parameters": {},
  "sessionId": "stdio",
  "success": true,
  "timestamp": "2026-04-22T09:21:47.533Z",
  "tokenCount": 421,
  "toolName": "asset-list",
  "transport": "stdio"
}
```

Notes:

- Logging is disabled by default.
- Use `--log <path>` or set `logging.localFile.path` in config to enable.
- `--log false` and `--log null` explicitly disable local file logging.
- Token counting is always optional and non-blocking; the server runs fine without it.

#### HTTP Server Endpoint

When running in HTTP mode, the MCP protocol is served at the `/mcp` path:

```
http://127.0.0.1:9119/mcp
https://127.0.0.1:3000/mcp
```

Non-`/mcp` paths return HTTP 404.

#### Metadata cache behavior in HTTP mode

The MCP server reads data via `@synergy-design-system/metadata`, which now uses a process-local cache for index, entity, and layer file reads.
In HTTP mode this reduces repeated filesystem reads across requests and sessions inside the same process.

Operationally, treat metadata as immutable for the process lifetime and roll out updates via restart/redeploy.
If you run multiple replicas, each replica maintains its own in-memory cache.

For public or containerized deployments, bind to all interfaces explicitly:

```bash
syn-mcp --interface http --host 0.0.0.0
```

Example deployment patterns:

```bash
# Docker / Kubernetes: listen on all interfaces inside the container
syn-mcp --interface http --host 0.0.0.0 --port 3000

# Reverse proxy / load balancer forwards external traffic to the MCP endpoint
# https://mcp.example.com/mcp  ->  http://127.0.0.1:3000/mcp
syn-mcp --interface http --host 127.0.0.1 --port 3000
```

In general:

- Use `127.0.0.1` when the server should only be reachable through the local machine or a reverse proxy on the same host.
- Use `0.0.0.0` when the runtime environment needs the process to accept traffic from outside its own network namespace, such as Docker, Kubernetes, ECS, or EC2.

This lets you change per-tool defaults without modifying the MCP server code.

## Features

- **Metadata-backed component docs**: Retrieve component data directly from `@synergy-design-system/metadata`.
- **Setup guidance**: Return package setup instructions for components, framework adapters, tokens, styles, fonts, assets, and migrations.
- **Asset and icon discovery**: Browse icon sets and search icons across the Synergy asset libraries.
- **Token access**: Read CSS, JavaScript, and Sass token outputs.
- **Styles and templates**: Retrieve CSS utility guidance and static template content.
- **Migration guidance**: Access both DaVinci migration guides and Synergy package migration documents.
- **AI response rules**: Optionally prepends package-local guidance files from `rules/` to selected tool responses.
- **MCP stdio transport**: Ready for editor, assistant, and CLI integrations.

## Available Tools

The MCP server currently registers 16 tools.

### 1. `component-list`

**Description:** Outputs a list of all available components in the Synergy Design System.

**Parameters:**

- `cluster` (string, optional): Cluster id to filter by, for example `components-by-tag/structure`.

**Example prompts:**

- "Show me all available Synergy components"
- "List all components in the structure cluster"
- "What components are available in the Synergy Design System?"
- "List all syn-\* components"

### 2. `component-cluster-list`

**Description:** Outputs all available component clusters in the Synergy Design System.

**Parameters:** None

**Example prompts:**

- "What component clusters are available?"
- "List all Synergy component clusters"
- "Show me cluster ids I can use with component-list"

#### Cluster-first workflow

Use this two-step flow when you want to narrow component discovery to one group:

1. Call `component-cluster-list` and pick one cluster id from the result (for example `components-by-tag/structure`).
2. Call `component-list` with `cluster` set to that id.

Example prompts:

- "List component clusters, then show me components for `components-by-tag/structure`."
- "Give me all components in the `components-by-tag/navigation` cluster."

### 3. `component-info`

**Description:** Get information about the usage of a specific component in the Synergy Design System.

**Parameters:**

- `component` (string, required): The component name. Must start with `syn-`, for example `syn-button`.
- `framework` (string, optional): `react`, `vue`, `angular`, or `vanilla`. Defaults to the runtime config value, which is `vanilla` by default.
- `layer` (string, optional): `full`, `examples`, or `interface`. Defaults to the runtime config value, which is `full` by default. `examples` and `interface` are currently only available for vanilla components.

**Example prompts:**

- "How do I use syn-button in React?"
- "Show me the interface docs for syn-dialog"
- "Give me examples for syn-card"

### 4. `asset-list`

**Description:** Get the available icon sets in the Synergy Design System.

**Parameters:** None

**Example prompts:**

- "What icon sets are available?"
- "Show me all available icon libraries"
- "List all Synergy icon sets"

### 5. `asset-info`

**Description:** Get information about available icons in the Synergy Design System.

**Parameters:**

- `filter` (string, optional): Filter icon names by substring. Supports comma-separated search terms such as `home,search,menu`.
- `iconset` (string, optional): One of `legacy`, `v2`, `synergy2018`, `brand2018`, `sick2018`, `current`, `default`, `brand2025`, `sick2025`, `synergy2025`, `new`, `next`, or `v3`. Defaults to the runtime config value, which is `current` by default.
- `limit` (number, optional): Maximum number of icons to return. When using multiple filters, the limit applies per filter term.

**Example prompts:**

- "Show me icons with add in the name"
- "Find icons for close and cancel"
- "List 10 icons from the current icon set"

### 6. `token-info`

**Description:** Get raw design token file contents from the Synergy Design System.

**Parameters:**

- `type` (string, optional): `javascript`, `css`, or `sass`. Defaults to the runtime config value, which is `css` by default.
- `theme` (string, optional): `sick2025-light`, `sick2025-dark`, `sick2018-light`, or `sick2018-dark`. This is only relevant for CSS token output.

**Example prompts:**

- "Show me the CSS tokens for sick2025-light"
- "Give me the JavaScript token output"
- "Show me the Sass design tokens"

### 7. `tokens-list`

**Description:** Outputs a list of available token output types and CSS themes in the Synergy Design System.

**Parameters:** None

**Example prompts:**

- "What token formats are available?"
- "List the supported token themes"
- "Show me which token outputs this server can provide"

### 8. `styles-list`

**Description:** Outputs a list of available CSS classes and styles in the Synergy Design System.

**Parameters:** None

**Example prompts:**

- "What styles are available in Synergy?"
- "Show me all available CSS utility classes"
- "List all style modules"

### 9. `styles-info`

**Description:** Get information about CSS utilities available in the Synergy Design System.

**Parameters:**

- `style` (string, required): The style name to retrieve.

**Example prompts:**

- "Show me information about visually-hidden"
- "What does the spacing utility package contain?"
- "Tell me about a specific Synergy style"

### 10. `template-list`

**Description:** Outputs a list of available static templates built with the Synergy Design System.

**Parameters:** None

**Example prompts:**

- "What templates are available in Synergy?"
- "Show me all available static templates"
- "List all templates"

### 11. `template-info`

**Description:** Get a specific template in the Synergy Design System.

**Parameters:**

- `template` (string, required): The template name to retrieve.

**Example prompts:**

- "Show me the form template"
- "Give me information about the dashboard template"
- "How do I use the form template?"

### 12. `davinci-migration-list`

**Description:** Get a list of all components that have migration information from DaVinci to Synergy.

**Parameters:**

- `package` (string, optional): `components` or `charts`. Defaults to the runtime config value, which is `components` by default. Currently only `components` is available.

**Example prompts:**

- "What DaVinci components can be migrated to Synergy?"
- "Show me all available DaVinci migration entries"
- "List components with migration information"

### 13. `davinci-migration-info`

**Description:** Get information about the migration of a specific component from DaVinci to Synergy.

**Parameters:**

- `component` (string, required): Name of the DaVinci component. Must start with `davinci-`, for example `davinci-button`.
- `package` (string, optional): `components` or `charts`. Defaults to the runtime config value, which is `components` by default. Currently only `components` is available.

**Example prompts:**

- "How do I migrate from davinci-button to Synergy?"
- "Show me the migration guide for davinci-input"
- "What's the Synergy equivalent of davinci-auto-suggest?"

### 14. `migration-list`

**Description:** List available migration documents for a Synergy package in a compact, token-efficient format.

**Parameters:**

- `synergyPackage` (string, optional): `assets`, `components`, `styles`, or `tokens`. Defaults to the runtime config value, which is `components` by default.

**Behavior:**

- For `components`, this returns a compact index of the migration overview, path guides, and package-level docs.
- For component path guides, the tool also derives metadata such as `from`, `to`, `fromTheme`, `toTheme`, `title`, and a short `summary` where possible.

**Example prompts:**

- "List all Synergy component migration guides"
- "Show me available migration docs for tokens"
- "What migration paths exist from Synergy 2 to Synergy 3?"

### 15. `migration-info`

**Description:** Get detailed migration documentation for a Synergy package. Use together with `migration-list` to fetch only the documents you need.

**Parameters:**

- `filename` (string, optional): Specific migration document filename to return. Especially useful for the `components` package.
- `synergyPackage` (string, optional): `assets`, `components`, `styles`, or `tokens`. Defaults to the runtime config value, which is `components` by default.

**Behavior:**

- For `components` with `filename`, returns exactly that document.
- For `components` without `filename`, returns the overview and high-level package docs, not every path guide.
- For `assets`, `styles`, and `tokens`, returns the available migration documents for the selected package.

**Example prompts:**

- "List the available Synergy component migrations"
- "Show me the migration guide from Synergy 2 (SICK 2018) to Synergy 3 (SICK 2018)"
- "Give me the breaking changes for the tokens package"

### 16. `setup`

**Description:** Get setup information for a Synergy package. Framework packages automatically include base components setup.

**Parameters:**

- `package` (string, required): `components`, `react`, `vue`, `angular`, `tokens`, `styles`, `fonts`, `assets`, or `migrations`.
- `includeLimitations` (boolean, optional): Include known limitations and issues. Defaults to the runtime config value, which is `true` by default.

**Example prompts:**

- "How do I set up Synergy for React?"
- "Show me the setup instructions for tokens"
- "Give me the Synergy assets setup and limitations"

## Usage Examples

### Command Line Interface

```bash
# Start the MCP server
syn-mcp

# Start with custom defaults
syn-mcp --config ./synergy-mcp.json
```

### Programmatic Usage

StdIO transport:

```typescript
import { createServer } from "@synergy-design-system/mcp";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = createServer();
const transport = new StdioServerTransport();

await server.connect(transport);
```

HTTP transport (session-aware):

```typescript
import { randomUUID } from "node:crypto";
import { createServer as createHttpServer } from "node:http";
import { createServer } from "@synergy-design-system/mcp";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";

const sessions = new Map<string, StreamableHTTPServerTransport>();
const nodeServer = createHttpServer();

nodeServer.on("request", async (req, res) => {
  if (!(req.url || "/").startsWith("/mcp")) {
    res.statusCode = 404;
    res.end("Not Found\\n");
    return;
  }

  const sessionId = req.headers["mcp-session-id"] as string | undefined;

  if (sessionId) {
    const existing = sessions.get(sessionId);
    if (!existing) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          jsonrpc: "2.0",
          id: null,
          error: { code: -32000, message: "Unknown session ID" },
        }),
      );
      return;
    }

    await existing.handleRequest(req, res);
    return;
  }

  const server = createServer();
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: () => randomUUID(),
    onsessioninitialized: sid => {
      sessions.set(sid, transport);
    },
  });

  transport.onclose = () => {
    if (transport.sessionId) {
      sessions.delete(transport.sessionId);
    }
  };

  await server.connect(transport);
  await transport.handleRequest(req, res);
});

nodeServer.listen(9119, "127.0.0.1");
```

### AI Assistant Examples

Once connected to an AI assistant, you can use prompts like:

```text
Show me how to use syn-button in React
Give me the interface docs for syn-select
What token formats are available?
How do I set up Synergy for Vue?
Find icons related to search and filter
How do I migrate from davinci-textarea to Synergy?
What migration paths exist from Synergy 2 to Synergy 3?
List all available Synergy templates
```

## Developer Documentation

### Project Structure

```text
src/
├── bin/
│   ├── clean.js         # Removes dist/ before builds
│   └── start.ts         # CLI entry point for syn-mcp
├── server.ts            # MCP server creation and tool registration
├── tools/               # MCP tool implementations
│   ├── asset-info.ts
│   ├── asset-list.ts
│   ├── component-cluster-list.ts
│   ├── component-info.ts
│   ├── component-list.ts
│   ├── davinci-migration-info.ts
│   ├── davinci-migration-list.ts
│   ├── migration-info.ts
│   ├── migration-list.ts
│   ├── setup.ts
│   ├── styles-info.ts
│   ├── styles-list.ts
│   ├── template-info.ts
│   ├── template-list.ts
│   ├── token-info.ts
│   ├── tokens-list.ts
│   └── index.ts
├── transports/          # Transport factory and implementations
│   ├── http.ts
│   ├── stdio.ts
│   └── index.ts
└── utilities/           # Runtime config, metadata adapters, and CLI helpers
  ├── cli.ts
  ├── config.ts
  ├── davinci.ts
  ├── metadata.ts
  ├── migration.ts
  ├── rules.ts
  ├── server.ts
  └── index.ts
rules/                   # Markdown guidance files prepended to selected tool output
test/
├── e2e/                 # End-to-end MCP tests
├── fixtures/            # Self-signed TLS test certificates
├── unit/                # Unit tests
├── utilities/           # Test helpers
└── watermarks/          # Token watermark scenarios, baseline, and runner
```

There is no in-package metadata. This is now handled via `@synergy-design-system/metadata`.

### Available Scripts

The package currently exposes these development scripts:

```bash
# Compile TypeScript into dist/
pnpm build

# Remove dist/
pnpm clean

# Run all lint tasks
pnpm lint

# Lint the source tree with ESLint
pnpm lint:js

# Run the end-to-end test suite
pnpm test

# Run watermark measurements (report-only)
pnpm watermark:report

# Write/update local watermark baseline file
pnpm watermark:baseline

# Enforce watermark budgets and baseline regressions
pnpm lint:watermark

# Run tests in watch mode
pnpm test:watch

# Launch the MCP inspector
pnpm debug
```

### Token Watermarks

The MCP package includes token watermark verification for AI-facing tool responses.

- Scenarios are defined in `test/watermarks/scenarios.ts`.
- The runner is `test/watermarks/run.ts`.
- Baseline data is stored in `test/watermarks/baseline.latest-release.json`.
- The baseline records `encoding`, `generatedAt`, `source`, and per-scenario token counts.

Current tokenizer configuration:

- The runner uses a fixed tokenizer encoding: `o200k_base`.
- This keeps token measurements deterministic across runs.
- Baseline `encoding` is persisted to make provenance explicit and support future validation or migrations.

Recommended workflow:

1. Run `pnpm watermark:report` to generate a report.
2. Run `pnpm watermark:baseline` when intentionally refreshing baseline values.
3. Run `pnpm lint:watermark` in CI or pregate checks to enforce budgets.

### Development Workflow

1. Install dependencies with `pnpm install`.
2. Build the package with `pnpm build`.
3. Start the server with `npx @synergy-design-system/mcp`, `node dist/bin/start.js`, or `syn-mcp --config ./synergy-mcp.json`.
4. Run `pnpm test` for end-to-end verification.
5. Run `pnpm watermark:report` to review token watermark report output.
6. Run `pnpm lint` before shipping changes.

If the MCP server appears to be missing data, check the state of `@synergy-design-system/metadata` first. This package reads runtime content from the metadata package and does not generate component, token, style, or migration data itself.

### Setting up the MCP Inspector for local debugging

You may start the [mcp inspector](https://github.com/modelcontextprotocol/inspector) by issuing the command `pnpm debug`. This will automatically install the MCP inspector and launch it once downloaded. You can use the following configuration for the available transports:

#### STDIO transport

To test the STDIO transport, use the following values:

1. **Transport Type**: `STDIO`
2. **Command**: `node`
3. **Arguments**: PATH_TO_MCP_DOWNLOAD/dist/bin/start.js

#### HTTP transport

To test the http transport, use the following values:

1. Start the http mcp server (`node PATH_TO_MCP_DOWNLOAD/dist/bin/start.js --interface http`)
2. **Transport Type**: `Streamable HTTP`
3. **URL**: `http://localhost:9119/mcp`

### Architecture

The MCP server is intentionally small:

- `src/bin/start.ts` parses CLI arguments, loads optional runtime config, resolves overrides, and starts the selected transport.
- `src/transports/` contains the transport factory and runtime implementations for stdio and HTTP/HTTPS.
- `src/server.ts` creates the `McpServer` instance and registers all exported tools from `src/tools/index.ts`.
- Tool implementations in `src/tools/` call the public APIs of `@synergy-design-system/metadata` to retrieve data.
- Utilities in `src/utilities/` handle runtime config, MCP response shaping, DaVinci migration extraction, and package migration document loading.
- Markdown files in `rules/` provide assistant-facing response guidance for selected tools and frameworks.

### Data Sources

Runtime data is resolved from `@synergy-design-system/metadata`:

- Component docs and component lists come from metadata package component APIs.
- Setup guidance comes from metadata setup entities.
- DaVinci migrations are extracted from the setup content exposed by the metadata package.
- Synergy package migration docs are resolved from metadata store layer files.
- Tokens, styles, templates, and assets are all read from metadata package APIs at request time.

### Adding New Tools

To add a new tool:

1. Create a file in `src/tools/`.
2. Register the tool with `server.registerTool(...)`.
3. Export it from `src/tools/index.ts`.
4. If needed, add a matching guidance file under `rules/`.
5. Update this README so the public tool inventory stays aligned with the code.

Example:

```typescript
import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  createToolAnnotations,
  getRuntimeConfig,
  getToolRule,
  withErrorHandler,
} from "../utilities/index.js";

export const myTool = (server: McpServer) => {
  server.registerTool(
    "my-tool",
    {
      annotations: createToolAnnotations(),
      description: "Description of what the tool does",
      inputSchema: {
        param: z.string().describe("Parameter description"),
      },
      title: "My Tool",
    },
    async ({ param }) =>
      withErrorHandler(async () => {
        // Get the AI rules for this tool, used as a preface for LLM output quality.
        const aiRules = await getToolRule("my-tool");
        const content = `You provided ${param} as parameter`;
        return [aiRules, content];
      }),
  );
};
```

### Binary Distribution

The package exposes the `syn-mcp` binary via `package.json`:

```json
{
  "bin": {
    "syn-mcp": "./dist/bin/start.js"
  }
}
```

## License

MIT
