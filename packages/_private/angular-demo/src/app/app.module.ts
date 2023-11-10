import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { SynergyElementsModule } from '@synergy-design-system/angular/dist';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    SynergyElementsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
