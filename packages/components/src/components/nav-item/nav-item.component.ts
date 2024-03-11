import { classMap } from 'lit/directives/class-map.js';
import type { CSSResultGroup } from 'lit';
import { html, literal } from 'lit/static-html.js';
import { property, query, state } from 'lit/decorators.js';
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
 * @event syn-blur - Emitted when the button loses focus.
 * @event syn-focus - Emitted when the button gains focus.
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
 *
 * @cssproperty --indentation - Numeric value, indicating the level the item is placed at.
 * @cssproperty --indentation-stepping - The amount of pixels each level will indent.
 * @cssproperty --border-bottom-hover-color - The border bottom color that gets applied on hover
 */
export default class SynNavItem extends SynergyElement {
  static styles: CSSResultGroup = [componentStyles, styles];

  static dependencies = {
    'syn-divider': SynDivider,
  };

  private readonly hasSlotController = new HasSlotController(this, '[default]', 'children', 'prefix', 'suffix');

  private resizeObserver: ResizeObserver;

  /**
   * The current focus state
   */
  @state() private hasFocus = false;

  /**
   * Only the prefix should be displayed
   */
  @state() private showPrefixOnly = false;

  /**
   * Reference to the children slot
   */
  @query('slot[name="children"]') childrenSlot: HTMLSlotElement;

  /**
   * Reference to the outermost button
   */
  @query('.nav-item') control: HTMLButtonElement | HTMLLinkElement | HTMLElement;

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

  /**
   * Automatically add the correct level of indentation for sub items if none is provided
   */
  private handleSlotChange() {
    // Use the current level of the component
    const level = getComputedStyle(this).getPropertyValue('--indentation');

    // We allow at most 3 levels
    const nextLevel = Math.min(parseInt(level, 10) + 1, 2);

    Array.from(
      this.childrenSlot.assignedElements({
        flatten: true,
      }) as HTMLElement[],
    )
      .map(slottedElement => Array.from(slottedElement.querySelectorAll<SynNavItem>(':scope > syn-nav-item')))
      .flat()
      .forEach(item => {
        item.style.setProperty('--indentation', nextLevel.toFixed(0));
      });
  }

  private handleBlur() {
    this.hasFocus = false;
    this.emit('syn-blur');
  }

  private handleFocus() {
    this.hasFocus = true;
    this.emit('syn-focus');
  }

  private handleWidth(entries: ResizeObserverEntry[]) {
    entries.forEach(entry => {
      // TODO: Which breakpoint do we want?
      if (entry.contentRect.width < 100) {
        const hasPrefix = this.hasSlotController.test('prefix');
        // TODO: Do we want to shrink the content of the nav-item to prefix,
        // only if the prefix is a syn-icon or always?
        // const prefixIconSlot = this.querySelector(':scope > syn-icon[slot="prefix"]');
        // this.showPrefixOnly = hasPrefix && !!prefixIconSlot;
        this.showPrefixOnly = hasPrefix;
      } else {
        this.showPrefixOnly = false;
      }
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this.resizeObserver = new ResizeObserver((entries) => this.handleWidth(entries));
    this.resizeObserver.observe(this);
  }

  /**
   * Removes focus from the button.
   */
  blur() {
    this.control.blur();
  }

  /**
   * Simulates a click on the nav-items button, link or summary.
   */
  click() {
    this.control.click();
  }

  /**
   * Sets focus on the nav-item
   */
  focus(options?: FocusOptions) {
    this.control.focus(options);
  }

  // eslint-disable-next-line complexity
  render() {
    const isButton = this.isButton();
    const isLink = this.isLink();
    const isAccordion = this.isAccordion();

    // Defines the initial tag to use for the root component
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
    /* eslint-disable @typescript-eslint/unbound-method */
    const root = html`
      <${tag}
        aria-controls=${ifDefined(isAccordion ? 'navigation-item-details' : undefined)}
        aria-current=${ifDefined(this.current ? 'page' : undefined)}
        aria-disabled=${this.disabled}
        @blur=${this.handleBlur}
        class=${classMap({
          'nav-item': true,
          'nav-item--current': this.current,
          'nav-item--disabled': this.disabled,
          'nav-item--focused': this.hasFocus,
          'nav-item--has-prefix': this.hasSlotController.test('prefix'),
          'nav-item--has-suffix': this.hasSlotController.test('suffix'),
          'nav-item--show-prefix-only': this.showPrefixOnly,
          'nav-item-is-accordion': isAccordion,
        })}
        @click=${clickAction}
        ?disabled=${ifDefined(isLink ? undefined : this.disabled)}
        @focus=${this.handleFocus}
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

        <div class="nav-item__content" part="content-wrapper">
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
              color="currentColor"
              library="system"
              name="chevron-down"
              part="chevron"
            /></syn-icon>`
          : ''}
        </div>

      </${tag}>
    `;
    /* eslint-enable lit/no-invalid-html */
    /* eslint-enable lit/binding-positions */

    return isAccordion ? html`
      <details
        id="navigation-item-details"
        ?open=${this.open}
        part="details"
      >
        ${root}
        <slot
          class="children"
          name="children"
          part="children"
          @slotchange=${this.handleSlotChange}
        ></slot>
      </details>
    ` : root;
    /* eslint-enable @typescript-eslint/unbound-method */
  }
}
