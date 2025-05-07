export type SynClampDetails = {
  /**
   * The "direction" the value was clamped to
   */
  clampedTo: 'min' | 'max';

  /**
   * The last value the user has input before clamping.
   */
  lastUserValue: number;
};

export type SynClampEvent = CustomEvent<SynClampDetails>;

declare global {
  interface GlobalEventHandlersEventMap {
    'syn-clamp': SynClampEvent;
  }
}
