import { html } from 'lit';
import { property, queryAssignedElements } from 'lit/decorators.js';
import type { CSSResultGroup } from 'lit';
import SynergyElement from '../../internal/synergy-element.js';
import { watch } from '../../internal/watch.js';
import componentStyles from '../../styles/component.styles.js';
import styles from './accordion.styles.js';
import type SynDetails from '../details/details.component.js';

/**
 * @summary Accordions provide the ability to group a list of `<syn-details>`.
 *
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-accordion--docs
 * @status stable
 * @since 1.23.0
 *
 * @slot - The accordion's main content.
 *
 * @csspart base - The component's base wrapper.
 */
export default class SynAccordion extends SynergyElement {
  static styles: CSSResultGroup = [
    componentStyles,
    styles,
  ];

  @queryAssignedElements({ selector: 'syn-details' }) detailsInDefaultSlot!: SynDetails[];

  /**
   * Indicates whether or not multiple `<syn-details>` elements can be open at the same time.
   */
  @property({ attribute: 'close-others', type: Boolean }) closeOthers = false;

  /** The size that should be applied to all `<syn-detail>`'s */
  @property({ reflect: true }) size: 'small' | 'medium' = 'medium';

  private adjustDetailsSize() {
    this.detailsInDefaultSlot.forEach(detail => {
      detail.setAttribute('size', this.size);
    });
  }

  @watch('size', { waitUntilFirstUpdate: true })
  handleSizeChange() {
    this.adjustDetailsSize();
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('syn-show', this.handleAccordionShow);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('syn-show', this.handleAccordionShow);
  }

  handleSlotChange() {
    this.adjustDetailsSize();
  }

  private handleAccordionShow = (event: Event) => {
    if (this.closeOthers) {
      this.detailsInDefaultSlot.forEach(detailsElement => {
        // Break if detailsElement sent the event
        if (detailsElement === event.target) {
          return;
        }
        // Break if detailsElement is outside this group
        if (detailsElement.parentNode !== (event.target as HTMLUnknownElement).parentNode) {
          return;
        }
        detailsElement.removeAttribute('open');
      });
    }
  };

  render() {
    /* eslint-disable @typescript-eslint/unbound-method */
    return html`
      <div part="">
      <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
    /* eslint-enable @typescript-eslint/unbound-method */
  }
}
