# Handling breaking changes between major versions

This guide holds the required information for migrating from one major version of `@synergy-design-system/mcp` to the next.

> ⚠️ Migrations **must** always be done from one major version to the next to prevent issues (e.g. with types and property changes)
> This means when moving from `@synergy-design-system/mcp` v1.x to v3.x,
> you will **have to apply** the changes from v1.x to v2.x first!

---

## Version 5.0 (Upcoming, no release date yet!)

<h3 id="mcp-sdk-v2">Programmatic integrations now use MCP TypeScript SDK v2</h3>

**Associated Ticket(s)**:

- [#1389](https://github.com/synergy-design-system/synergy-design-system/issues/1389)

**Reason**:

The server now uses the split v2 SDK packages instead of `@modelcontextprotocol/sdk`. Although MCP tool names, arguments, and content remain unchanged, the exported TypeScript API is not backward-compatible with SDK v1. `createServer()` returns a v2 `McpServer`, and the exported tool registration functions accept a v2 `McpServer`.

**Migration Steps**:

- If you only launch `syn-mcp` through an editor, CLI, or container, no configuration migration is required. Existing startup commands, configuration files, package entrypoints, and legacy MCP connections remain supported.
- If you import `createServer()` or tool registration functions into your own application, migrate the server objects and SDK types used with these APIs to `@modelcontextprotocol/server`. Do not pass SDK v1 server objects to these functions or type the returned server as an SDK v1 `McpServer`.
- Replace the removed `.tool()`, `.prompt()`, and `.resource()` methods with `.registerTool()`, `.registerPrompt()`, and `.registerResource()`, using explicit configuration objects. Wrap tool `inputSchema` and prompt `argsSchema` definitions with `z.object(...)`.
- For custom transport wiring, import `StdioServerTransport` from `@modelcontextprotocol/server/stdio`. The Node HTTP transport is now `NodeStreamableHTTPServerTransport` from `@modelcontextprotocol/node`.
- If migrating your own SDK client code, use `@modelcontextprotocol/client`, with `StdioClientTransport` imported from `@modelcontextprotocol/client/stdio`. Existing remote clients do not need an SDK upgrade merely to connect using the legacy protocol.
- Declare the new packages that your application directly imports, and remove `@modelcontextprotocol/sdk` only after its remaining usages have been migrated. Do not rely on compatibility casts between v1 and v2 server objects.

**Example (before)**:

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createServer } from "@synergy-design-system/mcp";
import { z } from "zod";

const server: McpServer = createServer();
server.tool("greet", { name: z.string() }, async ({ name }) => ({
  content: [{ type: "text", text: `Hello, ${name}!` }],
}));
```

**Example (after)**:

```typescript
import { McpServer } from "@modelcontextprotocol/server";
import { createServer } from "@synergy-design-system/mcp";
import { z } from "zod";

