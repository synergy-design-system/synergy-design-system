---
"@synergy-design-system/components": minor
"@synergy-design-system/mcp": minor
---

feat: ✨ Remove dependencies to `@shoelace-style/animation` and `@shoelace-style/translate` (#1242)

This release removes unneeded dependencies from the components package:

- `@shoelace-style/translate` has reached end of live. We forked the original code to make sure it receives updates in Synergy if needed.
- `@shoelace-style/animation` was never used internally.
