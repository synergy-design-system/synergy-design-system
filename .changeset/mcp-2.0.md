---
"@synergy-design-system/mcp": major
---

feat: 💥 Enhanced migration support and SICK 2025 defaults

This release enhances the MCP server with improved migration guidance and updates default iconset to SICK 2025.

**Key Changes:**
- **Breaking:** Migration endpoint now requires package specification - the migration endpoint has been updated to accept a package parameter (e.g., components, styles, assets, tokens) to provide package-specific breaking changes documentation
- **Breaking:** Default iconset changed to SICK 2025 - asset info endpoint now returns SICK 2025 iconset information by default instead of SICK 2018

**Migration Steps:**
- Update any calls to the migration endpoint to specify the target package
- Review asset integrations as the default iconset has changed to SICK 2025

**New tool `migration-list`
- Provides a new tool that gives information about available migrations for packages (e.g. for components how to migrate from v2 sick2018 to v3 sick2025)
