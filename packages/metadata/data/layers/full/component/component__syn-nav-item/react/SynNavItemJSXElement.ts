export type SynNavItemJSXElement = SynCustomElement<
  SynNavItem,
  [
    ['syn-show', SynShowEvent],
    ['syn-hide', SynHideEvent],
    ['syn-blur', SynBlurEvent],
    ['syn-focus', SynFocusEvent],
  ]
>;