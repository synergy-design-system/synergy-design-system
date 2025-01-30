import { Component } from '@angular/core';
import { SynBreadcrumbComponent } from '@synergy-design-system/angular/components/breadcrumb';
import { SynBreadcrumbItemComponent } from '@synergy-design-system/angular/components/breadcrumb-item';

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
