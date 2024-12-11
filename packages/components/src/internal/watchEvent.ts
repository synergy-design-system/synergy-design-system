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
 * The event will contain an array of all changed properties, including their
 * - attribute name
 * - old value and
 * - new value.
 *
 * @example
 * ```ts
 * class OriginalClass extends SynergyElement {}
 * export const MyComponent = emitEventForPropertyUpdates(['attribute1', 'attribute2'])(BaseClass);
 *
 * // Create the component, providing initial values for the changed attribute list
 * const myComponent = document.createElement('my-component');
 * myComponent.attribute1 = 'initial value for attribute 1';
 * myComponent.attribute2 = 'initial value for attribute 2';
 *
 * // Create a container and listen for the event
 * const container = document.createElement('div');
 * container.addEventListener('syn-attributes-changed', (event: SynAttributesChangedEvent) => {
 *   // We do not want to propagate the event further
 *   event.stopImmidiatePropagation();
 *
 *   console.log(event.detail);
 * });
 *
 * // Add the component to the container
 * container.appendChild(myComponent);
 *
 * // Change the attributes
 * myComponent.attribute1 = 'value for attribute 1';
 * myComponent.attribute2 = 'value for attribute 2';
 *
 * // Output:
 * // [
 * //   {
 * //     attribute: 'attribute1',
 * //     oldValue: 'initial value for attribute 1',
 * //     newValue: 'value for attribute 1'
 * //   },
 * //   {
 * //     attribute: 'attribute2',
 * //     oldValue: 'initial value for attribute 2',
 * //     newValue: 'value for attribute 2'
 * //   }
 * // ]
 * ```
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
