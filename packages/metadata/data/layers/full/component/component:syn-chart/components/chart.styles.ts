import { css } from 'lit';

export default css`
  :host {
    --syn-chart-aspect-ratio: 16 / 9;

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
