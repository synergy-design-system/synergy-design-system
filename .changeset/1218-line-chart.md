---
"@synergy-design-system/components": minor
"@synergy-design-system/mcp": minor
"@synergy-design-system/metadata": minor
---

feat: ✨ Adds line series support to `<syn-chart>` (#1218)

This release introduces support for line charts and extends the chart configuration API with new presets and improved merge capabilities.

#### New theming support
- line charts
- data zoom control
- tooltips

#### Preset API enhancements
- `seriesLine(...)` for creating line series
- `tooltipShow(...)` for enabling tooltips

#### Improved configuration merging
Enhanced the configuration merge behavior with an optional array merge strategy.

- Arrays continue to be merged by index by default.
- `seriesLine(...)` now uses `arrayStrategy: 'append'`, ensuring that new series are appended to the existing series array rather than merged by index.
