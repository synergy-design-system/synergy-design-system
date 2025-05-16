import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import {
  SynergyFormsModule,
  SynergyComponentsModule,
} from '@synergy-design-system/angular';
import { AppComponent } from './app.component';
import { Home } from './home/home.component';
import { DemoForm } from './demoform/demoform.component';
import { DemoFormValidate } from './demoformvalidate/demoformvalidate.component';
import { SidenavSwitchComponent } from './sidenavswitch/sidenavswitch.component';
import { SizeSwitchComponent } from './sizeswitch/sizeswitch.component';
import { ThemeSwitchComponent } from './themeswitch/themeswitch.component';
import { AppRoutingModule } from './app-routing.module';
import {
  SynNavItemRouterLinkDirective,
  SynNavItemRouterLinkActiveDirective,
} from './directives';
import { DemoFieldSetModule } from './modules/demofieldset.module';

@NgModule({
  declarations: [
    Home,
    AppComponent,
    DemoForm,
    ThemeSwitchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SynergyComponentsModule,
    SynergyFormsModule,
    SynNavItemRouterLinkDirective,
    SynNavItemRouterLinkActiveDirective,
    SidenavSwitchComponent,
    SizeSwitchComponent,
    DemoFormValidate,
    DemoFieldSetModule,
],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
