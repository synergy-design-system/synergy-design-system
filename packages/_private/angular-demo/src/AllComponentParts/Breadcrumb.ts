import { Component } from '@angular/core';
import { SynBreadcrumbComponent, SynBreadcrumbItemComponent } from '@synergy-design-system/angular';

@Component({
  selector: 'demo-breadcrumb',
  standalone: true,
  imports: [
    SynBreadcrumbComponent,
    SynBreadcrumbItemComponent,
  ],
  template: `
    <syn-breadcrumb>
      <syn-breadcrumb-item>Breadcrumb Item</syn-breadcrumb-item>
      <syn-breadcrumb-item>Breadcrumb Item</syn-breadcrumb-item>
      <syn-breadcrumb-item>Breadcrumb Item</syn-breadcrumb-item>
      <syn-breadcrumb-item>Breadcrumb Item</syn-breadcrumb-item>
    </syn-breadcrumb>
  `,
})
export class Breadcrumb {}
