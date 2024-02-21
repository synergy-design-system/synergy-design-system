import React from 'react';
import type { Meta, StoryObj } from '@storybook/web-components';
import {
  Description,
  Stories,
  Subtitle,
  Title,
} from '@storybook/blocks';
import { html } from 'lit';
import { generateScreenshotStory } from '../../src/helpers/component.js';

/**
 * **@synergy-design-system/styles** provides helpers that make it easier to apply
 * form styling according to the Synergy Design System in an easy to use way
 * **without using custom components**.
 * For this, we provide some common helper functions as detailed below:
 */
const meta: Meta = {
  parameters: {
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
  title: 'Styles/Forms',
};
export default meta;

/**
 * Add a `className` of **syn-fieldset** to a `<fieldset />` element to structure your `<form />`.
 *
 * > 💡 All `<legend />` tags in `<fieldset.syn-fieldset />` will
 * > automatically apply synergies recommended styling for those elements, too.
 */
export const SynFieldset: StoryObj = {
  name: '.syn-fieldset',
  render: () => html`
    <form>
      <fieldset class="syn-fieldset">
        <legend>Legend 1</legend>
        <syn-input label="Field 1"></syn-input>
      </fieldset>
    </form>
  `,
};

/**
 * Apply the recommended styling for `<legend />` elements.
 * Note that this does **not** add styles to wrapping `<fieldset />` elements.
 */
export const SynLegend: StoryObj = {
  name: '.syn-legend',
  render: () => html`<legend class="syn-legend">Legend 1</legend>`,
};

// Bundled screenshot story
export const Screenshot: StoryObj = generateScreenshotStory({
  SynFieldset,
  SynLegend,
}, 200);
