---
"@synergy-design-system/mcp": major
"@synergy-design-system/metadata": major
---

major: 💥 Metadata and MCP adjustments (#1334)

This release adds some breaking changes to the Metadata and MCP packages:

- Paths in the local filesystem do not include `:` anymore because of Windows incompatibilities (breaking!).
- The Metadata Intent Engine now is no longer experimental
