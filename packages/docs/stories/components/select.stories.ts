import '../../../components/src/components/select/select.js';
import '../../../components/src/components/combobox/combobox.js';
import '../../../components/src/components/option/option.js';
import '../../../components/src/components/optgroup/optgroup.js';
import '../../../components/src/components/icon/icon.js';
import '../../../components/src/components/button/button.js';
import '../../../components/src/components/dropdown/dropdown.js';
import '../../../components/src/components/menu/menu.js';
import '../../../components/src/components/menu-item/menu-item.js';
import '../../../components/src/components/dialog/dialog.js';
import '../../../components/src/components/drawer/drawer.js';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import type { SynSelect } from '@synergy-design-system/components';
import { html } from 'lit';
import { userEvent } from 'storybook/test';
import { openSelect } from '../../src/helpers/select.js';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';
import { paddingDecorator } from '../../src/decorators/PaddingDecorator.js';
import { Chromatic_Modes_All } from '../../.storybook/modes.js';

const { args, argTypes } = storybookDefaults('syn-select');
const { overrideArgs } = storybookHelpers('syn-select');
const { generateTemplate } = storybookTemplate('syn-select');

const meta: Meta = {
  args,
  argTypes,
  component: 'syn-select',
  parameters: {
    chromatic: {
      modes: Chromatic_Modes_All,
    },
    design: generateFigmaPluginObject('41325-310740'),
    docs: {
      description: {
        component: generateStoryDescription('select', 'default'),
      },
      story: {
        height: '250px',
      },
    },
  },
  tags: ['Form'],
  title: 'Components/syn-select',
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  parameters: {
    args: overrideArgs({
      name: 'default',
      type: 'slot',
      value: `
        <syn-option value="Option_1">Option 1</syn-option>
        <syn-option value="Option_2">Option 2</syn-option>
        <syn-option value="Option_3">Option 3</syn-option>
      `,
    }, args),
    controls: {
      disable: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('select', 'default'),
      },
    },
  },
  render: renderArgs => generateTemplate({ args: renderArgs }),
};

export const Labels: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('select', 'labels'),
      },
    },
  },
  render: () => html`
    <syn-select label="Select one">
      <syn-option value="option-1">Option 1</syn-option>
      <syn-option value="option-2">Option 2</syn-option>
      <syn-option value="option-3">Option 3</syn-option>
    </syn-select>
  `,
};

export const HelpText: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('select', 'help-text'),
      },
    },
  },
  render: () => html`
    <syn-select label="Experience" help-text="Please tell us your skill level.">
      <syn-option value="1">Novice</syn-option>
      <syn-option value="2">Intermediate</syn-option>
      <syn-option value="3">Advanced</syn-option>
    </syn-select>
  `,
};

export const Placeholder: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('select', 'placeholder'),
      },
    },
  },
  render: () => html`
    <syn-select placeholder="Select one">
      <syn-option value="option-1">Option 1</syn-option>
      <syn-option value="option-2">Option 2</syn-option>
      <syn-option value="option-3">Option 3</syn-option>
    </syn-select>
  `,
};

export const Clearable: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('select', 'clearable'),
      },
    },
  },
  render: () => html`
    <syn-select clearable value="option-1">
      <syn-option value="option-1">Option 1</syn-option>
      <syn-option value="option-2">Option 2</syn-option>
      <syn-option value="option-3">Option 3</syn-option>
    </syn-select>
  `,
};

export const Focus: Story = {
  decorators: [paddingDecorator()],
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('select', 'focus'),
      },
    },
  },
  play: ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const elm = canvasElement.querySelector<SynSelect>('syn-select');
    elm?.focus();
  },
  render: () => html`
    <syn-select label="Select one">
      <syn-option value="option-1">Option 1</syn-option>
      <syn-option value="option-2">Option 2</syn-option>
      <syn-option value="option-3">Option 3</syn-option>
    </syn-select>
  `,
};

export const Disabled: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('select', 'disabled'),
      },
    },
  },
  render: () => html`
    <syn-select placeholder="Disabled" disabled>
      <syn-option value="option-1">Option 1</syn-option>
      <syn-option value="option-2">Option 2</syn-option>
      <syn-option value="option-3">Option 3</syn-option>
    </syn-select>
  `,
};

