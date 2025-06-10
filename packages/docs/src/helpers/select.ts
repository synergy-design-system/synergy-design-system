import { html } from 'lit';

/**
 * Automatically open the given select tag
 * @param selector The css selector to use
 */
export const openSelect = (selector: string, withOptgroup: boolean = true) => html`
  <script>
    const promises = [
      customElements.whenDefined('syn-select'),
      ${withOptgroup} ? customElements.whenDefined('syn-optgroup') : Promise.resolve(),
      customElements.whenDefined('syn-option')
    ];

    Promise.all(promises).then(async () => {
      const elm = document.querySelector('${selector}');
      await elm?.show();
    });
  </script>
`;
