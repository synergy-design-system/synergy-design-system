# Synergy Templates Skill

This skill provides offline, copyable template examples for common layout and interaction patterns built with the Synergy Design System.

> All files in this skill are generated from Synergy metadata and must not be edited manually.

## Version Alignment

This skill was generated against Synergy version `{{SYNERGY_VERSION}}`.

If your locally installed Synergy packages use a different version, template examples or component guidance may differ. Regenerate or reinstall the skills after changing Synergy versions.

## Notes on Template Scope

- Templates are illustrative starting points and are not production-ready implementations.
- They may omit edge cases, error handling, and accessibility refinements that must be addressed based on your product context and applicable standards.

## When to Use

- You are developing with Synergy templates locally
- You want concrete HTML starting points for common UI or layout patterns without running MCP
- You need to share template knowledge with your team via `.github/skills/`

## Structure

Templates are currently represented by a single file:

### `examples.md`

Code samples showing common layout and interaction patterns. Use this for understanding typical composition and setup patterns.

For component API details and usage rules, use the `synergy-component` skill.

## How to Use

1. **Find a template**: Look in the `templates/` folder for the template you need (e.g., `forms/`)
2. **Open `examples.md`**: Review the provided markdown and code snippets
3. **Copy and adapt**: Use the snippet as a starting point and adapt it for your product context

## Installation

```bash
cp -r synergy-templates/ .github/skills/
npx @synergy-design-system/metadata install-skills --path .github/skills
```

After installation, reference this skill with `/synergy-templates` in Copilot chat for template guidance without leaving your editor.

If a suitable template is not available, consider composing a solution from individual components following the guidance in `synergy-component`.
