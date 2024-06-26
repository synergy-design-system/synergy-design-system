// @see https://material-web.dev/components/slider/stories/
// @see https://github.com/material-components/material-web/blob/main/slider/internal/slider.ts
import type { CSSResultGroup } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { HasSlotController } from '../../internal/slot.js';
import componentStyles from '../../styles/component.styles.js';
import formControlStyles from '../../styles/form-control.styles.js';
import formControlCustomStyles from '../../styles/form-control.custom.styles.js';
import SynergyElement from '../../internal/synergy-element.js';
import styles from './range.styles.js';

/**
 * @summary TODO
 * @documentation TODO
 * @status stable
 * @since TODO
 */
export default class SynRange extends SynergyElement {
  static styles: CSSResultGroup = [
    componentStyles,
    formControlStyles,
    styles,
    formControlCustomStyles,
  ];

  private readonly hasSlotController = new HasSlotController(
    this,
    'help-text',
    'label',
    'prefix',
    'suffix',
  );

  /** The input's size. */
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** The input's label. If you need to display HTML, use the `label` slot instead. */
  @property() label = '';

  /** The input's help text. If you need to display HTML, use the `help-text` slot instead. */
  @property({ attribute: 'help-text' }) helpText = '';

  /** The minimum acceptable value of the range. */
  @property({ type: Number }) min = 0;

  /** The maximum acceptable value of the range. */
  @property({ type: Number }) max = 100;

  /** The interval at which the range will increase and decrease. */
  @property({ type: Number }) step = 1;

  render() {
    const hasLabelSlot = this.hasSlotController.test('label');
    const hasHelpTextSlot = this.hasSlotController.test('help-text');
    const hasPrefixSlot = this.hasSlotController.test('prefix');
    const hasSuffixSlot = this.hasSlotController.test('suffix');
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHelpText = this.helpText ? true : !!hasHelpTextSlot;
    return html`
      <div
        part="form-control"
        class=${classMap({
          'form-control': true,
          'form-control--has-help-text': hasHelpText,
          'form-control--has-label': hasLabel,
          'form-control--has-prefix': hasPrefixSlot,
          'form-control--has-suffix': hasSuffixSlot,
          'form-control--large': this.size === 'large',
          'form-control--medium': this.size === 'medium',
          'form-control--small': this.size === 'small',
        })}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${hasLabel ? 'false' : 'true'}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${classMap({
              input: true,

              // Sizes
              'input--large': this.size === 'large',
              'input--medium': this.size === 'medium',
              'input--small': this.size === 'small',
            })}
          >
            <span part="prefix" class="input__prefix">
              <slot name="prefix"></slot>
            </span>

            ADD_SLIDER_HERE

            <span part="suffix" class="input__suffix">
              <slot name="suffix"></slot>
            </span>
          </div>

          <div
            part="form-control-help-text"
            id="help-text"
            class="form-control__help-text"
            aria-hidden=${hasHelpText ? 'false' : 'true'}
          >
            <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `;
  }
}
