/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import '../../../components/src/components/side-nav/side-nav.js';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-side-nav');
const { overrideArgs } = storybookHelpers('syn-side-nav');
const { generateTemplate } = storybookTemplate('syn-side-nav');

const meta: Meta = {
  args: overrideArgs([
    {
      name: 'default',
      type: 'slot',
      value: 'Label',
    },
  ], defaultArgs),
  argTypes,
  component: 'syn-side-nav',
  parameters: {
    docs: {
      description: {
        component: generateStoryDescription('nav-item', 'default'),
      },
    },
  },
  title: 'Components/syn-side-nav',
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  parameters: {
    controls: {
      disable: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('nav-item', 'default'),
      },
    },
  },
  render: (args: unknown) => generateTemplate({ args }),
};

export const Rail: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('nav-item', 'labels'),
      },
    },
  },
  render: () => html`
  <syn-side-nav rail>
    <syn-nav-item vertical>
      <syn-icon name="home" slot="prefix"></syn-icon>
      Home
    </syn-nav-item>
    <syn-nav-item current divider vertical>
      <syn-icon name="settings" slot="prefix"></syn-icon>
      Settings
    </syn-nav-item>
    <syn-nav-item divider vertical open>
      <syn-icon name="area_chart" slot="suffix"></syn-icon>
      <syn-icon name="add_alarm" slot="prefix"></syn-icon>
      Children
      <!-- second-level -->
      <nav slot="children">
        <syn-nav-item divider vertical>
          <syn-icon name="area_chart" slot="prefix"></syn-icon>
          Item 1.1
        </syn-nav-item>
        <syn-nav-item divider vertical>
          <syn-icon name="area_chart" slot="prefix"></syn-icon>
          Item 1.2
        </syn-nav-item>
        <syn-nav-item divider vertical>
          <syn-icon name="area_chart" slot="prefix"></syn-icon>
          Itemsdf
          <nav slot="children">
        <syn-nav-item divider vertical>
          <syn-icon name="area_chart" slot="prefix"></syn-icon>
          Item 1.1
        </syn-nav-item>
        <syn-nav-item divider vertical>
          <syn-icon name="area_chart" slot="prefix"></syn-icon>
          Item 1.2
        </syn-nav-item>
        <syn-nav-item divider vertical>
          <syn-icon name="area_chart" slot="prefix"></syn-icon>
          Itemsdf
          <nav slot="children">
        <syn-nav-item divider vertical>
          <syn-icon name="area_chart" slot="prefix"></syn-icon>
          Item 1.1
        </syn-nav-item>
        <syn-nav-item divider vertical>
          <syn-icon name="area_chart" slot="prefix"></syn-icon>
          Item 1.2
        </syn-nav-item>
        <syn-nav-item divider vertical>
          <syn-icon name="area_chart" slot="prefix"></syn-icon>
          Itemsdf
          
        </syn-nav-item>
      </nav>
        </syn-nav-item>
      </nav>
        </syn-nav-item>
      </nav>
      <!-- /second-level -->
    </syn-nav-item>
    <syn-nav-item disabled divider vertical>
      <syn-icon name="area_chart" slot="prefix"></syn-icon>
      Disabled option
    </syn-nav-item>
    <syn-nav-item divider vertical>
      <!-- <span slot="prefix">sdf</span> -->
      <syn-icon name="area_chart" slot="prefix"></syn-icon>
      <syn-icon name="area_chart" slot="suffix"></syn-icon>

      Other Option
    </syn-nav-item>
    <nav slot="footer">
      <syn-nav-item vertical slot="footer">
      <syn-icon name="area_chart" slot="prefix"></syn-icon>

        Other Option
      </syn-nav-item>
      <syn-nav-item divider vertical slot="footer">
      <syn-icon name="area_chart" slot="prefix"></syn-icon>

        Other Option
      </syn-nav-item>
    </nav>
  </syn-side-nav>
  `,
};

export const Footer: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('nav-item', 'labels'),
      },
    },
  },
  render: () => html`
  <syn-side-nav>
  <syn-nav-item vertical>
        <syn-icon name="home" slot="prefix"></syn-icon>
        Home
      </syn-nav-item>
      <syn-nav-item current divider vertical>
        <syn-icon name="settings" slot="prefix"></syn-icon>
        Settings
      </syn-nav-item>
      <syn-nav-item divider vertical>
      <syn-icon name="area_chart" slot="suffix"></syn-icon>

        <syn-icon name="add_alarm" slot="prefix"></syn-icon>
        Children
        <!-- second-level -->
        <nav slot="children">
          <syn-nav-item divider vertical>
            <syn-icon name="area_chart" slot="prefix"></syn-icon>
            Item 1.1
          </syn-nav-item>
          <syn-nav-item divider vertical>
            <syn-icon name="area_chart" slot="prefix"></syn-icon>
            Item 1.2
          </syn-nav-item>
          <syn-nav-item divider vertical>
            <syn-icon name="area_chart" slot="prefix"></syn-icon>
            Itemsdf
            <nav slot="children">
          <syn-nav-item divider vertical>
            <syn-icon name="area_chart" slot="prefix"></syn-icon>
            Item 1.1
          </syn-nav-item>
          <syn-nav-item divider vertical>
            <syn-icon name="area_chart" slot="prefix"></syn-icon>
            Item 1.2
          </syn-nav-item>
          <syn-nav-item divider vertical>
            <syn-icon name="area_chart" slot="prefix"></syn-icon>
            Itemsdf
            <nav slot="children">
          <syn-nav-item divider vertical>
            <syn-icon name="area_chart" slot="prefix"></syn-icon>
            Item 1.1
          </syn-nav-item>
          <syn-nav-item divider vertical>
            <syn-icon name="area_chart" slot="prefix"></syn-icon>
            Item 1.2
          </syn-nav-item>
          <syn-nav-item divider vertical>
            <syn-icon name="area_chart" slot="prefix"></syn-icon>
            Itemsdf
            
          </syn-nav-item>
        </nav>
          </syn-nav-item>
        </nav>
          </syn-nav-item>
        </nav>
        <!-- /second-level -->
      </syn-nav-item>
      <syn-nav-item disabled divider vertical>
        <syn-icon name="area_chart" slot="prefix"></syn-icon>
        Disabled option
      </syn-nav-item>
      <syn-nav-item divider vertical>
        <!-- <span slot="prefix">sdf</span> -->
        <syn-icon name="area_chart" slot="prefix"></syn-icon>
        <syn-icon name="area_chart" slot="suffix"></syn-icon>

        Other Option
      </syn-nav-item>
      <syn-nav-item vertical slot="footer">
      <syn-icon name="area_chart" slot="prefix"></syn-icon>
        Other Option
      </syn-nav-item>
      <syn-nav-item divider vertical slot="footer">
      <syn-icon name="area_chart" slot="prefix"></syn-icon>
        Other Option
      </syn-nav-item>
  </syn-side-nav>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Rail,
  Footer,
});
/* eslint-enable sort-keys */
