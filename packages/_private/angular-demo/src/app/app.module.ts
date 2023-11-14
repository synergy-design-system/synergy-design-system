import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import {
  SynergyFormsModule,
  SynergyComponentsModule,
} from '@synergy-design-system/angular';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    SynergyComponentsModule,
    SynergyFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
