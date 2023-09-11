import { DesignSystem } from '@microsoft/fast-foundation';
import type { CompositionFunction } from './types';

/**
 * Creates an instance of our design system with a component prefix of "sds"
 * @param element The element to attach the design system to. Defaults to the body if omitted
 * @returns DesignSystem
 */
const provideSDSDesignSystem = (element?: HTMLElement) => DesignSystem
  .getOrCreate(element)
  .withPrefix('sds');

/**
 * Create the SDS design system and define all wanted components.
 *
 * @param components Array of components to load
 * @example
 * ```typescript
 * import { setup, SDSButton, SDSLogo } from '@sick-design-system/components';
 * setup([ SDSButton, SDSLogo ]);
 * ```
 */
export const setup = (components: CompositionFunction[] = []) => {
  provideSDSDesignSystem().register(
    ...components.map(c => c()),
  );
};
