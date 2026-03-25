import { html } from 'lit';
import { type Decorator } from '@storybook/web-components-vite';
import '../../../components/src/components/button/button.js';

/**
 * Form Submit Decorator for Storybook
 * This decorator wraps a story in a form element and adds a submit button.
 * It prevents the default form submission behavior to allow for testing form interactions without causing page reloads.
 */
export const FormSubmitDecorator: Decorator = (Story, context) => (
  html`
    <form
      onsubmit="event.preventDefault(); event.stopPropagation();"
      id=${context.id}
    >
      ${Story(context)}
      <syn-button type="submit" variant="filled">Submit</syn-button>
    </form>
    <style>
      #${context.id} {
        display: flex;
        flex-direction: column;
        gap: var(--syn-spacing-large);
      }
      syn-button {
        align-self: flex-start;
      }
    </style>
  `
);
