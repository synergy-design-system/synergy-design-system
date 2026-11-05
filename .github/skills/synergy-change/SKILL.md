---
name: synergy-change
description: "Use when implementing or fixing Synergy features across components, styles, tokens, framework wrappers, metadata, component rules, MCP, or documentation. Verify source ownership, metadata coverage, semantic rule accuracy, generation and focused regression checks."
---

# Implement a Synergy change end to end

Use the [repository guide](../../../AGENTS.md) and the scoped instructions linked there. Keep the workflow proportional to the change; do not rebuild unrelated packages or invent metadata changes for purely internal tooling.

## 1. Map the change

- Read the affected package README, scripts, implementation, tests and nearby prior art.
- Identify canonical sources, generated outputs and affected consumers. Check the current worktree and preserve unrelated edits.
- Treat all search matches under `packages/metadata/data/**` as read-only generated records or source copies. You may inspect them, but trace them to canonical sources before editing; exclude the directory from manual edits, formatting, refactoring and bulk replacements. Only metadata generation may update it.
- Framework sources are read-only too: all `packages/react/src/**` and `packages/vue/src/**` (including chart, plugins and types), and Angular's `components/**`, `directives/**`, `modules/**` and root `index.ts` under `packages/angular/`. Angular has no `src/`. Never manually edit, format, refactor, bulk-replace or add authored code in these generated trees. Package-root configuration and documentation require separate ownership checks.
- Assess metadata impact for every feature, including styles, tokens, templates and framework integrations. Find the collector or layer responsible for exposing it; record why metadata is unaffected if applicable.
- For component work, read the corresponding `packages/metadata/config/rules/component__syn-*.js` before implementation. Missing rules for a new component are work to complete, not permission to skip guidance.

## 2. Establish the contract

Compare implementation, rules, tests, manifest annotations and stories. Identify:

- Added, removed or changed properties/attributes, allowed values and defaults.
- Events and payloads, slots, methods, CSS parts and custom properties.
- Accessibility and interaction behavior, composition rules, limitations and supported brand differences.
- Statements that already conflict with the behavior being changed.

Resolve task-related discrepancies using implementation evidence and intended requirements. Ask about ambiguous behavior rather than manufacturing a rule. Do not fix unrelated discrepancies without agreement.

## 3. Implement and update authored sources

- Make the implementation change with focused regression tests.
- Update affected examples, API annotations, component rules and other metadata configuration/collectors.
- Ensure rules cover the actual capability and meaningful usage constraints, not just syntactically valid fields.
- Follow token and accessibility conventions. Update or add Storybook stories where the behavior is demonstrated.
- Edit generator inputs, not generated manifests, wrappers, metadata layers or built documentation.

## 4. Generate in dependency order

- Build affected upstream packages/manifest outputs.
- Run `pnpm --filter @synergy-design-system/components run build` to regenerate framework sources after changing component sources or the responsible generators/helpers under `packages/components/scripts/`. The build removes and recreates the generated source trees; inspect the resulting contracts rather than patching them afterward.
- Build metadata after its inputs are current. Use the Storybook scraping build only when examples need refreshing.
- Rebuild affected MCP or documentation consumers after metadata, as appropriate.
- Inspect generated diffs. They must represent the intended feature without unrelated source rewrites.

## 5. Verify the contract

- Run the smallest relevant tests, type/build and lint checks listed in package guidance. Expand only when needed.
- Validate metadata schemas and affected metadata API behavior; schema success alone is not semantic coverage.
- Inspect the resulting metadata entry and generated rules: confirm the new capability is discoverable, old claims remain accurate, and related references resolve.
- Check affected consumers receive that contract, such as a framework binding, MCP response, knowledge HTML or AI markdown.
- For documentation routing changes, validate real links under both `/` and `/knowledge/`. Preserve the exhaustive URL-index purpose of `llms-full.txt`.

## 6. Deliver

Follow contribution guidance for changesets when the change should be released. Do not publish, deploy or commit without authorization.
Summarize implementation, metadata/rule coverage, generated consumer impacts, and exact validation commands/results. Explicitly identify skipped checks and blockers; do not describe schema-only checks as proof of behavioral correctness.
