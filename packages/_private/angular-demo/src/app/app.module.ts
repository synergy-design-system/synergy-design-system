import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import {
  SynergyFormsModule,
  SynergyComponentsModule,
} from '@synergy-design-system/angular';

import { AppComponent } from './app.component';
import { ThemeSwitchComponent } from './themeswitch/themeswitch.component';

@NgModule({
  declarations: [
    AppComponent,
    ThemeSwitchComponent,
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