export const Readonly: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('select', 'readonly'),
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: var(--syn-spacing-large);">
      <syn-select placeholder="Readonly" value="option-1" readonly>
        <syn-icon name="wallpaper" slot="prefix"></syn-icon>
        <syn-option value="option-1">Option 1</syn-option>
        <syn-option value="option-2">Option 2</syn-option>
        <syn-option value="option-3">Option 3</syn-option>
      </syn-select>
      <syn-select max-options-visible="2" multiple placeholder="Readonly" value="option-1 option-2 option-3" readonly>
        <syn-option value="option-1">Option 1</syn-option>
        <syn-option value="option-2">Option 2</syn-option>
        <syn-option value="option-3">Option 3</syn-option>
      </syn-select>
    </div>
  `,
};

export const Multiple: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('select', 'multiple'),
      },
    },
  },
  render: () => html`
    <syn-select label="Select a Few" value="Option_1 Option_2 Option_3" multiple clearable>
      <syn-option value="Option_1">Option 1</syn-option>
      <syn-option value="Option_2">Option 2</syn-option>
      <syn-option value="Option_3">Option 3</syn-option>
      <syn-option value="Option_4">Option 4</syn-option>
      <syn-option value="Option_5">Option 5</syn-option>
      <syn-option value="Option_6">Option 6</syn-option>
    </syn-select>
  `,
};

export const SettingInitialValues: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('select', 'initialvalue'),
      },
    },
  },
  render: () => html`
    <syn-select value="option-1 option-2 option-3 option-4" multiple clearable class="custom-tag">
      <syn-option value="option-1">Option</syn-option>
      <syn-option value="option-2">Option 1</syn-option>
      <syn-option value="option-3">Option 2</syn-option>
      <syn-option value="option-4">Option 3</syn-option>
    </syn-select>
    <script type="module">
      const select = document.querySelector('.custom-tag');

      select.getTag = (option, index) => {
        // Use the same icon used in the <syn-option>
        const optionElement = option.querySelector('syn-icon[slot="prefix"]');
        
        if (!optionElement) {
          return \`
          <syn-tag removable>
          \${option.getTextLabel()}
          </syn-tag>
          \`;
        }
        
        const { name } = optionElement;

        // You can return a string, a Lit Template, or an HTMLElement here
        return \`
          <syn-tag removable>
            <syn-icon name="\${name}"></syn-icon>
            \${option.getTextLabel()}
          </syn-tag>
        \`;
      };
    </script>
  `,
};

export const GroupingOptions: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('select', 'group'),
      },
    },
  },
  render: () => html`
    <syn-select placeholder="This is a value">
      <syn-optgroup label="Section 1">
        <syn-option value="1">Option</syn-option>
        <syn-option value="2">Option</syn-option>
      </syn-optgroup>
      <syn-optgroup label="Section 2">
        <syn-option value="3">Option</syn-option>
        <syn-option value="4">Option</syn-option>
      </syn-optgroup>
    </syn-select>
  `,
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('select', 'size'),
      },
    },
  },
  render: () => html`
    <syn-select placeholder="Small" size="small">
      <syn-option value="option-1">Option 1</syn-option>
      <syn-option value="option-2">Option 2</syn-option>
      <syn-option value="option-3">Option 3</syn-option>
    </syn-select>

    <br />

    <syn-select placeholder="Medium" size="medium">
      <syn-option value="option-1">Option 1</syn-option>
      <syn-option value="option-2">Option 2</syn-option>
      <syn-option value="option-3">Option 3</syn-option>
    </syn-select>

    <br />

    <syn-select placeholder="Large" size="large">
      <syn-option value="option-1">Option 1</syn-option>
      <syn-option value="option-2">Option 2</syn-option>
      <syn-option value="option-3">Option 3</syn-option>
    </syn-select>
  `,
};

export const Invalid: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('select', 'invalid'),
      },
    },
  },
  play: async ({ canvasElement }) => {
    const form = canvasElement.querySelector('form')!;
    const select = form.querySelector('syn-select');
    const button = form.querySelector('syn-button');

    if (button && select) {
      // make sure to always fire both events:
      // 1. userEvent.click is needed for storybooks play function to register
      // 2. button.click is needed to really click the button
      // userEvent.click works on native elements only
      await userEvent.click(button);
      button.click();
    }
  },
  render: () => html`
    <form class="custom-validity">
      <syn-select label="Select one" required>
        <syn-option value="option-1">Option 1</syn-option>
        <syn-option value="option-2">Option 2</syn-option>
        <syn-option value="option-3">Option 3</syn-option>
      </syn-select>
      <syn-button type="submit" variant="filled">Submit</syn-button>
    </form>
    <style>
    .custom-validity {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    syn-button {
      align-self: flex-start;
    }
    </style>
  `,
};

export const PrefixSuffixIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('select', 'prefix-suffix'),
      },
    },
  },
  render: () => html`
    <syn-select placeholder="Small" size="small" clearable>
      <syn-icon name="wallpaper" slot="prefix"></syn-icon>
      <syn-option value="option-1">Option 1</syn-option>
      <syn-option value="option-2">Option 2</syn-option>
      <syn-option value="option-3">Option 3</syn-option>
      <syn-icon name="wallpaper" slot="suffix"></syn-icon>
    </syn-select>
    <br />
    <syn-select placeholder="Medium" size="medium" clearable>
      <syn-icon name="wallpaper" slot="prefix"></syn-icon>
      <syn-option value="option-1">Option 1</syn-option>
      <syn-option value="option-2">Option 2</syn-option>
      <syn-option value="option-3">Option 3</syn-option>
      <syn-icon name="wallpaper" slot="suffix"></syn-icon>
    </syn-select>
    <br />
    <syn-select placeholder="Large" size="large" clearable>
      <syn-icon name="wallpaper" slot="prefix"></syn-icon>
      <syn-option value="option-1">Option 1</syn-option>
      <syn-option value="option-2">Option 2</syn-option>
      <syn-option value="option-3">Option 3</syn-option>
      <syn-icon name="wallpaper" slot="suffix"></syn-icon>
    </syn-select>
  `,
};

export const CustomTags: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('select', 'gettag'),
      },
    },
  },
  render: () => html`
    <syn-select
      clearable
      id="custom-tags-story"
      multiple
      placeholder="Select one"
      value="phone email"
    >
      <syn-option value="email">
        <syn-icon slot="prefix" name="mail_outline"></syn-icon>
        Email
      </syn-option>
      <syn-option value="phone">
        <syn-icon slot="prefix" name="phone"></syn-icon>
        Phone
      </syn-option>
      <syn-option value="chat">
        <syn-icon slot="prefix" name="chat_bubble_outline"></syn-icon>
        Chat
      </syn-option>
    </syn-select>

    <script type="module">
      const select = document.querySelector('#custom-tags-story');

      select.getTag = (option, index) => {
        // Use the same icon used in the <syn-option>
        const optionElement = option.querySelector('syn-icon[slot="prefix"]');
        
        if (!optionElement) {
          return \`
          <syn-tag removable>
          \${option.getTextLabel()}
          </syn-tag>
          \`;
        }
        
        const { name } = optionElement;

        // You can return a string, a Lit Template, or an HTMLElement here
        return \`
          <syn-tag removable>
            <syn-icon name="\${name}"></syn-icon>
            \${option.getTextLabel()}
          </syn-tag>
        \`;
      };
    </script>
  `,
};

