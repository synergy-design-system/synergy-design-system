import type { IntentUsagePattern } from '../../types.js';

export const inputPatterns: IntentUsagePattern[] = [
  {
    description: 'Single-line input for compact text or numeric values.',
    intent: 'input.text.short',
    preset: {
      props: {
        type: 'text',
      },
    },
    target: { id: 'component:syn-input', kind: 'component', name: 'syn-input' },
  },
  {
    description: 'Multiline text entry for detailed user-provided information.',
    intent: 'input.text.long',
    preset: {
      props: {
        resize: 'vertical',
      },
    },
    target: { id: 'component:syn-textarea', kind: 'component', name: 'syn-textarea' },
  },
  {
    description: 'Single selection from a predefined options list.',
    intent: 'input.selection.single',
    preset: {
      props: {
        multiple: false,
      },
    },
    target: { id: 'component:syn-select', kind: 'component', name: 'syn-select' },
  },
  {
    description: 'Multiple selection from a predefined options list.',
    intent: 'input.selection.multiple',
    preset: {
      props: {
        multiple: true,
      },
    },
    target: { id: 'component:syn-select', kind: 'component', name: 'syn-select' },
  },
  {
    description: 'Searchable selection with real-time filtering for larger option sets.',
    intent: 'input.selection.searchable',
    preset: {
      props: {
        autocomplete: 'list',
      },
    },
    target: { id: 'component:syn-combobox', kind: 'component', name: 'syn-combobox' },
  },
  {
    description: 'Binary toggle that applies changes immediately.',
    intent: 'input.binary.immediate',
    preset: {
      props: {
        checked: false,
      },
    },
    target: { id: 'component:syn-switch', kind: 'component', name: 'syn-switch' },
  },
  {
    description: 'Binary selection captured as part of a later form submit.',
    intent: 'input.binary.deferred',
    preset: {
      props: {
        checked: false,
      },
    },
    target: { id: 'component:syn-checkbox', kind: 'component', name: 'syn-checkbox' },
  },
  {
    description: 'Single required choice among related options.',
    intent: 'input.selection.single',
    notes: ['Provide one default selected option as recommended in component usage rules.'],
    target: { id: 'component:syn-radio-group', kind: 'component', name: 'syn-radio-group' },
  },
  {
    description: 'File attachment or upload control with optional multi-file mode.',
    intent: 'input.file.upload',
    preset: {
      props: {
        multiple: false,
      },
    },
    target: { id: 'component:syn-file', kind: 'component', name: 'syn-file' },
  },
  {
    description: 'Bounded numeric selection through a slider control.',
    intent: 'input.range.slider',
    target: { id: 'component:syn-range', kind: 'component', name: 'syn-range' },
  },
  {
    description: 'Grouped select options organized through optgroup labels.',
    intent: 'input.selection.grouped-options',
    notes: ['Use syn-optgroup to cluster related syn-option entries under clear labels.'],
    target: { id: 'component:syn-select', kind: 'component', name: 'syn-select' },
  },
  {
    description: 'Group related form controls in a semantic section using legend and optional supporting description.',
    intent: 'input.grouping.fieldset',
    notes: [
      'Provide a concise legend that describes the shared purpose of the grouped controls.',
      'Keep critical guidance in control labels and help text; use fieldset description for contextual support.',
    ],
    structure: {
      component: 'syn-fieldset',
      config: {
        contentRules: [{
          code: 'FIELDSET_LEGEND_REQUIRED',
          kind: 'requiredAnyContentSource',
          message: 'Fieldsets should provide a legend, either through the legend property or the legend slot.',
          rationale: 'A legend gives grouped form controls an accessible shared label and improves scanability.',
          severity: 'warning',
          sources: [
            { kind: 'prop', prop: 'legend' },
            { kind: 'slot', slot: 'legend' },
          ],
          suggestedFix: 'Provide a non-empty legend property or add content to the legend slot.',
        }],
      },
    },
    target: { id: 'component:syn-fieldset', kind: 'component', name: 'syn-fieldset' },
  },
];
