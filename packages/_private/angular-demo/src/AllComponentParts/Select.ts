import { Component, OnInit } from '@angular/core';
import { SynSelectComponent } from '@synergy-design-system/angular/components/select';
import { SynOptionComponent } from '@synergy-design-system/angular/components/option';
import { SynButtonComponent } from '@synergy-design-system/angular/components/button';
import { type SelectItem, mockAsyncData, mockData } from '@synergy-design-system/demo-utilities';

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
        <syn-option [value]="level.value">{{level.label}}</syn-option>
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

    <div>
      <syn-select
        data-testid="select-805-single-select"
        help-text="Please tell us your skill level."
        label="Mixed integer and string values (Single Select)"
        [value]=1
      >
        @for (item of numericItems; track $index; let index = $index) {
          <syn-option [value]="item.id"> {{item.label}}</syn-option>
        }
      </syn-select>

      <syn-select
        data-testid="select-805-multi-select"
        help-text="Please tell us your skill level."
        label="Mixed integer and string values (multi Select)"
        multiple
        [value]="[1, 'three']"
      >
        @for (item of numericItems; track $index; let index = $index) {
          <syn-option [value]="item.id"> {{item.label}}</syn-option>
        }
      </syn-select>
    </div>

    <syn-select
      data-testid="select-540-delimeter"
      delimeter="|"
      help-text="This select uses a custom delimeter"
      label="Multiple with custom delimeter"
      multiple
      value="1|2"
    >
      @for (level of levels; track $index; let index = $index) {
        <syn-option [value]="level.value">{{level.label}}</syn-option>
      }
    </syn-select>
  `
})
export class Select implements OnInit {
  levels: SelectItem[] = [];
  numericItems = mockData('selectItemsMixedId');

  ngOnInit(): void {
    mockAsyncData('selectItems').then((items) => {
      this.levels = items;
    });
  }
}
