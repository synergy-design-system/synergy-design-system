/**
 * ---------------------------------------------------------------------
 * 🔒 AUTOGENERATED BY VENDORISM
 * Removing this comment will prevent it from being managed by it.
 * ---------------------------------------------------------------------
 */

/* eslint-disable */
import { classMap } from 'lit/directives/class-map.js';
import { html } from 'lit';
import { LocalizeController } from '../../utilities/localize.js';
import { property, query, state } from 'lit/decorators.js';
import { watch } from '../../internal/watch.js';
import componentStyles from '../../styles/component.styles.js';
import SynergyElement from '../../internal/synergy-element.js';
import SynIcon from '../icon/icon.component.js';
import styles from './option.styles.js';
import customStyles from './option.custom.styles.js';
import { delimiterToWhiteSpace } from './utility.js';
import type { CSSResultGroup } from 'lit';

/**
 * @summary Options define the selectable items within various form controls such as [select](/components/select).
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-option--docs
 * @status stable
 * @since 2.0
 *
 * @dependency syn-icon
 *
 * @slot - The option's label.
 * @slot prefix - Used to prepend an icon or similar element to the menu item.
 * @slot suffix - Used to append an icon or similar element to the menu item.
 *
 * @csspart checked-icon - The checked icon, an `<syn-icon>` element.
 * @csspart base - The component's base wrapper.
 * @csspart label - The option's label.
 * @csspart prefix - The container that wraps the prefix.
 * @csspart suffix - The container that wraps the suffix.
 */
export default class SynOption extends SynergyElement {
  static styles: CSSResultGroup = [componentStyles, styles, customStyles];
  static dependencies = { 'syn-icon': SynIcon };

  // @ts-expect-error - Controller is currently unused
  private readonly localize = new LocalizeController(this);

  private isInitialized = false;

  @query('.option__label') defaultSlot: HTMLSlotElement;

  // the delimiter used to separate multiple values in a select
  // This is provided by the wrapping syn-select
  @state() delimiter = ' ';

  @state() current = false; // the user has keyed into the option, but hasn't selected it yet (shows a highlight)
  @state() selected = false; // the option is selected and has aria-selected="true"
  @state() hasHover = false; // we need this because Safari doesn't honor :hover styles while dragging

  /**
   * The option's value. When selected, the containing form control will receive this value. The value must be unique
   * from other options in the same group. Values may not contain spaces, as spaces are used as delimiters when listing
   * multiple values.
   */
  @property({ reflect: true }) value: string | number = '';

  /** Draws the option in a disabled state, preventing selection. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'option');
    this.setAttribute('aria-selected', 'false');
  }

  private handleDefaultSlotChange() {
    if (this.isInitialized) {
      // When the label changes, tell the controller to update
      customElements.whenDefined('syn-combobox').then(() => {
        const controller = this.closest('syn-combobox');
        if (controller) {
          controller.handleDefaultSlotChange();
        }
      });
      customElements.whenDefined('syn-select').then(() => {
        const controller = this.closest('syn-select');
        if (controller) {
          controller.handleDefaultSlotChange();
        }
      });
    } else {
      this.isInitialized = true;
    }
  }

  private handleMouseEnter() {
    this.hasHover = true;
  }

  private handleMouseLeave() {
    this.hasHover = false;
  }

  @watch('disabled')
  handleDisabledChange() {
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
  }

  @watch('selected')
  handleSelectedChange() {
    this.setAttribute('aria-selected', this.selected ? 'true' : 'false');
  }

  @watch('value')
  handleValueChange() {
    if (typeof this.value === 'number') {
      return;
    }

    // Ensure the value is a string. This ensures the next line doesn't error and allows framework users to pass numbers
    // instead of requiring them to cast the value to a string.
    if (typeof this.value !== 'string') {
      this.value = String(this.value);
    }

    const { delimiter } = this;

    if (this.value.includes(delimiter)) {
      console.error(`Option values cannot include "${delimiter}". All occurrences of "${delimiter}" have been replaced with "_".`, this);
      this.value = delimiterToWhiteSpace(this.value, this.delimiter);
    }
  }

  /** Returns a plain text label based on the option's content. */
  getTextLabel() {
    const nodes = this.childNodes;
    let label = '';

    [...nodes].forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        if (!(node as HTMLElement).hasAttribute('slot')) {
          label += (node as HTMLElement).textContent;
        }
      }

      if (node.nodeType === Node.TEXT_NODE) {
        label += node.textContent;
      }
    });

    return label.trim();
  }

  render() {
    return html`
      <div
        part="base"
        class=${classMap({
          option: true,
          'option--current': this.current,
          'option--disabled': this.disabled,
          'option--selected': this.selected,
          'option--hover': this.hasHover
        })}
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        <syn-icon part="checked-icon" class="option__check" name="check" library="system" aria-hidden="true"></syn-icon>
        <slot part="prefix" name="prefix" class="option__prefix"></slot>
        <slot part="label" class="option__label" @slotchange=${this.handleDefaultSlotChange}></slot>
        <slot part="suffix" name="suffix" class="option__suffix"></slot>
      </div>
    `;
  }
}
