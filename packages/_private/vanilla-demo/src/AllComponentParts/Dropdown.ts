import { html } from 'lit';

export const Dropdown = () => html`
  <div style="position: relative;">
    <syn-dropdown>
      <syn-button slot="trigger" caret>Dropdown</syn-button>
      <syn-menu style={{ minWidth: 240 }}>
        <syn-menu-item>Dropdown Item 1</syn-menu-item>
        <syn-menu-item>Dropdown Item 2</syn-menu-item>
        <syn-menu-item>Dropdown Item 3</syn-menu-item>
        <syn-divider></syn-divider>
        <syn-menu-item type="checkbox" checked>Checkbox</syn-menu-item>
        <syn-menu-item disabled>Disabled</syn-menu-item>
        <syn-divider></syn-divider>
        <syn-menu-item>
          Prefix
          <syn-icon slot="prefix" name="wallpaper"></syn-icon>
        </syn-menu-item>
        <syn-menu-item>
          Suffix Icon
          <syn-icon slot="suffix" name="wallpaper"></syn-icon>
        </syn-menu-item>
      </syn-menu>
    </syn-dropdown>
  </div>
`;
