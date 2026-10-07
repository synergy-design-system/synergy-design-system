# Synergy Component Skill

This skill provides an offline, copyable reference for implementing, adapting, and reviewing Synergy Design System components.

> All files in this skill are generated from Synergy metadata and must not be edited manually.

## Version Alignment

This skill was generated against Synergy version `{{SYNERGY_VERSION}}`.

Compare this version with the resolved version of `@synergy-design-system/components` used by the project. Check the relevant project or workspace `package.json` for the dependency, then use the lockfile or installed package metadata to resolve ranges or workspace references. Do not use the version of a framework wrapper, tokens, or metadata package as the components version. If the project uses a wrapper, check its resolved components dependency when available.

If the resolved components version differs, component APIs, usage rules, or examples may differ. Regenerate or reinstall the skills after changing Synergy versions.

If the installed Synergy version is unknown, do not infer a mismatch.

If a known installed version differs from `{{SYNERGY_VERSION}}`:

1. Start with one sentence naming both versions and noting possible outdated guidance.
2. Continue using the available skill content.
3. Verify version-sensitive APIs against local project documentation where possible.
4. State remaining uncertainty and do not claim unverified compatibility.

## When to Use

- You are developing with Synergy components locally
- You want component guidance without running MCP
- You are generating, adapting, or reviewing code that uses Synergy components

## Structure

Each component includes three facets:

- `components/<component-name>/interface.md`
- `components/<component-name>/rules.md`
- `components/<component-name>/examples.md`

### `interface.md`

The component's API reference: properties, attributes, slots, methods, events, and type information. Use this for understanding what a component can do technically.

### `rules.md`

Usage guidelines, accessibility considerations, common use cases, and best practices. Use this for understanding _when_ and _how_ to use a component correctly.

> Rules are authoritative within the design system.
> Best practices are recommendations, not enforceable constraints, and may require extension based on product, platform, or regulatory needs.

Preserve the strength expressed by each statement: requirements and prohibitions are constraints, while recommendations such as "should" and "prefer" remain guidance. Do not turn best practices into mandatory constraints or assign a severity that the documentation does not establish.

### `examples.md`

Code samples showing common patterns and variations. Use this for understanding typical usage patterns.

## How to Use

### Companion Skills

This skill remains usable on its own. Consult companion skills only when installed and relevant to the task:

- [Synergy intent policy](../synergy-intent-policy/SKILL.md): Guidance for selecting targets and constraints from user goals.
- [Synergy templates](../synergy-templates/SKILL.md): Starting points for multi-component forms, layouts, and interaction patterns.

If a companion skill is unavailable, continue with this reference and available project documentation. State unresolved policy or composition uncertainty; missing documentation does not mean that a component is unavailable. Read only the relevant companion pages, not the entire catalog.

### Authority and Precedence

- `interface.md` defines the documented technical API. An available API does not imply that every use of it is recommended.
- `rules.md` defines design-system usage constraints and guidance. It does not introduce APIs absent from the documented interface.
- `examples.md` is illustrative and does not introduce additional APIs or override the interface or rules.

If an example conflicts with the documented interface or rules, do not follow the conflicting example. If the interface and rules appear to conflict, report the inconsistency and leave the conflicting detail unresolved rather than inventing an API or silently reinterpreting a rule.

### Order of operations

1. **Identify the request**: If the user names a component, open `components/<component-name>/` directly. If only a higher-level goal is given, consult applicable intent guidance when the companion skill is installed; otherwise use documented component purposes and project requirements. Do not choose based only on a similar component name. State unresolved choices or ask for clarification when they affect the implementation.
2. **Check usage**: Read the selected components' `rules.md`, including grouping, shared labels, actions, and feedback where relevant. Preserve the distinction between constraints and recommendations.
3. **Verify APIs**: Read `interface.md` to verify the properties, attributes, slots, events, methods, and types used by the implementation.
4. **Check examples and composition**: Read only relevant portions of `examples.md`. For multi-component compositions, consult a relevant template when its companion skill is installed, then verify the adapted components against their interfaces and rules.
5. **Verify framework syntax**: Preserve the framework and syntax of an example unless adaptation is required. When adapting to React, Angular, Vue, or another integration, verify property bindings, events, and registration conventions against available local documentation. Do not assume custom-element attributes map directly to framework wrappers; state unverified integration details.
6. **Review before responding**: Check that used APIs are documented, usage follows the applicable rules, and examples have not been treated as additional API. State unresolved version, selection, or documentation uncertainty.

If the requested component is not listed under `components/`, state that it is absent from this reference. Do not fabricate its API, rules, or examples. Consult available project documentation where possible; absence from this reference does not establish absence from the installed package.
