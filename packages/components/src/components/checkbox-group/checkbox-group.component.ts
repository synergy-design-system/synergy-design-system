import {
  type CSSResultGroup,
  html,
} from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property, query } from 'lit/decorators.js';
import type SynCheckbox from '../checkbox/checkbox.component.js';
import type SynSwitch from '../switch/switch.component.js';
import { watch } from '../../internal/watch.js';
import componentStyles from '../../styles/component.styles.js';
import formControlStyles from '../../styles/form-control.styles.js';
import SynergyElement from '../../internal/synergy-element.js';
import styles from './checkbox-group.styles.js';
import { HasSlotController } from '../../internal/slot.js';
import { enableDefaultSettings } from '../../utilities/defaultSettings/decorator.js';

/**
 * @summary Checkbox groups are used to group multiple checkboxes together.
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-checkbox-group--docs
 * @status stable
 * @since 3.x.x
 *
 * @slot - The default slot where `<syn-checkbox> elements are placed.
 * @slot label - The checkbox group's label. Required for proper accessibility. Alternatively, you can use the `label`
 *  attribute.
 * @slot help-text - Text that describes how to use the checkbox group. Alternatively, you can use the `help-text` attribute.
 *
 * @csspart form-control - The form control that wraps the label, input, and help text.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-input - The input's wrapper.
 * @csspart form-control-help-text - The help text's wrapper.
 * @csspart button-group - The button group that wraps radio buttons.
 * @csspart button-group__base - The button group's `base` part.
 */
@enableDefaultSettings('SynCheckboxGroup')
export default class SynCheckboxGroup extends SynergyElement {
  static styles: CSSResultGroup = [componentStyles, formControlStyles, styles];

  private readonly hasSlotController = new HasSlotController(this, 'help-text', 'label');

  @query('slot:not([name])') defaultSlot: HTMLSlotElement;

  /**
   * The checkbox group's label. Required for proper accessibility.
   * If you need to display HTML, use the `label` slot instead.
   */
  @property() label = '';

  /** The checkbox groups's help text. If you need to display HTML, use the `help-text` slot instead. */
  @property({ attribute: 'help-text' }) helpText = '';

  /** The checkbox group's size. This size will be applied to all child checkboxes. */
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * The layout of the checkbox group. This determines how the checkboxes are displayed.
   *
   * - `horizontal`: Radios are displayed in a row.
   * - `vertical`: Radios are displayed in a column.
   */
  @property({ reflect: true }) layout: 'horizontal' | 'vertical' = 'vertical';

  /**
   * By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you
   * to place the form control outside of a form and associate it with the form that has this `id`. The form must be in
   * the same document or shadow root for this to work.
   */
  @property({ reflect: true }) form = '';

  @watch('size', { waitUntilFirstUpdate: true })
  handleSizeChange() {
    this.syncCheckboxes();
  }

  @watch('form', { waitUntilFirstUpdate: true })
  handleFormChange() {
    this.syncCheckboxes();
  }

  private async syncCheckboxElements() {
    const checkboxes = this.getAllCheckboxes();

    await Promise.all(
      checkboxes.map(async checkbox => {
        await checkbox.updateComplete;
        const checkboxElement = checkbox;
        checkboxElement.size = this.size;
        checkboxElement.form = this.form;
      }),
    );
  }

  private syncCheckboxes() {
    const hasCheckboxChildren = !!this.querySelector('syn-checkbox');
    const hasSwitchChildren = !!this.querySelector('syn-switch');
    const checkboxDefined = !!customElements.get('syn-checkbox');
    const switchDefined = !!customElements.get('syn-switch');
    const canSyncCheckboxes = !hasCheckboxChildren || checkboxDefined;
    const canSyncSwitches = !hasSwitchChildren || switchDefined;

    if (canSyncCheckboxes && canSyncSwitches) {
      this.syncCheckboxElements().catch(() => undefined);
      return;
    }

    if (hasCheckboxChildren && !checkboxDefined) {
      customElements.whenDefined('syn-checkbox').then(() => this.syncCheckboxes()).catch(() => undefined);
    }

    if (hasSwitchChildren && !switchDefined) {
      customElements.whenDefined('syn-switch').then(() => this.syncCheckboxes()).catch(() => undefined);
    }
  }

  private getAllCheckboxes() {
    return [...this.querySelectorAll<SynCheckbox | SynSwitch>('syn-checkbox, syn-switch')];
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      return;
    }

    const availableCheckboxes = this
      .getAllCheckboxes()
      .filter(checkbox => (!checkbox.disabled && !checkbox.readonly));

    if (!availableCheckboxes.length) {
      return;
    }

    const path = event.composedPath();
    const currentCheckbox = path.find(element => {
      if (!element || !(element instanceof HTMLElement)) {
        return false;
      }

      const tagName = element.tagName.toLowerCase();

      return tagName === 'syn-checkbox' || tagName === 'syn-switch';
    }) as SynCheckbox | SynSwitch | undefined;

    const checkedCheckbox = availableCheckboxes.find(checkbox => checkbox.checked);
    const currentIndex = availableCheckboxes.indexOf(currentCheckbox ?? checkedCheckbox ?? availableCheckboxes[0]);
    const incr = ['ArrowUp', 'ArrowLeft'].includes(event.key) ? -1 : 1;
    let index = currentIndex + incr;

    if (index < 0) {
      index = availableCheckboxes.length - 1;
    }

    if (index > availableCheckboxes.length - 1) {
      index = 0;
    }

    availableCheckboxes[index].focus();

    event.preventDefault();
  }

  private handleLabelClick() {
    this.focus();
  }

  /**
   * Sets focus on the checkbox-group.
   * Will automatically set focus on the first checkbox in the group that is not disabled.
   */
  public focus(options?: FocusOptions) {
    const checkboxes = this.getAllCheckboxes();
    const checked = checkboxes.find(checkbox => checkbox.checked);
    const firstEnabledCheckbox = checkboxes.find(checkbox => !checkbox.disabled);
    const checkboxToFocus = checked || firstEnabledCheckbox;

    // Call focus for the checked checkbox
    // If no checkbox is checked, focus the first one that is not disabled
    if (checkboxToFocus) {
      checkboxToFocus.focus(options);
    }
  }

  firstUpdated() {
    this.syncCheckboxes();
  }

  render() {
    const hasLabelSlot = this.hasSlotController.test('label');
    const hasHelpTextSlot = this.hasSlotController.test('help-text');
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHelpText = this.helpText ? true : !!hasHelpTextSlot;

    /* eslint-disable @typescript-eslint/unbound-method */
    return html`
      <fieldset
        part="form-control"
        class=${classMap({
          'form-control': true,
          'form-control--checkbox-group': true,
          'form-control--has-help-text': hasHelpText,
          'form-control--has-label': hasLabel,
          'form-control--is-horizontal': this.layout === 'horizontal',
          'form-control--large': this.size === 'large',
          'form-control--medium': this.size === 'medium',
          'form-control--small': this.size === 'small',
        })}
        aria-labelledby="label"
        aria-describedby="help-text"
        aria-errormessage="error-message"
      >
        <label
          part="form-control-label"
          id="label"
          class="form-control__label"
          aria-hidden=${hasLabel ? 'false' : 'true'}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <slot
            @slotchange=${this.syncCheckboxes}
            @keydown=${this.handleKeyDown}
          ></slot>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${hasHelpText ? 'false' : 'true'}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </fieldset>
    `;
    /* eslint-enable @typescript-eslint/unbound-method */
  }
}
