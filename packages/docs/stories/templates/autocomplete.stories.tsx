import { setupAutocomplete as synergyAutoComplete } from '@synergy-design-system/components/utilities/autocomplete-config.js';
import React from 'react';
import type { Meta } from '@storybook/web-components';
import {
  Description,
  Stories,
  Subtitle,
  Title,
} from '@storybook/blocks';
import { html } from 'lit';
import storyBookPreviewConfig from '../../.storybook/preview.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';

const autoCompleteDocs = `

  ## [autoComplete.js](https://tarekraafat.github.io/autoComplete.js/#/) Functionality:
 
  autoComplete.js is a lightweight and customizable JavaScript library for creating autocomplete functionality in web applications. Its primary functionality includes:
  1. **Autocomplete Suggestions**: autoComplete.js provides suggestions as users type into an input field, offering potential matches based on the input.
  2. **Keyboard Navigation**: It supports keyboard navigation for users to navigate through autocomplete suggestions using arrow keys or other specified keys.
  3. **Customization**: The library allows for extensive customization of the autocomplete behavior and appearance to suit the specific needs of the application. This includes styling options, event handling, and more.
  4. **Data Source**: autoComplete.js can fetch suggestions from various data sources, including local arrays, remote APIs, or dynamic data sets.
  5. **Accessibility**: The library aims to be accessible, providing keyboard support and other features to ensure users with disabilities can effectively use the autocomplete functionality.
 
  ### Defaults:
  By default, autoComplete.js injects a popup element into the DOM to display autocomplete suggestions below or above the input field, depending on available space. It manages the positioning of this popup relative to the input field and handles interactions with it.
 
  ### Available Settings:
  Some of the settings offered by autoComplete.js include:
  1. **Data Source Configuration**: Configuration options to specify the data source for autocomplete suggestions, such as local data arrays or remote APIs.
  2. **Appearance Customization**: Settings to customize the appearance of the autocomplete suggestions popup, including styling options for the suggestions and the popup container.
  3. **Behavior Customization**: Options to control the behavior of the autocomplete functionality, such as the minimum number of characters required before displaying suggestions, debounce delay for input events, and more.
  4. **Event Handling**: autoComplete.js provides event handlers for various interactions, such as selecting a suggestion, navigating through suggestions using the keyboard, or clearing the input field.
 
  Overall, autoComplete.js offers a versatile and feature-rich solution for implementing autocomplete functionality in web applications, with customizable settings to tailor the behavior and appearance according to specific requirements.
 
  ### How to import:
  \`\`\`html
  <script type="module">
    import '@tarekraafat/autocomplete.js';
 
    import { setupAutocomplete } from '@synergy-design-system/components/utilities/autocomplete-config.js;
 
    const { config: simpleConfig } = setupAutocomplete('#simple-example');
    new autoComplete({
      ...simpleConfig,
      placeHolder: 'Search',
      data
    });
  </script>
  \`\`\`
  <br>
 
  ## Why we provide a helper for [autoComplete.js](https://tarekraafat.github.io/autoComplete.js/#/) instead of a custom component :
    In the case of the autocomplete feature, we encountered various challenges prompting us to opt for providing a helper for an existing lib, rather than developing a custom solution. This decision was driven by several factors, including:
 
    - **Complexity Reduction**: Writing a custom autocomplete component from scratch can be complex, requiring handling of various edge cases, including keyboard navigation, input validation, and data fetching.
    - **Accessibility (a11y)**: autoComplete.js provides robust accessibility features, particularly regarding keyboard navigation. When combined with our components, we can ensure the necessary level of accessibility is maintained across the user interface.
    - **Keyboard Handling**: Handling keyboard interactions, such as navigating through autocomplete suggestions using arrow keys or selecting options using the Enter key, can be challenging to implement correctly. However, autoComplete.js offers built-in functionality to manage these interactions seamlessly.
    - **Flexibility**: autoComplete.js likely offers a range of customization options, allowing you to tailor the autocomplete behavior and appearance to suit your specific needs.
    - **Bundle Size**: Contrary to concerns about increased bundle size, the footprint of autoComplete.js is minimal. It's designed to be lightweight, ensuring that its inclusion does not significantly impact overall bundle size.
    - **Design System Consistency**: By using a helper for autoComplete.js within your web component library, you can ensure consistency with your design system.
 
    Therefore, integrating a helper for \`autoComplete.js\` emerged as the most viable approach to address these concerns effectively.
`;

