export type SynMoveEvent = CustomEvent<{
  knob: HTMLDivElement;
  value: number;
}>;

declare global {
  interface GlobalEventHandlersEventMap {
    'syn-move': SynMoveEvent;
  }
}
