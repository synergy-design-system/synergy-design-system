import { html } from 'lit';
import type { StoryFn } from '@storybook/web-components';

/**
 * Wrap stories with custom padding
 *
 * @param padding Padding value to apply around the story (default is 5px)
 * @returns A decorator function that applies padding to the story
 */
export const paddingDecorator = (padding: number = 5) => (Story: StoryFn, ...rest: unknown[]) => (
  html`
    <div style="padding: ${padding}px;">
      ${Story(...rest)}
    </div>
  `
);
