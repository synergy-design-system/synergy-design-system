# syn-header

## Summary

The <syn-header /> element provides a generic application header
that can be used to add applications name, toolbar and primary navigation.

## Common Use Cases

- Display primary navigation links for easy access to different sections of the website.
- Showcase the company logo prominently to reinforce brand identity.
- Include links for user account access.
- Provide a prominent search function to help users quickly find content.

## Usage Guidelines

### Layout

- Place navigation items in the navigation slot, the logo at the left, and meta navigation on the right in wider viewports to keep consistency across products.
- In smaller viewports, place an expandable menu on the left to host navigation items while keeping the logo consistently on the left across all viewport sizes.
- Keep the navigation fixed at the top of the website when scrolling back to the top.

### Navigation Structure and Content

- Include the logo, main navigation, and, if applicable, sub-brand logos and meta navigation.
- Use the number of navigation items that best suits the content, always ensuring categories are clearly labeled and mutually exclusive.
- Regularly update the navigation links to reflect current content and structure.

### Visual Style and Branding

- Provide clear visual indicators for active or selected navigation items.
- Refrain from customizing elements in ways that deviate from the brand identity.
- Include the company logo prominently; do not use a header without the corresponding logo.

## Accessibility

- Refrain from injecting non-navigation or unrelated content (like dynamic elements) into the header container to avoid distracting or confusing assistive technology.
- Provide a unique ID on the header container for skip links, ensuring keyboard users can quickly bypass navigation if desired.
- When placing a logo in the header, the alt text should describe its target (e.g., 'Start Page') rather than the image itself (e.g., 'SICK Logo'), and it should either match the visual label or at least start with the same words.

## Related Components

- syn-prio-nav
- syn-nav-item

## Related Templates

- AppShell
