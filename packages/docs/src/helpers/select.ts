import { html } from 'lit';

/**
 * Automatically open the given select tag
 * @param selector The css selector to use
 */
export const openSelect = (selector: string) => html`
  <script>
    Promise.all([
      customElements.whenDefined('syn-select'),
      customElements.whenDefined('syn-optgroup'),
      customElements.whenDefined('syn-option')
    ]).then(async () => {
      const elm = document.querySelector('${selector}');
      await elm?.show();
    });
  </script>
`;
