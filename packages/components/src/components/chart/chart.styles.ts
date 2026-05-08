import { css } from 'lit';

export default css`
  :host {
    /**
     * @prop --syn-chart-aspect-ratio: The default aspect ratio of the chart when no explicit height is set.
     * Can be overridden via CSS: syn-chart { --syn-chart-aspect-ratio: 4/3 }
     * If an explicit height is set on the host (e.g. style="height:400px"), aspect-ratio has no effect.
     */
    --syn-chart-aspect-ratio: 16 / 9;
    /* --syn-chart-aspect-ratio: 4 / 3; */

    aspect-ratio: var(--syn-chart-aspect-ratio);
    display: block;
    /* TODO: do we want / need a default height? If yes, how much? */
    min-height: 250px;
    width: 100%;
  }

  .chart {
    height: 100%;
    width: 100%;
  }
`;
