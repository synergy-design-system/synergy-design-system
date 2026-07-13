import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { SynSelectComponent } from '@synergy-design-system/angular/components/select';
import { SynOptionComponent } from '@synergy-design-system/angular/components/option';
import { SynButtonComponent } from '@synergy-design-system/angular/components/button';
import {
  type SelectItem,
  mockAsyncData,
  mockData,
  updateSelectRegressions1265 as updateSelectRegressions1265Utility,
} from '@synergy-design-system/demo-utilities';

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
          <syn-option [value]="item.value"> {{item.label}}</syn-option>
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
          <syn-option [value]="item.value"> {{item.label}}</syn-option>
        }
      </syn-select>
    </div>

    <syn-select
      data-testid="select-540-delimiter"
      delimiter="|"
      help-text="This select uses a custom delimiter"
      label="Multiple with custom delimiter"
      multiple
      value="1|2"
    >
      @for (level of levels; track $index; let index = $index) {
        <syn-option [value]="level.value">{{level.label}}</syn-option>
      }
    </syn-select>

    <syn-select
      data-testid="select-847-multiple"
      help-text="Normal value binding and async options"
      label="Multiple with async options"
      multiple
      value="1 2"
    >
      @for (level of levels; track $index; let index = $index) {
        <syn-option [value]="level.value">{{level.label}}</syn-option>
      }
    </syn-select>

    <syn-select
      data-testid="select-885-value-zero-string"
      label="Select should allow to select value of string(zero)"
      value="0"
    >
      <syn-option value="0">Zero (string)</syn-option>
    </syn-select>

    <syn-select
      data-testid="select-885-value-zero-number"
      label="Select should allow to select value of number(zero)"
      [value]=0
    >
      <syn-option [value]=0>Zero (numeric)</syn-option>
    </syn-select>

    <syn-select
      data-testid="select-1036-subsequently-changed-delimiter"
      label="Subsequently changed delimiter"
    >
      @for (item of delimiterItems; track $index; let index = $index) {
        <syn-option [value]="item.value">{{item.label}}</syn-option>
      }
    </syn-select>

    <syn-select
      data-testid="select-1056-async-delimiter-change-with-pre-value"
      value="Option 2"
      label="Async changed delimiter with pre value"
    >
      @for (item of delimiterItems; track $index; let index = $index) {
        <syn-option [value]="item.value">{{item.label}}</syn-option>
      }
    </syn-select>

    <syn-select
      data-testid="select-1056-async-delimiter-change-with-async-pre-value"
      [value]="asyncValue"
      label="Async changed delimiter with async pre value"
    >
      @for (item of delimiterItems; track $index; let index = $index) {
        <syn-option [value]="item.value">{{item.label}}</syn-option>
      }
    </syn-select>

    <syn-select
      data-testid="select-1177-readonly-select"
      label="Readonly Select"
      readonly
      value="option-1"
    >
      <syn-option value="option-1">Option 1</syn-option>
      <syn-option value="option-2">Option 2</syn-option>
      <syn-option value="option-3">Option 3</syn-option>
    </syn-select>

    <syn-select
      data-testid="select-1265-dynamic-option-changes"
      label="Dynamic Option Changes"
      value="option-2"
    >
      <syn-option value="option-1">Option 1</syn-option>
      <syn-option value="option-2">Option 2</syn-option>
      <syn-option value="option-3">Option 2</syn-option>
    </syn-select>

    <syn-button data-testid="select-1265-dynamic-option-button" (click)="updateSelectRegressions1265($event)">
      Dynamically change option 2 to "Changed Option 2"
    </syn-button>
  `
})
export class Select implements OnInit {
  private readonly cdr = inject(ChangeDetectorRef);

  levels: SelectItem[] = [];
  numericItems = mockData('selectItemsMixedValue');
  delimiterItems = mockData('selectItemsWithSpace');
  asyncValue = '';


  ngOnInit(): void {
    this.loadAsyncData().catch(() => undefined);
  }

  private async loadAsyncData(): Promise<void> {
    const [levels, asyncValue] = await Promise.all([
      mockAsyncData('selectItems'),
      mockAsyncData('valueWithSpace'),
    ]);

    this.levels = levels;
    this.asyncValue = asyncValue;
    this.cdr.detectChanges();
  }

  updateSelectRegressions1265(e: Event): void {
    updateSelectRegressions1265Utility(e);
  }
}
