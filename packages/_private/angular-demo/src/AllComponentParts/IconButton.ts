import { Component } from '@angular/core';
import { SynIconButtonComponent } from '@synergy-design-system/angular';

@Component({
  selector: 'demo-icon-button',
  standalone: true,
  imports: [
    SynIconButtonComponent,
  ],
  template: `
    <div>
      <syn-icon-button
        name="wallpaper"
        label="Wallpaper"
        color="neutral"
        size="small"
      />
      <syn-icon-button
        name="wallpaper"
        label="Wallpaper"
        color="neutral"
        size="medium"
      />
      <syn-icon-button
        name="wallpaper"
        label="Wallpaper"
        color="neutral"
        size="large"
      />
    </div>
  `,
})
export class IconButton {}
