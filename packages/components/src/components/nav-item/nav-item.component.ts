import { classMap } from 'lit/directives/class-map.js';
import type { CSSResultGroup } from 'lit';
import { html, literal } from 'lit/static-html.js';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import SynDivider from '../divider/divider.component.js';
import { HasSlotController } from '../../internal/slot.js';
import SynergyElement from '../../internal/synergy-element.js';
import componentStyles from '../../styles/component.styles.js';
import styles from './nav-item.styles.js';

/**
 * @summary Flexible button / link component that can be used to quickly build navigations.
 * Takes one of 3 forms:
 * - link (overrides all other if 'href' is provided),
 * - button (default),
 * - or accordion (if 'children' slot defined).
 *
 * @status stable
 * @since 1.11.0
 *
 * @dependency syn-divider
 *
 * @event syn-show - Emitted when the navigation item:
 * - has children,
 * - has no href
 * - and is clicked while HTML details are hidden.
 *
 * @event syn-hide - Emitted when the navigation item:
 * - has children,
 * - has no href
 * - and is clicked while HTML details are shown.
 *
 * @slot - The navigation item's label.
 * @slot prefix - A presentational prefix icon or similar element.
 * @slot suffix - A presentational suffix icon or similar element.
 * @slot children - Slot used to provide nested child navigation elements.
 * If provided, details and summary elements will be used.
 * A chevron will be shown on the right side regardless of the chevron property.
 *
 * @csspart base - The component's base wrapper including children.
 * @csspart children - The wrapper that holds the children
 * @csspart content-wrapper - The component's content wrapper.
 * @csspart content - The component's content excluding children.
 * @csspart current-indicator - The indicator used when current is set to true
 * @csspart chevron - The container that wraps the chevron.
 * @csspart details - The details element rendered when there are children available
 * @csspart divider - The components optional top divider.
 * @csspart prefix - The container that wraps the prefix.
 * @csspart suffix - The container that wraps the suffix.
 */
export default class SynNavItem extends SynergyElement {
  static styles: CSSResultGroup = [componentStyles, styles];

  static dependencies = {
    'syn-divider': SynDivider,
  };

  private readonly hasSlotController = new HasSlotController(this, '[default]', 'children', 'prefix', 'suffix');

  /**
   * The navigation item's href target.
   * If provided, the navigation item will use an anchor tag otherwise it will use a button tag.
   * The 'children' slot and accordion behavior will be ignored if an 'href' is provided.
   */
  @property({ reflect: true }) href = '';

  /*
   * Indicates that the navigation item is currently selected.
   * The aria-current attribute is set to "page" on the host if true.
   */
  @property({ reflect: true, type: Boolean }) current = false;

  /**
   * Disables the navigation item.
   */
  @property({ reflect: true, type: Boolean }) disabled = false;

  /**
   * The navigation item's orientation.
   */
  @property({ reflect: true, type: Boolean }) vertical = false;

  /**
   * Appends a chevron to the right side of a navigation item.
   * Only used if `vertical` is true.
   */
  @property({ reflect: true, type: Boolean }) chevron = false;

  /**
   * Reflects HTML details element state and allows control from parent.
   * Only used if `vertical` is true, no `href`is undefined, and `children` is defined.
   */
  @property({ reflect: true, type: Boolean }) open = false;

  /**
   * Toggle to true to show a divider above the element.
   * Only available when vertical
   */
  @property({ reflect: true, type: Boolean }) divider = false;

  private isButton(): boolean {
    return !this.href && !this.hasSlotController.test('children');
  }

  private isLink(): boolean {
    return !!this.href;
  }

  private isAccordion(): boolean {
    return !this.href && this.hasSlotController.test('children');
  }

  private handleClickButton(e: MouseEvent) {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  private handleClickSummary(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (this.disabled) return;

    if (this.open) {
      this.hideDetails();
    } else {
      this.showDetails();
    }
  }

  private hideDetails() {
    this.open = false;
    this.emit('syn-hide', {
      cancelable: true,
    });
  }

  private showDetails() {
    this.open = true;
    this.emit('syn-show', {
      cancelable: true,
    });
  }

  /* eslint-disable complexity */
  render() {
    const isButton = this.isButton();
    const isLink = this.isLink();
    const isAccordion = this.isAccordion();

    let tag = literal`button`;
    if (isLink) tag = literal`a`;
    else if (isAccordion) tag = literal`summary`;

    const hasChildren = this.hasSlotController.test('children');
    const hasChevron = (this.chevron || hasChildren) && this.vertical;

    // Define the click method to use
    let clickAction;
    if (isAccordion) {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      clickAction = this.handleClickSummary;
    } else if (isButton) {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      clickAction = this.handleClickButton;
    }

    /* eslint-disable lit/no-invalid-html */
    /* eslint-disable lit/binding-positions */
    const root = html`
      <${tag}
        aria-controls=${ifDefined(isAccordion ? 'navigation-item-details' : undefined)}
        aria-current=${ifDefined(this.current ? 'page' : undefined)}
        aria-disabled=${this.disabled}
        class=${classMap({
          'nav-item': true,
          'nav-item--current': this.current,
          'nav-item--disabled': this.disabled,
          'nav-item--has-prefix': this.hasSlotController.test('prefix'),
          'nav-item--has-suffix': this.hasSlotController.test('suffix'),
          'nav-item-is-accordion': isAccordion,
        })}
        @click=${clickAction}
        ?disabled=${ifDefined(isLink ? undefined : this.disabled)}
        part="base"
        role=${isLink ? 'link' : 'button'}
        tabindex=${this.disabled ? '-1' : '0'}
      >
        
        <hr
          class=${classMap({
            'current-indicator': true,
            'current-indicator--disabled': this.disabled,
            'current-indicator--horizontal': !this.vertical,
            'current-indicator--vertical': this.vertical,
            'current-indicator--visible': this.current,
          })}
          part="current-indicator"
        />

        ${this.divider && this.vertical
          ? html`<syn-divider class="divider" part="divider"></syn-divider>`
          : ''
        }

        <div class="nav-item__content">
          <slot name="prefix" part="prefix" class="nav-item__prefix"></slot>

          <div part="content-container" class="nav-item__content-container">
            <slot part="content"></slot>
          </div>

          <slot name="suffix" part="suffix" class="nav-item__suffix"></slot>

          ${hasChevron ? html`
            <syn-icon
              class=${classMap({
                'nav-item__chevron': true,
                'nav-item__chevron-open': this.open,
              })}
              name="chevron-down"
              part="chevron"
              library="system"
              color="currentColor"
            /></syn-icon>`
          : ''}
        </div>

      </${tag}>
    `;
    /* eslint-enable lit/no-invalid-html */
    /* eslint-enable lit/binding-positions */
    /* eslint-enable complexity */

    return isAccordion ? html`
      <details
        id="navigation-item-details"
        ?open=${this.open}
        part="details"
      >
        ${root}
        <slot class="children" name="children" part="children"></slot>
      </details>
    ` : root;
  }
}
