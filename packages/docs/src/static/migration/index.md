# Synergy Migration Overview

This overview describes the main migration paths from Synergy version 2 to Synergy version 3 and the SICK 2025 theme.

If you are unsure which guide to follow, start here and choose the path that matches your current setup and your target.

---

## Migration Paths

### Path A: Stay on Synergy 2, move from SICK 2018 to SICK 2025

- **Current state:** Synergy **2.x**, theme **SICK 2018**
- **Target state:** Synergy **2.x**, theme **SICK 2025**
- **Use when:** You want the new SICK 2025 brand look but are not ready to upgrade to Synergy 3 yet.
- **Guide:** See [Path A: Upgrade from Synergy 2 (SICK 2018) to Synergy 2 (SICK 2025)](?path=/docs/migration-v2-sick-2018-to-v2-sick-2025--docs).

---

### Path B: Synergy 2.x + SICK 2018 → Synergy 3.x + SICK 2025 (recommended)

- **Current state:** Synergy **2.x**, theme **SICK 2018**
- **Target state:** Synergy **3.x**, theme **SICK 2025**
- **Use when:** You want to fully adopt Synergy 3 and the new SICK 2025 brand.
- **Guide:** See [Path B: Upgrade from Synergy 2 (SICK 2018) to Synergy 3 (SICK 2025)](?path=/docs/migration-v2-sick-2018-to-v3-sick-2025--docs).

---

### Path C: Synergy 2.x + SICK 2025 → Synergy 3.x + SICK 2025

- **Current state:** Synergy **2.x**, theme **SICK 2025** (already migrated using the v2 guide)
- **Target state:** Synergy **3.x**, theme **SICK 2025**
- **Use when:** You already use SICK 2025 on Synergy 2 and now want to upgrade to Synergy 3.
- **Guide:** See [Path C: Upgrade from Synergy 2 to Synergy 3 with SICK 2025](?path=/docs/migration-v2-sick-2025-to-v3-sick-2025--docs).

---

### Path D: Synergy 2.x + SICK 2018 → Synergy 3.x + SICK 2018 (stay on old theme)

- **Current state:** Synergy **2.x**, theme **SICK 2018**
- **Target state:** Synergy **3.x**, theme **SICK 2018**
- **Use when:** You want to benefit from Synergy 3, but must keep the SICK 2018 theme for now.
- **Guide:** See [Path D: Upgrade from Synergy 2 to Synergy 3 while staying on SICK 2018](?path=/docs/migration-v2-sick-2018-to-v3-sick-2018--docs).

---

## Package-Level Technical Details

Each path focuses on the _user perspective_ and high-level steps.
For package-specific breaking changes and code changes, always consult the dedicated package guides:

- Components: [@synergy-design-system/components BREAKING CHANGES](?path=/docs/packages-components-breaking-changes--docs)
- Tokens: [@synergy-design-system/tokens BREAKING CHANGES](?path=/docs/packages-tokens-breaking-changes--docs)
- Assets: [@synergy-design-system/assets BREAKING CHANGES](?path=/docs/packages-assets-breaking-changes--docs)
- Styles: [@synergy-design-system/styles BREAKING CHANGES](?path=/docs/packages-styles-breaking-changes--docs)

Use these together with the path-specific guides to plan and execute your migration.
