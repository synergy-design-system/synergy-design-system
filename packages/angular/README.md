# @synergy-design-system/angular

This package provides [Angular](https://angular.io/) wrappers for [Synergy Web Components](https://github.com/SickDesignSystem/synergy/tree/main/packages/components).

## Getting started

### 1. Package installation

Run the following steps to install the required packages.

```bash
# Install the base library and required css files
npm install --save @synergy-design-system/angular @synergy-design-system/tokens
```

### 2. Add the wanted theme to your application

The components will not display correctly without the needed theme. Please include either light or dark theme in your application, for example in a newly installed Angular application, add the following to `angular.json`:

```json
{
  "projects": {
    "your-project": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "@synergy-design-system/tokens/themes/light.css"
            ]
          }
        }
      }
    }
  }
}
```

### 3. Load the Synergy Module to load all components

> ⚠️ This is a convenience feature only and WILL create bigger bundles!
> It is intended for bootstrapping applications in a quick way.
> It is recommended that you ship your own NgModule with only needed components
> See below for more information!

This library is providing a `NgModule` named `SynergyModule`, which takes care of exporting all available Synergy Components. You may use it in the following way:

```typescript
// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SynergyModule } from '@synergy-design-system/angular';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SynergyModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

You will then be able to use the provided wrappers in the following way:

```html
<!-- src/app/app.component.html -->
<syn-input
  ngDefaultControl
  formControlName="test"
  type="text"
  name="test"
  [title]="myLabel"
  type="text"
  (synBlurEvent)="logMessage('onBlur', $event)"
  (synInputEvent)="logMessage('onInput', $event)"
  required
>
  <span slot="label">
    {{myLabel}}
  </span>
</syn-input>
```

This example will render the provided `<syn-input />` angular component and hook it into angular forms via `ngDefaultControl`.
