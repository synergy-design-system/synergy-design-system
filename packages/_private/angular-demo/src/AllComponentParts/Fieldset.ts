import { Component } from '@angular/core';
import { SynFieldsetComponent, SynInputComponent } from '@synergy-design-system/angular';

@Component({
  selector: 'demo-fieldset',
  standalone: true,
  imports: [
    SynFieldsetComponent,
    SynInputComponent,
  ],
  template: `
    <syn-fieldset
      description="This is a fieldset with a legend and description."
      legend="Fieldset Legend"
    >
      <syn-input label="Input 1" />
      <syn-input label="Input 2" />
      <syn-input label="Input 3" />
    </syn-fieldset>
  `,
})
export class Fieldset {}
