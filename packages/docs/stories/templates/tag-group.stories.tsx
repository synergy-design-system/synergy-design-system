import React from 'react';
import type { Meta } from '@storybook/web-components-vite';
import {
  Description,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import { html } from 'lit';
import storyBookPreviewConfig from '../../.storybook/preview.js';
import { generateStoryDescription } from '../../src/helpers/component.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';
import { Chromatic_Modes_All } from '../../.storybook/modes.js';
import '../../../components/src/components/button/button.js';
import '../../../components/src/components/dropdown/dropdown.js';
import '../../../components/src/components/menu/menu.js';
import '../../../components/src/components/menu-item/menu-item.js';
import '../../../components/src/components/option/option.js';
import '../../../components/src/components/select/select.js';
import '../../../components/src/components/tag-group/tag-group.js';
import '../../../components/src/components/tag/tag.js';

const filters = [
  {
    id: 'filter-1',
    name: 'Leitungsmaterial',
    options: ['Option 1', 'Option 2', 'Option 3'],
    selected: ['Option 1', 'Option 2'],
  },
  {
    id: 'filter-2',
    name: 'Leitungslänge',
    options: ['230 mm', '0.2 m', '0.3 m', '0.7 m'],
    selected: ['230 mm', '0.2 m', '0.3 m', '0.7 m'],
  },
  {
    id: 'filter-3',
    name: 'Produktfamilie',
    options: ['Option 1', 'Option 2', 'Option 3'],
    selected: ['Option 1', 'Option 2', 'Option 3'],
  },
  {
    id: 'filter-4',
    name: 'Schaltausgang',
    options: ['Option 1', 'Option 2', 'Option 3'],
    selected: [],
  },
  {
    id: 'filter-5',
    name: 'Anschlussart',
    options: ['Option 1', 'Option 2', 'Option 3'],
    selected: [],
  },
  {
    id: 'filter-6',
    name: 'Umgebungstemperatur Betrieb',
    options: ['-25°C...80°C', 'CQ'],
    selected: [],
  },
];

// Type declaration for global window property
declare global {
  interface Window {
    tagGroupFilters: typeof filters;
  }
}

const meta: Meta = {
  parameters: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    chromatic: {
      ...storyBookPreviewConfig?.parameters?.chromatic,
      disableSnapshot: false,
      modes: Chromatic_Modes_All,
    },
    design: generateFigmaPluginObject('45546-179050'),
    docs: {
      description: {
        component: generateStoryDescription('tag-group', 'default', 'templates'),
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
        iframeHeight: 1600,
        inline: true,
      },
    },
  },
  tags: ['Feedback', 'Tags', 'Filter'],
  title: 'Templates/Tag Group',
};
export default meta;

