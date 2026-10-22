---
"@synergy-design-system/components": minor
"@synergy-design-system/metadata": minor
---

feat: ✨ Adds area chart support to <syn-chart> (#1219)

This release adds support for area and area range charts in `<syn-chart>` and adapts the Synergy styling for ECharts `markArea`, `markLine`, and `markPoint` annotations.

The chart configuration API now includes two new presets:

- `seriesArea` appends area series, while allowing individual series options to override the defaults.
- `seriesAreaRange` appends a filled range between lower and upper values using two stacked line series. It supports shared series options and formats tooltip values as the original range.

The chart now applies the correct Synergy styling when initialized with the dark theme:

- Fixes charts initialized with the dark theme so the correct styling is applied from the start.