const ScreenshotStoryDefault: Story = {
  render: () => html`
    <syn-select
      clearable
      help-text="Help-Text"
      label="Label"
      placeholder="Placeholder"
    >
      <syn-icon name="wallpaper" slot="prefix"></syn-icon>
      <syn-option value="Option_1">Option 1</syn-option>
      <syn-option value="Option_2">Option 2</syn-option>
      <syn-option value="Option_3">Option 3</syn-option>
      <syn-icon name="wallpaper" slot="suffix"></syn-icon>
    </syn-select>
  `,
};

const ScreenshotStoryMultiple: Story = {
  render: () => html`
    <syn-select
      class="custom-tag"
      clearable
      help-text="Help-Text"
      label="Label"
      multiple
      placeholder="Placeholder"
      value="Option_1 Option_2 Option_3 Option_7"
    >
      <syn-option value="Option_1">
        <syn-icon slot="prefix" name="wallpaper"></syn-icon>
        Option 1
      </syn-option>
      <syn-option value="Option_2">Option 2</syn-option>
      <syn-option value="Option_3">Option 3</syn-option>
      <syn-option value="Option_4">Option 4</syn-option>
      <syn-option value="Option_5">Option 5</syn-option>
      <syn-option value="Option_6">Option 6</syn-option>
      
      <syn-optgroup label="Section 1">
        <syn-option value="Option_7">Option 7</syn-option>
        <syn-option value="Option_8">Option 8</syn-option>
      </syn-optgroup>
      <syn-optgroup label="Section 2">
        <syn-option value="Option_9">Option 9</syn-option>
      </syn-optgroup>

    </syn-select>
    <script type="module">
      const select = document.querySelector('.custom-tag');

      select.getTag = (option, index) => {
        // Use the same icon used in the <syn-option>
        const optionElement = option.querySelector('syn-icon[slot="prefix"]');
        
        if (!optionElement) {
          return \`
          <syn-tag removable>
          \${option.getTextLabel()}
          </syn-tag>
          \`;
        }
        
        const { name } = optionElement;

        // You can return a string, a Lit Template, or an HTMLElement here
        return \`
          <syn-tag removable>
            <syn-icon name="\${name}"></syn-icon>
            \${option.getTextLabel()}
          </syn-tag>
        \`;
      };
    </script>
  `,
};

// Bundled screenshot story
// Note we are not able to screenshot more than the Screenshot story
// because of the reasons outlined above!
export const ScreenshotDefault: Story = generateScreenshotStory({
  ScreenshotStoryDefault,
}, {
  afterRender: openSelect('syn-select', false),
  heightPx: 400,
});

// Bundled screenshot story
// Note we are not able to screenshot more than the Screenshot story
// because of the reasons outlined above!
export const ScreenshotMultiple: Story = generateScreenshotStory({
  ScreenshotStoryMultiple,
}, {
  afterRender: openSelect('syn-select'),
  heightPx: 400,
});

// ─── TEMPORARY: Chrome 149 focus-policy manual validation story ─────────────
// This story is intentionally NOT prefixed with Screenshot so it is not
// captured by Chromatic. Remove it once the fix has been validated interactively.
//
// How to validate:
//   1. Open this story in Chrome 149+ (or any browser).
//   2. Click "Open dialog" to show the syn-dialog.
//   3. Inside the dialog, click the syn-select to open its listbox.
//   4. ✓ The listbox should open and options should be reachable with the keyboard.
//   5. Click an option or press Enter.
//   6. ✓ Focus should return to the select's display input (not leave the dialog).
//   7. Press Escape.
//   8. ✓ The listbox should close; focus should remain on the select's display input.
//   9. Tab to "Close" and dismiss the dialog.
//  10. Repeat steps 2–9 with the syn-drawer variant below.
// ────────────────────────────────────────────────────────────────────────────
export const TMP_Chrome149FocusPolicyDialog: Story = {
  name: '[TMP] Chrome 149 – Select + Dropdown inside syn-dialog',
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story: `
**Temporary manual-test story** for the Chrome 149 focus-policy fix.
Open the dialog and verify both syn-select and syn-dropdown popups open,
are keyboard reachable, and do not break the dialog focus trap.

**Remove this story once the fix has been validated.**
        `.trim(),
      },
    },
  },
  render: () => html`
    <syn-button id="open-dialog-btn" variant="filled">Open dialog</syn-button>

    <syn-dialog id="focus-test-dialog" label="Chrome 149 focus test">
      <syn-select id="dialog-select" label="Pick an option" clearable>
        <syn-option value="option-1">Option 1</syn-option>
        <syn-option value="option-2">Option 2</syn-option>
        <syn-option value="option-3">Option 3</syn-option>
      </syn-select>

      <syn-select id="dialog-select-multiple" label="Pick several (multiple)" multiple clearable style="margin-top: 1rem;">
        <syn-option value="a">Alpha</syn-option>
        <syn-option value="b">Beta</syn-option>
        <syn-option value="c">Gamma</syn-option>
      </syn-select>

      <syn-dropdown id="dialog-dropdown" style="margin-top: 1rem;">
        <syn-button slot="trigger" caret>Open dropdown</syn-button>
        <syn-menu style="min-width: 220px;">
          <syn-menu-item>Menu item 1</syn-menu-item>
          <syn-menu-item>Menu item 2</syn-menu-item>
          <syn-menu-item>Menu item 3</syn-menu-item>
        </syn-menu>
      </syn-dropdown>

      <syn-button slot="footer" id="close-dialog-btn" variant="filled">Close</syn-button>
    </syn-dialog>

    <script type="module">
      const openBtn  = document.querySelector('#open-dialog-btn');
      const closeBtn = document.querySelector('#close-dialog-btn');
      const dialog   = document.querySelector('#focus-test-dialog');

      openBtn.addEventListener('click', () => dialog.show());
      closeBtn.addEventListener('click', () => dialog.hide());
    </script>
  `,
};

