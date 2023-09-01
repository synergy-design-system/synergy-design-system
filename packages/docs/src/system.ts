import { DesignSystem } from '@microsoft/fast-foundation';
import * as components from './index.js';

/**
 * Creates an instance of our design system with a component prefix of "sds"
 * @param element The element to attach the design system to. Defaults to the body if omitted
 * @returns
 */
export const provideSDSDesignSystem = (element?: HTMLElement) => DesignSystem
  .getOrCreate(element)
  .withPrefix('sds')
  .register(
    // Registers anything in components export
    ...Object.values(components)
      .map((component) => component()),
    // Would only register the single button instance
    // components.SdsButton(),
    // or:
    // components.SdsButton({
    //   variant: 'accent',
    // })
    // to override the default variant attribute
  );
