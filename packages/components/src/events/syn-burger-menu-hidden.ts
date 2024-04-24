export type SynBurgerMenuHiddenEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'syn-burger-menu-hidden': SynBurgerMenuHiddenEvent;
  }
}
