import { Component } from '@angular/core';
import { SynergyComponentsModule } from '@synergy-design-system/angular';
import {
  type AllowedSizes,
  setGlobalSize,
} from '@synergy-design-system/demo-utilities';

@Component({
  imports: [SynergyComponentsModule],
  selector: 'size-switch',
  standalone: true,
  templateUrl: './sizeswitch.component.html',
})
export class SizeSwitchComponent {
  currentSize: AllowedSizes = 'medium';

  switchSize(size: AllowedSizes) {
    setGlobalSize(size);
    this.currentSize = size;
  }
}
