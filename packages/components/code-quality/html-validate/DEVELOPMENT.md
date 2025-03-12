## About html-validate

Provided rules are created dynamically with some static overrides that cannot be obtained from the components manifest.
Each element has its own custom configuration that overrides all dynamically created settings.
Custom rules for each element can be found in `scripts/synergy-element-rules.js`.
Most of those rules adjust the [Content category](https://html-validate.org/usage/elements.html#content-categories) used for the element. It also keeps track for various other actions like flagging a custom element as [`formAssociated`](https://html-validate.org/usage/elements.html#formassociated).

> The configuration is created on the fly via a function.
> This may have to reload your IDEs plugin for the change to take effect.
> For development purposes, it is advised to rely on the command line interface instead!

### Deprecating properties for future releases

For future releases where an attribute is phased out, it is desirable to flag the attribute as [`deprecated`](https://html-validate.org/usage/elements.html#deprecated). This can be done in the custom configuration like this:

```javascript
// Example: <syn-header>
// Synergy@1.x still has the attribute show-burger-menu for syn-header,
// but we know we want to remove it in version 2.0
/**
 * @type {import('html-validate').MetaElement}
 */
const SynHeader = {
  attributes: {
    "show-burger-menu": {
      boolean: true,
      deprecated: willDeprecateInRelease(
        "2.0",
        "Will be replaced with `burger-menu`",
      ),
    },
  },
  flow: true,
  heading: true,
  sectioning: true,
};
```

When the new Synergy major version is released, you can finally deprecate the property:

```javascript
// Example: <syn-header>
// Synergy@2.x removed the attribute show-burger-menu for syn-header,
// so we replace the warning with a hard error
const SynHeader = {
  attributes: {
    "show-burger-menu": {
      allowed: deprecatedForRelease(
        "2.0",
        "Please use the `burger-menu` attribute instead.",
      ),
      boolean: true,
    },
  },
  flow: true,
  heading: true,
  sectioning: true,
};
```
