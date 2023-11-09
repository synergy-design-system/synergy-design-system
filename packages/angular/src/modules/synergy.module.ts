import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import {
  SynInputComponent,
} from './components';

const components = [
  SynInputComponent,
] as unknown as any;

@NgModule({
  imports: components,
  exports: components,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SynergyElementsModule {}
