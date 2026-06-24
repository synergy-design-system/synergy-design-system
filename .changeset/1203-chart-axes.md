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
- Provides a config callback API with preset methods like `axesShowSplitLines()`, `axesAddXLabelIcons()`, and `axesHideLabels()` as an alternative to raw ECharts configuration objects for the *config* property. These methods support both method chaining and sequential calling patterns for maximum flexibility.

