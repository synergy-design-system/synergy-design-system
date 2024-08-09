export type SynMoveEvent = CustomEvent<{
  element: HTMLDivElement;
  value: number;
}>;

declare global {
  interface GlobalEventHandlersEventMap {
    'syn-move': SynMoveEvent;
  }
}
