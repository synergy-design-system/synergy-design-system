---
"@synergy-design-system/components": minor
"@synergy-design-system/mcp": minor
"@synergy-design-system/metadata": minor
---

feat: ✨ Adds a Synergy-styled chart legend and a legend preset helper (#1204)
- The *legendShow* preset helper makes it easier to show and position the legend.
- The config merge behavior has been updated: arrays are no longer fully replaced by the latest value. For example, a *series* array is now merged by index instead of being overwritten.
