/* eslint-disable */
import type SynMenuItem from '../components/menu-item/menu-item.js';

/**
 * Synergy custom event
 */
export type SynSelectEvent = CustomEvent<{ item: SynMenuItem }>;

declare global {
  interface GlobalEventHandlersEventMap {
    'syn-select': SynSelectEvent;
  }
}
