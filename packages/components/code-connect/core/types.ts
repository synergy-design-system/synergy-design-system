import type SynergyElement from '../../src/internal/synergy-element.js';

/**
 * Makes sure the given objects properties share the same names
 * as the properties of the given component.
 * Also allows setting additional slot properties.
 */
export type ValidProperties<
  Component extends SynergyElement,
  AdditionalSlots extends readonly string[] = ['default'],
> = {
  [K in keyof Component]?: unknown;
} & {
  [K in `${AdditionalSlots[number]}Slot`]?: unknown;
};
