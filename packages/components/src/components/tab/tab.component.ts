import { classMap } from 'lit/directives/class-map.js';
import { html } from 'lit';
import { property, query } from 'lit/decorators.js';
import type { CSSResultGroup } from 'lit';
import { LocalizeController } from '../../utilities/localize.js';
import { watch } from '../../internal/watch.js';
import componentStyles from '../../styles/component.styles.js';
import SynergyElement from '../../internal/synergy-element.js';
import SynIconButton from '../icon-button/icon-button.component.js';
import styles from './tab.styles.js';

let id = 0;

/**
 * @summary Tabs are used inside [tab groups](/components/tab-group) to represent and activate [tab panels](/components/tab-panel).
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-tab--docs
 * @status stable
 * @since 2.1.0
 *
 * @dependency syn-icon-button
 *
 * @slot - The tab's label.
 *
 * @event syn-close - Emitted when the tab is closable and the close button is activated.
 *
 * @csspart base - The component's base wrapper.
 * @csspart close-button - The close button, an `<syn-icon-button>`.
 * @csspart close-button__base - The close button's exported `base` part.
 */
export default class SynTab extends SynergyElement {
  static styles: CSSResultGroup = [componentStyles, styles];

  static dependencies = { 'syn-icon-button': SynIconButton };

  private readonly localize = new LocalizeController(this);

  // eslint-disable-next-line no-plusplus
  private readonly attrId = ++id;

  private readonly componentId = `syn-tab-${this.attrId}`;

  @query('.tab') tab: HTMLElement;

  /** The name of the tab panel this tab is associated with. The panel must be located in the same tab group. */
  @property({ reflect: true }) panel = '';

  /** Draws the tab in an active state. */
  @property({ reflect: true, type: Boolean }) active = false;

  /** Makes the tab closable and shows a close button. */
  @property({ reflect: true, type: Boolean }) closable = false;

  /** Disables the tab and prevents selection. */
  @property({ reflect: true, type: Boolean }) disabled = false;

  /**
   * @internal
   * Need to wrap in a `@property()` otherwise CustomElement throws a "The result must not have attributes" runtime error.
   */
  @property({ reflect: true, type: Number }) tabIndex = 0;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'tab');
  }

  private handleCloseClick(event: Event) {
    event.stopPropagation();
    this.emit('syn-close');
  }

  @watch('active')
  handleActiveChange() {
    this.setAttribute('aria-selected', this.active ? 'true' : 'false');
  }

  @watch('disabled')
  handleDisabledChange() {
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');

    if (this.disabled && !this.active) {
      this.tabIndex = -1;
    } else {
      this.tabIndex = 0;
    }
  }

  /* eslint-disable @typescript-eslint/unbound-method */
  render() {
    // If the user didn't provide an ID, we'll set one so we can link tabs and tab panels with aria labels
    this.id = this.id.length > 0 ? this.id : this.componentId;

    return html`
      <div
        part="base"
        class=${classMap({
          tab: true,
          'tab--active': this.active,
          'tab--closable': this.closable,
          'tab--disabled': this.disabled,
        })}
      >
        <slot></slot>
        ${this.closable
          ? html`
              <syn-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                name="x-lg"
                library="system"
                label=${this.localize.term('close')}
                class="tab__close-button"
                @click=${this.handleCloseClick}
                tabindex="-1"
              ></syn-icon-button>
            `
          : ''}
      </div>
    `;
  }
  /* eslint-enable @typescript-eslint/unbound-method */
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-tab': SynTab;
  }
}
