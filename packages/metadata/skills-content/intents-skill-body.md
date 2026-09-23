# Synergy Intent Policy Skill

This skill provides an offline, static reference for checking UI code against Synergy intent policies.

> All files in this skill are generated from Synergy metadata and must not be edited manually.

## Version Alignment

This skill was generated against Synergy version `{{SYNERGY_VERSION}}`.

If your locally installed Synergy packages use a different version, intent guidance, supported targets, or examples may differ. Regenerate or reinstall the skills after changing Synergy versions.

## When to Use

- You are choosing a component for a user goal
- You are generating a Synergy implementation for a known user goal
- You are checking whether a component configuration fits an intent
- You need intent guidance without running MCP

## Structure

- `intents/README.md` lists intent categories
- `intents/<category>/README.md` lists the intents in a category
- `intents/<category>/<intent-name>/interface.md` describes the intent, user goal, phase, and supported targets
- `intents/<category>/<intent-name>/rules.md` contains static implementation checks for each supported target
- `intents/<category>/<intent-name>/examples.md` contains vanilla HTML examples and target recommendations

Intent IDs map to paths by splitting at the first period:

- `action.navigation` maps to `intents/action/navigation/`
- `action.button.icon` maps to `intents/action/button.icon/`
- `input.selection.searchable.multiple` maps to `intents/input/selection.searchable.multiple/`

## How to Check Code

1. Identify the user's goal.
2. Open `intents/README.md` and choose the closest category.
3. Open the category's `README.md` and choose the closest intent.
4. Read the intent's `interface.md` to understand its meaning and supported targets.
5. Choose the target that best matches the use case, giving preference to the marked default target.
6. Apply every Required and Forbidden rule as a constraint.
7. Evaluate Recommended and Warning entries as contextual guidance.
8. Use `examples.md` as a starting point, then verify the final implementation against the rules.
9. Report uncertainty when the available static information is not enough to evaluate the code.
10. Do not invent intents, targets, properties, or rules that are not present in this skill.

Rules marked **Required** or **Forbidden** are constraints. **Recommended** and **Warning** entries provide guidance that may depend on product context.

## Scope

This skill reviews intent-policy compliance. It does not guarantee complete accessibility, business-logic correctness, visual-layout correctness, responsive behavior, or runtime correctness.

Examples currently use vanilla Web Component markup. When adapting an example to another framework, preserve all intent rules and follow that framework's integration conventions.

Target identifiers use metadata namespaces such as `component:syn-button` and `style:syn-link`. Use the rendered markup in `examples.md`, not the target identifier itself, when writing application code.

## Installation

```bash
npx @synergy-design-system/metadata install-skills --path .github/skills
```

After installation, reference this skill with `/synergy-intent-policy` in Copilot chat.

For manual installation, copy the generated `synergy-intent-policy/` directory into `.github/skills/`.
