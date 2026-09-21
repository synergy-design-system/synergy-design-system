import { property, query } from 'lit/decorators.js';
import {
  type CSSResultGroup,
  type PropertyValues,
  html,
} from 'lit';
import { LocalizeController } from '../../utilities/localize.js';
import componentStyles from '../../styles/component.styles.js';
import SynergyElement from '../../internal/synergy-element.js';
import styles from './progress-ring.styles.js';

/**
 * @summary Progress rings are used to show the progress of a determinate operation in a circular fashion.
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-progress-ring--docs
 * @status stable
 * @since 1.18.0
 *
 * @slot - A label to show inside the ring.
 *
 * @csspart base - The component's base wrapper.
 * @csspart label - The progress ring label.
 *
 * @cssproperty --size - The diameter of the progress ring (cannot be a percentage).
 * @cssproperty --track-width - The width of the track.
 * @cssproperty --track-color - The color of the track.
 * @cssproperty --indicator-width - The width of the indicator. Defaults to the track width.
 * @cssproperty --indicator-color - The color of the indicator.
 * @cssproperty --indicator-transition-duration - The duration of the indicator's transition when the value changes.
 */
export default class SynProgressRing extends SynergyElement {
  static styles: CSSResultGroup = [componentStyles, styles];

  private readonly localize = new LocalizeController(this);

  @query('.progress-ring__indicator') indicator: SVGCircleElement;

  /** The current progress as a percentage, 0 to 100. */
  @property({ reflect: true, type: Number }) value = 0;

  /** A custom label for assistive devices. */
  @property() label = '';

  updated(changedProps: PropertyValues<this>) {
    super.updated(changedProps);

    // #1328: Safari does not transition stroke-dashoffset correctly when its
    // value changes through custom properties, so provide a computed pixel value.
    if (changedProps.has('value')) {
      const radius = parseFloat(getComputedStyle(this.indicator).getPropertyValue('r'));
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (this.value / 100) * circumference;

      // Invalid value could break the stroke-dashoffset.
      if (Number.isFinite(offset)) {
        this.indicator.style.strokeDashoffset = `${offset}px`;
      }
    }
  }

  render() {
    return html`
      <div
        aria-describedby="label"
        aria-label=${this.label.length > 0 ? this.label : this.localize.term('progress')}
        aria-valuemax="100"
        aria-valuemin="0"
        aria-valuenow="${this.value}"
        class="progress-ring"
        part="base"
        role="progressbar"
        style="--percentage: ${this.value / 100}"
      >
        <svg class="progress-ring__image">
          <circle class="progress-ring__track"></circle>
          <circle class="progress-ring__indicator"></circle>
        </svg>

        <slot id="label" part="label" class="progress-ring__label"></slot>
      </div>
    `;
  }
}
