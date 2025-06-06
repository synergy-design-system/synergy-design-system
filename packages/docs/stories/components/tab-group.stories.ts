/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import '../../../components/src/components/tab-group/tab-group.js';
import '../../../components/src/components/tab/tab.js';
import '../../../components/src/components/tab-panel/tab-panel.js';
import '../../../components/src/components/icon/icon.js';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { pascalCase } from 'change-case';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { SynTab } from '@synergy-design-system/components';
import {
  generateScreenshotStory,
  generateStoryDescription, storybookDefaults, storybookHelpers, storybookTemplate,
} from '../../src/helpers/component.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-tab-group');
const { overrideArgs } = storybookHelpers('syn-tab-group');
const { generateTemplate } = storybookTemplate('syn-tab-group');

const createTab = (
  panel: string,
  content: string,
  { active = false, closable = false, disabled = false } = {},
) => `<syn-tab slot="nav" panel="${panel}" ${active ? 'active' : ''} ${disabled ? 'disabled' : ''} ${closable ? 'closable' : ''}>${content}</syn-tab>`;

const createTabHtml = (
  panel: string,
  content: string,
  { active = false, closable = false, disabled = false } = {},
) => unsafeHTML(createTab(panel, content, { active, closable, disabled }));

const createTabs = () => [
  { panel: 'general', props: { active: true } },
  { panel: 'custom' },
  { panel: 'advanced' },
  { panel: 'disabled', props: { disabled: true } },
].map(({ panel, props }) => createTab(panel, pascalCase(panel), props)).join('\n');

const createTabsHtml = () => unsafeHTML(createTabs());

const createTabPanel = (name: string, content: string, active: boolean = false) => `<syn-tab-panel name="${name}" ${active ? 'active' : ''}>${content}</syn-tab-panel>`;

const createTabPanelHtml = (
  name: string,
  content: string,
  active: boolean = false,
) => unsafeHTML(createTabPanel(name, content, active));

const createTabPanels = () => [
  'general',
  'custom',
  'advanced',
  'disabled',
].map((name, index) => createTabPanel(name, `This is the ${name} tab panel.`, index === 0)).join('\n');

const createReplaceTabPanels = (name: string, active: boolean = false) => html`
<syn-tab-panel name="${name}" ?active=${active}>
  <main class="synergy-replace">
    Replace this slot
  </main>
</syn-tab-panel>
`;

const createReplaceContent = () => html`
  ${['tab-1', 'tab-2', 'tab-3', 'tab-4'].map((name, index) => createTabHtml(name, 'Tab item', { active: index === 0 }))}
  ${['tab-1', 'tab-2', 'tab-3', 'tab-4'].map((name, index) => createReplaceTabPanels(name, index === 0))}
`;

const createTabPanelsHtml = () => unsafeHTML(createTabPanels());

const meta: Meta = {
  args: overrideArgs([
    {
      name: 'default',
      type: 'slot',
      value: createTabPanels(),
    },
    {
      name: 'nav',
      type: 'slot',
      value: createTabs(),
    },
  ], defaultArgs),
  argTypes,
  component: 'syn-tab-group',
  parameters: {
    design: generateFigmaPluginObject('18021-1924779'),
    docs: {
      description: {
        component: generateStoryDescription('tab-group', 'default'),
      },
    },
  },
  title: 'Components/syn-tab-group',
};
export default meta;

type Story = StoryObj;

export const Default = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('tab-group', 'default'),
      },
    },
  },
  render: (args: unknown) => generateTemplate({ args }),
} as Story;

export const TabsOnStart: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('tab-group', 'start'),
      },
    },
  },
  render: () => html`
  <syn-tab-group placement="start">
    ${createTabsHtml()}
    ${createTabPanelsHtml()}
  </syn-tab-group>
  `,
};

export const TabsOnEnd: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('tab-group', 'end'),
      },
    },
  },
  render: () => html`
  <syn-tab-group placement="end">
    ${createTabsHtml()}
    ${createTabPanelsHtml()}
  </syn-tab-group>
`,
};

