---
description: "Use when changing Storybook, static knowledge documentation, AI markdown routes, llms.txt, RAG indexes, or documentation deployment."
applyTo: "packages/docs/**,packages/static-docs-page/**,.github/workflows/publish-docs.yml"
---

# Storybook and knowledge documentation

Read the [Storybook README](../../packages/docs/README.md), [static docs README](../../packages/static-docs-page/README.md), and [deployment workflow](../workflows/publish-docs.yml).

- Storybook provides interactive examples. The static knowledge site projects canonical metadata and package changelogs into crawlable HTML and machine-readable routes.
- Fix inaccurate contracts in their canonical component/metadata sources, not in generated documentation. Update related component rules and regenerate metadata before checking documentation consumers.
- Framework examples must not be fixed by hand-editing generated framework implementations: all React/Vue `src/**` and Angular `components/**`, `directives/**`, `modules/**` and root `index.ts` are read-only generated sources. Fix the component or its generator under `packages/components/scripts/`, then regenerate; see the [component instructions](./components.instructions.md) for boundaries. Authored stories and demos remain the place for usage examples.
- Maintain the distinction between normative component contracts and explanatory guidance. Examples must not introduce unsupported APIs.
- Follow existing Chromatic opt-in and screenshot-bundling patterns when adding stories.

## Discovery and hosting

- Storybook's `public/llms.txt` points to the knowledge site; its manager and preview heads expose discovery links. `ai-policy` is supplementary and nonstandard, not a guarantee of tool support.
- Knowledge `llms-full.txt` is intentionally an exhaustive URL index for RAG ingestion, not consolidated documentation. Preserve this format and meaning.
- Include an AI route only when it actually exists. Guidance pages without AI markdown should still be discoverable through HTML.
- Use the existing base-path/URL helpers. Support root hosting and `STATIC_DOCS_BASE=/knowledge`; do not hard-code `/knowledge` into reusable route generation.
- `STATIC_DOCS_SITE_URL` is the origin only, without the base path. The deployment workflow sets it for absolute discovery URLs.
- Do not add search-engine submission or indexing work unless requested.

## Validation

Build affected documentation after its upstream outputs are refreshed:

```bash
pnpm --filter @synergy-design-system/docs run build
pnpm --filter @synergy-design-system/static-docs-page run build
STATIC_DOCS_SITE_URL=https://synergy-design-system.github.io STATIC_DOCS_BASE=/knowledge pnpm --filter @synergy-design-system/static-docs-page run build
```

For routing/discovery changes, check both root and subdirectory output. Verify concrete URLs in LLM indexes and the sitemap map to built files; route templates containing `{id}` are patterns, not fetchable pages.
Check HTML/AI representations of affected contracts, not only whether the build passed.
For Storybook discovery changes, verify the static file is copied and links occur in the built manager and preview HTML heads. Changes to live behavior or appearance also need browser validation.
