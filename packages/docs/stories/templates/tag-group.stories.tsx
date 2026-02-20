import React from 'react';
import type { Meta } from '@storybook/web-components-vite';
import {
  Description,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import { html, render } from 'lit';
import type { SynHideEvent, SynSelectEvent, SynShowEvent } from '@synergy-design-system/components';
import storyBookPreviewConfig from '../../.storybook/preview.js';
import { generateStoryDescription } from '../../src/helpers/component.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';
import { Chromatic_Modes_All } from '../../.storybook/modes.js';
import '../../../components/src/components/button/button.js';
import '../../../components/src/components/details/details.js';
import '../../../components/src/components/dropdown/dropdown.js';
import '../../../components/src/components/menu/menu.js';
import '../../../components/src/components/menu-item/menu-item.js';
import '../../../components/src/components/option/option.js';
import '../../../components/src/components/select/select.js';
import '../../../components/src/components/tag-group/tag-group.js';
import '../../../components/src/components/tag/tag.js';
import '../../../components/src/components/icon/icon.js';

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
    },
  },
  tags: ['Feedback', 'Tags', 'Filter'],
  title: 'Templates/Tag Group',
};
export default meta;

export const TagGroup = {
  render: () => {
    // Initial state - completely self-contained
    let state = {
      filters: [
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
      ],
      filtersOpen: true,
    };

    // Action type definitions
    type Actions = {
      toggleOption: (filterId: string, option: string) => void;
      removeTag: (filterId: string, option: string) => void;
      clearAllFilters: () => void;
      toggleFilter: (isOpen: boolean) => void;
    };

    // Pure view function that takes state and actions as parameters
    const renderView = (currentState: typeof state, actions: Actions) => html`
      <form class="filter-form">
        <h1>Kapazitive Näherungssensoren</h1>
        
        <syn-details
          summary=${currentState.filtersOpen ? 'Filter ausblenden' : 'Filter öffnen'}
          ?open="${currentState.filtersOpen}"
          size="small"
          @syn-show=${(e: SynShowEvent) => {
            if ((e.target as HTMLElement).tagName.toLowerCase() !== 'syn-details') {
              return;
            }
            actions.toggleFilter(true);
          }}
          @syn-hide=${(e: SynHideEvent) => {
            if ((e.target as HTMLElement).tagName.toLowerCase() !== 'syn-details') {
              return;
            }
            actions.toggleFilter(false);
          }}
        >
          <syn-icon slot="expand-icon" name="keyboard_arrow_down"></syn-icon>
          <syn-icon slot="collapse-icon" name="keyboard_arrow_up"></syn-icon>
          <div class="filter-group">
            ${currentState.filters.map(filter => html`
              <syn-dropdown stay-open-on-select sync="width">
                <syn-button slot="trigger" caret>
                  ${filter.name}${filter.selected.length > 0 ? ` - ${filter.selected.length}` : ''}
                </syn-button>
                <syn-menu 
                  id="${filter.id}"
                  @syn-select=${(e: SynSelectEvent) => {
                    const menuItem = e.detail.item;
                    actions.toggleOption(filter.id, menuItem.value);
                  }}
                >
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
        </syn-details>

        ${currentState.filters.some(filter => filter.selected.length > 0) ? html`
          <div class="filter-tags">
            ${currentState.filters
              .filter(filter => filter.selected.length > 0)
              .map(filter => html`
                <syn-tag-group label-position="start" label="${filter.name}">
                  ${filter.selected.map(option => html`
                    <syn-tag
                      removable
                      @syn-remove=${() => actions.removeTag(filter.id, option)}
                    >
                      ${option}
                    </syn-tag>
                  `)}
                </syn-tag-group>
              `)}
            
            <syn-button 
              variant="text" 
              @click=${actions.clearAllFilters}
            >
              <syn-icon name="delete" slot="prefix"></syn-icon>
              Alle Filter löschen
            </syn-button>
          </div>
        ` : ''}
      </form>

      <style>
        .filter-form {
          container-type: inline-size;
          max-width: 1136px;
        }
        
        .filter-form h1 {
          color: var(--syn-typography-color-text);
          font: var(--syn-heading-3x-large);
          margin: 0 0 var(--syn-spacing-2x-large);
          padding: 0;
        }

        /* Hide the syn-details header per default. Only needed on mobile */
        .filter-form syn-details::part(header) {
          display: none;
        }

        .filter-form syn-details::part(content) {
          padding-bottom: 0;
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

        @container (max-width: 420px) {
          .filter-form .filter-group {
            flex-direction: column;
            margin-bottom: var(--syn-spacing-2x-large);
          }

          /* Show the syn-details header */
          .filter-form syn-details::part(header) {
            display: flex;
            justify-self: end;
          }

          .filter-form .filter-group syn-dropdown syn-button {
            width: 100%;
            display: block;
          }
          
          .filter-form .filter-group syn-dropdown syn-button::part(label) {
            width: 100%;
          }

          .filter-form .filter-tags {
            flex-direction: column;
          }
        }
      </style>
    `;

    // Create container
    const container = document.createElement('div');

    // Create the system with proper dependency injection
    const createFilterSystem = () => {
      let currentActions: Actions;

      const rerender = () => {
        render(renderView(state, currentActions), container);
      };

      const updateState = (newState: Partial<typeof state>) => {
        state = { ...state, ...newState };
        rerender();
      };

      const actions: Actions = {
        clearAllFilters: () => {
          // eslint-disable-next-line no-alert
          if (window.confirm('Möchten Sie wirklich alle Filter entfernen?')) {
            const newFilters = state.filters.map(filter => ({
              ...filter,
              selected: [],
            }));
            updateState({ filters: newFilters });
          }
        },

        removeTag: (filterId: string, option: string) => {
          const newFilters = state.filters.map(filter => {
            if (filter.id === filterId) {
              return {
                ...filter,
                selected: filter.selected.filter(item => item !== option),
              };
            }
            return filter;
          });
          updateState({ filters: newFilters });
        },

        toggleFilter: (isOpen: boolean) => {
          updateState({ filtersOpen: isOpen });
        },

        toggleOption: (filterId: string, option: string) => {
          const newFilters = state.filters.map(filter => {
            if (filter.id === filterId) {
              const selected = filter.selected.includes(option)
                ? filter.selected.filter(item => item !== option)
                : [...filter.selected, option];
              return { ...filter, selected };
            }
            return filter;
          });
          updateState({ filters: newFilters });
        },
      };

      // Inject actions into the system
      currentActions = actions;

      // Initial render
      rerender();

      return { actions, rerender };
    };

    // Initialize the system
    createFilterSystem();

    return container;
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
