# @synergy-design-system/styles

This package provides utility classes and basic document stylings intended for **new applications and websites** using `@synergy-design-system/components` or one of its derived wrapper packages.

---

## Installation

Please make sure to install the css package as a dependency:

```bash
npm install --save @synergy-design-system/styles
```

## Provided stylesheets

Depending on your use case, you may load one of the following stylesheets for your application:

| Stylesheet                | Theming                                          | Utilities |
| :------------------------ | :----------------------------------------------- | :-------: |
| `all.css`                 | Imports dark and light theme (defaults to light) |    ✔     |
| `all-with-auto-theme.css` | Loads theme via `prefers-color-scheme`           |    ✔     |
| `utilities.css`           | No theme loaded                                  |    ✔     |

---

## Using utilities only

Instead of choosing the predefined exports as defined above, you may also include just the parts you need. This can be done by importing one or multiple of the stylesheets from `src/modules` directly. The following table lists the contents of the stylesheets. For further usage information and demos, please have a look at our [storybook instance](https://synergy-design-system.github.io)

| Stylesheet       | Content                                                                                                           |
| :--------------- | :---------------------------------------------------------------------------------------------------------------- |
| `body.css`       | Basic formats that may be used for the `<body />` tag                                                             |
| `forms.css`      | Utility classes for working with `<form />` and other related tags                                                |
| `fouc.css`       | Opinionated utility for working around [FOUC](https://www.jacobmilhorn.com/posts/solving-fouc-in-web-components/) |
| `table.css`      | Basic helpers for formatting tables.                                                                              |
| `typography.css` | Typographic helpers for font-sizes on body and headlines                                                          |
