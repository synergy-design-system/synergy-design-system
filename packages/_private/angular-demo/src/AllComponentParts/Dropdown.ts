import { Component } from '@angular/core';
import { SynDropdownComponent } from '@synergy-design-system/angular/components/dropdown';
import { SynButtonComponent } from '@synergy-design-system/angular/components/button';
import { SynMenuComponent } from '@synergy-design-system/angular/components/menu';
import { SynMenuItemComponent } from '@synergy-design-system/angular/components/menu-item';
import { SynDividerComponent } from '@synergy-design-system/angular/components/divider';
import { SynIconComponent } from '@synergy-design-system/angular/components/icon';

@Component({
  selector: 'demo-dropdown',
  standalone: true,
  imports: [
    SynDropdownComponent,
    SynButtonComponent,
    SynMenuComponent,
    SynMenuItemComponent,
    SynDividerComponent,
    SynIconComponent,
  ],
  template: `
    <div style="position: relative;">
      <syn-dropdown>
        <syn-button slot="trigger" caret>Dropdown</syn-button>
        <syn-menu style="min-width: 240px;">
          <syn-menu-item>Dropdown Item 1</syn-menu-item>
          <syn-menu-item>Dropdown Item 2</syn-menu-item>
          <syn-menu-item>Dropdown Item 3</syn-menu-item>
          <syn-divider />
          <syn-menu-item type="checkbox" checked>Checkbox</syn-menu-item>
          <syn-menu-item disabled>Disabled</syn-menu-item>
          <syn-divider />
          <syn-menu-item>
            Prefix
            <syn-icon slot="prefix" name="wallpaper" />
          </syn-menu-item>
          <syn-menu-item>
            Suffix Icon
            <syn-icon slot="suffix" name="wallpaper" />
          </syn-menu-item>
        </syn-menu>
      </syn-dropdown>
    </div>
  `,
})
export class Dropdown {}
