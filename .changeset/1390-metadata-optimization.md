---
"@synergy-design-system/metadata": minor
---

feat: ✨ metadata optimization (#1390)

This release adds new features and adjustments to the Synergy metadata package:

- Added the `--skills` option to `install-skills`, allowing developers to install `component`, `templates`, and `intents` skills individually or in comma-separated combinations. Without this option, all skills are installed.
- Added the `/synergy-intent-policy` local skill for discovering intents, generating implementation starting points, and reviewing code without MCP. Install it with `npx @synergy-design-system/metadata install-skills --path .github/skills --skills intents`; the existing skills are available as `/synergy-component` and `/synergy-templates`.
- Added `intent-discover` for hierarchical intent discovery. Call it without a category to list categories, then pass an exact category ID to retrieve registered intent IDs for validation, rendering options, and recommendations.
- Added public metadata APIs and types for shared intent-policy documents: `getIntentPolicyDocument`, `getIntentPolicyDocuments`, `IntentPolicyDocument`, and related variant/preview types.
- Extended skill generation. Generated skills report both the metadata package version and the Synergy version they represent.
- Added the presence-only `required` intent property rule through `IntentRequiredPropRule`, allowing policies to require a property without enforcing a placeholder value through `requiredEquals`.
- Added more rules for the distinction between `readonly` and `disabled` to all form fields.
