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

Developer interface:

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

```ts
import {
  findComponentsForTask,
  getComponentGuide,
  getIntentOptions,
  listIntentCategories,
  validateComponent,
} from "@synergy-design-system/metadata";

const includePhases = ["stable"] as const;

const categories = await listIntentCategories(
  metadataStoreOptions,
  { includePhases: [...includePhases] },
);

const componentGuide = await getComponentGuide(
  {
    component: "syn-button",
    framework: "react-web-components",
    includePhases: [...includePhases],
  },
  metadataStoreOptions,
);

const componentValidation = await validateComponent(
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

const confirmationLint = await validateComponent(
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

const taskRecommendations = await findComponentsForTask(
  {
    framework: "react-web-components",
    includePhases: [...includePhases],
    taskId: "action.submit",
  },
  metadataStoreOptions,
);

const intentOptions = await getIntentOptions(
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
const intentOptionsWithDiagnostics = await getIntentOptions(
  {
    framework: "react-web-components",
    includePhases: ["stable"],
    includeDiagnostics: true,
    intentId: "navigation.link-list.grouped",
  },
  metadataStoreOptions,
);
```

Implementation map:

- types.ts: intent domain types.
- domains/: domain-based folders, one per intent category (see structure below).
- categories.ts: root aggregator — collects all category definitions from domains.
- intents.ts: root aggregator — collects all intent definitions from domains.
- capabilities.ts: root aggregator — collects all capability mappings from domains.
- patterns.ts: root aggregator — collects all usage patterns from domains.
- registry.ts: thin facade that re-exports the four aggregated collections.
- resolution.ts: deterministic resolver and normalization helpers.
- Public API facade: ../public/domains/intent-policy.ts.

Folder structure:

```
intentPolicy/
  domains/
    action/
      category.ts        — IntentCategory definition
      capabilities.ts    — IntentCapability[] mappings
      intents.ts         — IntentDefinition[] entries
      patterns/
        primary.ts       — one pattern per file
        submit.ts
        reset.ts
        navigation.ts
        icon.ts
        grouped.ts
        index.ts         — assembles actionPatterns[]
      index.ts           — barrel: re-exports all domain exports
    assistance/          — same flat structure (patterns.ts instead of patterns/)
    disclosure/
    feedback/
    input/
    navigation/
    status/
    structure/
  categories.ts          — root aggregator
  capabilities.ts        — root aggregator
  intents.ts             — root aggregator
  patterns.ts            — root aggregator
  registry.ts
  resolution.ts
  types.ts
```

Adding a new domain:

1. Create a folder `domains/<name>/` with the following files:

   **category.ts** — defines the `IntentCategory`:

   ```ts
   import type { IntentCategory } from "../../types.js";
   export const myCategory: IntentCategory = {
     description: "...",
     id: "my-domain",
   };
   ```

   **capabilities.ts** — declares which targets support this category:

   ```ts
   import type { IntentCapability } from "../../types.js";
   export const myCapabilities: IntentCapability[] = [
     {
       categories: ["my-domain"],
       target: { id: "component:syn-foo", kind: "component", name: "syn-foo" },
     },
   ];
   ```

   **intents.ts** — lists the named intents in this domain:

   ```ts
   import type { IntentDefinition } from "../../types.js";
   export const myIntents: IntentDefinition[] = [
     {
       category: "my-domain",
       description: "...",
       id: "my-domain.action",
       userGoal: "...",
     },
   ];
   ```

   **patterns.ts** — defines the usage patterns (or use a `patterns/` sub-folder for larger domains):

   ```ts
   import type { IntentUsagePattern } from "../../types.js";
   export const myPatterns: IntentUsagePattern[] = [
     {
       description: "...",
       intent: "my-domain.action",
       target: { id: "component:syn-foo", kind: "component", name: "syn-foo" },
     },
   ];
   ```

   **index.ts** — barrel that re-exports all domain symbols:

   ```ts
   export { myCapabilities } from "./capabilities.js";
   export { myCategory } from "./category.js";
   export { myIntents } from "./intents.js";
   export { myPatterns } from "./patterns.js";
   ```

2. Register the domain in each of the four root aggregators (`categories.ts`, `capabilities.ts`, `intents.ts`, `patterns.ts`) by importing from `./domains/<name>/index.js` and spreading/appending the exported values into the existing arrays.

3. Run `pnpm build` in `packages/metadata` and verify the intent-policy tests still pass:
   ```sh
   node --experimental-strip-types --test 'test/intent-policy/*.test.mjs'
   ```
