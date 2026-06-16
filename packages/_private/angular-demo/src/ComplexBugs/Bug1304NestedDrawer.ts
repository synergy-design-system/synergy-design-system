import { Component, viewChild } from '@angular/core';
import { SynButtonComponent, SynDrawerComponent, SynDropdownComponent, SynMenuComponent, SynMenuItemComponent, SynOptionComponent, SynSelectComponent } from '@synergy-design-system/angular';

@Component({
  selector: 'demo-bug-1304-nested-drawer',
  standalone: true,
  imports: [
    SynButtonComponent,
    SynDrawerComponent,
    SynSelectComponent,
    SynOptionComponent,
    SynDropdownComponent,
    SynMenuComponent,
    SynMenuItemComponent,
  ],
  template: `
    <syn-button data-testid="nested-btn-1304" (click)="openDrawer()">Open Drawer</syn-button>
    <syn-drawer #drawer style="--size: 800px;">
      <syn-drawer contained open>
        <div style="display: flex;">
          <syn-select><syn-option value="1">Test 1</syn-option><syn-option value="2">Test 2</syn-option><syn-option value="3">Test 3</syn-option></syn-select>
          <syn-dropdown>
            <syn-button slot="trigger" caret="">Dropdown</syn-button>
            <syn-menu>
              <syn-menu-item value="undo">Undo</syn-menu-item>
              <syn-menu-item>
                Find
                <syn-menu slot="submenu">
                  <syn-menu-item value="find-next">Find Previous</syn-menu-item>
                </syn-menu>
              </syn-menu-item>
            </syn-menu>
          </syn-dropdown>
        </div>
      </syn-drawer>
    </syn-drawer>
  `,
})
export class Bug1304NestedDrawer {
  drawer = viewChild.required<SynDrawerComponent>('drawer');

  openDrawer() {
    this.drawer().nativeElement.show();
  }

}
