import { Component } from '@angular/core';
import { SynTabGroupComponent, SynTabComponent, SynTabPanelComponent } from '@synergy-design-system/angular';
import * as DemoImports from '../AllComponentParts/index.js';
import { CommonModule } from '@angular/common';

const Demos = Object.entries(DemoImports);
const activeDemo = Demos.at(0)?.at(0);

@Component({
  selector: 'all-components',
  standalone: true,
  imports: [
    CommonModule,
    SynTabGroupComponent,
    SynTabComponent,
    SynTabPanelComponent,
  ],
  templateUrl: './allcomponents.component.html',
})
export class AllComponents {
  activeDemo: typeof activeDemo = activeDemo;
  Demos: typeof Demos = Demos;

  scrollToTop = (e: Event) => {
    (e.target as HTMLElement).parentElement?.scrollTo(0, 0);
  }
}
