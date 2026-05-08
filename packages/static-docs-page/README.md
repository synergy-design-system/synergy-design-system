# @synergy-design-system/static-docs-page

Astro-based static documentation site for the Synergy Design System.

This package is intended as a lightweight, crawlable source for Retrieval-Augmented Generation (RAG) and other documentation consumption scenarios. It renders component metadata into static routes that are easy to index.

## What exists today

- Astro app with React integration
- Shared Synergy tokens, styles, component styles, and fonts wired in globally
- A left navigation generated from metadata
- Static component detail pages generated at build time
- Initial home page placeholder

## Routes

- `/`
	- Currently renders a simple placeholder page
- `/component/:id`
	- Static route generated from metadata component ids
	- Displays component name, status, optional summary/since, tags, and component dependencies

## Data source

The site reads data from `@synergy-design-system/metadata`:

- `listComponents()`
- `getComponentMetadata(componentId, { includeInterfaceSnapshot: true })`
- `listTemplates()`
- `listStyles()`

Navigation sections for Templates and Styles are already present and populated from metadata, but currently rendered as disabled entries.

## Local development

From the repository root:

```bash
pnpm install
pnpm --filter @synergy-design-system/static-docs-page dev
```

Then open the local Astro URL shown in the terminal (typically `http://localhost:4321`).

## Build and preview

From this package folder:

```bash
pnpm run _build
pnpm run preview
```

Or from the repository root:

```bash
pnpm --filter @synergy-design-system/static-docs-page run _build
pnpm --filter @synergy-design-system/static-docs-page run preview
```

## Package scripts

- `dev`: start Astro dev server
- `_build`: build static output via Astro
- `preview`: preview the built site
- `astro`: run Astro CLI directly

## Project structure

```text
src/
	components/
		Navigation.tsx
	layouts/
		Layout.astro
	pages/
		index.astro
		component/
			[id].astro
	styles/
		global.css
```

## Notes for RAG usage

- The generated component pages are deterministic and static, which makes them suitable for indexing.
- Metadata-backed rendering ensures docs stay aligned with the current Synergy source packages.
- Next logical steps are adding richer content blocks (usage, API details, examples) and generating sitemap/feed artifacts for ingestion pipelines.
