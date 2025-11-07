---
"@synergy-design-system/assets": minor
"@synergy-design-system/components": minor
"@synergy-design-system/mcp": minor
---

feat: ✨ create migration iconset (#1078)

Added two new utilities that help with migrating from 2018 to the new 2025 theme:

`migrationLibrary`:

A small migration library, aimed to be a drop in replacement for the default system icon library.
Please have a look at [Synergies 2025 migration guide](https://synergy-design-system.github.io/?path=/docs/migration-to-synergy-3-0--docs) about how to use this.

`getIconMigrationName`:

A new low level utility that helps mapping 2018 icons to the new 2025 icon library.
This may be used if a custom icon library is in place.

docs: 📚 Make sure to use correct icons on both 2018 and 2025 stories (#1024)

Documentation now correctly toggles the icon sets, using the new `getIconMigrationName` underneath.
