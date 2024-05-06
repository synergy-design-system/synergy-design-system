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
import { getTranslation } from '../../src/translations.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';

const meta: Meta = {
  parameters: {
    design: generateFigmaPluginObject('16823-28344'),
    docs: {
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
  title: 'Templates/Accordion',
};
export default meta;

export const QA = {
  name: 'Q&A',
  parameters: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    chromatic: {
      ...storyBookPreviewConfig?.parameters?.chromatic,
      disableSnapshot: false,
    },
  },
  render: () => html`
    <div class="qa-wrapper">
      <h1>${getTranslation('accordion.headline')}</h1>
      <syn-accordion size="medium">
        ${[1, 2, 3, 4].map((count) => {
          const { content, headline } = getTranslation(`accordion.details${count}`);
          return html`
            <syn-details ?open="${count === 2}" summary="${headline}">
              ${content}
            </syn-details>
          `;
        })}
      </syn-accordion>
    </div>

    <style>
      .qa-wrapper {
        background: var(--syn-color-neutral-0);
        padding: var(--syn-spacing-x-large);
        max-width: 776px;
      }

      .qa-wrapper h1 {
        font: var(--syn-heading-3x-large);
        margin: 0 0 var(--syn-spacing-large) 0 !important;
      }
    </style>
  `,
};
