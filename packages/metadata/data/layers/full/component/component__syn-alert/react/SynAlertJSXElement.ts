export type SynAlertJSXElement = SynCustomElement<
  SynAlert,
  [
    ['syn-show', SynShowEvent],
    ['syn-after-show', SynAfterShowEvent],
    ['syn-hide', SynHideEvent],
    ['syn-after-hide', SynAfterHideEvent],
  ]
>;