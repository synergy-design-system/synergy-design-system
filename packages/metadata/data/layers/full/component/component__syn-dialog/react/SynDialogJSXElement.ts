export type SynDialogJSXElement = SynCustomElement<
  SynDialog,
  [
    ['syn-show', SynShowEvent],
    ['syn-after-show', SynAfterShowEvent],
    ['syn-hide', SynHideEvent],
    ['syn-after-hide', SynAfterHideEvent],
    ['syn-initial-focus', SynInitialFocusEvent],
    ['syn-request-close', SynRequestCloseEvent],
  ]
>;