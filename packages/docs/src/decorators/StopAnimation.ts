/* eslint-disable import/no-extraneous-dependencies */
import { html } from 'lit';
import type { StoryFn } from '@storybook/web-components';
import isChromatic from 'chromatic/isChromatic';

/**
 * Wrap stories with custom disable animation helpers
 * @param Story The story to apply this to
 * @param rest Optional parameters
 * @returns TemplateResult
 */
export const stopAnimation = (Story: StoryFn, ...rest: unknown[]) => {
  // Disable animations when running chromatic.
  // Can be tested by appending a get parameter chromatic=true / false
  if (isChromatic()) {
    return html`
      <style>
      :root {
        --syn-transition-x-fast: -1s !important;
        --syn-transition-fast: -1s !important;
        --syn-transition-medium: -1s !important;
        --syn-transition-slow: -1s !important;
        --syn-transition-x-slow: -1s !important;
      }
      syn-spinner,
      syn-button::part(spinner) {
        --speed: -1s !important;
      }
      </style>
      ${Story(...rest)}
    `;
  }

  // Return the unaltered story
  return Story(...rest);
};
