export type SynBurgerMenuOpenedEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'syn-burger-menu-opened': SynBurgerMenuOpenedEvent;
  }
}
