# Working in Synergy

Synergy is a pnpm monorepo. Read [CONTRIBUTING.md](./CONTRIBUTING.md) and the affected package README before changing behavior. Use the runtime requirements and pinned package manager in [package.json](./package.json); do not copy version numbers into new guidance.

## Find the right package

| Area                                            | Sources and guidance                                                                                                                                                           |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Web components                                  | [packages/components](./packages/components), [component instructions](./.github/instructions/components.instructions.md)                                                      |
| Component rules, metadata collection and APIs   | [packages/metadata](./packages/metadata), [metadata instructions](./.github/instructions/metadata.instructions.md)                                                             |
| Interactive stories and static knowledge site   | [packages/docs](./packages/docs), [packages/static-docs-page](./packages/static-docs-page), [documentation instructions](./.github/instructions/documentation.instructions.md) |
| Executable metadata consumers                   | [packages/mcp](./packages/mcp)                                                                                                                                                 |
| Framework integrations                          | [packages/angular](./packages/angular), [packages/react](./packages/react), [packages/vue](./packages/vue)                                                                     |
| Visual foundations                              | [packages/tokens](./packages/tokens), [packages/styles](./packages/styles), [packages/assets](./packages/assets), [packages/fonts](./packages/fonts)                           |
| Integration demos, E2E tests and shared tooling | [packages/_private](./packages/_private)                                                                                                                                       |

Read the linked scoped instructions when work crosses those areas, even if your agent does not automatically load path-scoped instructions.
For cross-package implementation work, use the [synergy-change skill](./.github/skills/synergy-change/SKILL.md).

## Shared contract

- **Treat `packages/metadata/data/**` as read-only generated output.** You may inspect it, but it contains generated records and copies of source files, not editable originals. Never manually edit, format, refactor or bulk-replace files there, even when a search finds an apparent component source. Locate and change the canonical source outside this directory; only the metadata generator may update these copies.
- **Framework implementation sources are also read-only generated output:** all of `packages/react/src/**` and `packages/vue/src/**` (including chart entry points), plus Angular's `packages/angular/components/**`, `directives/**`, `modules/**` and root `index.ts`. Angular has no `src/` directory. Inspect these files, but never manually edit, format, refactor or bulk-replace them. Change component sources or generators under [packages/components/scripts](./packages/components/scripts), then run `pnpm --filter @synergy-design-system/components run build`. Package-root configuration and documentation are not all generated; check ownership rather than treating entire framework packages as generated.
- Every feature must be assessed for metadata coverage, not just component changes. Public capabilities and usage guidance must reach the metadata package so MCP, the knowledge site and RAG consumers receive the same contract. Explain when a change has no metadata impact.
- Read affected component rules in `packages/metadata/config/rules/component__syn-*.js` before editing. Check their actual claims against implementation, tests and usage examples; schema validity alone is insufficient.
- Keep documented properties, events, slots, methods, CSS parts, custom properties, defaults, limitations and supported brand behavior accurate. Do not invent capabilities to fill documentation gaps.
- Edit canonical sources and run their generators. Do not hand-edit `dist/`, `dist.testrunner/`, generated metadata `data/`, or generated wrapper files. Inspect generator ownership before changing unfamiliar output.
- Reuse existing patterns and design tokens, preserve accessibility, and add regression coverage for behavior changes.
- Keep changes focused. Preserve unrelated work and inspect generated diffs for unintended changes.

## Validation and delivery

Run commands from the repository root unless package guidance says otherwise:

- `pnpm --filter <package-name> run <script>` runs a package's configured script.
- `pnpm --filter '<package-name>...' run build` builds a package and its workspace dependencies when prerequisite outputs are needed.
- Root `pnpm build` and `pnpm lint` are broad checks; start with the smallest relevant package checks.
- Read package scripts before selecting tests; there is no universal root test command.

Build implementation and manifest outputs before regenerating affected metadata, then validate affected consumers. Report exact commands and results, including skipped checks and environment failures.
Follow the contribution guidelines for changesets and compatibility; do not manually bump release versions or edit generated changelogs.
Do not publish, deploy, commit or push without a request to do so.
