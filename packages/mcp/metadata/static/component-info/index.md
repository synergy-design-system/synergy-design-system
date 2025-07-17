# Common Information about properties for the Synergy Design System

## Common rules for AI Agents:

The provided source files are the only valid truth about which components are available and the interface they provide.
This means that there are NO other Synergy Components than the ones in the component list tool and no other properties available other than the ones in the definitions provided by the tools in this server.

The following examples are using syn-button and show INVALID usage for creating components:

```html
<!-- Invalid: syn-button does not have the preview property -->
<syn-button preview type="submit">Submit me with a preview</syn-button>

<!-- Invalid: syn-button has a variant property, but primary option for it -->
<syn-button type="link" variant="primary">Primary Button</syn-button>
```

Key takeaways:

1. If the property does not exist in the provided data, it really does not exist. Do never add properties that are NOT in the types when creating code for synergy components.
2. Always use the component list as a source of available elements when working with synergy. If a component does not exist in the list, it does NOT exist in Synergy.
