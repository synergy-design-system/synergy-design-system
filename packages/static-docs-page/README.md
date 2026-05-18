# @synergy-design-system/static-docs-page

Astro-based static documentation site for the Synergy Design System.

This package is intended as a lightweight, crawlable source for Retrieval-Augmented Generation (RAG) and other documentation consumption scenarios. It renders component, template and style metadata into static routes that are easy to index.

## Routes

| Route            | Description                                                  |
| ---------------- | ------------------------------------------------------------ |
| `/`              | Home page with a brief introduction to the site              |
| `/component/:id` | Detail page for every component in the Synergy design system |
| `/template/:id`  | Detail page for every template                               |
| `/style/:id`     | Detail page for every CSS utility style                      |
| `/changelog/:id` | Full changelog for a specific package                        |

## Page content

### Component pages (`/component/:id`)

Each component page renders the following sections from the canonical metadata:

- **Header** — component name, status badge (`stable` / `deprecated` / `experimental`), `since` version badge, and icon-button links to the Figma and Storybook documentation pages.
- **Description** — summary text from the component metadata.
- **Related components and links** — linked list of related components and templates derived from the rules layer.
- **Rules** — structured usage guidelines broken down into:
  - Common use cases
  - Named usage guideline categories (e.g. behaviour, content, styling)
  - Accessibility notes
- **Component interface** — full API reference rendered as tables inside a `syn-accordion`:
  - Slots
  - Attributes / properties with type, default value, and reflection status
  - CSS parts
  - CSS custom properties
  - Events
  - Methods
- **Footer** — metadata generation timestamp and source reference.

### Template pages (`/template/:id`)

Each template page renders:

- **Header** — template name and metadata generation timestamp.
- **Description** — summary from the template metadata.
- **Code samples** — fenced code blocks extracted from the template's markdown example layer, grouped by section heading and displayed with syntax highlighting.

### Style pages (`/style/:id`)

Mirrors the template page structure:

- **Header** — style name and timestamp.
- **Description** — summary from the style metadata.
- **Code samples** — fenced code blocks extracted from the style's markdown example layer.

### Changelog pages (`/changelog/:id`)

- `/changelog/:id` — full version history for a single package, rendered directly from the `CHANGELOG.md` file in that package. Packages covered:
  `components`, `styles`, `tokens`, `assets`, `fonts`, `react`, `angular`, `vue`, `mcp`, `metadata`.

The changelog files are imported at build time via `import.meta.glob` — no extra data pipeline required.

## Navigation

The left sidebar is generated at build time from metadata:

- **Components** — all Synergy components, active section opens automatically when a component route is active.
- **Templates** — all templates.
- **Styles** — all CSS utility styles.
- **Changelogs** — one entry per package, linking to its full changelog page.

The currently active item is highlighted. The sidebar uses `syn-side-nav` and `syn-nav-item` from the Synergy component library.

## Header meta-navigation

The top-right corner includes:

- Link to Storybook developer documentation.
- Link to Figma design documentation.
- Link to the GitHub repository.
- A "Made with love" icon button with a tooltip that shows the current versions of `@synergy-design-system/components` and `@synergy-design-system/metadata` embedded at build time.

## Data source

The site reads data exclusively from `@synergy-design-system/metadata`:

- `listComponents()` / `getComponentMetadata(id, { includeInterfaceSnapshot: true })`
- `listTemplates()` / `getTemplateMetadata(id)` / `getDataForTemplate(id)`
- `listStyles()` / `getStyleMetadata(id)` / `getDataForStyle(id)`

## Local development

```bash
# From the repository root
pnpm install
pnpm --filter @synergy-design-system/static-docs-page dev
```

Open the URL shown in the terminal (typically `http://localhost:4321`).

If you see a `504 Outdated Optimize Dep` error in the browser console after changing dependencies or Astro config, restart the dev server once with `--force`:

```bash
pnpm --filter @synergy-design-system/static-docs-page astro dev --force
```

## Build

```bash
# Standard build (site hosted at /)
pnpm --filter @synergy-design-system/static-docs-page run build

# Build for subdirectory hosting (see STATIC_DOCS_BASE below)
STATIC_DOCS_BASE=/static-docs pnpm --filter @synergy-design-system/static-docs-page run build
```

Output is written to `dist/`.

## Preview

```bash
pnpm --filter @synergy-design-system/static-docs-page run preview
```

## `STATIC_DOCS_BASE`

By default the site is built to be served from the root of a domain (`/`).
When you need to host it under a subdirectory (e.g. `https://example.com/static-docs/`) set the `STATIC_DOCS_BASE` environment variable at build time:

```bash
STATIC_DOCS_BASE=/static-docs pnpm run build
```

### How it works

`astro.config.mjs` reads `STATIC_DOCS_BASE`, normalises it to always have leading and trailing slashes (e.g. `/static-docs/`), and passes it to Astro's `base` option.
Astro then:

1. Prefixes all generated asset URLs (`/_astro/…`, CSS, JS bundles) with the base path.
2. Exposes the resolved value as `import.meta.env.BASE_URL` to every page and component at build time.

The layout, navigation component, and all internal cross-links use `import.meta.env.BASE_URL` instead of root-absolute paths, so every href and asset reference works correctly whether the site is served from `/` or from a subdirectory.

| Value           | Resulting `base` |
| --------------- | ---------------- |
| _(not set)_     | `/`              |
| `/`             | `/`              |
| `static-docs`   | `/static-docs/`  |
| `/static-docs`  | `/static-docs/`  |
| `/static-docs/` | `/static-docs/`  |

## Package scripts

| Script    | Description                |
| --------- | -------------------------- |
| `dev`     | Start Astro dev server     |
| `build`   | Build static output        |
| `preview` | Preview the built site     |
| `astro`   | Run the Astro CLI directly |

## Project structure

```text
src/
  components/
    MetaNavigation.astro   header meta-nav links and version tooltip
    Navigation.tsx         left sidebar nav generated from metadata
  layouts/
    Layout.astro           global app shell, assets, icon library setup
  pages/
    index.astro            home page
    component/
      [id].astro           component detail pages
    template/
      [id].astro           template detail pages
    style/
      [id].astro           style detail pages
    changelog/
      [id].astro           per-package changelog pages (sourced from CHANGELOG.md)
  styles/
    global.css             global layout styles
  utils/
    metadataStoreOptions   shared metadata store configuration
```

## Notes for RAG usage

- All routes are pre-rendered to static HTML; no JavaScript is required to read the content.
- Metadata-backed rendering ensures docs stay aligned with the current Synergy source packages.
- Pages are deterministic and suitable for crawling or file-based ingestion pipelines.
- Next logical steps: sitemap generation, OpenGraph tags, and structured-data markup for richer RAG context.
