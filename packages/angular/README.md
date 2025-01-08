# @synergy-design-system/angular

This package provides [Angular](https://angular.io/) wrappers for [Synergy Web Components](https://github.com/synergy-design-system/synergy-design-system/tree/main/packages/components).

It aims for an improved UX when used in Angular applications:

- Form support
- Two way data-binding for properties
- Auto-completion
- Event handling

> We are currently supporting Angular version ^16.2.12, ^17.0.0, ^18.0.0 and ^19.0.0 as well as Typescript version > 5.0.0.

## Known issues and limitations

Got any problems using our Angular wrappers? Please take a look at [our list of known issues and limitations](https://synergy-design-system.github.io/?path=/docs/limitations-angular--docs) before [creating a ticket](https://github.com/synergy-design-system/synergy-design-system/issues/new?assignees=&labels=&projects=&template=generic-bug.md&title=fix%3A+%F0%9F%90%9B+).

## Getting started

### 1. Usage example 

If you want to see a usage example, please check out our [test Angular repository](https://github.com/synergy-design-system/synergy-design-system/tree/main/packages/_private/angular-demo).

### 2. Package installation

Run the following steps to install the required packages.

```bash
# Install the required dependencies
npm install --save @synergy-design-system/angular @synergy-design-system/components @synergy-design-system/tokens

# Optional: Install the styles utility package
npm install --save @synergy-design-system/styles

# If not already installed, install Angular's peer dependencies
# Install step for angular@17
npm install --save @angular/core@17 @angular/forms@17

# Optional: if icons shall be used, install the assets package
npm install --save @synergy-design-system/assets
```

### 3. Load the desired theme (required) and utility classes (recommended)

The components will not display correctly without the needed theme and utility classes.
Please include either light or dark theme in your application, for example in a newly installed Angular application, add the following to `angular.json`:

> This example includes the optional @synergy-design-system/styles package.
> If you do not want to use the styles package, just remove the last import.

```json
{
  "projects": {
    "your-project": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              // Add this line to enable the light theme for your application
              "@synergy-design-system/tokens/themes/light.css",
              "@synergy-design-system/components/index.css",
              // Optional: Import the styles package
              "@synergy-design-system/styles/index.css"
            ]
          }
        }
      }
    }
  }
}
```

### 4. Importing and rendering components
There are multiple ways to load components:

#### Load the Synergy Module to load all components

> ⚠️ This is a convenience feature only and WILL create bigger bundles!
> It is intended for bootstrapping applications in a quick way.
> It is recommended that you ship your own NgModule with only needed components.
> See below for more information!

This library is providing an `NgModule` named `SynergyComponentsModule`, which takes care of exporting all available Synergy Components. You may use it in the following way:

```typescript
// src/app/app.module.ts
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { SynergyComponentsModule } from "@synergy-design-system/angular";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SynergyComponentsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

You will then be able to use the provided wrappers in the following way:

```html
<!-- src/app/app.component.html -->
<syn-button type="submit"> Submit me </syn-button>
```

This example will render the provided `<syn-button />` Angular component.

---


#### Loading selected components only

To reduce bundle size, it is recommended that you do not use the root import for components like `import { SynInputComponent, SynButtonComponent } from '@synergy-design-system/angular`, but use the specific import for each needed component.

You can either add the needed components directly to the @Component.imports array:

```typescript
// src/app/my-component.component.ts
import { Component } from '@angular/core';
import { SynInputComponent } from '@synergy-design-system/angular/components/input';
import { SynButtonComponent } from '@synergy-design-system/angular/components/button';

@Component({
  selector: 'my-component',
  imports: [
    SynButtonComponent,
    SynInputComponent,
  ],
  template: `
    <syn-input label="My input"></syn-input>
    <syn-button>Click me</syn-button>
  `,
})
export class MyComponent {}
```

Or create your own reusable NgModule with only needed components:

```typescript
// src/app/used-synergy.module.ts
import { NgModule } from '@angular/core';
import { SynButtonComponent } from '@synergy-design-system/angular/components/button';
import { SynInputComponent } from '@synergy-design-system/angular/components/input';

const components = [
  SynButtonComponent,
  SynInputComponent,
];

@NgModule({
  imports: components,
  exports: components,
})
export class UsedSynergyModule {}
```

```typescript
// src/app/my-component.component.ts
import { Component } from '@angular/core';
import { UsedSynergyModule } from './used-synergy.module';


@Component({
  selector: 'my-component',
  imports: [
    UsedSynergyModule,
  ],
  template: `
    <syn-input label="My input"></syn-input>
    <syn-button>Click me</syn-button>
  `,
})
export class MyComponent {}
```

For a practical example, check out our test Angular repository. We've created a [module](https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/_private/angular-demo/src/modules/used-synergy.module.ts) that includes only the necessary components, which we imported into the [component](https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/_private/angular-demo/src/demoformvalidate/demoformvalidate.component.ts) that uses them.


### 5. Usage of the components

All information about which components exist as well as the available properties, events and usage of a component, can be found at `components` in our [documentation](https://synergy-design-system.github.io/?path=/docs/components).
The documentation is written for no specific web framework but only vanilla html and javascript.

An example demo repository with the usage of the Angular wrapper components can be found [here](https://github.com/synergy-design-system/synergy-design-system/tree/main/packages/_private/angular-demo).

The naming of the components for Angular is the same as in the documentation.

```html
<!-- Webcomponents example -->
<syn-button> My Button </syn-button>
```

```html
<!-- Angular wrapper example -->
<syn-button> My Button </syn-button>
```

### 6. Usage of attributes

In Angular attributes must be converted from kebab-case to camelCase (e.g. myAttribute instead of my-attribute)

The following two code examples show, how different attributes look like for web components and their Angular wrapper counterpart:

```html
<!-- Webcomponents example -->
<syn-input
  label="Nickname"
  help-text="What would you like people to call you?"
  required
></syn-input>
```

```html
<!-- Angular wrapper example -->
<syn-input
  label="Nickname"
  helpText="What would you like people to call you?"
  required
></syn-input>
```

### 7. Usage of events

Custom events are named in the documentation as following: `syn-change`, `syn-clear`, ...

In the Angular wrapper these events can be used in two ways: either with the same naming as in the documentation or via camelCase with `Event` suffix.

`syn-change`-> `synChangeEvent`, `syn-clear`-> `synClearEvent`, ...

> Note:
> Only for the camelCase variant (e.g. synChangeEvent) Angular will give auto completion in the html.

An example for both event usages are following:

```html
<!-- Angular wrapper with original event name -->
<syn-input (syn-change)="synChange($event)"></syn-input>
```

```html
<!-- Angular wrapper with specific event name -->
<syn-input (synChangeEvent)="synChange($event)"></syn-input>
```

If typescript is used, you can get the correct types for components and events from the `@synergy-design-system/components` package.
An example for how these types can be used in case of event handling, is shown below:

```html
<syn-input label="Surname" (synChangeEvent)="synChange($event)"> </syn-input>
```

```js
  import type { SynChangeEvent, SynInput } from '@synergy-design-system/components';

  synChange(e: SynChangeEvent) {
    const input = e.target as SynInput;
    // Now we get access to all properties, methods etc. of the syn-input
    const surname = input.value;
    doSomething(surname);
  }
```

### 8. Obtaining a reference to the underlying native element (e.g. for usage of methods)

Sometimes, there is a need to interact directly with the underlying native web-component. For this reason, the library exposes a `nativeElement` property for all angular components.

```js
import { Component, ViewChild } from '@angular/core';
import { SynInputComponent } from '@synergy-design-system/angular';

@Component({
  selector: 'home',
  styleUrls: ['./home.styles.css'],
  template: `
    <syn-input #count label="My count" type="number" value="5"></syn-input>
    <syn-button (click)="handleClick()">Increment</syn-button>
  `
})
export class Home {
 @ViewChild('count') count!: SynInputComponent;

  handleClick() {
    // Increment the count via calling the method
    this.count.nativeElement.stepUp();
  }
}
```

### 9. Using synergy components in @angular/forms via SynergyFormsModule

There are two ways to use the Angular wrappers in forms: Either manual by adding a `ngDefaultControl` to the component or via our custom `SynergyFormsModule`.

`SynergyFormsModule` provides automatic support for all currently available Synergy form input elements by wrapping them with custom Angular `ValueAccessors`.

To use the module, please proceed the following way:

```typescript
// src/app/app.module.ts
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import {
  SynergyComponentsModule,
  SynergyFormsModule,
} from "@synergy-design-system/angular";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    SynergyComponentsModule,
    SynergyFormsModule,
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
  formControlName="test"
  type="text"
  name="test"
  [title]="myLabel"
  type="text"
  required
>
  <span slot="label"> {{myLabel}} </span>
</syn-input>
```

Note that all elements that have one of the following attributes will be used as selectors:

- Elements defining a `[formControlName]` attribute
- Elements defining a `[formControl]` attribute
- Elements defining a `[ngModel]` attribute

### 10. Using two way data binding

Input Controls like `<syn-input />`, `<syn-checkbox />` or `<syn-select />` also support [Angulars two way data binding](https://angular.io/guide/two-way-binding) on their corresponding `value` or `checked` properties.

You can use this in the following way:

```typescript
// Example empty component with
// one property using two way data binding
import { Component } from "@angular/core";

@Component({
  selector: "home",
  styleUrls: ["./home.styles.css"],
  template: `
    <syn-input [(value)]="inputValue" placeholder="Type something"></syn-input>

    Current Value is: {{ inputValue }}
  `,
})
export class Home {
  inputValue: string = "Type something";
}
```

---

## Development

To create a new version of this package, proceed in the following way:

1. Check out the [Synergy Design System Repository](https://github.com/synergy-design-system/synergy-design-system).
2. Run `pnpm i -r` to install all dependencies.
3. Build the `@synergy-design-system/components` package (or run `pnpm build` in the project root to build everything).
4. Move to to `packages/_private/angular-demo` and use `pnpm start` to spin up a local vite project using react and typescript to validate the build.

> ⚠️ The build process will always try to sync this packages `package.json.version` field with the latest version from `@synergy-design-system/components`!
> Therefore, it is best to not alter the version string
