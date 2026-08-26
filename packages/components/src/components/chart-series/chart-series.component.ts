import { html } from 'lit';
import type { PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import SynergyElement from '../../internal/synergy-element.js';

type ChartSeriesType = 'line';

function parseNumberArray(input: number[] | string | null): number[] {
  if (Array.isArray(input)) {
    return input.filter(item => Number.isFinite(item));
  }

  if (typeof input !== 'string') {
    return [];
  }

  const trimmedInput = input.trim();
  if (trimmedInput.length === 0) {
    return [];
  }

  try {
    const parsed = JSON.parse(trimmedInput) as unknown;
    if (Array.isArray(parsed)) {
      return parsed
        .map((item) => {
          if (typeof item === 'number' && Number.isFinite(item)) return item;
          if (typeof item === 'string') {
            const parsedNumber = Number(item);
            return Number.isFinite(parsedNumber) ? parsedNumber : null;
          }

          return null;
        })
        .filter((item): item is number => item !== null);
    }
  } catch {
    // Fallback to comma-separated parsing.
  }

  return trimmedInput
    .split(',')
    .map((item) => {
      const parsed = Number(item.trim());
      return Number.isFinite(parsed) ? parsed : null;
    })
    .filter((item): item is number => item !== null);
}
/**
 * @summary PoC child component for configuring a chart series inside `<syn-chart>`.
 * @status experimental
 * @since 3.23.0
 */
export default class SynChartSeries extends SynergyElement {
  @property({ reflect: true }) type: ChartSeriesType = 'line';

  @property({
    attribute: 'axis-index',
    type: Number,
  })
  axisIndex?: number;

  @property({
    converter: {
      fromAttribute: value => parseNumberArray(value),
      toAttribute: value => JSON.stringify(value),
    },
  })
  data: number[] = [];

  @property() name?: string;

  protected updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties);
    if (changedProperties.size === 1 && changedProperties.has('data')) {
      this.dispatchEvent(new CustomEvent('syn-chart-subcomponent-change', {
        bubbles: true,
        composed: true,
        detail: {
          component: 'syn-chart-series',
          properties: ['data'],
        },
      }));
    }

    if (changedProperties.size > 0) {
      this.dispatchEvent(new CustomEvent('syn-chart-subcomponent-change', {
        bubbles: true,
        composed: true,
      }));
    }
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return html``;
  }
}
