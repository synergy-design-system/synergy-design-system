---
"@synergy-design-system/components": minor
"@synergy-design-system/metadata": minor
---

feat: ✨ Adds bar series support to <syn-chart> (#1212)

This release adds support for the `bar` series type in `<syn-chart>` to create single, grouped, and stacked bar charts.

The chart configuration API now includes two new presets:

- `seriesBar` appends bar series while preserving individual series options for single and grouped bar charts.
- `seriesBarStacked` appends stacked bar series with a shared stack name and recommendations like borders and label defaults. Optional `stackName` and `orientation` settings customize the stack grouping and label placement. Individual series options override the defaults.
