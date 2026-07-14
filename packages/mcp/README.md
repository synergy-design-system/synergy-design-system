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
- `--compression <none|toon>`: Response compression mode (default: `none`; experimental)

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

# Enable experimental toon format compression for responses
syn-mcp --compression toon
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

  // Response compression mode (experimental!)
  // "none" (default): No compression
  // "toon": Encode structured data to compact toon text format
  "compression": "none",

  // Experimental feature toggles
  "experimentalFeatures": {
    // Enables experimental intent policy tools
    "intentTools": true,
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
      // interface = markdown API overview,
      // rules = markdown usage, design, and accessibility guidance.
      // Note that examples and interface are only available
      // for vanilla components at the moment.
      "layer": "full",
    },
    "intentCategoriesList": {
      // Default phases for intent-categories-list
      "includePhases": ["experimental"],
    },
    "intentComponentGuide": {
      // Framework profile used when omitted in tool call
      "framework": "vanilla",
      "includePhases": ["experimental"],
    },
    "intentComponentValidate": {
      "framework": "vanilla",
      "includePhases": ["experimental"],
    },
    "intentOptions": {
      "framework": "vanilla",
      "includeDiagnostics": false,
      "includePhases": ["experimental"],
      "maxAlternatives": 5,
    },
    "intentTaskRecommendations": {
      "framework": "vanilla",
      "includePhases": ["experimental"],
      "maxAlternatives": 5,
    },
    "tokenInfo": {
      // If you are preferring scss, use "sass" here
      "type": "css",
    },
  },
}
```

#### Enabling Experimental Intent Endpoints

Intent tools are experimental and disabled by default.
Enable them explicitly with:

```jsonc
{
  "experimentalFeatures": {
    "intentTools": true,
  },
}
```

When enabled, these additional features become available:

#### Resources

- `synergy://intent-categories/list`

#### Tools

- `intent-categories-list`
- `intent-component-guide`
- `intent-component-validate`
- `intent-task-recommendations`
- `intent-options`

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

## Docker and Kubernetes

The MCP package is container-ready and can be deployed as an HTTP service in Kubernetes.

### Container runtime contract

- Protocol: HTTP
- Port: `9119` (override with `PORT`)
- MCP endpoint: `/mcp`
- Default config path: `/config/synergy-mcp.json`
- TLS, certificates, ingress, and DNS are handled outside the container (for example via Kubernetes ingress/controllers).

### Build image from release tarballs

The Docker image uses packed release artifacts for Synergy packages to avoid npm propagation timing issues.

For repeatable local builds, use the helper script in `packages/mcp/docker`:

```bash
./packages/mcp/docker/build-local.sh /path/to/custom/ca.crt synergy-design-system/mcp:local
```

The script:

- checks that `colima`, `docker`, and `pnpm` exist
- validates that the CA file exists
- installs the CA into Colima
- restarts Colima and verifies Docker base-image access
- builds and packs the required Synergy packages
- builds the MCP Docker image with the CA mounted as a BuildKit secret

If your network does not require a custom CA, you can still build manually.

Manual fallback:

```bash
cd packages/mcp

pnpm --dir ../.. --filter @synergy-design-system/assets build
pnpm --dir ../.. --filter @synergy-design-system/metadata build
pnpm --dir ../.. --filter @synergy-design-system/mcp build

mkdir -p artifacts

pnpm --dir ../.. --filter @synergy-design-system/assets pack --pack-destination packages/mcp/artifacts
pnpm --dir ../.. --filter @synergy-design-system/metadata pack --pack-destination packages/mcp/artifacts
pnpm --dir ../.. --filter @synergy-design-system/mcp pack --pack-destination packages/mcp/artifacts

docker build -t synergy-design-system/mcp:3.20.0 .
```

If your network uses TLS interception (for example a corporate firewall), pass your CA certificate as a BuildKit secret during build:

