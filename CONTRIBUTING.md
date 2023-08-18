# SICK Design System Contribution Guidelines

Thank you for investing your time to contribute to our project.
We want to make sure to provide our users with a set of feature rich, high quality and easy to use web-components.
To achieve this, we are using some common conventions when contributing features or components to this repository.

## Testing

All features and components must be automatically tested to catch regressions. Please write tests to validate your new features wherever you can. Also make sure to always provide storybook stories when authoring new components.

## Code conventions

We are enforcing common code conventions via `eslint` and `prettier`. Please make sure your code meets those conventions by linting your files or your PR may not be approved.

When writing components, use our defined list of design tokens for spacing, fonts or colors. As a rule of thumb, there should be no need to have a static color anywhere in your css code.

Components must be optimized for accessibility. Please use tools like AXE or Dev-Tools and have a look at the [Web Content Accessibility Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/) for further information.
