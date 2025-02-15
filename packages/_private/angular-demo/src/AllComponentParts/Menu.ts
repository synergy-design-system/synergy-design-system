import { Component } from '@angular/core';
import { SynMenuComponent } from '@synergy-design-system/angular/components/menu';
import { SynMenuItemComponent } from '@synergy-design-system/angular/components/menu-item';
import { SynDividerComponent } from '@synergy-design-system/angular/components/divider';

@Component({
  selector: 'demo-menu',
  standalone: true,
  imports: [
    SynMenuComponent,
    SynMenuItemComponent,
    SynDividerComponent,
  ],
  template: `
    <div style="width: 200px">
      <syn-menu>
        <syn-menu-item value="undo">Undo</syn-menu-item>
        <syn-menu-item value="redo">Redo</syn-menu-item>
        <syn-divider />
        <syn-menu-item value="cut">Cut</syn-menu-item>
        <syn-menu-item value="copy">Copy</syn-menu-item>
        <syn-menu-item value="paste">Paste</syn-menu-item>
        <syn-menu-item value="delete">Delete</syn-menu-item>
      </syn-menu>
    </div>
  `,
})
export class Menu {}
