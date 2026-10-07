# Synergy Intent Policy Skill

This skill provides an offline, static reference for selecting Synergy UI targets, generating implementation starting points, and reviewing code against user goals and intent policies.

> All files in this skill are generated from Synergy metadata and must not be edited manually.

## Version Alignment

This skill was generated against Synergy version `{{SYNERGY_VERSION}}`.

Compare this version with the resolved version of `@synergy-design-system/components` used by the project. Check the relevant project or workspace `package.json` for the dependency, then use the lockfile or installed package metadata to resolve ranges or workspace references. Do not use the version of a framework wrapper, tokens, or metadata package as the components version. If the project uses a wrapper, check its resolved components dependency when available.

If the resolved components version differs, intent guidance, supported targets, or examples may differ. Regenerate or reinstall the skills after changing Synergy versions. Version alignment alone does not establish that an intent applies to the user's goal or that an implementation complies with its policy.

If the installed Synergy version is unknown, do not infer a mismatch.

If a known installed version differs from `{{SYNERGY_VERSION}}`:

1. Start with one sentence naming both versions and noting possible outdated guidance.
2. Continue using the available skill content.
3. Verify version-sensitive APIs against local project documentation where possible.
4. State remaining uncertainty and do not claim unverified compatibility.

## When to Use

- You are choosing a component for a user goal
- You are generating a Synergy implementation for a known user goal
- You are checking whether a component configuration fits an intent
- You need intent guidance without running MCP

## Structure

- `intents/README.md` lists intent categories
- `intents/<category>/README.md` lists the intents in a category
- `intents/<category>/<intent-name>/interface.md` describes the intent, user goal, phase, and supported targets
- `intents/<category>/<intent-name>/rules.md` contains target-specific implementation constraints and guidance
- `intents/<category>/<intent-name>/examples.md` contains target recommendation reasons, default markers, and illustrative vanilla HTML examples

Intent IDs map to paths by splitting at the first period:

- `action.navigation` maps to `intents/action/navigation/`
- `action.button.icon` maps to `intents/action/button.icon/`
- `input.selection.searchable.multiple` maps to `intents/input/selection.searchable.multiple/`

## How to Use

A user goal may map to one or more intents. Each intent defines supported implementation targets. Rules apply to a specific intent-target combination, including child components explicitly covered by its structural rules, not automatically to every component in the implementation.

### Companion Skills

This skill remains usable on its own. Consult companion skills only when installed and relevant to the task:

- [Synergy component reference](../synergy-component/SKILL.md): After selecting a target, verify its component API and usage rules before generating or adapting code. Do not infer undocumented properties from the target ID or an intent example.
- [Synergy templates](../synergy-templates/SKILL.md): For multi-component compositions, read a relevant template as a starting point, then check the adapted implementation against the applicable intent and component rules. Templates do not override those rules.

If a companion skill is unavailable, continue with the intent guidance and available project documentation. State unresolved API or composition uncertainty; missing documentation does not mean that a component is unavailable. Read only the relevant companion pages, not the entire catalog.

### Authority and Precedence

- `interface.md` defines the intent's meaning and supported targets.
- `rules.md` defines constraints and guidance for each supported target.
- Recommendation reasons and default markers in `examples.md` inform target selection; its code snippets are illustrative and do not introduce targets or override the interface or rules.

If example markup conflicts with the interface or applicable rules, do not follow the conflicting example. Report inconsistencies between the interface, selection annotations, and rules rather than resolving them through inference. Verify technical APIs through the component reference or available project documentation.

### Resolution and Review Procedure

1. Identify the user's goal.
2. Open `intents/README.md` and identify a category that matches the user's goal.
3. Open the category's `README.md` and select an intent that genuinely matches the goal. If no category or intent matches, report the coverage gap and use available project documentation rather than forcing a match or inventing an intent.
4. Read the intent's `interface.md` to understand its meaning and supported targets.
5. When generating code, read the target recommendation reasons and default markers in `examples.md` before selecting a supported target. Prefer the marked default unless documented applicability or explicit project requirements support another target. When reviewing existing code, evaluate its actual supported target; a non-default target is not automatically a violation. If the actual target is unsupported, report the coverage gap rather than silently switching targets.
6. Read the selected target's section of `rules.md` and apply every Required and Forbidden rule as a constraint, including its structural child rules. Do not combine rules from alternative targets.
7. Evaluate Recommended entries as contextual guidance. A Warning identifies a documented risk or concern, not automatically a policy violation; retain its documented context and do not promote it to a Required or Forbidden constraint.
8. When generating code, use the selected target's example markup as a starting point, then verify the final implementation against its rules and documented API. When reviewing code, compare the existing implementation with those rules rather than requiring it to copy the example.
9. Report uncertainty when the available static information is not enough to evaluate the code.
10. Do not invent intents, targets, properties, or rules that are not present in this skill.

Rules marked **Required** or **Forbidden** are constraints. **Recommended** and **Warning** entries provide guidance that may depend on product context.

Apply multiple intents when they describe distinct parts or goals of the implementation, repeating the procedure for each. When categories or intents are competing alternatives for the same goal, prefer the most specific supported match. If the choice remains ambiguous and affects the implementation, ask for clarification; otherwise state your assumption and rationale. Do not silently choose between conflicting constraints.

If independently applicable intents produce conflicting constraints, report the conflict and the affected implementation decision. Do not discard, weaken, or prioritize either constraint unless the documentation defines precedence; seek clarification before implementing the unresolved decision.

### Reporting Results

When generating code, identify the selected intent and target when the choice is not obvious from the request, and state material assumptions or missing coverage. When reviewing code, identify the matched intent and actual target, and distinguish constraint violations, recommendations not followed, documented warnings, and unresolved uncertainty. Do not report rules for unselected alternative targets as findings.

## Scope

This skill reviews intent-policy compliance. It does not guarantee complete accessibility, business-logic correctness, visual-layout correctness, responsive behavior, or runtime correctness.

Examples currently use vanilla Web Component markup. When adapting an example to another framework, preserve all intent rules and follow that framework's integration conventions.

Target identifiers use metadata namespaces such as `component:syn-button` and `style:syn-link`. Use the rendered markup in `examples.md`, not the target identifier itself, when writing application code.
