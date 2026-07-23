export type SynComboboxJSXElement = SynCustomElement<
  SynCombobox,
  [
    ['syn-change', SynChangeEvent],
    ['syn-clear', SynClearEvent],
    ['syn-input', SynInputEvent],
    ['syn-focus', SynFocusEvent],
    ['syn-blur', SynBlurEvent],
    ['syn-show', SynShowEvent],
    ['syn-after-show', SynAfterShowEvent],
    ['syn-hide', SynHideEvent],
    ['syn-after-hide', SynAfterHideEvent],
    ['syn-invalid', SynInvalidEvent],
    ['syn-error', SynErrorEvent],
  ]
>;