import type { StoryContext, StoryFn } from '@storybook/web-components-vite';
import { DecoratorHelpers } from '@storybook/addon-themes';
import {
  SICK_2025_DARK, SICK_2025_LIGHT,
} from '../../.storybook/modes.js';

/**
 * Waits for the syn-sick2025-light or syn-sick2025-dark class to be added to the body tag
 * @param timeout - Maximum time to wait in milliseconds (default: 5000ms)
 * @returns Promise that resolves when class is found or rejects on timeout
 */
const waitForSick2025Class = (timeout = 5000): Promise<void> => new Promise((resolve, reject) => {
  // Check if class is already present
  if (document.body.classList.contains('syn-sick2025-light') || document.body.classList.contains('syn-sick2025-dark')) {
    resolve();
    return;
  }

  // Set up MutationObserver to watch for class changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        if (document.body.classList.contains('syn-sick2025-light') || document.body.classList.contains('syn-sick2025-dark')) {
          observer.disconnect();
          resolve();
        }
      }
    });
  });

  // Start observing
  observer.observe(document.body, {
    attributeFilter: ['class'],
    attributes: true,
  });

  // Set timeout to reject promise if class is not found within timeout period
  setTimeout(() => {
    observer.disconnect();
    reject();
  }, timeout);
});

/**
 * Decorator that shows a hint, if the current theme is SICK2025,
 * but the component does not yet support it
 * @param story - The Storybook story function to decorate
 * @param context - The Storybook story context containing theme information
 */
export const themeNotSupportedHint = (story: StoryFn, context: StoryContext) => {
  const theme = DecoratorHelpers.pluckThemeFromContext(context);
  const tags = context.tags || [];

  // Check if the current component supports the 2025 theme. If not show a hint
  if ([SICK_2025_DARK, SICK_2025_LIGHT].includes(theme) && !tags.includes('SICK2025')) {
    // Wait for the sick2025 classes to be added to body before showing hint.
    // Otherwise there is a flash
    waitForSick2025Class()
      .then(() => {
        const storyTitle = document.querySelector('.sbdocs-title');

        if (storyTitle && !document.querySelector('.not-supported-2025-hint')) {
          const hint = document.createElement('div');
          hint.style.color = 'var(--syn-color-error-600)';
          hint.textContent = '⚠️ This component does not support the SICK2025 theme yet.';
          hint.classList.add('not-supported-2025-hint');

          storyTitle.insertAdjacentElement('afterend', hint);
        }
      })
      .catch(() => {
        // do nothing
      });
  }

  return story(context.args, context);
};
