export type SynBurgerMenuHideEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'syn-burger-menu-hide': SynBurgerMenuHideEvent;
  }
}
