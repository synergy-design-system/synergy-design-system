import { css } from 'lit';

export default css`
  :host {
    --border-color: var(--syn-panel-border-color);
    --border-width: var(--syn-border-width-small);
    --border-radius: var(--syn-border-radius-medium);
    --padding: var(--syn-spacing-large);

    display: inline-block;
  }

  .card {
    background-color: var(--syn-panel-background-color);
    border: solid var(--border-width) var(--border-color);
    border-radius: var(--border-radius);
    display: flex;
    flex-direction: column;
  }

  /** #1107: Add shadow property to card */
  .card--shadow {
    box-shadow: var(--syn-shadow-small);
  }

  .card__image {
    border: solid var(--border-width) var(--border-color);
    border-bottom: 0;
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    display: flex;
    margin: calc(-1 * var(--border-width));
    overflow: hidden;
  }

  .card__image::slotted(img) {
    display: block;
    width: 100%;
  }

  /**
   * Cards that are sharp do not receive a border radius
   */
  .card--sharp {
    border-radius: var(--syn-border-radius-none);
  }

  /**
   * Do not apply border radius to sharp card images
   */
  .card--sharp .card__image {
    border-top-left-radius: var(--syn-border-radius-none);
    border-top-right-radius: var(--syn-border-radius-none);
  }

  .card__header {
    border: none;
    color: var(--syn-typography-color-text);
    display: block;
    font: var(--syn-heading-large);
    line-height: var(--syn-line-height-normal);
    padding: calc(var(--padding) / 2) var(--padding);
  }
  
  .card:not(.card--has-header) .card__header {
    display: none;
  }

  .card:not(.card--has-image) .card__image {
    display: none;
  }

  .card:not(.card--has-image) .card__header {
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
  }
  
  .card__body {
    color: var(--syn-typography-color-text);
    display: block;
    font: var(--syn-body-medium-regular);
    padding: var(--padding);
  }

  .card--has-footer .card__footer {
    display: block;
    padding: var(--syn-spacing-x-small) var(--syn-spacing-large) var(--syn-spacing-large);
  }

  .card:not(.card--has-footer) .card__footer {
    display: none;
  }
`;
