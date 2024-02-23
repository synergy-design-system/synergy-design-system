/* eslint-disable @typescript-eslint/unbound-method */
import { classMap } from 'lit/directives/class-map.js';
import { html } from 'lit/static-html.js';
import { property } from 'lit/decorators.js';
import type { CSSResultGroup } from 'lit';
import SynergyElement from '../../internal/synergy-element.js';
import { HasSlotController } from '../../internal/slot.js';
import componentStyles from '../../styles/component.styles.js';
import styles from './header.styles.js';
import SynIcon from '../icon/icon.js';

/**
 * @summary The <syn-header /> element provides a generic application header
 * that can be used to add applications name, toolbar and primary navigation.
 *
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-header--docs
 * @status stable
 * @since 1.8.0
 *
 * @slot - The label for the header. Will automatically be hidden on mobile.
 * @slot logo - The logo that should be displayed. Will fall back to the SICK logo if not applied.
 * @slot meta-navigation - Used to add various application toolbar icons.
 *                     Best used with `<syn-icon-button />` and `<syn-drop-down />`
 * @slot navigation - Used to add an optional horizontal navigation
 *
 * @csspart base - The component's base wrapper.
 * @csspart content - The wrapper where most content items reside
 * @csspart logo - The wrapper where the application logo resides in
 * @csspart label - Wrapper of the application name label
 * @csspart meta-navigation - Item that wraps the optional application menu
 * @csspart navigation - Wrapper that holds the optional top navigation section
 */
export default class SynHeader extends SynergyElement {
  static styles: CSSResultGroup = [
    componentStyles,
    styles,
  ];

  static dependencies = {
    'syn-icon': SynIcon,
  };

  private readonly hasSlotController = new HasSlotController(this, '[default]', 'logo', 'label', 'meta-navigation', 'navigation');

  /**
   * The headers label. If you need to display HTML, use the `label` slot instead.
   */
  @property() label = '';

  /**
   * The logo-label attribute can be used as fallback description text
   * in cases where the logo cannot be loaded.
   * This only works for the `syn-icon` that gets slotted into the `navigation` as fallback.
   * If custom content is provided in the `logo` slot,
   * please take care that it is accessible by yourself!
   */
  @property({ attribute: 'logo-label' }) logoLabel = 'SICK Sensor Intelligence';

  render() {
    const hasNavigation = this.hasSlotController.test('navigation');

    return html`
      <header
        class=${classMap({
          header: true,
          'header--has-navigation': hasNavigation,
        })}
        part="base"
      >
        <!-- .header__content -->
        <div part="content" class="header__content">

          <div part="logo" class="header__logo">
            <slot name="logo">
              <syn-icon name="logo-color" library="system" label=${this.logoLabel}></syn-icon>
            </slot>
          </div>

          <div part="label" class="header__label">
            <slot>
              ${this.label}
            </slot>
          </div>

          <div part="meta-navigation" class="header__meta-navigation">
            <slot name="meta-navigation"></slot>
          </div>
        </div>
        <!-- /.header__content -->

        <div part="navigation" class="header__navigation">
          <slot name="navigation"></slot>
        </div>
      </header>
    `;
  }
}
