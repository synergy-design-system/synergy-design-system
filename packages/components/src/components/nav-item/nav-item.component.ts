import { classMap } from 'lit/directives/class-map.js';
import { HasSlotController } from '../../internal/slot.js';
import type { CSSResultGroup } from 'lit';
import { html, literal } from 'lit/static-html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { property } from 'lit/decorators.js';
import SynDivider from '../divider/divider.component.js';
import SynergyElement from '../../internal/synergy-element.js';
import componentStyles from '../../styles/component.styles.js';
import styles from './nav-item.styles.js';

/**
 * @summary Flexible button / link component that can be used to quickly build navigations.
 * Takes one of 3 forms:
 * - link (overrides all other if 'href' is provided),
 * - button (default), or
 * - accordion (if 'children' slot defined).
 *
 * @status stable
 * @since 1.19.0
 *
 * @dependency syn-divider
 *
 * @event syn-show - Emitted when the item:
 * - has children,
 * - has no href,
 * - and is clicked while HTML details are hidden.
 * @event syn-hide - Emitted when the item:
 * - has children,
 * - has no href,
 * - and is clicked while HTML details are shown.
 *
 * @slot - The nav items label.
 * @slot description - **Vertical only**: Used to provide a description for the navigation item.
 * @slot children - Slot used to provide nested child navigation elements.
 * If provided, details and summary elements will be used.
 * A chevron will be shown on the right side regardless of the chevron property.
 *
 * @csspart base - The component's base wrapper including children.
 * @csspart content-wrapper - The component's content wrapper.
 * @csspart content - The component's content excluding children.
 * @csspart chevron - The container that wraps the chevron.
 * @csspart description - The component's description area below its main content.
 * @csspart divider - The component's optional top divider.
 */
export default class SynNavItem extends SynergyElement {
  static styles: CSSResultGroup = [componentStyles, styles];

  static dependencies = {
    'syn-divider': SynDivider,
  };

  private readonly hasSlotController = new HasSlotController(this, '[default]', 'description', 'children');

  /**
   * The navigation item's href target.
   * If provided, the navigation item will use an anchor tag otherwise it will use a button tag.
   * The 'children' slot and accordion behavior will be ignored if an 'href' is provided.
   */
  @property({ reflect: true }) href = '';

  /**
   * Tells the browser where to open the link.
   * Only used when `href` is defined.
   */
  @property() target: '_blank' | '_parent' | '_self' | '_top';

  /**
   * Tells the browser to download the linked file as this filename.
   * Only used when `href` is defined.
   */
  @property() download?: string;

  /**
   * Indicates that the navigation item is currently selected.
   * The aria-current attribute is set to "page" on the host if true.
   */
  @property({ reflect: true, type: Boolean }) current = false;

  /**
   * Disables the navigation item.
   */
  @property({ reflect: true, type: Boolean }) disabled = false;

  /**
   * The navigation item's font size.
   */
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * The navigation item's orientation.
   * If false, properties below this point are not used.
   */
  @property({ reflect: true, type: Boolean }) vertical = false;

  /**
   * Appends a chevron to the right side of a navigation item.
   * Only used if `vertical` is true.
   */
  @property({ reflect: true, type: Boolean }) chevron = false;

  /**
   * Adds additional padding to navigation item's left side.
   * Only used if `vertical` is true.
   */
  @property({ reflect: true, type: Boolean }) indented = false;

  /**
   * Adds additional padding to navigation item's left and right sides.
   * Only used if `vertical` is true.
   */
  @property({ reflect: true, type: Boolean }) relaxed = false;

  /**
   * Adds additional padding to navigation item's left and right sides.
   * Only used if `vertical` is true.
   */
  @property({ reflect: true, type: Boolean }) divider = false;

  /**
   * Reflects HTML details element state and allows control from parent.
   * Only used if `vertical` is true, no `href`is undefined, and `children` is defined.
   */
  @property({ reflect: true, type: Boolean }) open = false;

  private isButton(): boolean {
    return !this.href && !this.hasSlotController.test('children');
  }

  private isLink(): boolean {
    return !!this.href;
  }

  private isAccordion(): boolean {
    return !this.href && this.hasSlotController.test('children');
  }

  private handleClickButton(event: MouseEvent) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  private handleClickSummary(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (!this.disabled) {
      if (this.open) {
        this.hideDetails();
      } else {
        this.showDetails();
      }
    }
  }

  private hideDetails() {
    this.open = false;
    this.emit('syn-hide', { cancelable: true });
  }

  private showDetails() {
    this.open = true;
    this.emit('syn-show', { cancelable: true });
  }

