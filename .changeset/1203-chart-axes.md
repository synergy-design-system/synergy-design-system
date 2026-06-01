---
"@synergy-design-system/components": minor
"@synergy-design-system/metadata": minor
---

feat: ✨ chart axes mvp (#1203)

This release introduces the first chart axis MVP for syn-chart.

New features:
- Adds and registers a Synergy ECharts light theme as default for syn-chart.
- Introduces a middleware-style chart config API with `enhanceConfig`, `compose`, and `mergeConfigs`.
- Adds predefined axis/grid modifiers: `showHorizontalGridLines`, `showVerticalGridLines`, `showGridLines`, `hideXAxisValues`, `hideYAxisValues`, and `hideAxisValues`.
- Adds icon label helpers for axes: `xAxisWithIconLabels(...)` and `yAxisWithIconLabels(...)`.
- Exports new chart config utilities via `components/chart/configs/index`.