export const TMP_Chrome149FocusPolicyDrawer: Story = {
  name: '[TMP] Chrome 149 – Select + Dropdown inside syn-drawer',
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story: `
**Temporary manual-test story** for the Chrome 149 focus-policy fix (drawer variant).
Same validation steps as the dialog story above, including syn-dropdown.

**Remove this story once the fix has been validated.**
        `.trim(),
      },
    },
  },
  render: () => html`
    <syn-button id="open-drawer-btn" variant="filled">Open drawer</syn-button>

    <syn-drawer id="focus-test-drawer" label="Chrome 149 focus test" placement="end">
      <syn-select id="drawer-select" label="Pick an option" clearable>
        <syn-option value="option-1">Option 1</syn-option>
        <syn-option value="option-2">Option 2</syn-option>
        <syn-option value="option-3">Option 3</syn-option>
      </syn-select>

      <syn-select id="drawer-select-multiple" label="Pick several (multiple)" multiple clearable style="margin-top: 1rem;">
        <syn-option value="a">Alpha</syn-option>
        <syn-option value="b">Beta</syn-option>
        <syn-option value="c">Gamma</syn-option>
      </syn-select>

      <syn-dropdown id="drawer-dropdown" style="margin-top: 1rem;">
        <syn-button slot="trigger" caret>Open dropdown</syn-button>
        <syn-menu style="min-width: 220px;">
          <syn-menu-item>Menu item 1</syn-menu-item>
          <syn-menu-item>Menu item 2</syn-menu-item>
          <syn-menu-item>Menu item 3</syn-menu-item>
        </syn-menu>
      </syn-dropdown>

      <syn-button slot="footer" id="close-drawer-btn" variant="filled">Close</syn-button>
    </syn-drawer>

    <script type="module">
      const openBtn  = document.querySelector('#open-drawer-btn');
      const closeBtn = document.querySelector('#close-drawer-btn');
      const drawer   = document.querySelector('#focus-test-drawer');

      openBtn.addEventListener('click', () => drawer.show());
      closeBtn.addEventListener('click', () => drawer.hide());
    </script>
  `,
};

