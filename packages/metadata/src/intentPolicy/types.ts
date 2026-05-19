/**
 * Intent Policy Layer domain types.
 *
 * This layer is TypeScript-only and intentionally separate from generated metadata artifacts.
 */

/**
 * Canonical architecture label for the intent policy domain.
 */
export const INTENT_POLICY_LAYER_NAME = 'Intent Policy Layer' as const;
/**
 * Canonical name of the intent resolution process.
 */
export const INTENT_RESOLUTION_PROCESS_NAME = 'Intent Resolution' as const;
/**
 * Canonical label for resolved output payloads.
 */
export const INTENT_OUTPUT_NAME = 'Usage Pattern / Preset' as const;

/**
 * Stability/release phase for intent policy entities.
 */
export type IntentPhase =
  | 'experimental'
  | 'preview'
  | 'stable'
  | 'deprecated';

/**
 * High-level grouping for related intents (for example action, input, navigation).
 */
export type IntentCategory = {
  /**
   * Human-readable explanation of what this category represents.
   */
  description: string;
  /**
   * Stable category identifier used for matching and lookup.
   */
  id: string;
  /**
   * Stability phase of this category.
   */
  phase?: IntentPhase;
};

/**
 * Contextual user goal that explains why a target is used in a given situation.
 */
export type IntentDefinition = {
  /**
   * Category identifier this intent belongs to.
   */
  category: string;
  /**
   * Human-readable meaning and scope of the intent.
   */
  description: string;
  /**
   * Stable intent identifier (for example action.submit).
   */
  id: string;
  /**
   * Stability phase of this intent.
   */
  phase?: IntentPhase;
  /**
   * Expected user outcome this intent should achieve.
   */
  userGoal: string;
};

/**
 * Supported target kinds for intent resolution.
 */
export type IntentTargetKind =
  | 'asset'
  | 'component'
  | 'style';

/**
 * Neutral target reference used by capabilities and patterns.
 */
export type IntentTargetRef = {
  /**
   * Kind of target this reference points to.
   */
  kind: IntentTargetKind;
  /**
   * Optional canonical metadata ID (for example component:syn-button or style:syn-link).
   */
  id?: string;
  /**
   * Optional friendly/short name (for example syn-button).
   */
  name?: string;
  /**
   * Optional selector for utility or style targets.
   */
  selector?: string;
  /**
   * Optional class list for class-based targets.
   */
  classes?: string[];
  /**
   * Optional source-layer hint, for example examples or rules.
   */
  layer?: string;
};

/**
 * Declares which intent categories a target can support.
 */
export type IntentCapability = {
  /**
   * List of supported category IDs for the target.
   */
  categories: string[];
  /**
   * Stability phase of this capability mapping.
   */
  phase?: IntentPhase;
  /**
   * Neutral target reference.
   */
  target: IntentTargetRef;
};

/**
 * Primitive value types allowed in preset prop mappings.
 */
export type IntentPresetValue = boolean | null | number | string;

/**
 * Severity level for property validation rules.
 *
 * - 'error': Violation prevents valid usage.
 * - 'warning': Violation is non-blocking but ill-advised.
 * - 'info': Violation is advisory guidance only.
 */
export type IntentValidationSeverity = 'error' | 'warning' | 'info';

/**
 * Base fields shared by all property validation rule types.
 *
 * These fields are common across all rule kinds and provide
 * the essential information for communicating rule violations
 * to developers and consumers.
 */
export type IntentPropRuleBase = {
  /**
   * Machine-readable rule code for programmatic identification.
   *
   * Used in validation results to identify the specific rule
   * that was violated, enabling targeted error handling and
   * localization of messages.
   */
  code: string;
  /**
   * Human-readable validation message shown to developers.
   *
   * Describes what the violation is in plain language, indicating
   * what property failed and why it matters for the intent.
   */
  message: string;
  /**
   * Optional explanation of why this rule exists.
   *
   * Provides context about the design decision or constraint
   * that motivated the rule, helping developers understand the
   * architectural reasoning.
   */
  rationale?: string;
  /**
   * Recommended action to resolve the violation.
   *
   * Offers concrete guidance on how to fix the issue, such as
   * changing a property value or removing a conflicting prop.
   */
  suggestedFix?: string;
};

