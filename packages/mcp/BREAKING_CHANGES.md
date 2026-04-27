# Handling breaking changes between major versions

This guide holds the required information for migrating from one major version of `@synergy-design-system/mcp` to the next.

> ⚠️ Migrations **must** always be done from one major version to the next to prevent issues (e.g. with types and property changes)
> This means when moving from `@synergy-design-system/mcp` v1.x to v3.x,
> you will **have to apply** the changes from v1.x to v2.x first!

---

## Version 3.0

<h3 id="metadata-source-v3">BREAKING! MCP data source moved to the metadata package</h3>

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

<h3 id="davinci-tool-rename-v3">BREAKING! DaVinci migration tool names changed</h3>

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

<h3 id="setup-tool-replacement-v3">BREAKING! framework-info and font-info were removed</h3>

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

<h3 id="version-tool-removal-v3">BREAKING! version endpoint was removed</h3>

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

<h3 id="fs-layout-v2">BREAKING! Default iconset in asset-info</h3>

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
