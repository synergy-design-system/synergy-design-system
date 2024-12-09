# Known Issues and limitations - Angular

> ⚠️ This file includes all known issues and limitations when using the react wrappers.
> There may be other interesting bits of information in the [components limitation documentation](https://synergy-design-system.github.io/?path=/docs/limitations-components--docs).

## Why is there a react wrapper package in the first place?

### Meta information

- Framework version: Angular@18 and below
- Synergy version: < 2.15.0

### Description

React did historically not ship with web components in mind. This means for older react applications, it is not possible to use web components out of the box.

### Cause

Unfortunately it seems that web components never got traction for react developers in the first place, so they where ignored for a long time.

### Proposed Solution

#### Solution 1: For react <= 18.0.0

When using react version 18 and below, you may use our `@synergy-design-system/react` wrapper components.
They allow seamless use of our components as automatically wrapped react elements.

#### Solution 2: For react >= 19.0.0

React 19 comes with official support for web components. This means you are able to use synergies web components directly in React applications now.
We support this by providing a custom typescript module that may be installed in your react project that provides typechecking and autocompletion support for the native components in react. Please see `@synergy-design-system/react` installation instructions for using this.
