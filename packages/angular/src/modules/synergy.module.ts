import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import {
  SynInputComponent,
} from '../components';

const components = [
  SynInputComponent,
];

@NgModule({
  imports: components,
  exports: components,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SynergyElementsModule {}
