import { Component } from '@angular/core';
import {
  SynButtonComponent,
  SynTabComponent,
  SynTabGroupComponent,
  SynTabPanelComponent,
  SynValidateComponent,
  SynSelectComponent,
  SynOptionComponent,
  SynIconComponent,
} from '@synergy-design-system/angular';
import {
  SynChangeEvent,
  type SynSelect,
} from '@synergy-design-system/components';

interface Tab {
  name: string;
  selectedItem: string;
}

@Component({
  selector: 'demo-851-syn-validate-in-dynamic-tabs',
  standalone: true,
  imports: [
    SynButtonComponent,
    SynIconComponent,
    SynTabComponent,
    SynTabGroupComponent,
    SynTabPanelComponent,
    SynValidateComponent,
    SynSelectComponent,
    SynOptionComponent,
  ],
  template: `
    <syn-tab-group data-testid="validate851-tab-group">
      @for (tab of tabs; track tab.name; let index = $index) {
        <syn-tab [active]="tab.name === activeTab" slot="nav" [panel]="tab.name" [attr.data-testid]="'validate851-tab-' + (index + 1)">{{ tab.name }}</syn-tab>
        <syn-tab-panel [name]="tab.name" [attr.data-testid]="'validate851-tab-panel-' + (index + 1)">
          <div class="tab-content">
            @let allItemsUsed = tab.selectedItem.length === 0 && getUnusedItems().length === 0;

            <syn-validate
              eager
              [customValidationMessage]="allItemsUsed ? 'No items available' : ''"
              variant="inline"
              on="live"
              [attr.data-testid]="'validate851-validate-' + (index + 1)"
            >
              <syn-select
                size="small"
                [value]="tab.selectedItem"
                placeholder="Select an item"
                (synChangeEvent)="onChangeItem($event, tab)"
                [attr.data-testid]="'validate851-select-' + (index + 1)"
              >
                @for (item of availableItems; track item.key) {
                  @let selectedItem = item.key === tab.selectedItem;
                  @let itemUsed = !getUnusedItems().includes(item.key) && !selectedItem;
                  <syn-option [disabled]="itemUsed" [value]="item.key">
                    {{ item.displayName }}
                    @if (itemUsed) {
                      (In use)
                    }
                  </syn-option>
                }
              </syn-select>
            </syn-validate>
          </div>
        </syn-tab-panel>
      }

      <syn-button
        [disabled]="tabs.length > availableItems.length"
        slot="nav"
        variant="text"
        (click)="onClickAddTab()"
        data-testid="validate851-add-tab-button"
      >
        <syn-icon slot="prefix" name="add"></syn-icon>
        Add tab
      </syn-button>
    </syn-tab-group>
  `,
  styles: [`
    .tab-content {
      padding: 1rem;
    }
  `]
})
export class Demo851SynValidateInDynamicTabs {
  tabs: Tab[] = [
    { name: 'Tab 1', selectedItem: 'item1' }
  ];

  activeTab = 'Tab 1';

  availableItems = [
    { key: 'item1', displayName: 'Item One' },
    { key: 'item2', displayName: 'Item Two' },
  ];

  onClickAddTab(): void {
    const newTabNumber = this.tabs.length + 1;
    const newTabName = `Tab ${newTabNumber}`;
    const unusedItems = this.getUnusedItems();
    const firstAvailableItem = unusedItems.length > 0 ? unusedItems[0] : '';

    this.tabs.push({
      name: newTabName,
      selectedItem: firstAvailableItem
    });
    this.activeTab = newTabName;
  }

  onChangeItem(event: SynChangeEvent, tab: Tab): void {
    const value = (event.target as SynSelect).value;
    tab.selectedItem = value.toString();
  }

  getUnusedItems(): string[] {
    const usedItems = this.tabs
      .map(tab => tab.selectedItem)
      .filter(item => item !== '');

    return this.availableItems
      .map(item => item.key)
      .filter(key => !usedItems.includes(key));
  }
}
