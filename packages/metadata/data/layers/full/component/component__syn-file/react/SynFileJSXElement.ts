export type SynFileJSXElement = SynCustomElement<
  SynFile,
  [
    ['syn-blur', SynBlurEvent],
    ['syn-change', SynChangeEvent],
    ['syn-error', SynErrorEvent],
    ['syn-focus', SynFocusEvent],
    ['syn-input', SynInputEvent],
  ]
>;