```bash
docker build \
  --progress=plain \
  --secret id=corp_ca,src=/path/to/ca.crt \
  -t synergy-design-system/mcp:3.20.0 \
  .
```

The `corp_ca` file is mounted only for the npm install step and is not persisted in image layers.

### Run with injected config

```bash
docker run \
  -p 9119:9119 \
  -v "$(pwd)/synergy-mcp.json:/config/synergy-mcp.json:ro" \
  synergy-design-system/mcp:3.20.0
```

The container starts MCP using:

```bash
syn-mcp --interface http --host 0.0.0.0 --port 9119 --config /config/synergy-mcp.json
```

If the config file is not mounted, the server starts with built-in defaults and still listens on HTTP.

### Kubernetes config injection

Mount a `ConfigMap` or `Secret` at `/config` so the container can read `/config/synergy-mcp.json`.

Example mount shape:

```yaml
volumeMounts:
  - name: mcp-config
    mountPath: /config
    readOnly: true
```

For production, pin deployments to immutable version tags (for example `synergy-design-system/mcp:3.20.0`) instead of `latest`.

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

## Available Resources

The MCP server currently registers 5 stable resources by default. Resources expose static, read-only data that does not change during server runtime. Clients that support MCP resources can read them directly without calling a tool.

When `experimentalFeatures.intentTools` is enabled, 1 additional intent resource is registered.

Resource identifier reference (exact values used by the server):

- `synergy://components/list` → name: `component-list`
- `synergy://assets/list` → name: `asset-list`
- `synergy://component-clusters/list` → name: `component-clusters-list`
- `synergy://styles/list` → name: `styles-list`
- `synergy://templates/list` → name: `templates-list`
- `synergy://intent-categories/list` → name: `intent-categories-list` (experimental)

### 1. `synergy://components/list`

**Name:** `component-list`

**MIME type:** `application/json`

**Description:** A sorted JSON array of all available component names in the Synergy Design System.

**Example:**

```json
["syn-button", "syn-checkbox", "syn-dialog", ...]
```

### 2. `synergy://assets/list`

**Name:** `asset-list`

**MIME type:** `application/json`

**Description:** All available icon sets in the Synergy Design System, grouped by theme. Each entry includes `id`, `name`, `since`, `theme`, and `iconCount`.

**Example:**

```json
{
  "default": [
    {
      "iconCount": 512,
      "id": "current",
      "name": "Current",
      "since": "1.0.0",
      "theme": "default"
    }
  ]
}
```

### 3. `synergy://component-clusters/list`

**Name:** `component-clusters-list`

**MIME type:** `application/json`

**Description:** All available component clusters in the Synergy Design System. Each entry includes `id`, `name`, and `description`.

**Example:**

```json
[
  {
    "id": "components-by-tag/structure",
    "name": "Structure",
    "description": "Layout and structure components"
  }
]
```

### 4. `synergy://styles/list`

**Name:** `styles-list`

**MIME type:** `application/json`

**Description:** A sorted JSON array of all available style names in the Synergy Design System.

**Example:**

```json
["animation", "breakpoints", "spacing", ...]
```

### 5. `synergy://templates/list`

**Name:** `templates-list`

**MIME type:** `application/json`

**Description:** A sorted JSON array of all available template names in the Synergy Design System.

**Example:**

```json
["app-shell", "dashboard", "form", ...]
```

### 6. `synergy://intent-categories/list` (experimental)

**Name:** `intent-categories-list`

**MIME type:** `application/json`

**Description:** Available intent categories in the Synergy intent policy layer.

**Registration:** Only available when `experimentalFeatures.intentTools` is `true`.

**Example:**

```json
{
  "data": [
    {
      "description": "User actions and commands",
      "id": "action",
      "label": "Action"
    }
  ]
}
```

## Available Tools

The MCP server currently registers 17 stable tools by default.

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

