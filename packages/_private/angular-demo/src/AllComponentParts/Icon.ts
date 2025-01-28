import { Component } from '@angular/core';
import { SynIconComponent } from '@synergy-design-system/angular';

@Component({
  selector: 'demo-icon',
  standalone: true,
  imports: [
    SynIconComponent,
  ],
  template: `
    <syn-icon name="wallpaper" />
  `,
})
export class Icon {}
