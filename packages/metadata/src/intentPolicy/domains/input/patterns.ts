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
