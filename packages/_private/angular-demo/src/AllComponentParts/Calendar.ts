import { Component } from '@angular/core';
import { SynCalendarComponent } from '@synergy-design-system/angular/components/calendar';

@Component({
  selector: 'demo-calendar',
  standalone: true,
  imports: [
    SynCalendarComponent,
  ],
  template: `
    <syn-calendar />
  `,
})
export class Calendar {}
