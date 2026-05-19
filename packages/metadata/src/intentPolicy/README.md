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

Developer interface (experimental):

- The primary integration surface is the public facade at `../public/domains/intent-policy.ts`.
- Use these high-level APIs for application-facing guidance and validation:
  - `getComponentGuide`: returns supported intents, recommended usages, common misuses, and quick checks for one component.
  - `validateComponent`: validates one component usage against intent-policy rules and returns issues plus score.
  - `findComponentsForTask`: returns ranked component recommendations for one intent/task.
  - `getIntentOptions`: returns renderable options for one intent and framework.

Intent options behavior:

- `getIntentOptions` is strict by default for a provided `intentId`.
- By default, results focus on exact renderable target + intent matches.
- Category-level diagnostics for non-renderable targets are opt-in via `includeDiagnostics: true`.

Example usage (same queries as the static docs overview page):

```ts
import {
  experimental_findComponentsForTask,
  experimental_getComponentGuide,
  experimental_getIntentOptions,
  experimental_listIntentCategories,
  experimental_validateComponent,
} from "@synergy-design-system/metadata";

const includePhases = ["experimental"] as const;

const categories = await experimental_listIntentCategories(
  metadataStoreOptions,
  { includePhases: [...includePhases] },
);

const componentGuide = await experimental_getComponentGuide(
  {
    component: "syn-button",
    framework: "react-web-components",
    includePhases: [...includePhases],
  },
  metadataStoreOptions,
);

const componentValidation = await experimental_validateComponent(
  {
    component: "syn-button",
    framework: "react-web-components",
    includePhases: [...includePhases],
    intent: "action.submit",
    props: {
      href: "#",
    },
  },
  metadataStoreOptions,
);

const confirmationLint = await experimental_validateComponent(
  {
    component: "syn-dialog",
    framework: "react-web-components",
    includePhases: [...includePhases],
    intent: "structure.confirmation",
    structure: {
      component: "syn-dialog",
      children: [
        { component: "text", role: "content", text: "Content" },
        {
          component: "nav",
          role: "footer",
          slot: "footer",
          children: [
            {
              component: "syn-button",
              role: "cancelAction",
              props: { variant: "text" },
              text: "Abort",
            },
            {
              component: "syn-button",
              role: "confirmAction",
              props: { variant: "danger" },
              text: "Delete this!",
            },
          ],
        },
      ],
      role: "container",
    },
  },
  metadataStoreOptions,
);

const taskRecommendations = await experimental_findComponentsForTask(
  {
    framework: "react-web-components",
    includePhases: [...includePhases],
    taskId: "action.submit",
  },
  metadataStoreOptions,
);

const intentOptions = await experimental_getIntentOptions(
  {
    framework: "react-web-components",
    includePhases: [...includePhases],
    intentId: "navigation.link-list.grouped",
  },
  metadataStoreOptions,
);
```

Example with diagnostics enabled for intent options:

```ts
const intentOptionsWithDiagnostics = await experimental_getIntentOptions(
  {
    framework: "react-web-components",
    includePhases: ["experimental"],
    includeDiagnostics: true,
    intentId: "navigation.link-list.grouped",
  },
  metadataStoreOptions,
);
```

Implementation map:

- types.ts: intent domain types.
- categories/: category definitions and categories/index.ts aggregator.
- intents/: intent definitions and intents/index.ts aggregator.
- capabilities/: target capability mappings and capabilities/index.ts aggregator.
- patterns/: usage pattern definitions and patterns/index.ts aggregator.
- registry.ts: thin facade that re-exports aggregated categories, intents, capabilities, and patterns.
- resolution.ts: deterministic resolver and normalization helpers.
- Public API facade: ../public/domains/intent-policy.ts.
