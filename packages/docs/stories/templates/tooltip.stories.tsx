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
import '../../../components/src/components/button/button.js';
import '../../../components/src/components/button-group/button-group.js';
import '../../../components/src/components/header/header.js';
import '../../../components/src/components/tooltip/tooltip.js';
import '../../../components/src/components/icon/icon.js';
import { generateStoryDescription } from '../../src/helpers/component.js';
import { Chromatic_Modes_All } from '../../.storybook/modes.js';

const meta: Meta = {
  parameters: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    chromatic: {
      ...storyBookPreviewConfig?.parameters?.chromatic,
      disableSnapshot: false,
      modes: Chromatic_Modes_All,
    },
    docs: {
      description: {
        component: generateStoryDescription('tooltip', 'default', 'templates'),
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
  tags: ['Feedback'],
  title: 'Templates/Tooltip',
};
export default meta;

export const SingleInstance = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('tooltip', 'single-instance', 'templates'),
      },
    },
  },
  render: () => html`
    <div id="tooltip-single-instance-story">
      <syn-header label="Single Instance Tooltips">
        <nav slot="meta-navigation">
          <syn-button-group label="Download and save">
            <syn-button data-tooltip="Save">
              <syn-icon name="save" label="Save"></syn-icon>
            </syn-button>
            <syn-button data-tooltip="Download">
              <syn-icon name="save_alt" label="Download"></syn-icon>
            </syn-button>
          </syn-button-group>

          <syn-button-group label="Misc">
            <syn-button data-tooltip="Edit">
              <syn-icon name="edit" label="Edit"></syn-icon>
            </syn-button>
            <syn-button data-tooltip="Settings">
              <syn-icon name="settings" label="Settings"></syn-icon>
            </syn-button>
            <syn-button data-tooltip="Preview">
              <syn-icon name="wallpaper" label="Preview"></syn-icon>
            </syn-button>
          </syn-button-group>
        </nav>
      </syn-header>

      <!-- Content Area -->
      <section>
        <article>
          <h2>Single instance tooltips</h2>
          <p>
            By default, you will have to wrap each element that needs a tooltip with a separate <code data-tooltip="&lt;syn-tooltip&gt;My Content&lt;/syn-tooltip&gt;">&lt;syn-tooltip&gt;</code> component.
            If you want to share a single instance of <code>&lt;syn-tooltip&gt;</code> across an application, you can do so by using the <code data-tooltip="anchor is a property on the SynTooltip class. It allows you to specify the element the tooltip should be anchored to.">anchor</code> attribute to manually control which element the tooltip is anchored to.
            This example will show how you can set up a single tooltip instance that will work for all elements with a <code>data-tooltip</code> attribute, even if those elements are added dynamically after the initial setup.
          </p>

          <p>
            This approach is useful for cases where you have a large number of tooltip triggers or dynamically generated content, as it avoids the overhead of multiple tooltip instances and allows for more flexible tooltip management.
            However, it also comes with some caveats, such as the need to manage tooltip state and transitions to avoid issues like flickering or incorrect positioning when rapidly switching between triggers.
            This example also currently only works on hover.
          </p>

          <syn-button
            data-tooltip="Dynamically adds or removes the toolbar custom section"
            id="add-section-button"
            variant="filled"
          >
            Toggle custom section
          </syn-button>
        </article>
      </section>
    </div>

    <!-- Global Tooltip instance. Make sure that it has trigger="manual" set. --> 
    <syn-tooltip id="global-tooltip" trigger="manual"></syn-tooltip>

    <style>
    #tooltip-single-instance-story {
      section {
        background: var(--syn-page-background);
      }
      section [data-tooltip]:not(syn-button) {
        cursor: help;
        text-decoration: underline dotted;
      }

      article {
        padding: var(--syn-spacing-medium);
        h2 {
          margin: 0 0 var(--syn-spacing-medium) 0;
        }
      }
    }
    </style>

    <script type="module">
    /**
     * Installs singleton tooltip behavior for all descendants that use [data-tooltip].
     *
     * Why this utility is async:
     * - It can be called immediately, even before custom elements are fully defined.
     * - It waits for the tooltip component to become ready and only then binds listeners.
     *
     * Why there are multiple listeners:
     * - mouseover (capture): detects entering any current or future [data-tooltip] trigger.
     * - mouseout (capture): detects leaving the current trigger to hide or switch anchor.
     * - syn-after-show / syn-after-hide: serializes transitions to avoid open/close races.
     *
     * @param {HTMLElement} tooltipElement A <syn-tooltip trigger="manual"> instance.
     * @param {ParentNode} root Event delegation root. Defaults to document.
     * @returns {Promise<() => void>} Cleanup function that removes all listeners.
     */
    const setupTooltip = async (tooltipElement, root = document) => {
      if (!(tooltipElement instanceof HTMLElement)) {
        throw new TypeError('setupTooltip requires a tooltip DOM node.');
      }

      const cleanupKey = '__synSingletonTooltipCleanup__';
      if (typeof tooltipElement[cleanupKey] === 'function') {
        tooltipElement[cleanupKey]();
      }

      await customElements.whenDefined('syn-tooltip');
      await tooltipElement.updateComplete;

      const delegatedRoot = root ?? document;
      let requestedAnchor = null;
      let transitionInFlight = false;

      const getTooltipTarget = node => {
        if (!(node instanceof Element)) {
          return null;
        }

        return node.closest('[data-tooltip]');
      };

      const getTooltipContent = element => element.getAttribute('data-tooltip')?.trim() ?? '';

      const isSyncNeeded = () => {
        const currentAnchor = tooltipElement.anchor instanceof HTMLElement ? tooltipElement.anchor : null;

        if (requestedAnchor) {
          const nextContent = getTooltipContent(requestedAnchor);
          if (nextContent === '') {
            return tooltipElement.open;
          }

          return !tooltipElement.open || currentAnchor !== requestedAnchor || tooltipElement.content !== nextContent;
        }

        return tooltipElement.open;
      };

      const syncTooltipState = () => {
        if (transitionInFlight) {
          return;
        }

        const currentAnchor = tooltipElement.anchor instanceof HTMLElement ? tooltipElement.anchor : null;

        if (requestedAnchor) {
          const nextContent = getTooltipContent(requestedAnchor);

          if (nextContent === '') {
            requestedAnchor = null;
          } else if (tooltipElement.open && currentAnchor !== requestedAnchor) {
            transitionInFlight = true;
            tooltipElement.open = false;
            return;
          } else {
            tooltipElement.content = nextContent;
            tooltipElement.anchor = requestedAnchor;

            if (!tooltipElement.open) {
              transitionInFlight = true;
              tooltipElement.open = true;
            }

            return;
          }
        }

        if (tooltipElement.open) {
          transitionInFlight = true;
          tooltipElement.open = false;
        }
      };

      const handleAfterShow = () => {
        transitionInFlight = false;
        if (isSyncNeeded()) {
          syncTooltipState();
        }
      };

      const handleAfterHide = () => {
        transitionInFlight = false;
        if (isSyncNeeded()) {
          syncTooltipState();
        }
      };

      const handleMouseOver = event => {
        const target = getTooltipTarget(event.target);
        const relatedTarget = getTooltipTarget(event.relatedTarget);

        if (!(target instanceof HTMLElement) || target === relatedTarget) {
          return;
        }

        if (getTooltipContent(target) === '') {
          return;
        }

        requestedAnchor = target;
        syncTooltipState();
      };

      const handleMouseOut = event => {
        const target = getTooltipTarget(event.target);
        const relatedTarget = getTooltipTarget(event.relatedTarget);

        if (!(target instanceof HTMLElement) || target === relatedTarget || requestedAnchor !== target) {
          return;
        }

        requestedAnchor = relatedTarget instanceof HTMLElement ? relatedTarget : null;
        syncTooltipState();
      };

      tooltipElement.addEventListener('syn-after-show', handleAfterShow);
      tooltipElement.addEventListener('syn-after-hide', handleAfterHide);
      delegatedRoot.addEventListener('mouseover', handleMouseOver, true);
      delegatedRoot.addEventListener('mouseout', handleMouseOut, true);

      const cleanup = () => {
        tooltipElement.removeEventListener('syn-after-show', handleAfterShow);
        tooltipElement.removeEventListener('syn-after-hide', handleAfterHide);
        delegatedRoot.removeEventListener('mouseover', handleMouseOver, true);
        delegatedRoot.removeEventListener('mouseout', handleMouseOut, true);
        if (tooltipElement.open) {
          tooltipElement.open = false;
        }
      };

      tooltipElement[cleanupKey] = cleanup;
      return cleanup;
    };

    const globalTooltip = document.getElementById('global-tooltip');
    if (globalTooltip instanceof HTMLElement) {
      setupTooltip(globalTooltip).catch(error => {
        console.error('Failed to initialize singleton tooltip setup.', error);
      });
    }

    const addSectionButton = document.getElementById('add-section-button');

    addSectionButton?.addEventListener('click', () => {
      const root = document.querySelector('#tooltip-single-instance-story syn-header nav');
      const hasCustomSection = root?.querySelector('.custom-section');

      if (root && !hasCustomSection) {
        const newSection = document.createElement('syn-button-group');
        newSection.classList.add('custom-section');
        newSection.setAttribute('label', 'Custom Section');

        const newButton = document.createElement('syn-button');
        newButton.setAttribute('data-tooltip', 'I am a dynamically added button with a tooltip!');
        newButton.innerHTML = '<syn-icon name="star" label="Star"></syn-icon>';

        newSection.appendChild(newButton);
        root.appendChild(newSection);
      } else if (hasCustomSection) {
        hasCustomSection.remove();
      }
    });
    </script>
  `,
};
