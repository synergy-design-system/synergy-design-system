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
 * Validation rule requiring that a node has visible content (text and/or child nodes).
 *
 * This rule type enforces that interactive elements such as buttons
 * are never rendered empty, which would result in an inaccessible
 * or invisible control. Violations are treated as errors.
 */
export type IntentRequiredContentRule = IntentPropRuleBase & {
  /**
   * Discriminator indicating this is a requiredContent rule.
   */
  kind: 'requiredContent';
};

/**
 * One possible authored content source that can satisfy a content requirement.
 */
export type IntentContentSource =
  | { kind: 'children' }
  | { kind: 'prop'; prop: string }
  | { kind: 'slot'; slot: string }
  | { kind: 'text' };

/**
 * Validation rule requiring content from at least one of several possible sources.
 *
 * This supports authoring patterns where equivalent content can be provided via
 * a property or a named slot, such as `label` prop vs `label` slot.
 */
export type IntentRequiredAnyContentSourceRule = IntentPropRuleBase & {
  /**
   * Discriminator indicating this is a requiredAnyContentSource rule.
   */
  kind: 'requiredAnyContentSource';
  /**
   * Severity emitted when no allowed source provides content.
   */
  severity?: 'warning' | 'error';
  /**
   * Allowed authored content sources. Validation passes when any one source is satisfied.
   */
  sources: IntentContentSource[];
};

/**
 * Union type of all content validation rule kinds.
 */
export type IntentContentRule =
  | IntentRequiredContentRule
  | IntentRequiredAnyContentSourceRule;

/**
 * Configuration rules for component usage with a specific intent.
 *
 * Contains an ordered list of property validation rules and optional
 * content rules that are evaluated when a component claims to fulfill
 * an intent. Rules are processed sequentially.
 */
export type IntentConfig = {
  /**
   * Content rules evaluated against the node's children and text.
   *
   * Use this for rules that concern visible content rather than props,
   * such as requiring that a button has a label or child nodes.
   */
  contentRules?: IntentContentRule[];
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
   * Optional class names present on this structural node.
   */
  classes?: string[];
  /**
   * Nested structural children in rendering order.
   */
  children?: IntentStructureNode[];
  /**
   * Element or component name to render.
   */
  component: string;
  /**
   * Node-level configuration rules for this structural node.
   */
  config?: IntentConfig;
  /**
   * Class names that must not be present on this structural node.
   */
  forbiddenClasses?: string[];
  /**
   * Recommended props for this structural node.
   */
  props?: Record<string, IntentPresetValue>;
  /**
   * Class names that must be present on this structural node.
   */
  requiredClasses?: string[];
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
 * Semantic role of a target when fulfilling an intent.
 *
 * - `standalone`: The target can satisfy the intent on its own.
 * - `container`: The target fulfills the intent as an enclosing structure for subordinate parts.
 * - `item`: The target is a subordinate building block that typically requires a parent container.
 */
export type IntentTargetRole =
  | 'standalone'
  | 'container'
  | 'item';

/**
 * Full guidance artifact for one target and one intent.
 */
export type IntentUsagePattern = {
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
   * Optional recommendation priority used to rank multiple valid targets for the same intent.
   * Higher numbers indicate stronger recommendation. Defaults to 0 when omitted.
   */
  priority?: number;
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
  /**
   * Optional semantic role of the target when fulfilling this intent.
   * Defaults to `standalone` when omitted for recommendation ordering.
   */
  targetRole?: IntentTargetRole;
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
