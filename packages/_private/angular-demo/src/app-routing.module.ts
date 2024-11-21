import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoForm } from './demoform/demoform.component';
import { DemoFormValidate } from './demoformvalidate/demoformvalidate.component';
import { Home } from './home/home.component';

const routes: Routes = [
  { path: '', component: Home },
  { path: 'contact-form', component: DemoForm },
  { path: 'contact-form-validate', component: DemoFormValidate },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
