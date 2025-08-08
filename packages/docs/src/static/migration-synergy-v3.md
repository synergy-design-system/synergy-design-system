# Migration to Synergy 3.0

This document outlines the changes and migration steps required to upgrade from Synergy 2.x to the new Synergy 3.0.

> Please note that this migration is still in progress, and some features may not be fully implemented yet. We recommend reviewing the [GitHub repository](https://github.com/orgs/synergy-design-system/projects/2/views/37) for the latest updates.

## Roadmap

We are currently working on the migration to Synergy 3.0, which includes significant updates to the brand appearance, fonts and icon library.
This migration will ensure that your application remains up-to-date with the latest design standards and functionality improvements.

It is currently not adviced to use the new version in production, as we are still finalizing the migration process.
However, you can start preparing your codebase for the upcoming changes.

A roadmap and current status of the migration can be found in our [GitHub repository](https://github.com/orgs/synergy-design-system/projects/2/views/37).

## Breaking Changes

### Icons

#### System Icon Library

The icon library has been updated to include a new iconset.
For backwards compatibility, Synergy will ship two system icon libraries from during the 2.0 release.
For applications that plan to continue using Synergy 2.0, there **are no changes needed** to the icon library.
For applications that want to use the new icon library, we have added a new utility function `setSystemIconLibrary`.
After calling this function, the system icon library will be set to the new iconset.

> Make sure to call this function before rendering any components that use the system icon library!

```javascript
import { setSystemIconLibrary } from '@synergy-design-system/icons';
setSystemIconLibrary('sick2025');
```

## Migration Steps

These steps are only needed when switching to the new Synergy 3.0 layout.

1. Always make sure to use the latest versions of the Synergy packages. You can check for updates using your package manager.
2. Call `setSystemIconLibrary` with `sick2025` to enable the new system icons.
3. Adjust your bundler to copy the new icons to your build output. This is necessary to ensure that the new icons are available in your application.