export const TMP_Chrome149NativeDialogAndPopover: Story = {
  name: '[TMP] Chrome 149 – select + combobox + dropdown in native dialog + popover',
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story: `
**Temporary component reproduction story**.
This uses native <dialog> and native Popover API containers, but places
**syn-select, syn-combobox, and syn-dropdown** inside both contexts so you can verify your real component breakage.

How to test:
1. Open the native dialog.
2. Open "Dialog select/combobox/dropdown" and interact (mouse + keyboard).
3. Open the native popover from inside the dialog.
4. Open "Popover select/combobox/dropdown" and interact.
5. Verify whether popups close unexpectedly, lose focus, or break keyboard behavior.

**Remove this story once validated.**
        `.trim(),
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 780px;">
      <syn-button id="open-native-dialog" variant="filled">Open native dialog</syn-button>

      <p style="margin: 0; color: var(--syn-color-neutral-900);">
        This story intentionally recreates the <strong>native</strong> platform setup:
        <code>&lt;dialog&gt;</code> + <code>popover=&quot;manual&quot;</code>.
      </p>

      <div
        id="native-log"
        style="
          min-height: 100px;
          max-height: 220px;
          overflow: auto;
          border: 1px solid var(--syn-color-neutral-400);
          border-radius: var(--syn-border-radius-medium);
          padding: 0.5rem;
          font-family: monospace;
          font-size: 12px;
          background: var(--syn-color-neutral-0);
        "
      ></div>
    </div>

    <dialog id="native-dialog" style="width: min(760px, 95vw); border-radius: 12px; border: 1px solid #ccc; padding: 1rem;">
      <form method="dialog" style="display: flex; flex-direction: column; gap: 0.75rem; margin: 0;">
        <h3 style="margin: 0;">Native dialog + popover with syn-select</h3>

        <syn-select id="native-dialog-select" label="Dialog select (single)" clearable>
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-select>

        <syn-select id="native-dialog-select-multiple" label="Dialog select (multiple)" multiple clearable>
          <syn-option value="a">Alpha</syn-option>
          <syn-option value="b">Beta</syn-option>
          <syn-option value="c">Gamma</syn-option>
        </syn-select>

        <syn-combobox id="native-dialog-combobox" label="Dialog combobox" clearable>
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>

        <syn-dropdown id="native-dialog-dropdown">
          <syn-button slot="trigger" caret>Dialog dropdown</syn-button>
          <syn-menu style="min-width: 220px;">
            <syn-menu-item>Menu item 1</syn-menu-item>
            <syn-menu-item>Menu item 2</syn-menu-item>
            <syn-menu-item>Menu item 3</syn-menu-item>
          </syn-menu>
        </syn-dropdown>

        <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
          <button id="open-native-popover" type="button" popovertarget="native-popover">Open native popover</button>
          <button id="close-native-popover" type="button">Close native popover</button>
          <button id="close-native-dialog" type="submit">Close dialog</button>
        </div>
      </form>

      <div
        id="native-popover"
        popover="manual"
        style="
          min-width: 280px;
          border: 1px solid #999;
          border-radius: 10px;
          padding: 0.75rem;
          box-shadow: 0 8px 24px rgba(0,0,0,0.18);
          background: #fff;
        "
      >
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <strong>Native popover content (with syn-select)</strong>

          <syn-select id="native-popover-select" label="Popover select (single)" clearable>
            <syn-option value="option-1">Option 1</syn-option>
            <syn-option value="option-2">Option 2</syn-option>
            <syn-option value="option-3">Option 3</syn-option>
          </syn-select>

          <syn-select id="native-popover-select-multiple" label="Popover select (multiple)" multiple clearable>
            <syn-option value="a">Alpha</syn-option>
            <syn-option value="b">Beta</syn-option>
            <syn-option value="c">Gamma</syn-option>
          </syn-select>

          <syn-combobox id="native-popover-combobox" label="Popover combobox" clearable>
            <syn-option value="option-1">Option 1</syn-option>
            <syn-option value="option-2">Option 2</syn-option>
            <syn-option value="option-3">Option 3</syn-option>
          </syn-combobox>

          <syn-dropdown id="native-popover-dropdown">
            <syn-button slot="trigger" caret>Popover dropdown</syn-button>
            <syn-menu style="min-width: 220px;">
              <syn-menu-item>Menu item 1</syn-menu-item>
              <syn-menu-item>Menu item 2</syn-menu-item>
              <syn-menu-item>Menu item 3</syn-menu-item>
            </syn-menu>
          </syn-dropdown>

          <button id="popover-action" type="button">Popover action</button>
        </div>
      </div>
    </dialog>

    <script type="module">
      const openDialogBtn = document.querySelector('#open-native-dialog');
      const dialog = document.querySelector('#native-dialog');
      const openPopoverBtn = document.querySelector('#open-native-popover');
      const closePopoverBtn = document.querySelector('#close-native-popover');
      const popover = document.querySelector('#native-popover');
      const logElm = document.querySelector('#native-log');

      const appendLog = message => {
        const now = new Date();
        const stamp = now.toLocaleTimeString('en-US', { hour12: false });
        logElm.textContent += '[' + stamp + '] ' + message + '\\n';
        logElm.scrollTop = logElm.scrollHeight;
      };

      const describeTarget = target => {
        if (!target) return 'null';
        if (!(target instanceof Element)) return String(target);
        const id = target.id ? '#' + target.id : '';
        return target.tagName.toLowerCase() + id;
      };

      const handleFocusIn = event => {
        const target = event.target;
        const containsTarget = target instanceof Node ? dialog.contains(target) : false;
        const focusWithin = dialog.matches(':focus-within');
        appendLog('focusin target=' + describeTarget(target) + ' contains=' + containsTarget + ' :focus-within=' + focusWithin);
      };

      openDialogBtn.addEventListener('click', () => {
        dialog.showModal();
        appendLog('dialog.showModal()');
      });

      openPopoverBtn.addEventListener('click', () => {
        popover.showPopover();
        appendLog('popover.showPopover()');
      });

      closePopoverBtn.addEventListener('click', () => {
        popover.hidePopover();
        appendLog('popover.hidePopover()');
      });

      document.addEventListener('focusin', handleFocusIn);

      dialog.addEventListener('close', () => {
        appendLog('dialog.close()');
      });
    </script>
  `,
};

export const TMP_Chrome149RiskAuditMatrix: Story = {
  name: '[TMP] Chrome 149 – Risk audit matrix (select/combobox/dropdown/menu)',
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story: `
Temporary audit story for components likely affected by top-layer/focus behavior changes.
Validate in one place:
- select (single/multiple)
- combobox
- dropdown + menu
- menu submenu

Contexts:
- native dialog
- native popover

Remove after validation and issue triage.
        `.trim(),
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 900px;">
      <syn-button id="audit-open-native-dialog" variant="filled">Open native dialog audit</syn-button>

      <div style="font-size: 13px; color: var(--syn-color-neutral-800);">
        Run the same flow in both sections: open popup, keyboard navigate, select, Escape, and tab onward.
      </div>
    </div>

    <dialog id="audit-native-dialog" style="width: min(900px, 96vw); border-radius: 12px; border: 1px solid #ccc; padding: 1rem;">
      <form method="dialog" style="display: flex; flex-direction: column; gap: 1rem; margin: 0;">
        <h3 style="margin: 0;">Native dialog audit</h3>

        <div style="display: grid; gap: 0.75rem; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); align-items: start;">
          <syn-select label="Dialog select (single)" clearable>
            <syn-option value="option-1">Option 1</syn-option>
            <syn-option value="option-2">Option 2</syn-option>
            <syn-option value="option-3">Option 3</syn-option>
          </syn-select>

          <syn-select label="Dialog select (multiple)" multiple clearable>
            <syn-option value="a">Alpha</syn-option>
            <syn-option value="b">Beta</syn-option>
            <syn-option value="c">Gamma</syn-option>
          </syn-select>

          <syn-combobox label="Dialog combobox" clearable>
            <syn-option value="option-1">Option 1</syn-option>
            <syn-option value="option-2">Option 2</syn-option>
            <syn-option value="option-3">Option 3</syn-option>
          </syn-combobox>

          <syn-dropdown>
            <syn-button slot="trigger" caret>Dialog dropdown</syn-button>
            <syn-menu style="min-width: 220px;">
              <syn-menu-item>Menu item 1</syn-menu-item>
              <syn-menu-item>Menu item 2</syn-menu-item>
              <syn-menu-item>Menu item 3</syn-menu-item>
            </syn-menu>
          </syn-dropdown>

          <syn-menu style="max-width: 260px; border: 1px solid var(--syn-color-neutral-300); border-radius: 8px; padding: 0.25rem;">
            <syn-menu-item value="undo">Undo</syn-menu-item>
            <syn-menu-item value="redo">Redo</syn-menu-item>
            <syn-divider></syn-divider>
            <syn-menu-item>
              Find
              <syn-menu slot="submenu">
                <syn-menu-item value="find">Find…</syn-menu-item>
                <syn-menu-item value="find-next">Find next</syn-menu-item>
                <syn-menu-item value="find-prev">Find previous</syn-menu-item>
              </syn-menu>
            </syn-menu-item>
          </syn-menu>
        </div>

        <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
          <button id="audit-open-native-popover" type="button" popovertarget="audit-native-popover">Open native popover audit</button>
          <button id="audit-close-native-popover" type="button">Close native popover audit</button>
          <button id="audit-close-native-dialog" type="submit">Close dialog</button>
        </div>
      </form>

      <div
        id="audit-native-popover"
        popover="manual"
        style="
          width: min(900px, 96vw);
          border: 1px solid #999;
          border-radius: 10px;
          padding: 0.9rem;
          box-shadow: 0 8px 24px rgba(0,0,0,0.18);
          background: #fff;
        "
      >
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <strong>Native popover audit</strong>

          <div style="display: grid; gap: 0.75rem; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); align-items: start;">
            <syn-select label="Popover select (single)" clearable>
              <syn-option value="option-1">Option 1</syn-option>
              <syn-option value="option-2">Option 2</syn-option>
              <syn-option value="option-3">Option 3</syn-option>
            </syn-select>

            <syn-select label="Popover select (multiple)" multiple clearable>
              <syn-option value="a">Alpha</syn-option>
              <syn-option value="b">Beta</syn-option>
              <syn-option value="c">Gamma</syn-option>
            </syn-select>

            <syn-combobox label="Popover combobox" clearable>
              <syn-option value="option-1">Option 1</syn-option>
              <syn-option value="option-2">Option 2</syn-option>
              <syn-option value="option-3">Option 3</syn-option>
            </syn-combobox>

            <syn-dropdown>
              <syn-button slot="trigger" caret>Popover dropdown</syn-button>
              <syn-menu style="min-width: 220px;">
                <syn-menu-item>Menu item 1</syn-menu-item>
                <syn-menu-item>Menu item 2</syn-menu-item>
                <syn-menu-item>Menu item 3</syn-menu-item>
              </syn-menu>
            </syn-dropdown>

            <syn-menu style="max-width: 260px; border: 1px solid var(--syn-color-neutral-300); border-radius: 8px; padding: 0.25rem;">
              <syn-menu-item value="undo">Undo</syn-menu-item>
              <syn-menu-item value="redo">Redo</syn-menu-item>
              <syn-divider></syn-divider>
              <syn-menu-item>
                Find
                <syn-menu slot="submenu">
                  <syn-menu-item value="find">Find…</syn-menu-item>
                  <syn-menu-item value="find-next">Find next</syn-menu-item>
                  <syn-menu-item value="find-prev">Find previous</syn-menu-item>
                </syn-menu>
              </syn-menu-item>
            </syn-menu>
          </div>

          <button id="audit-popover-action" type="button">Popover action</button>
        </div>
      </div>
    </dialog>

    <script type="module">
      const openDialogBtn = document.querySelector('#audit-open-native-dialog');
      const dialog = document.querySelector('#audit-native-dialog');
      const openPopoverBtn = document.querySelector('#audit-open-native-popover');
      const closePopoverBtn = document.querySelector('#audit-close-native-popover');
      const popover = document.querySelector('#audit-native-popover');

      openDialogBtn.addEventListener('click', () => {
        dialog.showModal();
      });

      openPopoverBtn.addEventListener('click', () => {
        popover.showPopover();
      });

      closePopoverBtn.addEventListener('click', () => {
        popover.hidePopover();
      });
    </script>
  `,
};

