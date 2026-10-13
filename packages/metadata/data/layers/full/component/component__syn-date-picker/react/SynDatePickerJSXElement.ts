export type SynDatePickerJSXElement = SynCustomElement<
  SynDatePicker,
  [
    ['syn-before-change', SynBeforeChangeEvent],
    ['syn-clear', SynClearEvent],
    ['syn-input', SynInputEvent],
    ['syn-change', SynChangeEvent],
    ['syn-focus', SynFocusEvent],
    ['syn-blur', SynBlurEvent],
    ['syn-invalid', SynInvalidEvent],
    ['syn-show', SynShowEvent],
    ['syn-after-show', SynAfterShowEvent],
    ['syn-hide', SynHideEvent],
    ['syn-after-hide', SynAfterHideEvent],
  ]
>;