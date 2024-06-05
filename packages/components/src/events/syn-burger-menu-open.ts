export type SynBurgerMenuOpenEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'syn-burger-menu-open': SynBurgerMenuOpenEvent;
  }
}
