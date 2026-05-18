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
 * Property-level implementation guidance for an intent.
 */
export type IntentPreset = {
  /**
   * Props that must not be combined with this preset.
   */
  forbiddenProps?: string[];
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
   * Neutral target reference the pattern applies to.
   */
  target: IntentTargetRef;
  /**
   * Human-readable explanation of when and how to use the pattern.
   */
  description: string;
  /**
   * Intent ID this pattern fulfills.
   */
  intent: string;
  /**
   * Stability phase of this usage pattern.
   */
  phase?: IntentPhase;
  /**
   * Optional additional guidance or caveats for consumers.
   */
  notes?: string[];
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
