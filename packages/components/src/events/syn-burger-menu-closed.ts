export type SynBurgerMenuClosedEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'syn-burger-menu-closed': SynBurgerMenuClosedEvent;
  }
}
