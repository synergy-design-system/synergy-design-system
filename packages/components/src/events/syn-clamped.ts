export type SynClampedEvent = CustomEvent<{
  /**
   * The "direction" the value was clamped to
   */
  clampedTo: 'min' | 'max';

  /**
   * The last value value that the user has input BEFORE clamping
   * This is currently not needed, but may be nice to have for other use cases.
   * Note that you are otherwise not able to retrieve this information via DOM
   * as the value prop will be changed AFTER the clamping is done!
   */
  lastUserValue: number;
}>;

declare global {
  interface GlobalEventHandlersEventMap {
    'syn-clamped': SynClampedEvent;
  }
}