const meta: Meta = {
  parameters: {
    design: generateFigmaPluginObject('8462-8334'),
    docs: {
      description: {
        component: autoCompleteDocs,
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Stories title="" />
        </>
      ),
      story: {
        height: 500,
        inline: false,
      },
    },
  },
  title: 'Templates/Autocomplete',
};
export default meta;

const mock = {
  src: [
    'Yellow',
    'Grey',
    'Green',
    'Blue',
    'Red',
    'Orange',
    'Magenta',
    'Black',
    'White',
    'Purple',
    'Pink',
    'Brown',
  ].sort(),
};

/**
 * This is the most basic example of the autoComplete.js library.
 * It demonstrates how to set up the library with a simple input field and a list of data.
 * The search data is mocked and passed to the autoComplete instance.
 * You can search for the following terms: Green, Red, Blue, ...
 */
export const Simple = {
  parameters: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    chromatic: {
      ...storyBookPreviewConfig?.parameters?.chromatic,
      disableSnapshot: false,
    },
  },
  render: () => {
    const setupAutocomplete = synergyAutoComplete;
    const data = mock;
    return html`
      <syn-input id="simple-example" type="search" label="Simple">
        <syn-icon slot="suffix" name="search"></syn-icon>
      </syn-input>
      <script type="module">
        import '../../node_modules/@tarekraafat/autocomplete.js/dist/autoComplete.min.js';
        // preview-ignore:start
        const setupAutocomplete = ${setupAutocomplete};
        const data = ${JSON.stringify(data)};
        // preview-ignore:end

        const { config: simpleConfig } = setupAutocomplete('#simple-example');
        new autoComplete({
          ...simpleConfig,
          placeHolder: 'Find color...',
          data
        });
      </script>
    `;
  },
};

/**
 * This is an example of how to customize the resultsList.
 * It demonstrates how to change the resultItem to a another element (e.g. standard HTML tag
 * or custom element).
 */
export const CustomResultItem = {
  parameters: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    chromatic: {
      ...storyBookPreviewConfig?.parameters?.chromatic,
      disableSnapshot: false,
    },
  },
  render: () => {
    const setupAutocomplete = synergyAutoComplete;
    const data = mock;
    return html`
      <syn-input id="custom-result-item" type="search" label="Custom element example">
        <syn-icon slot="suffix" name="search"></syn-icon>
      </syn-input>
      <script type="module">
      import '../../node_modules/@tarekraafat/autocomplete.js/dist/autoComplete.min.js';

        // preview-ignore:start
        const setupAutocomplete = ${setupAutocomplete};
        const data = ${JSON.stringify(data)};
        // preview-ignore:end

        const { config: optionsConfig } = setupAutocomplete('#custom-result-item');
        new autoComplete({
          ...optionsConfig,
          placeHolder: 'Find color...',
          resultsList: {
            maxResults: 3,
          },
          resultItem: {
            tag: 'div',
            element: (item, data) => {
              item.innerHTML = data.match + ': Lorem ipsum';
              icon.style.marginLeft = '12px';
              item.style.color = data.match.toLowerCase();
              item.style.margin = '12px';

              const icon = document.createElement('syn-icon');
              icon.name = 'colorize';

              item.appendChild(icon);
            }
          },
          data
        });
      </script>
    `;
  },
};