export const TMP_Chrome149FakeDialogRegressionHarness: Story = {
  name: '[TMP] Chrome 149 – Fake dialog regression harness (legacy trap simulation)',
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story: `
Temporary story that does NOT use native or Synergy dialogs.
It uses a plain container with a fake focus-trap implementation and a toggle
to simulate legacy (unfixed) behavior.

Use this to prepare a minimal CodePen repro:
1. Open fake dialog
2. Toggle "legacy trap" on and off
3. Open nested popover and interact with select/combobox/dropdown
4. Observe how legacy trap can force focus jumps / premature close patterns
        `.trim(),
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 980px;">
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
        <syn-button id="fake-open" variant="filled">Open fake dialog</syn-button>
        <syn-button id="fake-close" variant="outline">Close fake dialog</syn-button>
        <label style="display: inline-flex; align-items: center; gap: 0.35rem; margin-left: 0.5rem;">
          <input id="fake-legacy-trap" type="checkbox" checked />
          Legacy trap enabled (simulates unfixed behavior)
        </label>
      </div>

      <div
        id="fake-log"
        style="
          min-height: 120px;
          max-height: 240px;
          overflow: auto;
          border: 1px solid var(--syn-color-neutral-400);
          border-radius: var(--syn-border-radius-medium);
          padding: 0.5rem;
          font-family: monospace;
          font-size: 12px;
          background: var(--syn-color-neutral-0);
        "
      ></div>
    </div>

    <div
      id="fake-overlay"
      hidden
      style="
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.25);
        z-index: 1000;
        display: grid;
        place-items: center;
      "
    >
      <div
        id="fake-dialog"
        role="dialog"
        aria-modal="true"
        style="
          width: min(980px, 95vw);
          max-height: 90vh;
          overflow: auto;
          background: #fff;
          border-radius: 12px;
          border: 1px solid #bbb;
          box-shadow: 0 14px 36px rgba(0,0,0,0.28);
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        "
      >
        <h3 style="margin: 0;">Fake dialog harness</h3>

        <div style="display: grid; gap: 0.75rem; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); align-items: start;">
          <syn-select label="Fake dialog select (single)" clearable>
            <syn-option value="option-1">Option 1</syn-option>
            <syn-option value="option-2">Option 2</syn-option>
            <syn-option value="option-3">Option 3</syn-option>
          </syn-select>

          <syn-select label="Fake dialog select (multiple)" multiple clearable>
            <syn-option value="a">Alpha</syn-option>
            <syn-option value="b">Beta</syn-option>
            <syn-option value="c">Gamma</syn-option>
          </syn-select>

          <syn-combobox label="Fake dialog combobox" clearable>
            <syn-option value="option-1">Option 1</syn-option>
            <syn-option value="option-2">Option 2</syn-option>
            <syn-option value="option-3">Option 3</syn-option>
          </syn-combobox>

          <syn-dropdown>
            <syn-button slot="trigger" caret>Fake dialog dropdown</syn-button>
            <syn-menu style="min-width: 220px;">
              <syn-menu-item>Menu item 1</syn-menu-item>
              <syn-menu-item>Menu item 2</syn-menu-item>
              <syn-menu-item>Menu item 3</syn-menu-item>
            </syn-menu>
          </syn-dropdown>
        </div>

        <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
          <button id="fake-open-popover" type="button" popovertarget="fake-nested-popover">Open nested native popover</button>
          <button id="fake-close-popover" type="button">Close nested native popover</button>
        </div>

        <div
          id="fake-nested-popover"
          popover="manual"
          style="
            width: min(900px, 94vw);
            border: 1px solid #999;
            border-radius: 10px;
            padding: 0.9rem;
            box-shadow: 0 8px 24px rgba(0,0,0,0.18);
            background: #fff;
          "
        >
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <strong>Nested native popover in fake dialog</strong>

            <div style="display: grid; gap: 0.75rem; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); align-items: start;">
              <syn-select label="Nested popover select" clearable>
                <syn-option value="option-1">Option 1</syn-option>
                <syn-option value="option-2">Option 2</syn-option>
                <syn-option value="option-3">Option 3</syn-option>
              </syn-select>

              <syn-combobox label="Nested popover combobox" clearable>
                <syn-option value="option-1">Option 1</syn-option>
                <syn-option value="option-2">Option 2</syn-option>
                <syn-option value="option-3">Option 3</syn-option>
              </syn-combobox>

              <syn-dropdown>
                <syn-button slot="trigger" caret>Nested popover dropdown</syn-button>
                <syn-menu style="min-width: 220px;">
                  <syn-menu-item>Menu item 1</syn-menu-item>
                  <syn-menu-item>Menu item 2</syn-menu-item>
                  <syn-menu-item>Menu item 3</syn-menu-item>
                </syn-menu>
              </syn-dropdown>
            </div>

            <button id="fake-popover-action" type="button">Popover action</button>
          </div>
        </div>
      </div>
    </div>

    <script type="module">
      const openBtn = document.querySelector('#fake-open');
      const closeBtn = document.querySelector('#fake-close');
      const legacyTrapCheckbox = document.querySelector('#fake-legacy-trap');
      const logElm = document.querySelector('#fake-log');
      const overlay = document.querySelector('#fake-overlay');
      const fakeDialog = document.querySelector('#fake-dialog');
      const nestedPopover = document.querySelector('#fake-nested-popover');
      const closeNestedPopoverBtn = document.querySelector('#fake-close-popover');

      const appendLog = message => {
        const now = new Date();
        const stamp = now.toLocaleTimeString('en-US', { hour12: false });
        logElm.textContent += '[' + stamp + '] ' + message + '\\n';
        logElm.scrollTop = logElm.scrollHeight;
      };

      const describe = target => {
        if (!target) return 'null';
        if (!(target instanceof Element)) return String(target);
        const id = target.id ? '#' + target.id : '';
        return target.tagName.toLowerCase() + id;
      };

      const getFallbackFocusTarget = () => {
        return fakeDialog.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), syn-button, syn-select, syn-combobox, syn-dropdown');
      };

      const handleDocumentFocusIn = event => {
        if (overlay.hidden) return;
        const target = event.target;

        // Legacy trap mode intentionally uses a brittle condition to emulate old behavior:
        // if the fake dialog does not match :focus-within, force focus back.
        // This can conflict with nested top-layer content and helps reproduce regressions.
        if (legacyTrapCheckbox.checked) {
          const focusWithin = fakeDialog.matches(':focus-within');
          appendLog('LEGACY trap: target=' + describe(target) + ' fakeDialog:focus-within=' + focusWithin);

          if (!focusWithin) {
            const fallback = getFallbackFocusTarget();
            if (fallback && typeof fallback.focus === 'function') {
              fallback.focus();
              appendLog('LEGACY trap forced focus back to ' + describe(fallback));
            }
          }
          return;
        }

        // Modern-safe mode: treat focus as inside when target is contained OR path contains fake dialog.
        const path = event.composedPath ? event.composedPath() : [];
        const inside =
          (target instanceof Node && fakeDialog.contains(target)) ||
          path.includes(fakeDialog);

        appendLog('SAFE trap: target=' + describe(target) + ' inside=' + inside);

        if (!inside) {
          const fallback = getFallbackFocusTarget();
          if (fallback && typeof fallback.focus === 'function') {
            fallback.focus();
            appendLog('SAFE trap moved focus to ' + describe(fallback));
          }
        }
      };

      openBtn.addEventListener('click', () => {
        overlay.hidden = false;
        const fallback = getFallbackFocusTarget();
        if (fallback && typeof fallback.focus === 'function') {
          fallback.focus();
        }
        appendLog('Fake dialog opened');
      });

      closeBtn.addEventListener('click', () => {
        overlay.hidden = true;
        nestedPopover.hidePopover();
        appendLog('Fake dialog closed');
      });

      closeNestedPopoverBtn.addEventListener('click', () => {
        nestedPopover.hidePopover();
        appendLog('Nested native popover hidden');
      });

      legacyTrapCheckbox.addEventListener('change', () => {
        appendLog('Legacy trap is now ' + (legacyTrapCheckbox.checked ? 'ENABLED' : 'DISABLED'));
      });

      document.addEventListener('focusin', handleDocumentFocusIn);
    </script>
  `,
};

export const TMP_Chrome149FocusableEntryPointComparison: Story = {
  name: '[TMP] Chrome 149 – Web component shell: with vs without initial focusable',
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story: `
Temporary comparison story to test whether a modal shell having an immediate
focusable control (for example a close button) changes behavior.

