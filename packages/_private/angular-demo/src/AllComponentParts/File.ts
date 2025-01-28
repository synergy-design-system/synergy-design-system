import { Component } from '@angular/core';
import { SynFileComponent } from '@synergy-design-system/angular';

@Component({
  selector: 'demo-file',
  standalone: true,
  imports: [
    SynFileComponent,
  ],
  template: `
    <syn-file
      help-text="This is a help text."
      label="This is a label"
    />
  `,
})
export class File {}
