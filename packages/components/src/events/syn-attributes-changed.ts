export type SynAttributeChange = {
  /* The name of the attribute that was changed */
  attribute: string;
  /* Original value before the change */
  oldValue: unknown;
  /* New value after the change */
  newValue: unknown;
};

/**
 * An attribute changed event that is emitted when an attribute of a child element changes.
 * Used together with the `emitEventForPropertyUpdates` decorator.
 * @see src/internal/watchEvent.ts
 */
export type SynAttributesChangedEvent = CustomEvent<SynAttributeChange[]>;

declare global {
  interface GlobalEventHandlersEventMap {
    'syn-attributes-changed': SynAttributesChangedEvent;
  }
}