/**
 * Validation rule requiring a property to equal a specific value (error severity).
 *
 * This rule type enforces strict requirements where a property
 * must be set to an exact value for the intent to be valid.
 * Violations are treated as errors that block usage.
 */
export type IntentRequiredEqualsPropRule = IntentPropRuleBase & {
  /**
   * Discriminator indicating this is a requiredEquals rule.
   */
  kind: 'requiredEquals';
  /**
   * Property name that must equal the specified value.
   */
  prop: string;
  /**
   * Required value for the property to satisfy this rule.
   */
  value: IntentPresetValue;
};

/**
 * Validation rule preventing a property from being present (error severity).
 *
 * This rule type enforces constraints where a property must not
 * be combined with a given intent, or must not be present at all.
 * Violations are treated as errors that block usage.
 */
export type IntentForbiddenPropRule = IntentPropRuleBase & {
  /**
   * Discriminator indicating this is a forbidden rule.
   */
  kind: 'forbidden';
  /**
   * Property name that must not be present or combined with this intent.
   */
  prop: string;
};

/**
 * Validation rule recommending a property equal a specific value (info severity).
 *
 * This rule type provides advisory guidance suggesting an optimal
 * property value for the intent. Violations are non-blocking
 * recommendations only.
 */
export type IntentRecommendedEqualsPropRule = IntentPropRuleBase & {
  /**
   * Discriminator indicating this is a recommendedEquals rule.
   */
  kind: 'recommendedEquals';
  /**
   * Property name that should ideally equal the suggested value.
   */
  prop: string;
  /**
   * Severity level for this recommendation (defaults to 'info').
   */
  severity?: 'info';
  /**
   * Recommended value for optimal intent usage.
   */
  value: IntentPresetValue;
};

/**
 * Validation rule warning when a property equals a specific value (warning severity).
 *
 * This rule type detects context-dependent issues where a property
 * combination temporarily blocks or impairs the intent, such as a
 * disabled submit button. Violations emit warnings but do not block
 * overall validation.
 */
export type IntentWarnWhenEqualsPropRule = IntentPropRuleBase & {
  /**
   * Discriminator indicating this is a warnWhenEquals rule.
   */
  kind: 'warnWhenEquals';
  /**
   * Property name to monitor for the blocking condition.
   */
  prop: string;
  /**
   * Severity level for this warning (defaults to 'warning').
   */
  severity?: 'warning';
  /**
   * Value that triggers the warning when present.
   */
  value: IntentPresetValue;
};

/**
 * Union type of all property validation rule kinds.
 *
 * Discriminated by the 'kind' field, allowing type-safe handling
 * of different rule types in validator logic and rule evaluation.
 *
 * - 'requiredEquals': Property must equal value (error)
 * - 'forbidden': Property must not be present (error)
 * - 'recommendedEquals': Property should equal value (info)
 * - 'warnWhenEquals': Property equals value warns (warning)
 */
export type IntentPropRule =
  | IntentRequiredEqualsPropRule
  | IntentForbiddenPropRule
  | IntentRecommendedEqualsPropRule
  | IntentWarnWhenEqualsPropRule;

/**
 * Configuration rules for component usage with a specific intent.
 *
 * Contains an ordered list of property validation rules that are
 * evaluated when a component claims to fulfill an intent. Rules are
 * processed sequentially, with different kinds producing different
 * severity levels in validation results.
 */
export type IntentConfig = {
  /**
   * List of property validation rules evaluated in order.
   *
   * Each rule is checked against the component's actual props,
   * generating validation issues based on rule kind and severity.
   * Rules are evaluated in the order they appear.
   */
  propRules?: IntentPropRule[];
};

/**
 * Condition that activates an advisory rule when matched.
 *
 * Defines a simple property-value equality check used to determine
 * when an advisory rule should emit guidance or warnings.
 */
