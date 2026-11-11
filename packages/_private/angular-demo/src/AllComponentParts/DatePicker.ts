import { Component } from '@angular/core';
import { SynDatePickerComponent } from '@synergy-design-system/angular/components/date-picker';

@Component({
  selector: 'demo-date-picker',
  standalone: true,
  imports: [
    SynDatePickerComponent,
  ],
  template: `
    <syn-date-picker />
  `,
})
export class DatePicker {}
