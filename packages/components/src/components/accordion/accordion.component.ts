import { html } from 'lit';
import { property, queryAssignedElements } from 'lit/decorators.js';
import type { CSSResultGroup } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
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
 * @slot - The accordion's main content. Must be `<syn-details />` elements.
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
   * Indicates whether or not multiple `<syn-detail>` elements can be open at the same time.
   */
  @property({ attribute: 'close-others', type: Boolean }) closeOthers = false;

  /** Draws the accordion and the slotted `<syn-details>` as contained elements. */
  @property({ reflect: true, type: Boolean }) contained = false;

  /** The size that should be applied to all slotted `<syn-details>` elements */
  @property({ reflect: true }) size: 'medium' | 'large' = 'medium';

  private adjustDetailsSize() {
    this.detailsInDefaultSlot.forEach(detail => {
      detail.setAttribute('size', this.size);
    });
  }

  private adjustDetailsContained() {
    this.detailsInDefaultSlot.forEach(detail => {
      // eslint-disable-next-line no-param-reassign
      detail.contained = this.contained;
    });
  }

  @watch('size', { waitUntilFirstUpdate: true })
  handleSizeChange() {
    this.adjustDetailsSize();
  }

  @watch('contained', { waitUntilFirstUpdate: true })
  handleContainedChange() {
    this.adjustDetailsContained();
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
    this.adjustDetailsContained();
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
      <div 
        part="base"
        class=${classMap({
          accordion: true,
          'accordion--contained': this.contained,
        })}>
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
    /* eslint-enable @typescript-eslint/unbound-method */
  }
}
