import { html } from 'lit';
import type { PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import SynergyElement from '../../internal/synergy-element.js';

type ChartAxisTarget = 'x' | 'y';
type ChartAxisType = 'category' | 'value' | 'time' | 'log';

function parseArrayInput<T extends string | number>(
  input: T[] | string | null,
  parser: (value: unknown) => T | null,
): T[] {
  if (Array.isArray(input)) {
    return input
      .map(item => parser(item))
      .filter((item): item is T => item !== null);
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
        .map(item => parser(item))
        .filter((item): item is T => item !== null);
    }
  } catch {
    // Fallback to comma-separated parsing.
  }

  return trimmedInput
    .split(',')
    .map(item => parser(item.trim()))
    .filter((item): item is T => item !== null);
}

function parseAxisData(input: Array<string | number> | string | null): Array<string | number> {
  return parseArrayInput(input, (value) => {
    if (typeof value === 'string' || typeof value === 'number') {
      return value;
    }

    return null;
  });
}

function parseOptionalNumber(input: string | number | null): number | undefined {
  if (typeof input === 'number') {
    return Number.isFinite(input) ? input : undefined;
  }

  if (input == null || input.trim().length === 0) {
    return undefined;
  }

  const parsed = Number(input);
  return Number.isFinite(parsed) ? parsed : undefined;
}

/**
 * @summary PoC child component for configuring a chart axis inside `<syn-chart>`.
 * @status experimental
 * @since 3.23.0
 */
export default class SynChartAxis extends SynergyElement {
  @property({ reflect: true }) axis?: ChartAxisTarget = 'x';

  /**
   * If x axis, the default type is `category`. If y axis, the default type is `value`.
   * If the type is not specified, the component will infer the type based on the axis.
   * If the type is specified, it will override the default behavior.
   */
  @property({ reflect: true }) type?: ChartAxisType = 'category';

  @property({
    reflect: true,
    type: Number,
  })
  index?: number;

  @property({
    converter: {
      fromAttribute: value => parseAxisData(value),
      toAttribute: value => JSON.stringify(value),
    },
  })
  data: Array<string | number> = [];

  protected updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties);

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