This uses custom-element shells (not native dialog, not syn-dialog):
1. shell A: has an internal focusable close button
2. shell B: no dedicated initial focusable control

Each shell contains select, combobox, and dropdown.
        `.trim(),
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 1100px;">
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <syn-button id="wc-open-shell-a" variant="filled">Open shell A (with close button)</syn-button>
        <syn-button id="wc-open-shell-b" variant="filled">Open shell B (without close button)</syn-button>
      </div>

      <div
        id="wc-shell-log"
        style="
          min-height: 120px;
          max-height: 240px;
          overflow: auto;
          border: 1px solid var(--syn-color-neutral-400);
          border-radius: var(--syn-border-radius-medium);
          padding: 0.5rem;
          font-family: monospace;
          font-size: 12px;
          background: var(--syn-color-neutral-0);
        "
      ></div>
    </div>

    <div id="wc-overlay" style="position: fixed; inset: 0; background: rgba(0,0,0,0.3); z-index: 1100; display: none; place-items: center;">
      <div id="wc-shell-a" role="dialog" aria-modal="true" style="display: none; width: min(980px, 95vw); max-height: 90vh; overflow: auto; background: #fff; border: 1px solid #bbb; border-radius: 12px; padding: 1rem; box-shadow: 0 14px 36px rgba(0,0,0,0.28);">
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 0.5rem;">
          <h3 style="margin: 0;">Shell A: has initial focusable close button</h3>
          <button id="wc-close-shell-a" type="button">Close</button>
        </div>

        <div style="display: grid; gap: 0.75rem; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); align-items: start; margin-top: 0.75rem;">
          <syn-select label="Shell A select" clearable>
            <syn-option value="option-1">Option 1</syn-option>
            <syn-option value="option-2">Option 2</syn-option>
            <syn-option value="option-3">Option 3</syn-option>
          </syn-select>

          <syn-combobox label="Shell A combobox" clearable>
            <syn-option value="option-1">Option 1</syn-option>
            <syn-option value="option-2">Option 2</syn-option>
            <syn-option value="option-3">Option 3</syn-option>
          </syn-combobox>

          <syn-dropdown>
            <syn-button slot="trigger" caret>Shell A dropdown</syn-button>
            <syn-menu style="min-width: 220px;">
              <syn-menu-item>Menu item 1</syn-menu-item>
              <syn-menu-item>Menu item 2</syn-menu-item>
              <syn-menu-item>Menu item 3</syn-menu-item>
            </syn-menu>
          </syn-dropdown>
        </div>
      </div>

      <div id="wc-shell-b" role="dialog" aria-modal="true" style="display: none; width: min(980px, 95vw); max-height: 90vh; overflow: auto; background: #fff; border: 1px solid #bbb; border-radius: 12px; padding: 1rem; box-shadow: 0 14px 36px rgba(0,0,0,0.28);">
        <h3 style="margin: 0;">Shell B: no dedicated initial focusable close button</h3>

        <div style="display: grid; gap: 0.75rem; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); align-items: start; margin-top: 0.75rem;">
          <syn-select label="Shell B select" clearable>
            <syn-option value="option-1">Option 1</syn-option>
            <syn-option value="option-2">Option 2</syn-option>
            <syn-option value="option-3">Option 3</syn-option>
          </syn-select>

          <syn-combobox label="Shell B combobox" clearable>
            <syn-option value="option-1">Option 1</syn-option>
            <syn-option value="option-2">Option 2</syn-option>
            <syn-option value="option-3">Option 3</syn-option>
          </syn-combobox>

          <syn-dropdown>
            <syn-button slot="trigger" caret>Shell B dropdown</syn-button>
            <syn-menu style="min-width: 220px;">
              <syn-menu-item>Menu item 1</syn-menu-item>
              <syn-menu-item>Menu item 2</syn-menu-item>
              <syn-menu-item>Menu item 3</syn-menu-item>
            </syn-menu>
          </syn-dropdown>
        </div>

        <div style="margin-top: 0.75rem;">
          <button id="wc-close-shell-b" type="button">Close shell B</button>
        </div>
      </div>
    </div>

    <script type="module">
      const openA = document.querySelector('#wc-open-shell-a');
      const openB = document.querySelector('#wc-open-shell-b');
      const closeA = document.querySelector('#wc-close-shell-a');
      const closeB = document.querySelector('#wc-close-shell-b');
      const overlay = document.querySelector('#wc-overlay');
      const shellA = document.querySelector('#wc-shell-a');
      const shellB = document.querySelector('#wc-shell-b');
      const logElm = document.querySelector('#wc-shell-log');

      const appendLog = message => {
        const now = new Date();
        const stamp = now.toLocaleTimeString('en-US', { hour12: false });
        logElm.textContent += '[' + stamp + '] ' + message + '\\n';
        logElm.scrollTop = logElm.scrollHeight;
      };

      const describe = target => {
        if (!target) return 'null';
        if (!(target instanceof Element)) return String(target);
        const id = target.id ? '#' + target.id : '';
        return target.tagName.toLowerCase() + id;
      };

      const openShell = (which) => {
        overlay.style.display = 'grid';
        shellA.style.display = which === 'A' ? 'block' : 'none';
        shellB.style.display = which === 'B' ? 'block' : 'none';

        if (which === 'A') {
          closeA.focus();
          appendLog('Opened shell A and focused close button');
        } else {
          // In shell B intentionally focus first focusable in content instead
          const fallback = shellB.querySelector('syn-select, syn-combobox, syn-dropdown, button');
          if (fallback && typeof fallback.focus === 'function') {
            fallback.focus();
          }
          appendLog('Opened shell B and focused first content control');
        }
      };

      const closeShells = (reason) => {
        shellA.style.display = 'none';
        shellB.style.display = 'none';
        overlay.style.display = 'none';
        appendLog('Closed shells (' + reason + ')');
      };

      const activeShell = () => (
        shellA.style.display !== 'none' ? shellA :
        shellB.style.display !== 'none' ? shellB :
        null
      );

      const handleFocusIn = event => {
        const shell = activeShell();
        if (!shell) return;

        const target = event.target;
        const path = event.composedPath ? event.composedPath() : [];
        const inside = (target instanceof Node && shell.contains(target)) || path.includes(shell);
        appendLog('focusin target=' + describe(target) + ' insideShell=' + inside + ' shellFocusWithin=' + shell.matches(':focus-within'));
      };

      openA.addEventListener('click', () => openShell('A'));
      openB.addEventListener('click', () => openShell('B'));
      closeA.addEventListener('click', () => closeShells('button A'));
      closeB.addEventListener('click', () => closeShells('button B'));

      overlay.addEventListener('mousedown', event => {
        if (event.target === overlay) {
          closeShells('backdrop click');
        }
      });

      document.addEventListener('focusin', handleFocusIn);
    </script>
  `,
};








