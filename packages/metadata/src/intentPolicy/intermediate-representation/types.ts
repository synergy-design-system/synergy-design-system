import type {
  IntentPhase,
  IntentPresetValue,
  IntentTargetRef,
} from '../types.js';

/**
 * Supported framework profiles for parsing and rendering intent output.
 */
export type FrameworkProfile =
  | 'react-wrapper'
  | 'react-web-components'
  | 'angular'
  | 'vue'
  | 'vanilla';

/**
 * Union of node shapes supported by the intermediate representation tree.
 */
export type IntermediateRepresentationNode = IntermediateRepresentationComponentNode | IntermediateRepresentationTextNode;

/**
 * Literal text node in the intermediate representation tree.
 */
export type IntermediateRepresentationTextNode = {
  kind: 'text';
  value: string;
};

/**
 * Component node in the intermediate representation tree.
 */
export type IntermediateRepresentationComponentNode = {
  children?: IntermediateRepresentationNode[];
  component: string;
  intentId?: string;
  kind: 'component';
  phase?: IntentPhase;
  props?: Record<string, IntentPresetValue>;
  target?: IntentTargetRef;
};

/**
 * Root document container for intent intermediate representation output.
 */
export type IntermediateRepresentationDocument = {
  framework: FrameworkProfile;
  intentId: string;
  irVersion: '1.0';
  root: IntermediateRepresentationComponentNode;
  target: IntentTargetRef;
};
