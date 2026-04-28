// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Ensure that focus moves in sequential order between input fields and other form elements. When an input field is focused, it should be clearly indicated.',
    'Avoid disabled input fields. If needed, ensure that they remain in the regular tab order but cannot be activated, allowing screen readers to announce their state and purpose. Use the native disabled attribute or appropriate ARIA attributes (e.g., aria-disabled="true").',
    'Ensure input fields are usable on all screen sizes. On smaller screens, consider using larger touch targets for input fields.',
    'Placeholder text should offer a hint of what the user should write and must always go together with a label.',
    'Prefer keeping the input enabled by default by relying on default values or by validating on submit.',
    'Use the "visually disabled" attribute to keep disabled elements focusable, hoverable, and able to show tooltips, as they\'re otherwise removed from the tab order and inaccessible to screen readers.',
    'Use "autocomplete" attribute to enable automated browser assistance when filling out forms.',
  ],
  component: 'syn-input',
  related: {
    templates: [
      'Forms',
    ],
  },
  usageGuidelines: {
    input_types: [
      'Use appropriate field types for the given purpose (e.g., "email", "password", "number"). For custom autocomplete functionalities (e.g., search fields) use syn-combobox.',
      'Use for brief text input only. For longer inputs, such as comments or user feedback, use syn-textarea instead.',
    ],
    labels_and_placeholders: [
      'Use descriptive and concise labels.',
      'Avoid using placeholder text as a substitute for labels.',
    ],
    user_guidance: [
      'Provide instructions within helper text for completing the field, such as password or character count (e.g., "maxlength" and "minlength"...).',
      'Offer additional guidance with tooltips or help text to guide users on the expected input format and prevent unclear or ambiguous interpretation.',
    ],
    validation_and_formatting: [
      'Use dynamic formatting to automatically format user input as they type.',
      'Validate user entries in real-time to provide immediate feedback whenever possible.',
      'Avoid using fields for actions that require immediate feedback; use buttons instead.',
    ],
    variant_consistency: [
      'Do not mix the two variants (default / floating label) within the same product, flow or form. Read the use cases above to know when to use each type.',
    ],
  },
  useCases: [
    'Collect user data in forms, including names, emails, dates, and passwords.',
    'Allow users to enter numerical values like quantities or prices.',
    'Long or descriptive labels, helper text, or units are needed.',
    'Forms with many fields that users must scan quickly.',
    'Complex fields with adornments, counters, or tooltips.',
    'Compact layouts and simple fields.',
    'Short labels (1-3 words); minimal helper text.',
    'You want a clean look without duplicate placeholder text.',
  ],
};