/**
 * This is a slightly more advanced example of the autoComplete.js library.
 * It demonstrates how to highlight the query string in the results.
 */
export const HighlightQuery = {
  parameters: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    chromatic: {
      ...storyBookPreviewConfig?.parameters?.chromatic,
      disableSnapshot: false,
    },
  },
  render: () => {
    const setupAutocomplete = synergyAutoComplete;
    const data = mock;
    return html`
      <syn-input id="highlight-example" type="search" label="Highlight query">
        <syn-icon slot="suffix" name="search"></syn-icon>
      </syn-input>
      <script type="module">
        import '../../node_modules/@tarekraafat/autocomplete.js/dist/autoComplete.min.js';

        // preview-ignore:start
        const setupAutocomplete = ${setupAutocomplete};
        const data = ${JSON.stringify(data)};
        // preview-ignore:end

        const { config: highlightConfig } = setupAutocomplete('#highlight-example');
        new autoComplete({
          ...highlightConfig,
          placeHolder: 'Find color...',
          data,
          resultItem: {
            highlight: true
          }
        });
      </script>
    `;
  },
};

/**
 * This example shows how all the results are shown when the input field is focused
 * and filters the results as the user provides input.
 */
export const OpenOnClick = {
  parameters: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    chromatic: {
      ...storyBookPreviewConfig?.parameters?.chromatic,
      disableSnapshot: false,
    },
  },
  render: () => {
    const setupAutocomplete = synergyAutoComplete;
    const data = mock;
    return html`
      <syn-input id="show-all-on-click-example" type="search" label="Show all items on click">
        <syn-icon slot="suffix" name="search"></syn-icon>
      </syn-input>
      <script type="module">
      import '../../node_modules/@tarekraafat/autocomplete.js/dist/autoComplete.min.js';

        // preview-ignore:start
        const setupAutocomplete = ${setupAutocomplete};
        const data = ${JSON.stringify(data)};
        // preview-ignore:end

        const bla = document.querySelector('#show-all-on-click-example').shadowRoot.querySelector('input');

        const { config: showAllOnClickConfig } = setupAutocomplete('#show-all-on-click-example');
        const showAllOnClickExample = new autoComplete({
          ...showAllOnClickConfig,
          threshold: 0,
          placeHolder: 'Find color...',
          data,
          resultsList: {
            // unlimited elements
            maxResults: undefined,
          },
          events: {
            input: {
              focus(event) {
                showAllOnClickExample.start();
              }
            }
          },
          resultItem: {
            highlight: true
          }
        });
      </script>
    `;
  },
};

/**
 * This example demonstrates how to group elements in the results list by their first character.
 * Also the searched term is highlighted in the results.
 */
export const GroupElements = {
  parameters: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    chromatic: {
      ...storyBookPreviewConfig?.parameters?.chromatic,
      disableSnapshot: false,
    },
  },
  render: () => {
    const setupAutocomplete = synergyAutoComplete;
    const data = mock;
    return html`
      <syn-input id="group-elements" type="search" label="Group elements">
        <syn-icon slot="suffix" name="search"></syn-icon>
      </syn-input>
      <script type="module">
      import '../../node_modules/@tarekraafat/autocomplete.js/dist/autoComplete.min.js';

        // preview-ignore:start
        const setupAutocomplete = ${setupAutocomplete};
        const data = ${JSON.stringify(data)};
        // preview-ignore:end

        /** Group elements by their first character */
        const { config: groupElementsConfig } = setupAutocomplete('#group-elements');
        new autoComplete({
          ...groupElementsConfig,
          placeHolder: 'Find color...',
          data: {
            src: data.src,
            filter: list => {
              // Step 1: Add grouping information to the elements
              let currentHeadline = '';
              let showDivider = false;
              // Here group elements by their first character
              list.forEach(item => {
                let firstChar = item.value[0].toUpperCase();
                if (firstChar !== currentHeadline) {
                  // Add headline information to the element
                  item.headline = firstChar;
                  item.divider = showDivider;
                  currentHeadline = firstChar;
                  // Show divider for all but the first headline
                  showDivider = true;
                }
              });
              return list;
            }
          },
          resultsList: {
            // unlimited elements
            maxResults: undefined
          },
          resultItem: {
            highlight: true,
            element: (item, data) => {
              // Step 2: Render the elements with the headline information
              if (data.divider) {
                // Add a divider before the element
                const divider = document.createElement('syn-divider');
                item.parentNode.insertBefore(divider, item);
              }
              if (data.headline) {
                // Add a headline before the element
                const headline = document.createElement('h3');
                headline.innerHTML = data.headline;
                headline.style.font = 'var(--syn-heading-large)';
                headline.style.padding = 'var(--syn-spacing-small) var(--syn-spacing-medium) var(--syn-spacing-small) calc(var(--syn-spacing-2x-large) + var(--syn-spacing-2x-small))';
                headline.style.margin = '0';
                item.parentNode.insertBefore(headline, item);
              }
              item.innerHTML = data.match;
            }
          }
        });
      </script>
    `;
  },
};

