/* eslint-disable @typescript-eslint/no-floating-promises */
import {
  type CSSResultGroup,
  html,
} from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property, query } from 'lit/decorators.js';
import { animateTo, stopAnimations } from '../../internal/animate.js';
import { blurActiveElement } from '../../internal/closeActiveElement.js';
import { getAnimation, setDefaultAnimation } from '../../utilities/animation-registry.js';
import { HasSlotController } from '../../internal/slot.js';
import { LocalizeController } from '../../utilities/localize.js';
import { waitForEvent } from '../../internal/event.js';
import { watch } from '../../internal/watch.js';
import componentStyles from '../../styles/component.styles.js';
import SynergyElement from '../../internal/synergy-element.js';
import SynIconButton from '../icon-button/icon-button.component.js';
import styles from './alert.styles.js';
import { enableDefaultSettings } from '../../utilities/defaultSettings/decorator.js';

/**
 * @summary Alerts are used to display important messages inline or as toast notifications.
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-alert--docs
 * @status stable
 * @since 1.20.0
 *
 * @dependency syn-icon-button
 *
 * @slot - The alert's main content.
 * @slot icon - An icon to show in the alert. Works best with `<syn-icon>`.
 *
 * @event syn-show - Emitted when the alert opens.
 * @event syn-after-show - Emitted after the alert opens and all animations are complete.
 * @event syn-hide - Emitted when the alert closes.
 * @event syn-after-hide - Emitted after the alert closes and all animations are complete.
 *
 * @csspart base - The component's base wrapper.
 * @csspart icon - The container that wraps the optional icon.
 * @csspart message - The container that wraps the alert's main content.
 * @csspart close-button - The close button, an `<syn-icon-button>`.
 * @csspart close-button__base - The close button's exported `base` part.
 *
 * @animation alert.show - The animation to use when showing the alert.
 * @animation alert.hide - The animation to use when hiding the alert.
 */
@enableDefaultSettings('SynAlert')
export default class SynAlert extends SynergyElement {
  static styles: CSSResultGroup = [componentStyles, styles];

  static dependencies = {
    'syn-icon-button': SynIconButton,
  };

  private autoHideTimeout: number;

  private readonly hasSlotController = new HasSlotController(this, 'icon', 'suffix');

  private readonly localize = new LocalizeController(this);

  private static currentToastStack: HTMLDivElement;

  private static get toastStack() {
    if (!this.currentToastStack) {
      this.currentToastStack = Object.assign(document.createElement('div'), {
        className: 'syn-toast-stack',
      });
    }
    return this.currentToastStack;
  }

  @query('[part~="base"]') base: HTMLElement;

  /**
   * Indicates whether or not the alert is open. You can toggle this attribute to show and hide the alert, or you can
   * use the `show()` and `hide()` methods and this attribute will reflect the alert's open state.
   */
  @property({ reflect: true, type: Boolean }) open = false;

  /** Enables a close button that allows the user to dismiss the alert. */
  @property({ reflect: true, type: Boolean }) closable = false;

  /** The alert's theme variant. */
  @property({ reflect: true }) variant: 'primary' | 'success' | 'neutral' | 'warning' | 'critical' | 'error' | 'danger' = 'primary';

  /**
   * The length of time, in milliseconds, the alert will show before closing itself. If the user interacts with
   * the alert before it closes (e.g. moves the mouse over it), the timer will restart. Defaults to `Infinity`, meaning
   * the alert will not close on its own.
   */
  @property({ type: Number }) duration = Infinity;

  /** The alert's size. */
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  firstUpdated() {
    this.base.hidden = !this.open;
  }

  private restartAutoHide() {
    clearTimeout(this.autoHideTimeout);
    if (this.open && this.duration < Infinity) {
      this.autoHideTimeout = window.setTimeout(() => {
        this.hide();
      }, this.duration);
    }
  }

  private pauseAutoHide() {
    clearTimeout(this.autoHideTimeout);
  }

  private resumeAutoHide() {
    if (this.duration < Infinity) {
      this.autoHideTimeout = window.setTimeout(() => {
        this.hide();
      }, this.duration);
    }
  }

  private handleCloseClick() {
    this.hide();
  }

