import { html } from 'lit';
import type { Decorator } from '@storybook/web-components-vite';

/**
 * Wrap stories with custom padding
 *
 * @param padding Padding value to apply around the story (default is 5px)
 * @returns A decorator function that applies padding to the story
 */
export const paddingDecorator = (padding: number = 5): Decorator => (Story, context) => (
  html`
    <div style="padding: ${padding}px;">
      ${Story(context)}
    </div>
  `
);
