import { Component } from '@angular/core';
import { SynButtonComponent } from '@synergy-design-system/angular';
import { SynTabComponent } from '@synergy-design-system/angular/components/tab';
import { SynTabGroupComponent } from '@synergy-design-system/angular/components/tab-group';
import { SynTabPanelComponent } from '@synergy-design-system/angular/components/tab-panel';

@Component({
  selector: 'demo-tabgroup',
  standalone: true,
  imports: [
    SynButtonComponent,
    SynTabGroupComponent,
    SynTabPanelComponent,
    SynTabComponent,
  ],
  template: `
  <syn-tab-group contained>
    @for (item of items; track $index; let index = $index) {
      <syn-tab-panel [name]="item.id" > {{ item.description }} </syn-tab-panel>
      <syn-tab
        [active]="index === items.length - 1"
        slot="nav"
        [panel]="item.id"
        [disabled]="item.disabled"
      >{{ item.name }}</syn-tab>
    }
  </syn-tab-group>
  <syn-button (click)="createNewActiveTab()">Add Tab</syn-button>
  `,
})
export class TabGroup {
  items = [
    { id: 'general', description: 'This is the custom tab panel.', name: 'General', disabled: false },
    { id: 'disabled', description: 'This is the disabled tab panel.', name: 'Disabled', disabled: true },
    { id: 'custom', description: 'This is the custom tab panel.', name: 'Custom', disabled: false },
    { id: 'advanced', description: 'This is the advanced tab panel.', name: 'Advanced', disabled: false },
  ]

  createNewActiveTab() {
    this.items.push({
      id: `new-tab-${this.items.length + 1}`,
      description: `This is the new tab panel ${this.items.length + 1}.`,
      name: `New Tab ${this.items.length + 1}`,
      disabled: false,
    });
  }
}