**Note:** The corresponding MCP resource uses the pluralized name `component-clusters-list` at URI `synergy://component-clusters/list`.

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
- `layer` (string, optional): `full`, `examples`, `interface`, or `rules`. Defaults to the runtime config value, which is `full` by default. `examples` and `interface` are currently only available for vanilla components. `rules` returns component usage, design, and accessibility guidance.

**Example prompts:**

- "How do I use syn-button in React?"
- "Show me the interface docs for syn-dialog"
- "Give me examples for syn-card"
- "Show me the rules for syn-accordion"

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

### 17. `create-spritesheet`

**Description:** Creates a SVG sprite sheet for a provided set of icons. Only works with the Synergy 2025 icon set.

**Parameters:**

- `icons` (array, required): The icons to include in the sprite sheet. Must be valid icon keys from the Synergy 2025 icon set.

**Example prompts:**

- "Create a spritesheet containing these icons: star, home, settings"
- "Generate a custom Synergy 2025 sprite sheet for my selected icons"
- "Build an SVG sprite sheet from this icon list"

### Experimental Tools (Intent Policy)

The following endpoints are experimental and are only registered when `experimentalFeatures.intentTools` is set to `true`.

### 18. `intent-categories-list` (experimental)

**Description:** List available intent categories in the intent policy layer.

**Parameters:**

- `includePhases` (array, optional): Intent phases to include. Defaults to runtime config `tools.intentCategoriesList.includePhases` (`["experimental"]` by default).

**Example prompts:**

- "List intent categories"
- "Show experimental intent categories"

### 19. `intent-component-guide` (experimental)

**Description:** Answer the question: What can I do with a component in the intent system?

**Parameters:**

- `component` (string, required): Component tag, for example `syn-button`.
- `framework` (string, optional): `react-wrapper`, `react-web-components`, `angular`, `vue`, or `vanilla`. Defaults to runtime config `tools.intentComponentGuide.framework`.
- `includePhases` (array, optional): Defaults to runtime config `tools.intentComponentGuide.includePhases`.

**Example prompts:**

- "What can I do with syn-button?"
- "Show intent guide for syn-button in react-web-components"

### 20. `intent-component-validate` (experimental)

**Description:** Answer the question: Do I use a component correctly for a specific intent?

**Parameters:**

- `component` (string, required): Component tag, for example `syn-button`.
- `intent` (string, required): Intent id, for example `action.submit`.
- `markup` (string, required): Template/markup source to lint. The tool derives structure internally.
- `framework` (string, optional): Defaults to runtime config `tools.intentComponentValidate.framework`.
- `includePhases` (array, optional): Defaults to runtime config `tools.intentComponentValidate.includePhases`.

**Example prompts:**

- "Do I use syn-button right for action.submit?"
- "Validate this syn-button markup for action.submit: <syn-button type=\"submit\" variant=\"filled\">Send</syn-button>"

### 21. `intent-task-recommendations` (experimental)

**Description:** Answer the question: What does Synergy provide for a specific task intent?

**Parameters:**

- `taskId` (string, required): Intent id representing the task.
- `framework` (string, optional): Defaults to runtime config `tools.intentTaskRecommendations.framework`.
- `includePhases` (array, optional): Defaults to runtime config `tools.intentTaskRecommendations.includePhases`.
- `maxAlternatives` (number, optional): Defaults to runtime config `tools.intentTaskRecommendations.maxAlternatives`.
- `preferredTargets` (array, optional): Preferred target ids.
- `avoidTargets` (array, optional): Target ids to avoid.
- `content` (string, optional): Optional snippet content.

**Example prompts:**

- "What does Synergy provide to submit a form?"
- "Recommend components for action.submit"

### 22. `intent-options` (experimental)

**Description:** Answer the question: What are my renderable options for a specific intent?

**Parameters:**

- `intentId` (string, required): Intent id to resolve.
- `framework` (string, optional): Defaults to runtime config `tools.intentOptions.framework`.
- `includePhases` (array, optional): Defaults to runtime config `tools.intentOptions.includePhases`.
- `includeDiagnostics` (boolean, optional): Defaults to runtime config `tools.intentOptions.includeDiagnostics`.
- `maxAlternatives` (number, optional): Defaults to runtime config `tools.intentOptions.maxAlternatives`.
- `content` (string, optional): Optional preview content.