export const TagGroup = {
  render: () => {
    return html`
      <script>
      // Make filters available globally for the module script
      window.tagGroupFilters = ${JSON.stringify(filters, null, 2)};
      </script>

      <form class="filter-form">
        <h1>Kapazitive Näherungssensoren</h1>
        
        <div class="filter-group">
          ${filters.map(filter => html`
            <syn-dropdown stay-open-on-select>
              <syn-button slot="trigger" caret>
                ${filter.name}
                <span class="filter-count"> - ${filter.selected.length || 0}</span>
              </syn-button>
              <syn-menu id="${filter.id}" style="width: 200px;">
                ${filter.options.map(option => html`
                  <syn-menu-item
                    ?checked="${filter.selected.includes(option)}"
                    type="checkbox"
                    value="${option}"
                  >${option}</syn-menu-item>
                `)}
              </syn-menu>
            </syn-dropdown>        
          `)}

          <syn-button variant="filled">
            <syn-icon name="filter_alt" slot="prefix"></syn-icon>
            Alle Filter
          </syn-button>
        </div>
        <!-- /.filter-group -->

        <div class="filter-tags" hidden></div>
        <!-- /.filter-tags -->
      </form>
      <!-- /filter-form -->
      
      <style>
      .filter-form {
        max-width: 1136px;
        
        h1 {
          color: var(--syn-typography-color-text);
          font: var(--syn-heading-3x-large);
          margin: 0 0 var(--syn-spacing-2x-large);
          padding: 0;
        }

        .filter-group {
          display: flex;
          flex-wrap: wrap;
          gap: var(--syn-spacing-medium);
          margin-bottom: var(--syn-spacing-x-large);
        }

        .filter-tags {
          align-items: center;
          background: var(--syn-color-neutral-100);
          display: flex;
          flex-wrap: wrap;
          gap: var(--syn-spacing-large);
          padding: var(--syn-spacing-large);
        }
      }
      </style>

      <script type="module">
      // Access the filters from the global window object
      const filters = window.tagGroupFilters;

      const filterTagsContainer = document.querySelector('.filter-tags');
           
      const createFiltersFromSelectedOptions = () => {
        // Always read current state from DOM
        const currentState = filters.map(filter => {
          const menu = document.querySelector(\`#\${filter.id}\`);
          const selectedItems = menu ? Array.from(menu.querySelectorAll('syn-menu-item[type="checkbox"][aria-checked="true"]')) : [];
          return {
            ...filter,
            selected: selectedItems.map(item => item.value)
          };
        });

        // Update filter count displays
        currentState.forEach(filter => {
          const menu = document.querySelector(\`#\${filter.id}\`);
          if (menu) {
            const button = menu.parentElement.querySelector('syn-button .filter-count');
            if (button) {
              button.innerHTML = \` - \${filter.selected.length}\`;
            }
          }
        });

        // Check if there are any actual selected values across all filters
        const hasSelectedFilters = currentState.some(filter => filter.selected.length > 0);

        // Clear existing content
        filterTagsContainer.replaceChildren();

        if (!hasSelectedFilters) {
          filterTagsContainer.hidden = true;
          return;
        }

        // Create and append elements directly
        currentState
          .filter(filter => filter.selected.length > 0) // Only include filters with selections
          .forEach(filter => {
            const newFilter = document.createElement('syn-tag-group');
            
            newFilter.labelPosition = 'start';
            newFilter.label = filter.name;

            filter.selected.forEach(option => {
              const tag = document.createElement('syn-tag');
              tag.removable = true;
              tag.textContent = option;
              newFilter.appendChild(tag);
            });

            // Append the element directly to the container
            filterTagsContainer.appendChild(newFilter);
          });

        // Add the Delete filters button
        const clearFiltersButton = document.createElement('syn-button');
        clearFiltersButton.variant = 'text';
        clearFiltersButton.innerHTML = 'Alle Filter löschen <syn-icon name="delete" slot="prefix"></syn-icon>';

        filterTagsContainer.appendChild(clearFiltersButton);

        filterTagsContainer.hidden = false;
      };

      const filterGroup = document.querySelector('.filter-group');

      // Listen for selection changes in any of the dropdown menus
      filterGroup.addEventListener('syn-select', async (e) => {
        const { target } = e;

        if (target.tagName.toLowerCase() !== 'syn-menu') {
          return;
        }

        // DOM needs to be updated before we can get the checked items
        await target.updateComplete;

        // Recreate filters based on current application state
        createFiltersFromSelectedOptions();
      });

      // Listen for tag removal events
      filterTagsContainer.addEventListener('syn-remove', async (e) => {
        const tag = e.target;
        const tagGroup = tag.closest('syn-tag-group');
        const filterName = tagGroup.label;
        const filter = filters.find(f => f.name === filterName);

        if (!filter) {
          return;
        }

        // Uncheck the corresponding menu item in the DOM
        const menu = document.querySelector(\`#\${filter.id}\`);
        if (menu) {
          const menuItem = Array.from(menu.querySelectorAll('syn-menu-item[type="checkbox"]'))
            .find(item => item.value === tag.textContent);
          if (menuItem) {
            menuItem.checked = false;
            // Wait for the component to update before recreating filters
            await menuItem.updateComplete;
          }
        }

        // Recreate filters based on current application state
        createFiltersFromSelectedOptions();
      });   

      const bootstrapFilters = async () => {
        await customElements.whenDefined('syn-dropdown');
        await customElements.whenDefined('syn-menu');
        createFiltersFromSelectedOptions();
      };

      bootstrapFilters();
      </script>
    `;
  },
};

export const TagGroupTablet = {
  ...TagGroup,
  globals: {
    viewport: { value: 'mobile2' },
  },
  name: '↳ Tablet',
  parameters: {
    controls: {
      exclude: ['default'],
    },
    docs: {
      disable: true,
    },
  },
};
