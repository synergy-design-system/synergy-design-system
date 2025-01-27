import { NgModule } from '@angular/core';
import { DemoFieldset } from '../demofieldset/demofieldset.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [DemoFieldset],
  imports: [CommonModule],
  exports: [DemoFieldset],
})
export class DemoFieldSetModule {}