export const ClosableTabs: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('tab-group', 'closable'),
      },
    },
  },
  render: () => html`
    <syn-tab-group class="tabs-closable">
      <!-- Tabs -->
      ${[
      { content: 'General', panel: 'general', props: { active: true } },
      { content: 'Closable 1', panel: 'closable-1', props: { closable: true } },
      { content: 'Closable 2', panel: 'closable-2', props: { closable: true } },
      { content: 'Closable 3', panel: 'closable-3', props: { closable: true } },
    ]
      .map(({ content, panel, props }) => createTabHtml(panel, content, props))
    }

      <!-- Tab Panels  -->
      ${[
      { content: 'general', name: 'general' },
      { content: 'first closable', name: 'closable-1' },
      { content: 'second closable', name: 'closable-2' },
      { content: 'third closable', name: 'closable-3' },
    ]
      .map(({ content, name }, index) => createTabPanelHtml(name, `This is the ${content} tab panel.`, index === 0))
    }
    </syn-tab-group>

    <script type="module">
      const tabGroup = document.querySelector('.tabs-closable');
      tabGroup.addEventListener('syn-close', async event => {
        const tab = event.target;
        const panel = tabGroup.querySelector(\`syn-tab-panel[name="\${tab.panel}"]\`);
        
        // Show the previous tab if the tab is currently active
        if (tab.active) {
          tabGroup.show(tab.previousElementSibling.panel);
        }

        // Remove the tab + panel
        tab.remove();
        panel.remove();
      });
    </script>
  `,
};

export const ScrollingTabs: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('tab-group', 'scrolling'),
      },
    },
  },
  render: () => html`
    <syn-tab-group>
      <!-- Tabs -->
      ${['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']
      .map((count, index) => createTabHtml(`tab-${count}`, `Tab ${count}`, { active: index === 0 }))
    }

      <!-- Tab Panels -->
      ${['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']
      .map((count, index) => createTabPanelHtml(`tab-${count}`, `Tab panel ${count}`, index === 0))
    }
    </syn-tab-group>
  `,
};

export const VisualHierarchy: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('tab-group', 'hierachy'),
      },
    },
  },
  render: () => html`
    <h3 class="body-medium">Default</h3>
    <syn-tab-group>
      ${createReplaceContent()}
    </syn-tab-group>

    <h3 class="body-medium">Contained</h3>
    <syn-tab-group contained>
      ${createReplaceContent()}
    </syn-tab-group>

    <h3 class="body-medium">Sharp</h3>
    <syn-tab-group contained sharp>
     ${createReplaceContent()}
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

      .body-medium:first-of-type {
        margin-top: 0;
      }

      .body-medium {
        font: var(--syn-body-medium-bold);
        color: var(--syn-color-neutral-1000);
        margin-top: var(--syn-spacing-2x-large);
        margin-bottom: var(--syn-spacing-large);
      }
    </style>
  `,
};

export const ManualActivation: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('tab-group', 'manuel'),
      },
    },
  },
  play: ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const elm = canvasElement.querySelector<SynTab>('syn-tab[panel="general"]');
    elm?.focus();
  },
  render: () => html` 
    <syn-tab-group activation="manual">
      ${createTabsHtml()}
      ${createTabPanelsHtml()}
    </syn-tab-group>
  `,
};

export const Icons: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('tab-group', 'icon'),
      },
    },
  },
  render: () => html`
  <syn-tab-group>
    <syn-tab slot="nav" panel="general" active>
      <syn-icon name="style"></syn-icon>
      General
    </syn-tab>
    <syn-tab slot="nav" panel="custom">
      <syn-icon name="tune"></syn-icon>
      Custom
    </syn-tab>
    <syn-tab slot="nav" panel="advanced">
      <syn-icon name="verified_user"></syn-icon>
      Advanced
    </syn-tab>
    <syn-tab slot="nav" panel="disabled" disabled>
      <syn-icon name="update_disabled"></syn-icon>
      Disabled
    </syn-tab>
    ${createTabPanelsHtml()}
  </syn-tab-group>
`,
};

// For this screenshot story to work correctly, we needed to explicitly set the active prop on each
// first tab and first tab-panel, although the tab-group sets the first tab and tab-panel active
// by itself, if none is set active.
// But this behavior is ONLY triggered, if the tab-group is visible (IntersectionObserver is used).
// Since the screenshot story is too large, some tab-groups are not part of the visible viewport.
/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  TabsOnStart,
  TabsOnEnd,
  ClosableTabs,
  ScrollingTabs,
  VisualHierarchy,
  Icons,
}, {
  heightPx: 740,
});
/* eslint-enable sort-keys */
