import { Component } from '@angular/core';
import { SynIconComponent } from '@synergy-design-system/angular/components/icon';
import { SynTagGroupComponent } from '@synergy-design-system/angular/components/tag-group';
import { SynTagComponent } from '@synergy-design-system/angular/components/tag';

@Component({
  selector: 'demo-tag-group',
  standalone: true,
  imports: [
    SynTagGroupComponent,
    SynTagComponent,
    SynIconComponent,
  ],
  template: `
    <syn-tag-group label="Tag Group">
      <syn-tag removable>
        <syn-icon name="wallpaper" />
        Option
      </syn-tag>
      <syn-tag removable>
        <syn-icon name="wallpaper" />
        Option
      </syn-tag>
    </syn-tag-group>
`,
})
export class TagGroup {}
