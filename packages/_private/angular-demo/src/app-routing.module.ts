import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoForm } from './demoform/demoform.component';
import { DemoFormValidate } from './demoformvalidate/demoformvalidate.component';
import { Home } from './home/home.component';
import { DemosComponent } from './demos-template/demos.component';
import * as AllComponents from './AllComponentParts/index.js';
import * as FrameworkSpecifics from './FrameworkSpecificParts/index.js';

const allComponentsDemos = Object.entries(AllComponents);
const frameworkSpecificDemos = Object.entries(FrameworkSpecifics);

const routes: Routes = [
  { path: '', component: Home },
  { path: 'contact-form', component: DemoForm },
  { path: 'contact-form-validate', component: DemoFormValidate },
  { path: 'all-components', component: DemosComponent, data: { demos: allComponentsDemos }  },
  { path: 'framework-specific', component: DemosComponent, data: { demos: frameworkSpecificDemos } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