export type IntentAdvisoryRuleCondition = {
  /**
   * The exact value the property must match to activate the rule.
   */
  equals: IntentPresetValue;
  /**
   * Property name to check against the condition value.
   */
  prop: string;
};

/**
 * Non-blocking validation guidance for context-dependent usage states.
 *
 * Advisory rules emit warnings or info when certain property
 * combinations are detected, such as a disabled submit button.
 * They do not prevent validation from succeeding but alert developers
 * to potential contextual issues.
 *
 * @deprecated Use IntentPropRule with kind='warnWhenEquals' instead.
 */
export type IntentAdvisoryRule = {
  /**
   * Machine-readable code identifying this advisory rule.
   */
  code: string;
  /**
   * Condition that triggers this advisory guidance.
   */
  condition: IntentAdvisoryRuleCondition;
  /**
   * Human-readable message describing the advisory condition.
   */
  message: string;
  /**
   * Optional explanation of why this guidance exists.
   */
  rationale?: string;
  /**
   * Severity level of this advisory (info or warning).
   */
  severity?: 'info' | 'warning';
  /**
   * Recommended action to resolve the advisory condition.
   */
  suggestedFix?: string;
};

/**
 * Property-level implementation guidance for an intent.
 */
export type IntentPreset = {
  /**
   * Props that must not be combined with this preset.
   */
  forbiddenProps?: string[];
  /**
   * Contextual, non-blocking guidance evaluated against provided props.
   */
  advisoryRules?: IntentAdvisoryRule[];
  /**
    * Recommended prop/value mapping for this target-intent pair.
   */
  props?: Record<string, IntentPresetValue>;
  /**
   * Class names to apply.
   */
  classes?: string[];
  /**
   * Class names that must be present.
   */
  requiredClasses?: string[];
  /**
   * Class names that must not be present.
   */
  forbiddenClasses?: string[];
};

/**
 * One node in a structural composition pattern.
 */
export type IntentStructureNode = {
  /**
   * Nested structural children in rendering order.
   */
  children?: IntentStructureNode[];
  /**
   * Element or component name to render.
   */
  component: string;
  /**
   * Recommended props for this structural node.
   */
  props?: Record<string, IntentPresetValue>;
  /**
   * Semantic role key resolved through the pattern roles map.
   */
  role?: string;
  /**
   * Slot target when this node should be projected into a slot.
   */
  slot?: string;
  /**
   * Optional text content for leaf nodes.
   */
  text?: string;
};

/**
 * Full guidance artifact for one target and one intent.
 */
export type IntentUsagePattern = {
  /**
   * Configuration rules for component usage with this intent.
   */
  config?: IntentConfig;
  /**
   * Human-readable explanation of when and how to use the pattern.
   */
  description: string;
  /**
   * Intent ID this pattern fulfills.
   */
  intent: string;
  /**
   * Optional additional guidance or caveats for consumers.
   */
  notes?: string[];
  /**
   * Stability phase of this usage pattern.
   */
  phase?: IntentPhase;
  /**
   * Optional prop-level preset guidance.
   */
  preset?: IntentPreset;
  /**
   * Optional semantic role map used by structural patterns.
   */
  roles?: Record<string, string>;
  /**
   * Optional structural composition guidance.
   */
  structure?: IntentStructureNode;
  /**
   * Neutral target reference the pattern applies to.
   */
  target: IntentTargetRef;
};

/**
 * API payload returned after successful intent resolution.
 */
export type IntentResolutionResult = {
  /**
   * Architecture label for traceability and explanation output.
   */
  architecture: typeof INTENT_POLICY_LAYER_NAME;
  /**
   * Output label indicating this payload is a usage pattern/preset.
   */
  output: typeof INTENT_OUTPUT_NAME;
  /**
   * Resolved usage guidance for the requested component-intent pair.
   */
  pattern: IntentUsagePattern;
  /**
   * Process label indicating this payload came from intent resolution.
   */
  process: typeof INTENT_RESOLUTION_PROCESS_NAME;
};
