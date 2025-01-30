import { html } from 'lit';

export const Menu = () => html`
  <div style="width: 200px;">
    <syn-menu>
      <syn-menu-item value="undo">Undo</syn-menu-item>
      <syn-menu-item value="redo">Redo</syn-menu-item>
      <syn-divider></syn-divider>
      <syn-menu-item value="cut">Cut</syn-menu-item>
      <syn-menu-item value="copy">Copy</syn-menu-item>
      <syn-menu-item value="paste">Paste</syn-menu-item>
      <syn-menu-item value="delete">Delete</syn-menu-item>
    </syn-menu>
  </div>
`;
