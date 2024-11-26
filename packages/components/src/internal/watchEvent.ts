/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PropertyValues } from 'lit';
import type SynergyElement from './synergy-element.js';

type Constructor<T = object> = new (...args: any[]) => T;

interface DecoratorOptions {
  /**
   * If true, will only start watching after the initial updated call
   */
  waitUntilFirstUpdated?: boolean;
}

/**
 * Class decorator that automatically emits a `syn-attributes-changed` event
 * when at least one of the provided attributes have changed.
 *
 * @example
 * ```typescript
 * // Will fire a `syn-attributes-changed` event when `prop1` or `prop2` change,
 * // but only after the first `updated` call
 * emitEventForPropertyUpdates(['prop1', 'prop2'], {
 *  waitUntilFirstUpdated: true,
 * })
 * class MyElement extends SynergyElement {}
 * ```
 *
 */
export function emitEventForPropertyUpdates(
  watchedProperties: string[],
  options?: DecoratorOptions,
) {
  const resolvedOptions: Required<DecoratorOptions> = {
    waitUntilFirstUpdated: false,
    ...options,
  };

  return <T extends Constructor<SynergyElement>>(Proto: T): T => class extends Proto {
    // True if the event was emitted, false otherwise
    #synPrivateFirstChangeHasBeenEmitted = !resolvedOptions.waitUntilFirstUpdated;

    updated(changedProps: PropertyValues) {
      if (!this.#synPrivateFirstChangeHasBeenEmitted) {
        this.#synPrivateFirstChangeHasBeenEmitted = true;
        return;
      }

      // Get the list of all changed properties
      const monitoredChangedProperties = Array
        .from(changedProps)
        .filter(([key]) => watchedProperties.includes(key as string));

      // If there are no changed properties, return before sending anything
      if (monitoredChangedProperties.length === 0) {
        super.updated(changedProps);
        return;
      }

      // Send out the event with all changed properties
      const detail = monitoredChangedProperties.map(([key, value]) => ({
        attribute: key,
        newValue: this[key as keyof this],
        oldValue: value,
      }));

      this.emit('syn-attributes-changed', {
        detail,
      });
      super.updated(changedProps);
    }
  };
}
