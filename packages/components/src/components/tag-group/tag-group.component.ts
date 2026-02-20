import { html } from 'lit';
import { property, queryAssignedElements } from 'lit/decorators.js';
import type { CSSResultGroup } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { HasSlotController } from '../../internal/slot.js';
import SynergyElement from '../../internal/synergy-element.js';
import { watch } from '../../internal/watch.js';
import componentStyles from '../../styles/component.styles.js';
import styles from './tag-group.styles.js';
import type SynTag from '../tag/tag.component.js';
import { enableDefaultSettings } from '../../utilities/defaultSettings/decorator.js';

/**
 * @summary A tag group is used to display multiple tags that belong together, often representing selected filters, categories, or user‑generated labels.
 * It arranges tags in flexible rows and supports different sizes and layouts.
 * Tags can be removable, icon‑based, or purely textual.
 *
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-tag-group--docs
 * @status stable
 *
 * @slot - The tag group's main content. Must be `<syn-tag />` elements.
 * @slot label - The tag group's label. Alternatively, you can use the `label` attribute.
 *
 * @csspart base - The component's base wrapper.
 * @csspart tag-label - The tag group's label.
 * @csspart tag-container - The container wrapping the slotted tags.
 */
@enableDefaultSettings('SynTagGroup')
export default class SynTagGroup extends SynergyElement {
  static styles: CSSResultGroup = [
    componentStyles,
    styles,
  ];

  @queryAssignedElements({ selector: 'syn-tag' }) tagsInDefaultSlot!: SynTag[];

  private readonly hasSlotController = new HasSlotController(this, 'label');

  /** The tag group's label. If you need to display HTML, use the `label` slot instead. */
  @property() label = '';

  /**
   * Controls the label position. Use 'top' to place the label above the tags, or 'start' to place it to the begin of the tag group.
   */
  @property({ attribute: 'label-position', reflect: true }) labelPosition: 'top' | 'start' = 'top';

  /** The size that should be applied to all slotted `<syn-tag>` elements */
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  private adjustTagSize() {
    this.tagsInDefaultSlot.forEach(tag => {
      tag.setAttribute('size', this.size);
    });
  }

  @watch('size', { waitUntilFirstUpdate: true })
  handleSizeChange() {
    this.adjustTagSize();
  }

  handleSlotChange() {
    this.adjustTagSize();
  }

  render() {
    const hasLabelSlot = this.hasSlotController.test('label');
    const hasLabel = this.label ? true : !!hasLabelSlot;

    const label = html`
      <span
          part="tag-label"
          class="tag-group__label"
          aria-hidden=${hasLabel ? 'false' : 'true'}
        >
          <slot name="label">${this.label}</slot>
      </span>
    `;

    /* eslint-disable @typescript-eslint/unbound-method */
    return html`
      <div 
        part="base"
        class=${classMap({
          'tag-group': true,
          'tag-group--large': this.size === 'large',
          'tag-group--medium': this.size === 'medium',
          'tag-group--small': this.size === 'small',
          'tag-group--start': this.labelPosition === 'start',
          'tag-group--top': this.labelPosition === 'top',
        })}
      >

        ${this.labelPosition === 'top' ? label : null}

        <div
          class="tag-container"
          part="tag-container"
        >
          ${this.labelPosition === 'start' ? label : null}
          <slot @slotchange=${this.handleSlotChange}></slot>
        </div>
      </div>
    `;
    /* eslint-enable @typescript-eslint/unbound-method */
  }
}
