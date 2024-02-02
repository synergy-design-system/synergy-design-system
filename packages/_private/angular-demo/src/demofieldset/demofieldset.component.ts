import { Component, Input } from '@angular/core';

@Component({
  selector: 'demo-fieldset',
  styleUrls: ['./demofieldset.styles.css'],
  templateUrl: './demofieldset.component.html',
})
export class DemoFieldset {
  @Input({
    required: false,
  }) legend: string = '';
}
