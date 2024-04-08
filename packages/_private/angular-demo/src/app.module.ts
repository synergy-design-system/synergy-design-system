import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import {
  SynergyFormsModule,
  SynergyComponentsModule,
} from '@synergy-design-system/angular';
import { AppComponent } from './app.component';
import { DemoFieldset } from './demofieldset/demofieldset.component';
import { DemoForm } from './demoform/demoform.component';
import { ThemeSwitchComponent } from './themeswitch/themeswitch.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    DemoFieldset,
    DemoForm,
    ThemeSwitchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SynergyComponentsModule,
    SynergyFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