/**
 * This example demonstrates how to customize the appearance of the autocomplete suggestions popup
 * by setting a custom `max-height`. There are two additional parts added (`listbox`, `popup`) and
 * you can use the first one to set the `max-height`.
 */
export const SuggestionContainerHeight = {
  parameters: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    chromatic: {
      ...storyBookPreviewConfig?.parameters?.chromatic,
      disableSnapshot: false,
    },
  },
  render: () => {
    const setupAutocomplete = synergyAutoComplete;
    const data = mock;
    return html`
      <syn-input id="container-height" type="search" label="Max-height for list">
        <syn-icon slot="suffix" name="search"></syn-icon>
      </syn-input>
      <style>
        syn-input#container-height::part(listbox) {
          max-height: 110px;
        }
      </style>
      <script type="module">
      import '../../node_modules/@tarekraafat/autocomplete.js/dist/autoComplete.min.js';

        // preview-ignore:start
        const setupAutocomplete = ${setupAutocomplete};
        const data = ${JSON.stringify(data)};
        // preview-ignore:end

        const { config: showAllOnClickConfig } = setupAutocomplete('#container-height');
        const showAllOnClickExample = new autoComplete({
          ...showAllOnClickConfig,
          threshold: 0,
          placeHolder: 'Find color...',
          data,
          resultsList: {
            maxResults: undefined
          },
          events: {
            input: {
              focus(event) {
                showAllOnClickExample.start();
              }
            }
          },
          resultItem: {
            highlight: true
          }
        });
      </script>
    `;
  },
};

/**
 * This example demonstrates how to fetch results asynchronously from a remote server or API.
 */
export const Async = {
  parameters: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    chromatic: {
      ...storyBookPreviewConfig?.parameters?.chromatic,
      disableSnapshot: false,
    },
  },
  render: () => {
    const setupAutocomplete = synergyAutoComplete;
    const data = mock;
    return html`
        <syn-input id="async-example" type="search" label="Async result fetch">
          <syn-icon slot="suffix" name="search"></syn-icon>
        </syn-input>
        <script type="module">
          import '../../node_modules/@tarekraafat/autocomplete.js/dist/autoComplete.min.js';
 
          // preview-ignore:start
          const setupAutocomplete = ${setupAutocomplete};
          const data = ${JSON.stringify(data)};
          // preview-ignore:end
 
          const { config: simpleConfig } = setupAutocomplete('#async-example');

          new autoComplete({
            ...simpleConfig,
            data: {
              src: async query => {
                await new Promise(resolve => setTimeout(resolve, 1000));
                return data.src.map(item => ({ item }));
              },
              keys: ['item']
            }
          });
        </script>
      `;
  },
};
