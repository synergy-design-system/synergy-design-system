export type SynBurgerMenuShowEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'syn-burger-menu-show': SynBurgerMenuShowEvent;
  }
}