const server: McpServer = createServer();
server.registerTool(
  "greet",
  {
    inputSchema: z.object({ name: z.string() }),
  },
  async ({ name }) => ({
    content: [{ type: "text", text: `Hello, ${name}!` }],
  }),
);
```

---

<h3 id="modern-protocol-v5">Modern HTTP requests no longer have MCP sessions</h3>

**Associated Ticket(s)**:

- [#1389](https://github.com/synergy-design-system/synergy-design-system/issues/1389)

**Reason**:

The bundled stdio and HTTP/HTTPS serving paths now support protocol revision `2026-07-28` alongside legacy revisions such as `2025-11-25`. Modern HTTP is stateless and does not issue an `mcp-session-id` header. This changes log correlation when a client opts into the modern protocol, but does not remove legacy session support.

**Migration Steps**:

- Keep existing editor and client configurations unless you want to enable the modern protocol. Clients using the legacy `initialize` handshake continue to work unchanged; installing SDK v2 alone does not switch a connection to the new protocol.
- For TypeScript SDK v2 clients, enable modern negotiation with `versionNegotiation: { mode: 'auto' }` in the `Client` options. This allows negotiation of the modern protocol with fallback for legacy servers.
- Update log-processing assumptions for modern HTTP: the existing `sessionId` field contains a generated `request-<UUID>` for each request, not a reusable MCP session ID. Do not group these IDs into a user, chat, or multi-request session. Anonymous modern HTTP requests cannot reliably be correlated by user without an additional stable identifier.
- Legacy HTTP logs retain MCP session IDs, and stdio logs retain the `stdio` identifier. Configuration for logging and compression remains unchanged.
- HTTP/HTTPS continues to use `/mcp`. The `x-synergy-metadata-version` and `x-synergy-metadata-build-date` response headers remain available for both protocol paths when metadata information is loaded successfully.

---

## Version 4.0

<h3 id="metadata-source-intent">Intent-Tools and Resources no longer experimental</h3>

**Associated Ticket(s)**:

- [#1334](https://github.com/synergy-design-system/synergy-design-system/issues/1334)

**Reason**:

The MCP intent tools are stable for quite a while now.

**Migration Steps**:

- Remove the `experimentalFeatures` section from your custom config.

**Example (before)**:

```json
{
  "experimentalFeatures": {
    "intentTools": true
  }
}
```

**Example (after)**:

```json
{}
```

---

## Version 3.0

<h3 id="metadata-source-v3">MCP data source moved to the metadata package</h3>

#### ⚠️ The MCP server no longer reads from the local metadata folder structure

**Associated Ticket(s)**:

- [#1241](https://github.com/synergy-design-system/synergy-design-system/issues/1241)

**Reason**:

The MCP server now reads data from `@synergy-design-system/metadata` instead of the previously bundled `packages/mcp/metadata` filesystem layout. This aligns MCP data access with the new shared metadata source and removes duplicated metadata build artifacts.

**Migration Steps**:

- Stop relying on files under `packages/mcp/metadata/**`.
- If you had custom scripts or checks against `metadata/checksum.txt` or `metadata/static/**`, migrate them to use MCP tools at runtime instead.
- Update any internal assumptions about on-disk metadata paths, because those paths are no longer part of the MCP package contract.

---

<h3 id="davinci-tool-rename-v3">DaVinci migration tool names changed</h3>

#### ⚠️ DaVinci migration endpoints were renamed for consistency

**Associated Ticket(s)**:

- [#1241](https://github.com/synergy-design-system/synergy-design-system/issues/1241)

**Reason**:

Tool naming was standardized to the `*-info` and `*-list` convention used across the MCP server.

**Migration Steps**:

- Replace `davinci-migrate-list` with `davinci-migration-list`.
- Replace `davinci-migrate-component` with `davinci-migration-info`.

**Example (before)**:

```json
{
  "tool": "davinci-migrate-component",
  "arguments": {
    "component": "davinci-button"
  }
}
```

**Example (after)**:

```json
{
  "tool": "davinci-migration-info",
  "arguments": {
    "component": "davinci-button"
  }
}
```

---

<h3 id="setup-tool-replacement-v3">framework-info and font-info were removed</h3>

#### ⚠️ Setup guidance is now served through a single setup endpoint

**Associated Ticket(s)**:

- [#1241](https://github.com/synergy-design-system/synergy-design-system/issues/1241)

**Reason**:

Framework and package setup content is now consolidated under one endpoint to simplify discovery and keep behavior consistent.

**Migration Steps**:

- Replace `framework-info` calls with `setup` and set `package` to `react`, `vue`, `angular`, or `components`.
- Replace `font-info` calls with `setup` and set `package` to `fonts`.
- Use `includeLimitations` when you need known caveats in the response.

**Example (before)**:

```json
{
  "tool": "framework-info",
  "arguments": {
    "framework": "react"
  }
}
```

```json
{
  "tool": "font-info",
  "arguments": {}
}
```

**Example (after)**:

```json
{
  "tool": "setup",
  "arguments": {
    "package": "react"
  }
}
```

```json
{
  "tool": "setup",
  "arguments": {
    "package": "fonts"
  }
}
```

---

<h3 id="version-tool-removal-v3">version endpoint was removed</h3>

#### ⚠️ MCP clients can no longer call a dedicated version tool

**Associated Ticket(s)**:

- [#1241](https://github.com/synergy-design-system/synergy-design-system/issues/1241)

**Reason**:

The dedicated `version` tool was removed from the MCP tool surface. It did not provide any value over the `version` string that is already included in the MCP servers surface. Usage information will get drawn from tool information.

**Migration Steps**:

- Remove usage of the `version` tool in your MCP client prompts and flows.
- If you need package versioning in scripts, read it from package metadata outside the MCP tool layer.

---

## Version 2.0

<h3 id="fs-layout-v2">Default iconset in asset-info</h3>

#### ⚠️ Introducing a new filesystem structure

**Associated Ticket(s)**:

- [#1149](https://github.com/synergy-design-system/synergy-design-system/issues/1149)

**Reason**:

With SICK 2025 being the new default in Synergy Version 3, we chose to also alter the defaults of the `asset-info` endpoint. It will now use SICK 2025 icons per default.

**Migration Steps**:

If you want to get the old icons, use one of the following terms for the `iconset` parameter in `asset-info`: `legacy, v2, synergy2018, brand2018, sick2018`. This will make sure to call the endpoint with the old Synergy 2018 icon set.

<!-- USE THIS AS A TEMPLATE FOR ADDITIONAL MIGRATION STEPS

<h3 id="change-VERSION">`Change`</h3>

#### ⚠️ DESCRIBE THE CHANGE HERE

**Associated Ticket(s)**:

- [#1](https://github.com/synergy-design-system/synergy-design-system/issues/1)

**Reason**:

DESCRIBE THE REASON FOR THIS CHANGE

**Migration Steps**:

MIGRATION IN TEXT FORM

**Example (before)**:

```javascript
EXAMPLE BEFORE THE CHANGE
```

**Example (after)**:

```javascript
EXAMPLE AFTER THE CHANGE
```

---

-->
