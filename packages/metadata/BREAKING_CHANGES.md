# Handling breaking changes between major versions

This guide holds the required information for migrating from one major version of `@synergy-design-system/metadata` to the next.

> ⚠️ Migrations **must** always be done from one major version to the next to prevent issues (e.g. with types and property changes)
> This means when moving from `@synergy-design-system/metadata` v1.x to v3.x,
> you will **have to apply** the changes from v1.x to v2.x first!

---

## Version 5.0 (Upcoming, no release date yet!)

<h3 id="metadata-tool-intent-categories-list-v5">Deprecated tool `intent-categories-list`</h3>

**Associated Ticket(s)**:

- [#1390](https://github.com/synergy-design-system/synergy-design-system/issues/1390)

**Reason**:

The `intent-categories-list` tool only exposes top-level intent categories. It does not provide the exact registered intent IDs required by validation, rendering-option, and recommendation tools. This encouraged clients and AI agents to construct or guess intent IDs, resulting in unnecessary failed calls before discovering valid intents.

The replacement `intent-discover` tool supports hierarchical discovery through one endpoint:

- Call it without a category to list registered intent categories.
- Call it with an exact category ID to list the registered intents in that category.
- Reuse the returned intent IDs verbatim with other intent tools.

`intent-categories-list` remains available for backwards compatibility throughout version 4. It will be removed with version 5. The `synergy://intent-categories/list` MCP resource is not deprecated.

**Migration Steps**:

- Replace calls to `intent-categories-list` with `intent-discover`.
- First call `intent-discover` without `category` when the category is unknown.
- Call `intent-discover` again with a returned category ID to retrieve exact intent IDs.
- Pass the returned intent ID to `intent-component-validate`, `intent-options`, or `intent-task-recommendations`. Do not construct intent IDs from category names.

**Example (before)**:

```json
{
  "name": "intent-categories-list",
  "arguments": {
    "includePhases": ["experimental"]
  }
}
```

**Example (after)**:

```json
{
  "name": "intent-discover",
  "arguments": {
    "includePhases": ["experimental"]
  }
}
```

---

## Version 4.0

<h3 id="metadata-source-v4">File renames for static files in `data`</h3>

**Associated Ticket(s)**:

- [#1334](https://github.com/synergy-design-system/synergy-design-system/issues/1334)

**Reason**:

When using Windows, it is now discouraged to read files that include a `:` character.
As we used this extensively, local file system access was broken on some Windows machines.
We chose to exchange the `:` with a new delimiter `__`.

**Migration Steps**:

- Substitute all direct file reads to the core `data` that include `:` with `__`. For example `data/layers/examples/component/component:syn-accordion.md` is now located at `data/layers/examples/component/component__syn-accordion.md`.

---

<h3 id="metadata-source-intent">Intent-Tools are no longer experimental</h3>

**Associated Ticket(s)**:

- [#1334](https://github.com/synergy-design-system/synergy-design-system/issues/1334)

**Reason**:

The metadata intent functionality is now stable. Therefore, we removed the `experimental_` prefix from all the APIs.

**Migration Steps**:

- Remove the `experimental_` prefix from all imports.

**Example (before)**:

```typescript
import {
  experimental_findComponentsForTask,
  experimental_getComponentGuide,
  experimental_getIntentOptions,
  experimental_listIntentCategories,
  experimental_validateComponent,
} from "@synergy-design-system/metadata";

import type {
  ExperimentalComponentGuideQuery,
  ExperimentalComponentGuideResult,
  ExperimentalFindComponentsForTaskQuery,
  ExperimentalFindComponentsForTaskResult,
  ExperimentalIntentOptionsQuery,
  ExperimentalIntentOptionsResult,
  ExperimentalIntentCategoryQueryOptions,
  ExperimentalIntentListQueryOptions,
  ExperimentalIntentPhaseQueryOptions,
  ExperimentalIntentRenderQuery,
  ExperimentalIntentResolutionQuery,
  ExperimentalValidateComponentQuery,
  ExperimentalValidateComponentResult,
} from "@synergy-design-system/metadata";
```

**Example (after)**:

```typescript
import {
  findComponentsForTask,
  getComponentGuide,
  getIntentOptions,
  listIntentCategories,
  validateComponent,
} from '@synergy-design-system/metadata';

import type {
  ComponentGuideQuery,
  ComponentGuideResult,
  FindComponentsForTaskQuery,
  FindComponentsForTaskResult,
  IntentOptionsQuery,
  IntentOptionsResult,
  IntentCategoryQueryOptions,
  IntentListQueryOptions,
  IntentPhaseQueryOptions,
  IntentRenderQuery,
  IntentResolutionQuery,
  ValidateComponentQuery,
  ValidateComponentResult,
};
```

---

<!-- USE THIS AS A TEMPLATE FOR ADDITIONAL MIGRATION STEPS

<h3 id="change-VERSION">`Change`</h3>

#### ⚠️ DESCRIBE THE CHANGE HERE

**Associated Ticket(s)**:

- [#1](https://github.com/synergy-design-system/synergy-design-system/issues/1)

**Reason**:

DESCRIBE THE REASON FOR THIS CHANGE

**Migration Steps**:

MIGRATION IN TEXT FORM

**Example (before)**:

```javascript
EXAMPLE BEFORE THE CHANGE
```

**Example (after)**:

```javascript
EXAMPLE AFTER THE CHANGE
```

---

-->
