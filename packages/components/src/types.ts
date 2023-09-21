import type {
  FoundationElementDefinition,
  FoundationElementRegistry,
  OverrideFoundationElementDefinition,
} from '@microsoft/fast-foundation';

/**
 * The composition function definition, used by FoundationElement.compose()
 * @see https://www.fast.design/docs/api/fast-foundation.foundationelement.compose
 */
export type CompositionFunction = (
  overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition>
) => FoundationElementRegistry<FoundationElementDefinition, unknown>;
