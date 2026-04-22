import { Component } from '@angular/core';
import { SynPaginationComponent } from '@synergy-design-system/angular';

@Component({
  selector: 'demo-pagination',
  standalone: true,
  imports: [
    SynPaginationComponent,
  ],
  template: `
    <syn-pagination total-items="100"></syn-pagination>
  `,
})
export class Pagination {}
