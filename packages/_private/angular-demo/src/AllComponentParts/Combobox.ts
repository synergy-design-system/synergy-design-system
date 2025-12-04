import { Component, OnInit } from '@angular/core';
import type { SynChangeEvent, SynCombobox } from '@synergy-design-system/components';
import { SynComboboxComponent } from '@synergy-design-system/angular/components/combobox';
import { SynOptionComponent } from '@synergy-design-system/angular/components/option';
import { SynButtonComponent } from '@synergy-design-system/angular/components/button';
import { type SelectItem, mockAsyncData } from '@synergy-design-system/demo-utilities';

@Component({
  selector: 'demo-combobox',
  standalone: true,
  imports: [
    SynComboboxComponent,
    SynOptionComponent,
    SynButtonComponent
  ],
  template: `
    <syn-combobox data-testid="combobox-797" value="option-2">
      <syn-option value="option-1">Option 1</syn-option>
      <syn-option value="option-2">Option 2</syn-option>
      <syn-option value="option-3">Option 3</syn-option>
    </syn-combobox>

    <syn-combobox data-testid="combobox-level-813" label="Experience" help-text="Please tell us your skill level." [value]="'2'">
      @for (level of levels; track $index; let index = $index) {
        <syn-option [value]="level.value"> {{level.label}}</syn-option
        >
      }
    </syn-combobox>

    <form>
      <syn-combobox data-testid="combobox-form-813" [value]="'option-1'">
        <syn-option value="option-1">Option 1</syn-option>
        <syn-option value="option-2">Option 2</syn-option>
        <syn-option value="option-3">Option 3</syn-option>
      </syn-combobox>
      <syn-button type="reset">Reset</syn-button>
    </form>

    <syn-combobox
      data-testid="combobox-632"
      label="Keyboard Interaction test #632"
      [value]="cb632Value"
      (synChangeEvent)="setcb632Value($event)"
    >
      <syn-option value="option-1">Lorem</syn-option>
      <syn-option value="option-2">ipsum</syn-option>
      <syn-option value="option-3">dolor</syn-option>
    </syn-combobox>

    <syn-combobox
      data-testid="combobox-626"
      label="'Restricted' feature #626"
      restricted
    >
      <syn-option value="option-1">Lorem</syn-option>
      <syn-option value="option-2">ipsum</syn-option>
      <syn-option value="option-3">dolor</syn-option>
    </syn-combobox>

    <syn-combobox
      data-testid="combobox-626-async"
      label="'Restricted' feature #626 async"
      restricted
      value="3"
    >
      @for (level of levels; track $index; let index = $index) {
        <syn-option [value]="level.value">{{level.label}}</syn-option>
      }
    </syn-combobox>
  `,
})
export class Combobox implements OnInit {
  levels: SelectItem[] = [];

  cb632Value: string = '';

  setcb632Value(e: SynChangeEvent) {
    this.cb632Value = (e.target as SynCombobox).value as string;
  };

  ngOnInit(): void {
    mockAsyncData('selectItems').then((items) => {
      this.levels = items;
    });
  }
}

