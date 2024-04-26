// ---------------------------------------------------------------------
// 🔒 AUTOGENERATED @synergy-design-system/react wrappers for @synergy-design-system/components
// Please do not edit this file directly!
// It will get recreated when running pnpm build.
// ---------------------------------------------------------------------
import * as React from 'react';
import { createComponent } from '@lit/react';
import Component from '@synergy-design-system/components/components/header/header.component.js';

import { type EventName } from '@lit/react';
import type { SynBurgerMenuHideEvent, SynBurgerMenuShowEvent } from '@synergy-design-system/components';

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
 * @slot - The label for the header.
 * @slot logo - The logo that should be displayed. Will fall back to the SICK logo if not provided.
 * @slot meta-navigation - The meta-navigation is used to add various application toolbar icons.
 *                     Best used with `<syn-icon-button />` and `<syn-drop-down />`
 * @slot navigation - This slot can be used to add an optional horizontal navigation
 * @slot show-burger-menu - An icon to use in lieu of the default show burger menu icon
 * @slot hide-burger-menu - An icon to use in lieu of the default hide burger menu icon
 *
 * @event syn-burger-menu-show - Emitted when the burger menu button is toggled to visible
 * @event syn-burger-menu-hide - Emitted when the burger menu button is toggled to not visible
 *
 * @csspart base - The component's base wrapper.
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
    onSynBurgerMenuShow: 'syn-burger-menu-show' as EventName<SynBurgerMenuShowEvent>,
    onSynBurgerMenuHide: 'syn-burger-menu-hide' as EventName<SynBurgerMenuHideEvent>,
  },
  react: React,
  tagName,
});

export type { SynBurgerMenuShowEvent } from '@synergy-design-system/components';
export type { SynBurgerMenuHideEvent } from '@synergy-design-system/components';