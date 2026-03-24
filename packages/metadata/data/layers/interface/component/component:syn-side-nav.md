# syn-side-nav

## Summary

The <syn-side-nav /> element contains secondary navigation and fits below the header.
It can be used to group multiple navigation items (<syn-nav-item />s) together.

## Documentation

[Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-side-nav--docs)

## Class Information

- **Import Example:** `import SynSideNav from '@synergy-design-system/components/components/side-nav/side-nav.js';`
- **Module Path:** components/side-nav/side-nav.js
- **Tag Name:** `syn-side-nav`

## Usage Information

- **Status:** stable
- **Since:** 1.14.0

## Available Slots

| Name         | Description                                                                                                                                                      |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (default)    | The main content of the side-nav. Used for <syn-nav-item /> elements.                                                                                            |
| footer       | The footer content of the side-nav. Used for <syn-nav-item /> elements. Please avoid having to many nav-items as it can massively influence the user experience. |
| toggle-label | The label of the toggle nav-item for variant="sticky".                                                                                                           |
| toggle-icon  | An icon to use in lieu of the default icon for the toggle nav-item for variant="sticky".                                                                         |

## Available Properties

| Property        | Attribute           | Reflects | Type                              | Default     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| --------------- | ------------------- | :------: | --------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| noFocusTrapping | `no-focus-trapping` |    ✓     | `boolean`                         | `false`     | By default, the side-nav traps the focus if in variant="default" and open. To disable the focus trapping, set this attribute.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| open            | `open`              |    ✓     | `boolean`                         | `false`     | Indicates whether or not the side-nav is open. You can toggle this attribute to show and hide the side-nav, or you can use the `show()` and `hide()` methods and this attribute will reflect the side-nav's open state. Depending on the "variant" attribute, the behavior will differ. **Default**: With `open` will show the side-nav with an overlay. Without `open`, the side-nav will be hidden. **Rail**: With `open` will show the whole side-nav with an overlay for touch devices or without an overlay for non-touch devices. Without `open`, the side-nav will only show the prefix of nav-item's. **Sticky**: With `open` will show the whole side-nav with an overlay for touch devices or without an overlay for non-touch devices. Without `open`, the side-nav will only show the prefix of nav-item's.                                                                                                                                                           |
| variant         | `variant`           |    ✓     | `'default' \| 'rail' \| 'sticky'` | `'default'` | The variant that should be used to show the side navigation. The following variants are supported: - **default** (default): Always shows the whole content and additionally an overlay. This makes especially sense for applications, where you navigate to a place and stay there for a longer time. - **rail**: Only show the prefix of navigation items in closed state. This will open on hover on the rail navigation. On touch devices the navigation opens on click and shows an overlay. Note: The rail variant is only an option if all Navigation Items on the first level have an Icon. If this is not the case you should use a burger navigation. - **sticky**: The side-nav has a pin button to show the side-nav in small (icon only) and full width. This variant is only possible for non-nested navigation items. Note: The sticky variant is only an option if all Navigation Items on the first level have an Icon and if there are only "first level" items. |

## Available Methods

| Name     | Parameters | Return Type | Description         |
| -------- | ---------- | ----------- | ------------------- |
| `hide()` | -          | -           | Hides the side-nav  |
| `show()` | -          | -           | Shows the side-nav. |

## Available CSS Parts

| Name              | Description                                                                         |
| ----------------- | ----------------------------------------------------------------------------------- |
| base              | The components base wrapper                                                         |
| body              | The side-nav's body (where the default slot content is rendered)                    |
| content           | The components main content                                                         |
| content-container | The components main content container                                               |
| drawer            | The drawer that is used under the hood for creating the side-nav                    |
| drawer\_\_base    | The drawer's base wrapper                                                           |
| footer            | The components footer content                                                       |
| footer-container  | The components footer content container (where the footer slot content is rendered) |
| footer-divider    | The components footer divider                                                       |
| overlay           | The overlay that covers the screen behind the side-nav.                             |
| panel             | The side-nav's panel (where the whole content is rendered).                         |
| toggle-icon       | The icon of the toggle nav-item for variant="sticky"                                |
| toggle-label      | The label of the toggle nav-item for variant="sticky".                              |
| toggle-nav-item   | The nav-item to toggle open state for variant="sticky"                              |

## Available Events

| Name           | Event Type          | Description                                                        |
| -------------- | ------------------- | ------------------------------------------------------------------ |
| syn-after-hide | `SynAfterHideEvent` | Emitted after the side-nav closes and all animations are complete. |
| syn-after-show | `SynAfterShowEvent` | Emitted after the side-nav opens and all animations are complete.  |
| syn-hide       | `SynHideEvent`      | Emitted when the side-nav closes.                                  |
| syn-show       | `SynShowEvent`      | Emitted when the side-nav opens.                                   |

## Dependencies

- `syn-divider`
- `syn-drawer`
- `syn-icon`
- `syn-nav-item`
