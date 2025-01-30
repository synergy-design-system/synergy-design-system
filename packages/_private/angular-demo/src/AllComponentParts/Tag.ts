import { Component } from '@angular/core';
import { SynIconComponent } from '@synergy-design-system/angular/components/icon';
import { SynTagComponent } from '@synergy-design-system/angular/components/tag';

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