**Example prompts:**

- "What are my renderable options for navigation.link-list.grouped?"
- "Show intent options for action.submit"

## Available Prompts

The MCP server currently registers 2 prompts.

### 1. `explain-component-rules`

**Description:** Explains the usage rules, design guidelines, and accessibility considerations for a Synergy component.

**Parameters:**

- `component` (string, required): The component name. Must start with `syn-`, for example `syn-button`.

**Example prompts:**

- "Explain the rules for syn-button"
- "What are the design and accessibility guidelines for syn-dialog?"
- "Give me the usage guidance for syn-accordion"

### 2. `create-spritesheet`

**Description:** Generates a task-specific instruction prompt for creating an SVG sprite sheet from icon usage found in a folder, including registration and usage guidance.

**Parameters:**

- `name` (string, optional): The name of the generated sprite sheet. If not provided, the sprite sheet will be registered as the default library.
- `path` (string, required): The path that should be searched for occurrences of `syn-icon` and `syn-icon-button` elements. Will search the project root if omitted.

**Example prompts:**

- "/mcp.synergy.create-spritesheet"
- "Create a sprite sheet prompt for icons used in src/components"
- "Generate create-spritesheet instructions for apps/demo with name app-icons"
- "Help me produce a spritesheet from icon usage in my UI folder"

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
Explain the rules for syn-accordion
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
├── server.ts            # MCP server creation, tool, prompt and resource registration
├── middleware/          # Tool execution middleware pipeline
│   ├── compose.ts       # composeMiddlewares (reduceRight composition)
│   ├── compression.ts   # withCompressionMiddleware (experimental)
│   ├── error-handler.ts # withErrorHandlingMiddleware
│   ├── logging.ts       # withToolLoggingMiddleware
│   ├── types.ts         # ToolMiddleware, ToolMiddlewareContext, RawToolHandler, WithErrorHandlerOptions
│   └── index.ts         # Middleware module entrypoint
├── prompts/             # MCP prompt implementations
│   ├── component-rules.ts
│   ├── create-spritesheet.ts
│   └── index.ts
├── resources/           # MCP resource implementations (static, read-only data)
│   ├── component-list.ts
│   ├── asset-list.ts
│   ├── component-cluster-list.ts
│   ├── intent-categories-list.ts
│   ├── styles-list.ts
│   ├── templates-list.ts
│   └── index.ts
├── tools/               # MCP tool implementations
│   ├── asset-info.ts
│   ├── asset-list.ts
│   ├── component-cluster-list.ts
│   ├── component-info.ts
│   ├── component-list.ts
│   ├── create-spritesheet.ts
│   ├── davinci-migration-info.ts
│   ├── davinci-migration-list.ts
│   ├── intent-categories-list.ts
│   ├── intent-component-guide.ts
│   ├── intent-component-validate.ts
│   ├── intent-options.ts
│   ├── intent-task-recommendations.ts
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
├── types/               # Shared type definitions
└── utilities/           # Runtime config, metadata adapters, intent defaults, and CLI helpers
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
- `src/server.ts` creates the `McpServer` instance and registers all exported tools from `src/tools/index.ts` and all exported resources from `src/resources/index.ts`.
- `src/server.ts` applies feature-flag gating generically: exports whose factory names start with `intent` are only registered when `experimentalFeatures.intentTools` is enabled.
- Tool implementations in `src/tools/` call the public APIs of `@synergy-design-system/metadata` to retrieve data.
- Resource implementations in `src/resources/` expose static, read-only data that does not change during server runtime. Resources bypass the tool middleware pipeline entirely — no compression, logging, or error wrapping is applied.
- Utilities in `src/utilities/` handle runtime config, MCP response shaping, DaVinci migration extraction, and package migration document loading.
- Markdown files in `rules/` provide assistant-facing response guidance for selected tools and frameworks.

