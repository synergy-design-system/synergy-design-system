# Known Issues and limitations - Angular

> ⚠️ This file includes all known issues and limitations when using the Angular wrappers.
> There may be other interesting bits of information in the [components limitation documentation](https://synergy-design-system.github.io/?path=/docs/limitations-components--docs).

---

## How to use `<syn-nav-item>` with routerLink

### Meta information

- Framework version: Angular@16 and above
- Synergy version: >= 1.15.0
- Issues: [#442](https://github.com/synergy-design-system/synergy-design-system/issues/442), [angular#51384](https://github.com/angular/angular/issues/51384), [angular#28345](https://github.com/angular/angular/issues/28345)

### Description

Synergies `<syn-nav-item>` does not work with Angular `routerLink` out of the box.

### Cause

Angular [routerLink](https://v17.angular.io/api/router/RouterLink) is very opinionated and does not play nicely with custom elements (e.g. it automatically adds focus styles). It also interferes with the `<syn-nav-item>`'s `href` attribute.

### Proposed Solution

Because of the details outlined above, you will have to provide a custom directive when using `<syn-nav-item>`.

#### Solution

Create your own directive that builds upon the original `routerLink` as can be seen [in our Angular Demo Repository](https://github.com/synergy-design-system/synergy-design-system/commit/10cb7fc47c951a9dfb0ea1f6070780262c0632c4#diff-6e0efa9162f915825307fe7e43299d0d492102de8759c191a8b898fd6bfc9069).

---
