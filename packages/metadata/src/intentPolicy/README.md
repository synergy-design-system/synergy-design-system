## Intent Policy Layer

This folder contains the TypeScript-only source for contextual target intent handling.

Naming standard:
- Architecture: Intent Policy Layer
- Process: Intent Resolution
- Output: Usage Pattern / Preset

Core definitions:
- Category:
	A high-level domain bucket that groups related intents by purpose, for example action, input, or navigation.
- Intent:
	A contextual user goal within a category, for example action.submit or input.selection.multiple. Intents explain why a component is used in a given situation.
- Capability:
	A target-to-category mapping that declares what an entity can do in principle. Targets can be components, style entities, or utility/class selectors.
- Usage Pattern / Preset:
	The resolved implementation guidance for a target plus intent pair. A pattern can include prop presets, class presets, structural composition, roles, and notes.

Target model:
- Intent policy uses neutral targets (`target`) for all capabilities and patterns.

Boundary rules:
- This feature is opt-in and query-driven.
- It does not mutate canonical component metadata objects.
- It does not write or persist anything into generated data artifacts.

Implementation map:
- types.ts: intent domain types.
- categories/: category definitions and categories/index.ts aggregator.
- intents/: intent definitions and intents/index.ts aggregator.
- capabilities/: target capability mappings and capabilities/index.ts aggregator.
- patterns/: usage pattern definitions and patterns/index.ts aggregator.
- registry.ts: thin facade that re-exports aggregated categories, intents, capabilities, and patterns.
- resolution.ts: deterministic resolver and normalization helpers.
- Public API facade: ../public/domains/intent-policy.ts.
