import { Component, OnInit } from '@angular/core';
import { SynSelectComponent } from '@synergy-design-system/angular/components/select';
import { SynOptionComponent } from '@synergy-design-system/angular/components/option';
import { SynButtonComponent } from '@synergy-design-system/angular/components/button';
import { type SelectItem, mockAsyncData } from '@synergy-design-system/demo-utilities';

@Component({
  selector: 'demo-select',
  standalone: true,
  imports: [
    SynSelectComponent,
    SynOptionComponent,
    SynButtonComponent,
  ],
  template: `
    <syn-select data-testid="select-level-813" label="Experience" help-text="Please tell us your skill level." [value]="'2'">
      @for (level of levels; track $index; let index = $index) {
        <syn-option [value]="level.value"> {{level.label}}</syn-option
        >
      }
    </syn-select>

    <form>
      <syn-select data-testid="select-form-813" [value]="'option-1'">
        <syn-option value="option-1">Option 1</syn-option>
        <syn-option value="option-2">Option 2</syn-option>
        <syn-option value="option-3">Option 3</syn-option>
      </syn-select>
      <syn-button type="reset">Reset</syn-button>
    </form>
  `
})
export class Select implements OnInit {
  levels: SelectItem[] = [];

  ngOnInit(): void {
    mockAsyncData('selectItems').then((items) => {
      this.levels = items;
    });
  }
}
