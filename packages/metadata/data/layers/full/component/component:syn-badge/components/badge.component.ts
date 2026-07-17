import {
  type CSSResultGroup,
  html,
} from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property } from 'lit/decorators.js';
import componentStyles from '../../styles/component.styles.js';
import SynergyElement from '../../internal/synergy-element.js';
import { LocalizeController } from '../../utilities/localize.js';
import styles from './badge.styles.js';
import { enableDefaultSettings } from '../../utilities/defaultSettings/decorator.js';

/**
 * @summary Badges are used to draw attention and display statuses or counts.
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-badge--docs
 * @status stable
 * @since 1.14.0
 *
 * @slot - The badge's content.
 *
 * @csspart base - The component's base wrapper.
 */
@enableDefaultSettings('SynBadge')
export default class SynBadge extends SynergyElement {
  private readonly localize = new LocalizeController(this);

  static styles: CSSResultGroup = [componentStyles, styles];

  /** The badge's theme variant. */
  @property({ reflect: true }) variant: 'primary' | 'success' | 'neutral' | 'warning' | 'critical' | 'error' | 'danger' = 'primary';

  render() {
    return html`
      <span
        part="base"
        class=${classMap({
          badge: true,
          'badge--critical': this.variant === 'critical',
          'badge--danger': this.variant === 'danger', // @todo: Major: Remove .badge--danger
          'badge--error': this.variant === 'error',
          'badge--neutral': this.variant === 'neutral',
          'badge--primary': this.variant === 'primary',
          'badge--success': this.variant === 'success',
          'badge--warning': this.variant === 'warning',
        })}
        role="status"
      >
        <slot>
          <span class="visually-hidden">
            ${this.localize.term(
              (this.variant === 'primary' || this.variant === 'neutral')
                ? 'notification'
                : this.variant,
              )}
          </span>
        </slot>
      </span>
    `;
  }
}
