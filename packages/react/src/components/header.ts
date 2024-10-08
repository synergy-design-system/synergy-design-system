// ---------------------------------------------------------------------
// 🔒 AUTOGENERATED @synergy-design-system/react wrappers for @synergy-design-system/components
// Please do not edit this file directly!
// It will get recreated when running pnpm build.
// ---------------------------------------------------------------------
import * as React from 'react';
import { createComponent } from '@lit/react';
import Component from '@synergy-design-system/components/components/header/header.component.js';

import { type EventName } from '@lit/react';
import type { SynBurgerMenuClosedEvent } from '@synergy-design-system/components';
import type { SynBurgerMenuHiddenEvent } from '@synergy-design-system/components';
import type { SynBurgerMenuOpenEvent } from '@synergy-design-system/components';

const tagName = 'syn-header';
Component.define('syn-header');

/**
 * @summary The <syn-header /> element provides a generic application header
 * that can be used to add applications name, toolbar and primary navigation.
 *
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-header--docs
 * @status stable
 * @since 1.10.0
 *
 * @slot label - The label for the header
 * @slot logo - The logo that should be displayed. Will fall back to the SICK logo if not provided
 * @slot meta-navigation - The meta-navigation is used to add various application toolbar icons
 *                     Best used with `<syn-icon-button />` and `<syn-drop-down />`
 * @slot navigation - This slot can be used to add an optional horizontal navigation
 * @slot open-burger-menu-icon - An icon to use in lieu of the default burger-menu=open state.
 *                      The default close icon is a 'x'.
 * @slot closed-burger-menu-icon - An icon to use in lieu of the default burger-menu=closed state.
 *                      The default open icon is a burger menu.
 *
 * @event syn-burger-menu-closed - Emitted when the burger menu is toggled to closed
 * @event syn-burger-menu-hidden - Emitted when the burger menu is toggled to hidden
 * @event syn-burger-menu-open - Emitted when the burger menu is toggled to open
 *
 * @csspart base - The component's base wrapper
 * @csspart content - The wrapper most content items reside
 * @csspart logo - The wrapper the application logo resides in
 * @csspart label - The element wrapping the application name
 * @csspart meta-navigation - The Item wrapping the optional application menu
 * @csspart navigation - The wrapper that is holding the optional top navigation section
 * @csspart burger-menu-toggle-button - The button that toggles the burger menu
 */
export const SynHeader = createComponent({
  displayName: 'SynHeader',
  elementClass: Component,
  events: {
    onSynBurgerMenuClosed:
      'syn-burger-menu-closed' as EventName<SynBurgerMenuClosedEvent>,
    onSynBurgerMenuHidden:
      'syn-burger-menu-hidden' as EventName<SynBurgerMenuHiddenEvent>,
    onSynBurgerMenuOpen:
      'syn-burger-menu-open' as EventName<SynBurgerMenuOpenEvent>,
  },
  react: React,
  tagName,
});

export type { SynBurgerMenuClosedEvent } from '@synergy-design-system/components';
export type { SynBurgerMenuHiddenEvent } from '@synergy-design-system/components';
export type { SynBurgerMenuOpenEvent } from '@synergy-design-system/components';
