---
"@synergy-design-system/components": minor
"@synergy-design-system/metadata": minor
"@synergy-design-system/angular": minor
"@synergy-design-system/react": minor
"@synergy-design-system/vue": minor
"@synergy-design-system/mcp": minor
---

feat: ✨ chart axes mvp (#1203)

This release introduces the first chart axis MVP for syn-chart.

New features:
- Adds and registers a Synergy ECharts light theme as default for syn-chart.
- Introduces a middleware-style chart config API with `enhanceConfig`, modifiers via `.with(...)` and named presets via `.usePreset(...)`.
- Adds predefined axes modifier like e.g.`withAxesSplitLines`, `withXAxisLabelIcons(...)` ...
- Adds presets like e.g. `axes.split-lines`, `axes.x-label-icons`, ...
- Exports chart config utilities via `components/chart/configs/index`.

