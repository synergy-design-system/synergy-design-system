// ---------------------------------------------------------------------
// 🔒 AUTOGENERATED @synergy-design-system/react wrappers for @synergy-design-system/components
// Please do not edit this file directly!
// It will get recreated when running pnpm build.
// ---------------------------------------------------------------------
import * as React from 'react';
import { createComponent } from '@lit/react';
import Component from '@synergy-design-system/components/components/prio-nav/prio-nav.component.js';

const tagName = 'syn-prio-nav';
Component.define('syn-prio-nav');

/**
 * @summary The `<syn-prio-nav />` element provides a generic navigation bar
 * that can be used to group multiple navigation items  (usually horizontal `<syn-nav-item />`s)
 * together. It will automatically group all items not visible in the viewport into a custom
 * priority menu.
 *
 * @example
 * <syn-prio-nav>
 *  <syn-nav-item current horizontal>Item 1</syn-nav-item>
 *  <button role="menuitem">Item 2 (custom)</button>
 *  <syn-nav-item horizontal>Item 3</syn-nav-item>
 * </syn-prio-nav>
 *
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-prio-nav--docs
 * @status stable
 * @since 1.14.0
 *
 * @dependency syn-dropdown
 * @dependency syn-icon
 * @dependency syn-menu
 * @dependency syn-nav-item
 *
 * @slot - The given navigation items. Must be horizontal `<syn-nav-item>`s
 *    or have a role of "menuitem"
 *
 * @csspart base - The component's base wrapper.
 * @csspart priority-menu - The wrapper around the priority menu
 * @csspart priority-menu-label - The label for the priority menu
 *
 */
export const SynPrioNav = createComponent({
  displayName: 'SynPrioNav',
  elementClass: Component,
  events: {

  },
  react: React,
  tagName,
});
