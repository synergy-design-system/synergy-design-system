import { Component } from '@angular/core';
import { SynIconComponent, SynTagComponent } from '@synergy-design-system/angular';

@Component({
  selector: 'demo-tag',
  standalone: true,
  imports: [
    SynTagComponent,
    SynIconComponent,
  ],
  template: `
    <syn-tag>
      <syn-icon name="wallpaper" />
      Option
    </syn-tag>
  `,
})
export class Tag {}
