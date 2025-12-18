export type SynDefaultChangedAttribute = {
  /* The attribute */
  attribute: string;
  /* New values after the change */
  newValue: unknown;
  /* Original values before the change */
  oldValue: unknown;
};

/**
 * Event that is emitted when the default settings of component properties change.
 * Used together with the `setGlobalDefaultSettings`
 * @see src/internal/defaultSettings.ts
 */
export type SynDefaultSettingsChangedEvent = CustomEvent<
Record<string, SynDefaultChangedAttribute[]>
>;

declare global {
  interface GlobalEventHandlersEventMap {
    'syn-default-settings-changed': SynDefaultSettingsChangedEvent;
  }
}
