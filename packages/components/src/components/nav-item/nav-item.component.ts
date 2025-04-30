import { classMap } from 'lit/directives/class-map.js';
import type { CSSResultGroup, PropertyValues } from 'lit';
import { html, literal } from 'lit/static-html.js';
import { property, query, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import SynDivider from '../divider/divider.component.js';
import { HasSlotController } from '../../internal/slot.js';
import { watch } from '../../internal/watch.js';
import SynergyElement from '../../internal/synergy-element.js';
import componentStyles from '../../styles/component.styles.js';
import styles from './nav-item.styles.js';

/**
 * @summary Flexible button / link component that can be used to quickly build navigations.
 * Takes one of 3 forms:
 * - button (default),
 * - link (overrides button if a 'href' is provided),
 * - or accordion (overrides all other if 'children' slot is defined).
 *
 * @status stable
 * @since 1.14.0
 *
 * @dependency syn-divider
 *
 * @event syn-show - Emitted when the navigation item:
 * - has children,
 * - and is clicked while HTML details are hidden.
 *
 * @event syn-hide - Emitted when the navigation item:
 * - has children,
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
 * @cssproperty --display-children - Display property of the children. Defaults to "contents"
 */
export default class SynNavItem extends SynergyElement {
  static styles: CSSResultGroup = [componentStyles, styles];

  static dependencies = {
    'syn-divider': SynDivider,
  };

  private readonly hasSlotController = new HasSlotController(this, '[default]', 'children', 'prefix', 'suffix');

  private resizeObserver: ResizeObserver;

  private mutationObserver: MutationObserver;

  /**
   * The current focus state
   */
  @state() private hasFocus = false;

  /**
   * Only the prefix should be displayed
   */
  @state() private showPrefixOnly = false;

  /**
   * A nested nav-item is marked as current
   */
  @state() private currentMarkedChild = false;

  /**
   * The content area is multiline
   */
  @state() private isMultiLine = false;

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
   *
   * If the 'children' slot is provided, the navigation item will ignore the 'href' and use
   * accordion behavior.
   */
  @property({ reflect: true, type: String }) href: string;

  /** Tells the browser where to open the link. Only used when `href` is present. */
  @property() target: '_blank' | '_parent' | '_self' | '_top';

  /**
   * When using `href`, this attribute will map to the underlying link's `rel` attribute.
   * Unlike regular links, the default is `noreferrer noopener` to prevent security exploits.
   *
   * However, if you're using `target` to point to a specific tab/window,
   * this will prevent that from working correctly.
   *
   * You can remove or change the default value by setting the attribute
   * to an empty string or a value of your choice, respectively.
   */
  @property() rel = 'noreferrer noopener';

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
  @property({ reflect: true, type: Boolean }) horizontal = false;

  /**
   * Appends a chevron to the right side of a navigation item.
   * Only used if `horizontal` is false.
   */
  @property({ reflect: true, type: Boolean }) chevron = false;

  /**
   * Reflects HTML details element state and allows control from parent.
   * Only used if `horizontal` is false and `children` is defined.
   */
  @property({ reflect: true, type: Boolean }) open = false;

  /**
   * Toggle to true to show a divider above the element.
   * Only available when horizontal is false.
   */
  @property({ reflect: true, type: Boolean }) divider = false;

  private isButton(): boolean {
    return !this.href && !this.hasSlotController.test('children');
  }

  private isLink(): boolean {
    return !!this.href && !this.hasSlotController.test('children');
  }

  private isAccordion(): boolean {
    return this.hasSlotController.test('children');
  }

  // eslint-disable-next-line class-methods-use-this
  private getNavItemChildren(childrenSlot: HTMLSlotElement): SynNavItem[] {
    return Array.from(
      childrenSlot?.assignedElements({
        flatten: true,
      }) as HTMLElement[]
      || [],
    )
      .map(slottedElement => (slottedElement.tagName.toLowerCase() === 'syn-nav-item' ? slottedElement as SynNavItem : Array.from(slottedElement.querySelectorAll<SynNavItem>(':scope > syn-nav-item'))))
      .flat();
  }

  private getAllNestedNavItems(childrenSlot: HTMLSlotElement): SynNavItem[] {
    const allNavItems = this.getNavItemChildren(childrenSlot);

    const nestedNavItems = allNavItems
      .map(item => item.getAllNestedNavItems(item.childrenSlot))
      .flat();

    return allNavItems.concat(nestedNavItems);
  }

  private handleCurrentMarkedChild() {
    const sideNav = this.closest('syn-side-nav');

    if (!this.open || !!(sideNav?.variant === 'rail')) {
      this.currentMarkedChild = this
        .getAllNestedNavItems(this.childrenSlot)
        .some(item => item.current);
    }
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
    const computedStyle = getComputedStyle(this);
    const lengthStyle = computedStyle.length;

    // This workaround is needed for firefox.
    // When the nav-item is used inside a custom-element with a custom-element in it
    // (e.g syn-side-nav with integrated syn-drawer), the getComputedStyle property is not yet there
    // Moving it in the next render cycle works.
    // Probably related to the firefox special behavior. See: https://caniuse.com/mdn-api_window_getcomputedstyle
    if (lengthStyle === 0) {
      setTimeout(() => {
        this.handleSlotChange();
      });
      return;
    }

    this.handleCurrentMarkedChild();

    // Use the current level of the component
    const level = computedStyle.getPropertyValue('--indentation');

    // We allow at most 3 levels
    const nextLevel = Math.min(parseInt(level, 10) + 1, 2);

    this.getNavItemChildren(this.childrenSlot)
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
      // The "requestAnimationFrame" seems necessary for being able to test
      // <syn-side-nav variant="sticky"/> without errors. Otherwise we get an "ResizeObserver loop
      // completed with undelivered notifications." error in the test.
      // The resize observer callback retriggers a new nav-item render cycle, because of the
      //  "this.showPrefixOnly". Via "requestAnimationFrame" we get rid of it. See also: https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver#observation_errors
      requestAnimationFrame(() => {
        if (entry.contentRect.width < 100) {
          const hasPrefix = this.hasSlotController.test('prefix');
          this.showPrefixOnly = hasPrefix;
        } else {
          this.showPrefixOnly = false;
        }

        if (entry.contentRect.height > 48) {
          this.isMultiLine = true;
        } else {
          this.isMultiLine = false;
        }
      });
    });
  }

  // Make sure the resize observer is disconnected when the horizontal property is set to true
  // In this case we, never want it to use prefix only mode
  @watch('horizontal', { waitUntilFirstUpdate: true })
  handleHorizontalChange() {
    if (this.horizontal) {
      this.resizeObserver.disconnect();
    } else {
      this.resizeObserver.observe(this);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.resizeObserver = new ResizeObserver((entries) => this.handleWidth(entries));
    if (!this.horizontal) {
      this.resizeObserver.observe(this);
    }
  }

  firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    this.mutationObserver = new MutationObserver(() => {
      if (this.childrenSlot) {
        this.handleCurrentMarkedChild();
      }
    });

    this.mutationObserver.observe(this, {
      attributeFilter: ['current', 'open'],
      childList: true,
      subtree: true,
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
    this.mutationObserver?.disconnect();
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

    const sideNav = this.closest('syn-side-nav');

    const showCurrentIndicatorForNested = (this.currentMarkedChild && !this.open)
      || (this.currentMarkedChild && this.open && !!(sideNav?.variant === 'rail') && !sideNav?.open);

    // Defines the initial tag to use for the root component
    let tag = literal`button`;
    if (isAccordion) tag = literal`summary`;
    else if (isLink) tag = literal`a`;

    const hasChevron = (this.chevron || isAccordion) && !this.horizontal;

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
          'nav-item--current': this.current || showCurrentIndicatorForNested,
          'nav-item--disabled': this.disabled,
          'nav-item--focused': this.hasFocus,
          'nav-item--has-content': this.hasSlotController.test('[default]'),
          'nav-item--has-prefix': this.hasSlotController.test('prefix'),
          'nav-item--has-suffix': this.hasSlotController.test('suffix'),
          'nav-item--horizontal': this.horizontal,
          'nav-item--is-link': isLink,
          'nav-item--multi-line': this.isMultiLine,
          'nav-item--show-prefix-only': this.showPrefixOnly,
          'nav-item--vertical': !this.horizontal,
          'nav-item-is-accordion': isAccordion,
        })}
        @click=${clickAction}
        ?disabled=${ifDefined(isLink ? undefined : this.disabled)}
        @focus=${this.handleFocus}
        href=${ifDefined(isLink ? this.href : undefined)}
        part="base"
        role=${isLink ? 'link' : 'button'}
        rel=${ifDefined(isLink ? this.rel : undefined)}
        tabindex=${this.disabled ? '-1' : '0'}
        target=${ifDefined(isLink ? this.target : undefined)}
      >

        ${this.divider && !this.horizontal
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

          <div
            class=${classMap({
              'current-indicator': true,
              'current-indicator--disabled': this.disabled,
              'current-indicator--visible': this.current || showCurrentIndicatorForNested,
            })}
            part="current-indicator"
          >
          </div>
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
