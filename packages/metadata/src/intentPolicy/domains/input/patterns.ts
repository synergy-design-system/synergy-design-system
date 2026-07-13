import type { IntentUsagePattern } from '../../types.js';

export const inputPatterns: IntentUsagePattern[] = [
  {
    description: 'Single-line input for compact textual values.',
    intent: 'input.text.short',
    preset: {
      props: {
        type: 'text',
      },
    },
    target: { id: 'component:syn-input', kind: 'component', name: 'syn-input' },
  },
  {
    description: 'Single-line email entry field with email-specific input behavior.',
    intent: 'input.text.email',
    preset: {
      props: {
        type: 'email',
      },
    },
    target: { id: 'component:syn-input', kind: 'component', name: 'syn-input' },
  },
  {
    description: 'Single-line telephone entry field with phone-oriented input behavior.',
    intent: 'input.text.telephone',
    preset: {
      props: {
        type: 'tel',
      },
    },
    target: { id: 'component:syn-input', kind: 'component', name: 'syn-input' },
  },
  {
    description: 'Single-line URL entry field with web-address-oriented input behavior.',
    intent: 'input.text.url',
    preset: {
      props: {
        type: 'url',
      },
    },
    target: { id: 'component:syn-input', kind: 'component', name: 'syn-input' },
  },
  {
    description: 'Single-line search field for querying or filtering content.',
    intent: 'input.text.search',
    preset: {
      props: {
        type: 'search',
      },
    },
    target: { id: 'component:syn-input', kind: 'component', name: 'syn-input' },
  },
  {
    description: 'Single-line masked text field for passwords and other sensitive text values.',
    intent: 'input.text.secret',
    preset: {
      props: {
        type: 'password',
      },
    },
    target: { id: 'component:syn-input', kind: 'component', name: 'syn-input' },
  },
  {
    description: 'Single-line input field for direct numeric entry.',
    intent: 'input.number.field',
    preset: {
      props: {
        type: 'number',
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
    priority: 80,
    target: { id: 'component:syn-select', kind: 'component', name: 'syn-select' },
    targetRole: 'standalone',
  },
  {
    description: 'Multiple selection from a predefined options list.',
    intent: 'input.selection.multiple',
    preset: {
      props: {
        multiple: true,
      },
    },
    priority: 90,
    target: { id: 'component:syn-select', kind: 'component', name: 'syn-select' },
    targetRole: 'standalone',
  },
  {
    description: 'Searchable selection with real-time filtering for larger option sets.',
    intent: 'input.selection.searchable',
    target: { id: 'component:syn-combobox', kind: 'component', name: 'syn-combobox' },
  },
  {
    description: 'Searchable multi-selection with real-time filtering for larger option sets.',
    intent: 'input.selection.searchable.multiple',
    preset: {
      props: {
        multiple: true,
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
    description: 'Group related checkbox or switch controls in one form-scoped section with shared labeling and optional help text.',
    intent: 'input.grouping.checkbox',
    notes: [
      'Use when related checkbox or switch options need shared context in forms.',
      'Prefer syn-switch for binary options that apply immediately; use syn-checkbox for deferred selection.',
      'Provide group labeling through the label property or label slot.',
      'Keep option-level guidance in child checkbox or switch labels; use group help text for additional context.',
    ],
    priority: 60,
    structure: {
      component: 'syn-checkbox-group',
      config: {
        contentRules: [{
          code: 'CHECKBOX_GROUP_LABEL_REQUIRED',
          kind: 'requiredAnyContentSource',
          message: 'Grouped checkbox/switch controls should provide a label, either through the label property or the label slot.',
          rationale: 'A group label gives related checkboxes or switches a shared accessible context and improves scanability.',
          severity: 'warning',
          sources: [
            { kind: 'prop', prop: 'label' },
            { kind: 'slot', slot: 'label' },
          ],
          suggestedFix: 'Provide a non-empty label property or add content to the label slot.',
        }],
      },
    },
    target: { id: 'component:syn-checkbox-group', kind: 'component', name: 'syn-checkbox-group' },
    targetRole: 'container',
  },
  {
    description: 'Multi-select option set represented as grouped checkboxes or switches in a single form control context.',
    intent: 'input.selection.multiple',
    notes: [
      'Use when users may select none, one, or multiple options.',
      'Prefer syn-switch for binary options that apply immediately; use syn-checkbox for deferred selection.',
      'Selection state belongs to child syn-checkbox or syn-switch controls; syn-checkbox-group provides structure and shared guidance.',
      'Prefer vertical layout for longer labels and better readability.',
    ],
    priority: 70,
    structure: {
      component: 'syn-checkbox-group',
      config: {
        contentRules: [{
          code: 'CHECKBOX_GROUP_LABEL_REQUIRED',
          kind: 'requiredAnyContentSource',
          message: 'Grouped checkbox/switch controls should provide a label, either through the label property or the label slot.',
          rationale: 'A group label gives related checkboxes or switches a shared accessible context and improves scanability.',
          severity: 'warning',
          sources: [
            { kind: 'prop', prop: 'label' },
            { kind: 'slot', slot: 'label' },
          ],
          suggestedFix: 'Provide a non-empty label property or add content to the label slot.',
        }],
      },
    },
    target: { id: 'component:syn-checkbox-group', kind: 'component', name: 'syn-checkbox-group' },
    targetRole: 'container',
  },
  {
    description: 'Single required choice among related options.',
    intent: 'input.selection.single',
    notes: ['Provide one default selected option as recommended in component usage rules.'],
    priority: 100,
    target: { id: 'component:syn-radio-group', kind: 'component', name: 'syn-radio-group' },
    targetRole: 'standalone',
  },
  {
    description: 'Single selectable option used within a radio-button group.',
    intent: 'input.selection.single',
    notes: [
      'Use inside syn-radio-group to provide one explicit selection among related options.',
      'Provide a default selected value at group level, as recommended in component usage rules.',
    ],
    priority: 20,
    target: { id: 'component:syn-radio-button', kind: 'component', name: 'syn-radio-button' },
    targetRole: 'item',
  },
  {
    description: 'Single selectable radio option used within a radio-group.',
    intent: 'input.selection.single',
    notes: [
      'Use inside syn-radio-group to provide one explicit selection among related options.',
      'Provide a default selected value at group level, as recommended in component usage rules.',
    ],
    priority: 15,
    target: { id: 'component:syn-radio', kind: 'component', name: 'syn-radio' },
    targetRole: 'item',
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
    description: 'Bounded single-value numeric selection through a slider control for fast, approximate adjustment.',
    intent: 'input.number.range',
    target: { id: 'component:syn-range', kind: 'component', name: 'syn-range' },
  },
  {
    description: 'Bounded numeric interval selection through a multi-knob slider control for fast, approximate bound adjustment.',
    intent: 'input.number.range.interval',
    notes: [
      'Use when users need to select both lower and upper bounds in one control.',
      'Prefer this over single-value sliders when filtering or constraining results by a value range.',
    ],
    target: { id: 'component:syn-range', kind: 'component', name: 'syn-range' },
  },
  {
    description: 'Date input field for selecting or entering a calendar date.',
    intent: 'input.date.day',
    preset: {
      props: {
        type: 'date',
      },
    },
    target: { id: 'component:syn-input', kind: 'component', name: 'syn-input' },
  },
  {
    description: 'Time input field for selecting or entering a time value.',
    intent: 'input.date.time',
    preset: {
      props: {
        type: 'time',
      },
    },
    target: { id: 'component:syn-input', kind: 'component', name: 'syn-input' },
  },
  {
    description: 'Combined date-time input field for selecting or entering local date and time values.',
    intent: 'input.date.datetime-local',
    preset: {
      props: {
        type: 'datetime-local',
      },
    },
    target: { id: 'component:syn-input', kind: 'component', name: 'syn-input' },
  },
  {
    description: 'Grouped select options organized through optgroup labels.',
    intent: 'input.selection.grouped-options',
    notes: ['Use syn-optgroup to cluster related syn-option entries under clear labels.'],
    priority: 90,
    target: { id: 'component:syn-select', kind: 'component', name: 'syn-select' },
    targetRole: 'container',
  },
  {
    description: 'Grouped option container used to label and organize related select options.',
    intent: 'input.selection.grouped-options',
    notes: ['Use syn-optgroup inside syn-select to group related option entries under a shared label.'],
    priority: 80,
    target: { id: 'component:syn-optgroup', kind: 'component', name: 'syn-optgroup' },
    targetRole: 'container',
  },
  {
    description: 'Selectable option item used within select or optgroup structures for single-choice selection.',
    intent: 'input.selection.single',
    priority: 10,
    target: { id: 'component:syn-option', kind: 'component', name: 'syn-option' },
    targetRole: 'item',
  },
  {
    description: 'Selectable option item used within select or optgroup structures for multiple-choice selection.',
    intent: 'input.selection.multiple',
    priority: 10,
    target: { id: 'component:syn-option', kind: 'component', name: 'syn-option' },
    targetRole: 'item',
  },
  {
    description: 'Group related form controls in a semantic section using legend and optional supporting description.',
    intent: 'input.grouping.fieldset',
    notes: [
      'Provide a concise legend that describes the shared purpose of the grouped controls.',
      'Keep critical guidance in control labels and help text; use fieldset description for contextual support.',
    ],
    priority: 100,
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
    targetRole: 'container',
  },
];