  private calculatePaddingX(): string {
    if (this.relaxed && this.indented) return 'pl-8 pr-4';
    if (this.relaxed) return 'px-4';
    if (this.indented) return 'pl-4';
    return '';
  }

  // eslint-disable-next-line complexity
  render() {
    const isLink = this.isLink();
    const isButton = this.isButton();
    const isAccordion = this.isAccordion();

    const slots = {
      children: this.hasSlotController.test('children'),
      description: this.hasSlotController.test('description'),
      label: this.hasSlotController.test('[default]'),
      main: this.hasSlotController.test('main'),
    };
    const horizontalPaddingBottom = this.vertical ? 'pb-3' : 'pb-2';

    let tag;
    if (isLink) {
      tag = literal`a`;
    } else if (isAccordion) {
      tag = literal`summary`;
    } else {
      tag = literal`button`;
    }

    let clickListener;
    if (isAccordion) {
      clickListener = this.handleClickSummary;
    } else if (isButton) {
      clickListener = this.handleClickButton;
    }

    const root = html`
      <${tag}
        part="base"
        class=${classMap({}
          // 'hover:bg-neutral-200 group transition-all min-h-[48px] cursor-pointer relative focus-visible:focus-outline',
          // { base: 'text-base', lg: 'text-lg', sm: 'text-[14px]' }[this.size],
          // this.disabled ? 'text-neutral-500 pointer-events-none' : 'text-primary',
          // isAccordion ? 'flex flex-col' : 'inline-block w-full',
          // this.divider && this.vertical && 'mt-[1px]',
          // this.vertical ? 'px-8' : 'px-4'
        )}
        aria-controls=${ifDefined(isAccordion ? 'navigation-item-details' : undefined)}
        aria-current=${ifDefined(this.current ? 'page' : undefined)}
        aria-disabled=${this.disabled}
        ?disabled=${ifDefined(isButton ? this.disabled : undefined)}
        href=${ifDefined(this.href || undefined)}
        target=${ifDefined(isLink ? this.target : undefined)}
        download=${ifDefined(isLink ? this.download : undefined)}
        rel=${ifDefined(isLink && this.target ? 'noreferrer noopener' : undefined)}
        role=${isLink ? 'link' : 'button'}
        tabindex=${this.disabled ? '-1' : '0'}
        @click=${clickListener}
      >
        <div
          part="current-indicator"
          class=${classMap({}
            // 'absolute left-0 pointer-events-none transition-all duration-150',
            // this.vertical ? 'w-1 h-[calc(100%-8px)] top-1 group-hover:h-full group-hover:top-0' : 'h-1 w-full bottom-0',
            // this.current ? 'bg-accent' : 'bg-transparent',
            // this.disabled && 'bg-neutral-500'
          )}
        ></div>
        <span
          part="content-area"
          class=${classMap({}
            // 'relative pt-3 inline-flex justify-between items-center',
            // isAccordion ? 'grow' : 'w-full',
            // slots['description'] ? 'pb-1' : horizontalPaddingBottom,
            // this.calculatePaddingX()
          )}
        >
          ${
            this.divider && this.vertical
              ? html`<sd-divider
                  part="divider"
                  class=${classMap({}
                    // 'w-full transition-all absolute -top-[1px] left-0', this.calculatePaddingX()
                  )}
                ></sd-divider>`
              : ''
          }
          <span part="content-container" class="inline-flex items-center flex-auto">
            <slot part="content" class='inline'></slot>
          </span>
          ${
            (this.chevron || slots.children) && this.vertical
              ? html`<sd-icon
                  name="chevron-down"
                  part="chevron"
                  library="system"
                  color="currentColor"
                  class=${classMap({}
                    // 'h-6 w-6 ml-2 transition-all',
                    // isAccordion ? (this.open ? 'rotate-180' : 'rotate-0') : 'rotate-[270deg]'
                  )}
                ></sd-icon>`
              : ''
          }
        </span>
        ${slots.description && this.vertical
          ? html`
            <slot
              name="description"
              part="description"
              class=${classMap({}
                // 'inline-block text-sm text-left text-black',
                // isAccordion ? 'grow' : 'w-full',
                // horizontalPaddingBottom,
                // this.calculatePaddingX()
              )}
            ></slot>
          `
          : ''}
      </${tag}>
    `;

    return isAccordion
      ? html`<details part="details" id="navigation-item-details" ?open=${this.open} class="relative flex">
          ${root}<slot name="children"></slot>
        </details>`
      : html`${root}`;
  }
}
