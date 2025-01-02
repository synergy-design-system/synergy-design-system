import { Component } from '@angular/core';
import { SynergyComponentsModule } from '@synergy-design-system/angular';
import { setGlobalSize } from '../shared';

type AvailableSizes = 'small' | 'medium' | 'large';

@Component({
  imports: [SynergyComponentsModule],
  selector: 'size-switch',
  standalone: true,
  templateUrl: './sizeswitch.component.html',
})
export class SizeSwitchComponent {
  currentSize: AvailableSizes = 'medium';

  switchSize(size: AvailableSizes) {
    setGlobalSize(size);
    this.currentSize = size;
  }
}
