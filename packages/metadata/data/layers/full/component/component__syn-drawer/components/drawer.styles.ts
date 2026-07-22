import { css } from 'lit';

export default css`
  :host {
    --size: 25rem;
    --header-spacing: var(--syn-spacing-large) var(--syn-spacing-x-small) var(--syn-spacing-large) var(--syn-spacing-large);
    --body-spacing: var(--syn-spacing-medium) var(--syn-spacing-large);
    --footer-spacing: var(--syn-spacing-medium) var(--syn-spacing-large) var(--syn-spacing-large) var(--syn-spacing-medium);

    display: contents;
  }

  .drawer {
    height: 100%;
    inset-inline-start: 0;
    overflow: hidden;
    pointer-events: none;
    top: 0;
    width: 100%;
  }

  .drawer--contained {
    position: absolute;
    z-index: initial;
  }

  .drawer--fixed {
    position: fixed;
    z-index: var(--syn-z-index-drawer);
  }

  .drawer__panel {
    background-color: var(--syn-panel-background-color);
    border: 0 solid var(--syn-panel-border-color);
    color: var(--syn-color-neutral-950);
    display: flex;
    flex-direction: column;
    max-height: 100%;
    max-width: 100%;
    overflow: auto;
    pointer-events: all;
    position: absolute;
    z-index: 2;
  }

  .drawer__panel:focus {
    outline: none;
  }

  .drawer--top .drawer__panel {
    border-bottom-width: var(--syn-border-width-small);
    bottom: auto;
    height: var(--size);
    inset-inline: 0 auto;
    top: 0;
    width: 100%;
  }

  .drawer--end .drawer__panel {
    border-left-width: var(--syn-border-width-small);
    bottom: auto;
    height: 100%;
    inset-inline: auto 0;
    top: 0;
    width: var(--size);
  }

  .drawer--bottom .drawer__panel {
    border-top-width: var(--syn-border-width-small);
    bottom: 0;
    height: var(--size);
    inset-inline: 0 auto;
    top: auto;
    width: 100%;
  }

  .drawer--start .drawer__panel {
    border-right-width: var(--syn-border-width-small);
    bottom: auto;
    height: 100%;
    inset-inline: 0 auto;
    top: 0;
    width: var(--size);
  }

  .drawer__header {
    display: flex;
  }

  .drawer__title {
    align-items: center;
    display: flex;
    flex: 1 1 auto;
    font: var(--syn-heading-x-large);
    margin: 0;
    padding: var(--header-spacing);
  }

  .drawer__header-actions {
    align-items: flex-start;
    display: flex;
    flex-shrink: 0;
    flex-wrap: wrap;
    gap: var(--syn-spacing-x-small);
    justify-content: end;
    padding: var(--syn-spacing-large) var(--syn-spacing-small) var(--syn-spacing-large) 0;
  }

  .drawer__header-actions syn-icon-button,
  .drawer__header-actions ::slotted(syn-icon-button) {
    align-items: center;
    color: var(--syn-color-neutral-950);
    display: flex;
    flex: 0 0 auto;
    font-size: var(--syn-font-size-x-large);
  }

  .drawer__body {
    display: block;
    flex: 1 1 auto;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding: var(--body-spacing);
  }

  .drawer__footer {
    padding: var(--footer-spacing);
    text-align: right;
  }

  .drawer__footer ::slotted(syn-button:not(:last-of-type)) {
    margin-inline-end: var(--syn-spacing-x-small);
  }

  .drawer:not(.drawer--has-footer) .drawer__footer {
    display: none;
  }

  .drawer__overlay {
    background-color: var(--syn-overlay-background-color);
    display: block;
    inset: 0;
    pointer-events: all;
    position: fixed;
  }

  .drawer--contained .drawer__overlay {
    display: none;
  }

  @media (forced-colors: active) {
    .drawer__panel {
      border: solid 1px var(--syn-color-neutral-0);
    }
  }
`;
