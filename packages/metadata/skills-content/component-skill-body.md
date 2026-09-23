# Synergy Component Skill

This skill provides offline, copyable documentation for Synergy Design System components.

> All files in this skill are generated from Synergy metadata and must not be edited manually.

## Version Alignment

This skill was generated against Synergy version `{{SYNERGY_VERSION}}`.

If your locally installed Synergy packages use a different version, component APIs, usage rules, or examples may differ. Regenerate or reinstall the skills after changing Synergy versions.

## When to Use

- You are developing with Synergy components locally
- You want component guidance without running MCP
- You need to share component knowledge with your team via `.github/skills/`

## Structure

Each component includes three facets:

### `interface.md`

The component's API reference: properties, attributes, slots, methods, events, and type information. Use this for understanding what a component can do technically.

### `rules.md`

Usage guidelines, accessibility considerations, common use cases, and best practices. Use this for understanding *when* and *how* to use a component correctly.

> Rules are authoritative within the design system.
> Best practices are recommendations, not enforceable constraints, and may require extension based on product, platform, or regulatory needs.

### `examples.md`

Code samples showing common patterns and variations. Use this for understanding typical usage patterns.

## How to Use

### Precedence

> If there is any conflict between guidance in `rules.md` and examples shown in `examples.md`, always follow `rules.md`.

### Order of operations

1. **Find a component**: Look in the `components/` folder for the component you need (e.g., `syn-button/`)
2. **Start with `rules.md`**: Understand the component's purpose and usage guidelines
3. **Reference `interface.md`**: Look up specific properties or attributes
4. **Check `examples.md`**: See code samples for your use case

## Installation

Copy this folder to your project's Copilot skills directory:

```bash
cp -r synergy-component/ .github/skills/
npx @synergy-design-system/metadata install-skills --path .github/skills
```

After installation, reference this skill with `/synergy-component` in Copilot chat for component guidance without leaving your editor.
