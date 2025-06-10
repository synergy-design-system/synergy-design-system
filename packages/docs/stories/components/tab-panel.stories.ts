/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import '../../../components/src/components/tab-panel/tab-panel.js';
import '../../../components/src/components/tab-group/tab-group.js';
import '../../../components/src/components/tab/tab.js';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import {
  generateScreenshotStory, storybookDefaults, storybookHelpers, storybookTemplate,
} from '../../src/helpers/component.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';
import docsTokens from '../../../tokens/src/figma-tokens/_docs.json';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-tab-panel');
const { overrideArgs } = storybookHelpers('syn-tab-panel');
const { generateTemplate } = storybookTemplate('syn-tab-panel');

const createReplaceContent = () => html`<main class="synergy-replace">Replace this slot</main>`;

const meta: Meta = {
  args: overrideArgs([
    {
      name: 'default',
      type: 'slot',
      value: createReplaceContent().strings.join('\n'),
    },
    {
      name: 'name',
      type: 'attribute',
      value: 'tab1',
    },
  ], defaultArgs),
  argTypes,
  component: 'syn-tab-panel',
  parameters: {
    design: generateFigmaPluginObject('18086-44682'),
    docs: {
      description: {
        component: docsTokens.components['tab-panel'].description.value,
      },
    },
  },
  title: 'Components/syn-tab-panel',
};
export default meta;

type Story = StoryObj;

export const Default = {
  parameters: {
    docs: {
      description: {
        story: docsTokens.components['tab-panel'].description.value,
      },
    },
  },
  render: (args: unknown) => html`
  <syn-tab-group>
    <syn-tab slot="nav" panel="tab1">Tab Item</syn-tab>
    <syn-tab slot="nav" panel="tab2">Tab Item</syn-tab>
    <syn-tab slot="nav" panel="tab3">Tab Item</syn-tab>
    <syn-tab slot="nav" panel="tab4">Tab Item</syn-tab>
    
    ${generateTemplate({ args })}
    <syn-tab-panel name="tab2">${createReplaceContent()}</syn-tab-panel>
    <syn-tab-panel name="tab3">${createReplaceContent()}</syn-tab-panel>
    <syn-tab-panel name="tab4">${createReplaceContent()}</syn-tab-panel>
  </syn-tab-group>
  <style>
    .synergy-replace {
      border: 1px dashed #9747FF;
      border-radius: var(--syn-border-radius-small);
      color: #9747FF;
      font: var(--syn-body-small-bold);
      height: var(--syn-spacing-x-large);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  </style>
  `,
} as Story;

export const Screenshot: Story = generateScreenshotStory({
  Default,
}, 200);
