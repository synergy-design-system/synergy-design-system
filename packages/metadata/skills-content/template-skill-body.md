# Synergy Templates Skill

This skill provides an offline, copyable reference for generating, adapting, and reviewing multi-component Synergy layouts and interaction patterns.

> All files in this skill are generated from Synergy metadata and must not be edited manually.

## Version Alignment

This skill was generated against Synergy version `{{SYNERGY_VERSION}}`.

Compare this version with the resolved version of `@synergy-design-system/components` used by the project. Check the relevant project or workspace `package.json` for the dependency, then use the lockfile or installed package metadata to resolve ranges or workspace references. Do not use the version of a framework wrapper, tokens, or metadata package as the components version. If the project uses a wrapper, check its resolved components dependency when available.

If the resolved components version differs, template examples or component guidance may differ. Regenerate or reinstall the skills after changing Synergy versions. Version alignment does not establish that a template is suitable for the user's goal or complete for the product context.

If the installed Synergy version is unknown, do not infer a mismatch.

If a known installed version differs from `{{SYNERGY_VERSION}}`:

1. Start with one sentence naming both versions and noting possible outdated guidance.
2. Continue using the available skill content.
3. Verify version-sensitive APIs against local project documentation where possible.
4. State remaining uncertainty and do not claim unverified compatibility.

## Notes on Template Scope

- Templates are illustrative starting points and are not production-ready implementations.
- They may omit edge cases, error handling, and accessibility refinements that must be addressed based on your product context and applicable standards.

## When to Use

- You are developing with Synergy templates locally
- You want concrete HTML starting points for common UI or layout patterns without running MCP
- You are generating, adapting, or reviewing a multi-component Synergy implementation

## Structure

Each template has its own folder containing an examples file:

- `templates/<template-name>/examples.md`

For example, the forms template is located at `templates/forms/examples.md`.

Each file contains examples of composition and setup patterns, potentially with several variants.

Companion skills provide additional guidance when installed: [Synergy intent policy](../synergy-intent-policy/SKILL.md) for target selection and [Synergy component reference](../synergy-component/SKILL.md) for APIs and usage rules. This skill remains usable on its own.

## How to Use

### Authority and Precedence

- Template examples illustrate composition and setup; they do not establish mandatory component choices or additional APIs.
- Applicable intent rules define goal- and target-specific constraints and guidance.
- Component interfaces define documented technical APIs; component rules define component-level usage constraints and guidance.
- Project requirements shape the implementation but do not change what the Synergy references document.

Templates do not override documented APIs or applicable rules. If a template conflicts with them, do not follow the conflicting part. Report the inconsistency rather than silently treating the template as authoritative. Do not invent precedence between conflicting authoritative rules.

### Composition Workflow

1. **Identify the need**: Determine the user's goal, structural regions, interaction model, and explicit project requirements, including grouping, labels, actions, and feedback.
2. **Find a template**: Inspect the available folders under `templates/` (e.g., `forms/`) and compare their documented purpose and structure with the request. Do not select solely by a similar name or shared component.
3. **Read the relevant variant**: Open the selected `examples.md` and read the complete relevant variant, including setup and behavior, before generating or adapting code. Review component relationships, not just individual controls; do not load unrelated variants.
4. **Check applicable intents when available**: If `synergy-intent-policy` is installed, read its root instructions and relevant intent pages to resolve targets and constraints, including grouping and composition.
5. **Verify component contracts when available**: If `synergy-component` is installed, verify the interfaces and rules of components used or added. For framework adaptations, verify binding, event, and registration conventions against available integration documentation.
6. **Adapt the composition**: Prefer documented Synergy components over recreating equivalent behavior with custom markup or styling. Retain template component choices only when suitable for the user's goal, applicable policy, and project requirements; otherwise use supported alternatives. Explain meaningful adaptations.
7. **Review the result**: Check applicable intent and component rules. When reviewing existing code, use templates as comparative references, not required implementations. Structural differences are suggestions, not violations, unless a documented rule establishes the requirement.
8. **Report limitations**: State unresolved API, policy, version, or product-context uncertainty. Do not claim that the template or adapted implementation is production-ready or complete merely because it follows an example.

For forms, assess related control groups as well as individual fields. The forms template demonstrates `syn-fieldset` for semantic grouping and layout; consider it before introducing custom containers or native fieldset styling. When the intent skill is installed, review `input.grouping.fieldset` for grouping and legend requirements. Not every form needs a fieldset.

If a companion skill is unavailable, continue with the template examples and available project documentation, and state any unresolved API or policy uncertainty. Missing documentation does not mean that a component is unavailable. Do not invent component APIs or assume an illustrative template has passed every policy check.

If companion skills and local project documentation are unavailable:

1. Use only component APIs visibly demonstrated in the selected template, treating them as unverified. Do not claim that the demonstrated API is complete or compatible with a mismatched local package version.
2. Do not invent additional properties, events, or policy requirements.
3. For version-sensitive or policy-sensitive behavior that cannot be verified from these examples, state the limitation and leave that behavior unresolved rather than claiming correctness.

If several templates fit, compare their documented purpose, structure, interaction model, and project requirements. Matching the user's goal comes first; use fewer structural changes as a tie-breaker between equally suitable options. If choosing requires an unresolved user preference that affects the implementation, ask for clarification.

If a suitable template is not available, compose a solution from documented Synergy components, consulting companion skills when installed and otherwise using available project documentation. State that the result is a custom composition, not an existing or official Synergy template. If the required APIs cannot be verified, leave those details unresolved rather than inventing them.
