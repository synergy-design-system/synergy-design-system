import { Component, Input } from '@angular/core';

@Component({
  selector: 'demo-fieldset',
  templateUrl: './demofieldset.component.html',
})
export class DemoFieldset {
  @Input({
    required: false,
  }) legend: string = '';
}
