import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoForm } from './demoform/demoform.component';
import { Home } from './home/home.component';

const routes: Routes = [
  { path: '', component: Home },
  { path: 'contact-form', component: DemoForm }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
