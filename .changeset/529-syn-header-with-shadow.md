---
"@synergy-design-system/angular": minor
"@synergy-design-system/components": minor
"@synergy-design-system/mcp": minor
"@synergy-design-system/react": minor
"@synergy-design-system/tokens": minor
"@synergy-design-system/vue": minor
---

feat: ✨ `<syn-header>` sticky behavior (#529)

`<syn-header>` now has a new `sticky` boolean property that can be used when a sticky header is needed, e.g. `<syn-header sticky></syn-header>`.
This adds `position: sticky`, as well as a small shadow that indicates that the header is stuck.
You can configure the `top` position via the new `--sticky-position` css property (defaults to `0` to make it stick to the top).
