import { Component } from '@angular/core';
import { SynTextareaComponent } from '@synergy-design-system/angular';

@Component({
  selector: 'demo-textarea',
  standalone: true,
  imports: [
    SynTextareaComponent,
  ],
  template: `
    <syn-textarea
      label="Feedback"
      help-text="Please tell us what you think."
    />
  `,
})
export class TextArea {}
