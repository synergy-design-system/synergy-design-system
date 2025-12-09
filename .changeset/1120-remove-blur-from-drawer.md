---
"@synergy-design-system/components": minor
"@synergy-design-system/mcp": minor
---

feat: ✨ remove background blur from drawer (#1120)

After gathering community feedback, we chose to remove the background blur introduced in version `2.48.0` from `<syn-drawer>`.
This was done because users might loose context when for example using the `<syn-side-nav>`.
The blur effect is still used in `<syn-dialog>`. It may be removed entirely via setting `--syn-overlay-background-blur: 0;` if needed.
