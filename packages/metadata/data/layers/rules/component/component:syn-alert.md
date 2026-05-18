# syn-alert

## Summary

Alerts are used to display important messages inline or as toast notifications.

## Common Use Cases

- Inline notifications can provide contextual feedback to users. They are directly embedded within the content of a page or form.
- Toast notifications provide brief, unobtrusive messages to users through toast notifications that overlay the interface and do not necessarily need attention.

## Usage Guidelines

### When to choose inline notifications

- Integrated into the area where the user is already focused to avoid disrupting the user's workflow.
- Provide feedback on user actions, such as errors, warnings, or confirmations (e.g. "Unable to save changes. Check your internet connection and try again.", "You have unsaved changes. Are you sure you want to leave this page?" or "Payment completed. Thank you for your purchase!").
- Announce important updates or changes within the application (e.g. "New feature alert! You can now schedule posts directly from the dashboard.", "Maintenance scheduled for January 30th, 2:00 AM - 4:00 AM. The application will be unavailable during this time.").
- Highlight critical information or display system messages that require user attention(e.g. "System update required. Please restart your application to apply the latest updates." or "Your account has been temporarily suspended due to suspicious activity. Contact support for assistance.").
- May contain interactive elements such as links and buttons.

### When to choose toast notifications

- Take the user's attention temporarily away from their current task by appearing on the screen with animations to ensure they are noticed.
- Provide feedback on user actions, such as errors, warnings, or confirmations. (e.g., "Failed to load data", "Your message has been sent", "Your settings have been saved").
- Announce updates, reminders, or confirmations (e.g., "Your settings have been saved").
- May contain interactive elements such as links and buttons.
- They can serve as supplementary information for content available on other pages (e.g., a toast notification "Item has been added to the cart" alongside a shopping cart page).

### Content

- Keep alert messages concise and clear, focusing on the most critical information.
- Use simple language that users can quickly understand without additional context.
- Include action items or next steps when appropriate (e.g., "Your session ended. Please login again").
- Avoid redundant information — don't repeat the title in the body text.

### Variants & When to Use Them

- Primary variant: Use for general informational messages that don't require urgent attention.
- Success variant: Use to confirm that an action was completed successfully.
- Warning variant: Use when an action has unexpected consequences or requires user attention.
- Danger variant: Use for critical errors, destructive actions, or situations requiring immediate response.
- Neutral variant: Use for updates or system messages that are neither positive nor negative.

### Icons

- Use icons for consistency (info, check_circle, warning, status-error, settings).
- Ensure the icon clearly represents the alert type — don't use confusing or misleading icons.
- Icons are optional but highly recommended for accessibility and visual clarity.

### Dismissal & Duration

- Make alerts closable for non-critical information that users might want to dismiss.
- For critical errors or required information, consider hiding the close button.
- Use auto-hide duration for informational alerts, especially toast notifications (typically 3000-5000ms).
- Pause the auto-hide timer when the user hovers over the alert to allow time for reading.

### Placement & Presentation

- For inline alerts: Place alerts near the relevant content (above forms, near inputs with errors). You may also use `syn-validate` for inline validation messages where appropriate.
- For toast notifications: Use the `toast()` method to display temporary notifications in a stack.
- Place success/confirmation alerts above affected content so users see confirmation after action.
- Place error alerts prominently and ensure they don't disappear automatically.

### What to Avoid

- Never use alerts for decorative purposes or non-essential information.
- Avoid stacking more than 3-4 alerts simultaneously to prevent cognitive overload.
- Reserve alerts for messages that meaningfully impact the user's current task or workflow.

## Accessibility

- Don't use alerts for trivial updates that don't require user awareness.
- Ensure the alert content is concise and clear, focusing on the most critical information.
- Use simple language that users can quickly understand without additional context.
- Include action items or next steps when appropriate (e.g., "Your session ended. Please login again").
- Avoid redundant information — don't repeat the title in the body text.

## Related Components

- syn-validate