#### Middleware Pipeline

Every tool call passes through a composed middleware stack defined in `src/middleware/`. Middlewares are applied with `composeMiddlewares` using `reduceRight`, meaning execution order is **left-to-right** (first entry in the array wraps outermost, last entry wraps closest to the handler).

Current stack (in declaration order):

1. `withErrorHandlingMiddleware` — outermost; catches any uncaught error and returns a structured error response.
2. `withToolLoggingMiddleware` — records duration, token count, and success/failure metadata. Exits early (skipping token counting) when logging is disabled via config.
3. `withCompressionMiddleware` — innermost; encodes structured data to toon text format when compression is `toon`. Disabled by default.

**Note:** Compression runs before logging so token counts reflect the compressed payload size.

All middlewares share the `ToolMiddleware<TArgs>` type from `src/middleware/types.ts`:

```typescript
type ToolMiddleware<TArgs extends Record<string, unknown>> = (
  next: RawToolHandler<TArgs>,
  context: ToolMiddlewareContext,
) => RawToolHandler<TArgs>;
```

The `ToolMiddlewareContext` carries the **full runtime config** (`McpRuntimeConfig`), so any middleware can read its own config key without additional plumbing:

```typescript
type ToolMiddlewareContext = {
  config: McpRuntimeConfig; // e.g. context.config.logging, context.config.compression
  options: WithErrorHandlerOptions;
  toolName: string;
};
```

To add a new middleware (e.g., compression), create `src/middleware/compression.ts`, export it from `src/middleware/index.ts`, and add it to the `middlewareStack` in `src/utilities/metadata.ts`.

#### Response Compression (Experimental)

The MCP server can compress tool response payloads using the optional `@toon-format/toon` library. Compression encodes structured data into a compact text format while leaving string entries unchanged.

**Installation:**

```bash
npm install @toon-format/toon
```

**Usage:**

```bash
syn-mcp --compression toon
```

**Behavior:**

- `compression: 'none'` (default): No compression
- `compression: 'toon'`: Non-string entries encoded to toon format; strings pass through unchanged
- If toon library not installed: gracefully disabled (non-fatal)
- Token counts reflect compressed payload size when logging enabled

**Notes:**

- Experimental feature; may be subject to changes
- Disabled by default; explicitly enable via `--compression toon`

### Data Sources

Runtime data is resolved from `@synergy-design-system/metadata`:

- Component docs and component lists come from metadata package component APIs.
- Setup guidance comes from metadata setup entities.
- DaVinci migrations are extracted from the setup content exposed by the metadata package.
- Synergy package migration docs are resolved from metadata store layer files.
- Tokens, styles, templates, and assets are all read from metadata package APIs at request time.

### Adding New Resources

To add a new resource:

1. Create a file in `src/resources/`.
2. Register the resource with `server.registerResource(...)` using a `synergy://` URI.
3. Export it from `src/resources/index.ts`.
4. Update this README so the public resource inventory stays aligned with the code.

Example:

```typescript
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { listThings } from "@synergy-design-system/metadata";

const RESOURCE_URI = "synergy://things/list";

export const thingsListResource = (server: McpServer) => {
  server.registerResource(
    "things-list",
    RESOURCE_URI,
    {
      description:
        "A list of all available things in the Synergy Design System.",
      mimeType: "application/json",
      title: "Things list",
    },
    async _uri => {
      const things = await listThings();
      const names = things.data.map(t => t.name).toSorted();
      return {
        contents: [
          {
            mimeType: "application/json",
            text: JSON.stringify(names, null, 2),
            uri: RESOURCE_URI,
          },
        ],
      };
    },
  );
};
```

**Note:** Resource callbacks receive the request URI and return a `ReadResourceResult` directly. They do **not** go through the tool middleware pipeline (no compression, logging, or error wrapping).

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