  @watch('open', { waitUntilFirstUpdate: true })
  async handleOpenChange() {
    if (this.open) {
      // Show
      this.emit('syn-show');

      if (this.duration < Infinity) {
        this.restartAutoHide();
      }

      await stopAnimations(this.base);
      this.base.hidden = false;
      const { keyframes, options } = getAnimation(this, 'alert.show', { dir: this.localize.dir() });
      await animateTo(this.base, keyframes, options);

      this.emit('syn-after-show');
    } else {
      // Hide
      blurActiveElement(this);
      this.emit('syn-hide');

      clearTimeout(this.autoHideTimeout);

      await stopAnimations(this.base);
      const { keyframes, options } = getAnimation(this, 'alert.hide', { dir: this.localize.dir() });
      await animateTo(this.base, keyframes, options);
      this.base.hidden = true;

      this.emit('syn-after-hide');
    }
  }

  @watch('duration')
  handleDurationChange() {
    this.restartAutoHide();
  }

  /** Shows the alert. */
  async show() {
    if (this.open) {
      return undefined;
    }

    this.open = true;
    return waitForEvent(this, 'syn-after-show');
  }

  /** Hides the alert */
  async hide() {
    if (!this.open) {
      return undefined;
    }

    this.open = false;
    return waitForEvent(this, 'syn-after-hide');
  }

  /**
   * Displays the alert as a toast notification. This will move the alert out of its position in the DOM and, when
   * dismissed, it will be removed from the DOM completely. By storing a reference to the alert, you can reuse it by
   * calling this method again. The returned promise will resolve after the alert is hidden.
   */
  async toast() {
    return new Promise<void>(resolve => {
      if (SynAlert.toastStack.parentElement === null) {
        document.body.append(SynAlert.toastStack);
      }

      SynAlert.toastStack.appendChild(this);

      // Wait for the toast stack to render
      requestAnimationFrame(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions -- force a reflow for the initial transition
        this.clientWidth;
        this.show();
      });

      this.addEventListener(
        'syn-after-hide',
        () => {
          SynAlert.toastStack.removeChild(this);
          resolve();

          // Remove the toast stack from the DOM when there are no more alerts
          if (SynAlert.toastStack.querySelector('syn-alert') === null) {
            SynAlert.toastStack.remove();
          }
        },
        { once: true },
      );
    });
  }

  render() {
    /* eslint-disable @typescript-eslint/unbound-method */
    return html`
      <div
        part="base"
        class=${classMap({
          alert: true,
          'alert--closable': this.closable,
          'alert--critical': this.variant === 'critical',
          'alert--danger': this.variant === 'danger', // @todo: Major: Remove .alert--danger
          'alert--error': this.variant === 'error',
          'alert--has-icon': this.hasSlotController.test('icon'),
          'alert--large': this.size === 'large',
          'alert--medium': this.size === 'medium',
          'alert--neutral': this.variant === 'neutral',
          'alert--open': this.open,
          'alert--primary': this.variant === 'primary',
          'alert--small': this.size === 'small',
          'alert--success': this.variant === 'success',
          'alert--warning': this.variant === 'warning',
        })}
        role="alert"
        aria-hidden=${this.open ? 'false' : 'true'}
        @mouseenter=${this.pauseAutoHide}
        @mouseleave=${this.resumeAutoHide}
      >
        <div part="icon" class="alert__icon">
          <slot name="icon"></slot>
        </div>

        <div part="message" class="alert__message" aria-live="polite">
          <slot></slot>
        </div>

        ${this.closable
          ? html`
              <syn-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                class="alert__close-button"
                name="x-lg"
                library="system"
                label=${this.localize.term('close')}
                @click=${this.handleCloseClick}
              ></syn-icon-button>
            `
          : ''}

      </div>
    `;
    /* eslint-enable @typescript-eslint/unbound-method */
  }
}

setDefaultAnimation('alert.show', {
  keyframes: [
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1 },
  ],
  options: { duration: 250, easing: 'ease' },
});

setDefaultAnimation('alert.hide', {
  keyframes: [
    { opacity: 1, scale: 1 },
    { opacity: 0, scale: 0.8 },
  ],
  options: { duration: 250, easing: 'ease' },
});
