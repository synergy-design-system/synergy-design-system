---
description: "Use when changing Synergy web components, public APIs, accessibility, browser tests, or generated Angular, React and Vue wrappers."
applyTo: "packages/components/**,packages/angular/**,packages/react/**,packages/vue/**"
---

# Components and framework integrations

See the [component README](../../packages/components/README.md), [contribution guidelines](../../CONTRIBUTING.md), and [metadata instructions](./metadata.instructions.md).

## Sources and public contracts

- Start with the affected component under `packages/components/src/components/`, its colocated tests/styles, existing stories, and its `packages/metadata/config/rules/component__syn-<name>.js` rules.
- Search results under `packages/metadata/data/**` may be copies of the component, styles, stories or package files. They are read-only for inspection, not implementation targets. Exclude that directory from manual edits and bulk replacements; change the canonical source and regenerate metadata instead.
- Use existing Lit patterns. Prefer documented slots and CSS parts where appropriate; use design tokens rather than hard-coded colors or spacing.
- Check keyboard interaction, focus handling, accessible names, roles/states and disabled behavior as applicable. Preserve supported SICK 2025 and SICK 2018 behavior, or explicitly document intentional differences.
- Keep API annotations/JSDoc in sync with actual behavior. The [manifest configuration](../../packages/components/custom-elements-manifest.config.js) collects component contracts; do not patch generated manifests.
- New or changed public APIs need accurate metadata and rule contents, not only a story showing the feature. Review defaults, allowed values, events, slots, methods, styling hooks, composition and limitations.

## Generation

The [component build](../../packages/components/scripts/build.js) builds the component package, then generates React, Angular and Vue wrappers from its custom-elements manifest.

| Framework | Read-only generated source paths                                                                                  | Generator                                                                                   |
| --------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| React     | All of `packages/react/src/**`                                                                                    | [React job](../../packages/components/scripts/jobs/react.js) and its `react/` helpers       |
| Vue       | All of `packages/vue/src/**`, including `chart.ts`, plugins and types                                             | [Vue job](../../packages/components/scripts/jobs/vue.js) and its `vue/` helpers             |
| Angular   | `packages/angular/components/**`, `directives/**`, `modules/**` and root `index.ts`; there is no `src/` directory | [Angular job](../../packages/components/scripts/jobs/angular.js) and its `angular/` helpers |

These source trees are removed and recreated by the generators. Inspection is allowed, but never manually edit, format, refactor or bulk-replace their contents, even to fix a framework-specific bug. Change the canonical component source/API annotations or the responsible generator/helper under `packages/components/scripts/`, then regenerate.
Do not add authored implementations inside these generated trees; regeneration would erase them.
Package-root configuration and documentation are not all generated. Inspect ownership before changing those files; do not extend the read-only rule to entire framework packages.

```bash
pnpm --filter @synergy-design-system/components run build
```

Inspect affected wrapper and manifest diffs, and rebuild the metadata package afterward when the public contract changes.

## Focused validation

From `packages/components`, run a named test group directly so the script's default group does not accidentally select the whole suite:

```bash
pnpm exec web-test-runner --config ./web-test-runner.config.js --group button
```

Replace `button` with the affected test filename's group. The [runner configuration](../../packages/components/web-test-runner.config.js) defines groups and browser selection.
Default browsers are Chromium, Firefox and WebKit. `BROWSERS=chromium` is a focused diagnostic, not equivalent to multi-browser validation; report any browser that could not run.
Use package `lint:js`/`lint:css` scripts for affected source categories and check framework consumers when wrapper behavior changes.
Add or update stories for new components and changed demonstrated behavior; preserve the existing Chromatic opt-in and screenshot-bundling patterns.
