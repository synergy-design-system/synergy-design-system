export type SynTooltipJSXElement = SynCustomElement<
  SynTooltip,
  [
    ['syn-show', SynShowEvent],
    ['syn-after-show', SynAfterShowEvent],
    ['syn-hide', SynHideEvent],
    ['syn-after-hide', SynAfterHideEvent],
  ]
>;