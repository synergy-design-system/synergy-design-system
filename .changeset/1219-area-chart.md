---
"@synergy-design-system/components": minor
"@synergy-design-system/metadata": minor
---

feat: ✨ Adds area chart support to <syn-chart> (#1219)

This release adds support for area and area range charts in `<syn-chart>`.

The chart configuration API now includes two new presets:

- `seriesArea` appends area series, while allowing individual series options to override the defaults.
- `seriesAreaRange` appends a filled range between lower and upper values using two stacked line series. It supports shared series options and formats tooltip values as the original range.
