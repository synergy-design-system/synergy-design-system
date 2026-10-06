---
"@synergy-design-system/mcp": minor
---

feat: ✨ mcp optimization (#1390)

This release adds new features and adjustments to the Synergy MCP Server:

- Added `intent-discover` for hierarchical intent discovery. Call it without a category to list categories, then pass an exact category ID to retrieve registered intent IDs for validation, rendering options, and recommendations.
- Added structured recovery for unknown components, intents, styles, templates, migration filenames, and DaVinci migration components. Relevant detail tools now preserve the submitted value, report that no operation was performed, and return authoritative values from their corresponding discovery tools or resources.
- Deprecated the `intent-categories-list` tool in favor of `intent-discover`. It remains available for compatibility until a future major release.
- Standardized titles and descriptions across MCP tools and resources to clarify when to use each endpoint, what it returns, and which discovery endpoint supplies exact identifiers.
