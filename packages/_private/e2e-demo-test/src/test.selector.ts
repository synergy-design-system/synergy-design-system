const AllComponentSelectors = {
  // Accordion
  accordionContent: '#tab-content-Accordion',
  accordionDetails: '#tab-content-Accordion syn-details',
  accordionLink: '#tab-Accordion',

  // Alert
  alertAll: '#tab-content-Alert syn-alert',
  alertContent: '#tab-content-Alert',
  alertLink: '#tab-Alert',

  // Combobox
  combobox797: '#tab-content-Combobox syn-combobox[data-testid="combobox-797"]',
  combobox813Form: '#tab-content-Combobox syn-combobox[data-testid="combobox-form-813"]',
  combobox813FormOptions: '#tab-content-Combobox syn-combobox[data-testid="combobox-form-813"] syn-option',
  combobox813Level: '#tab-content-Combobox syn-combobox[data-testid="combobox-level-813"]',
  comboboxContent: '#tab-content-Combobox',
  comboboxFormReset: '#tab-content-Combobox form syn-button',
  comboboxLink: '#tab-Combobox',

  // Select
  selectContent: '#tab-content-Select',
  selectForm: '#tab-content-Select syn-select[data-testid="select-form-813"]',
  selectFormOptions: '#tab-content-Select syn-select[data-testid="select-form-813"] syn-option',
  selectFormReset: '#tab-content-Select form syn-button',
  selectLevel: '#tab-content-Select syn-select[data-testid="select-level-813"]',
  selectLink: '#tab-Select',

  // Tabgroup
  tabGroupCustom: '#tab-content-TabGroup syn-tab:nth-of-type(2)',
  tabGroupGeneral: '#tab-content-TabGroup syn-tab:nth-of-type(1)',
  tabGroupLink: '#tab-TabGroup',
};

export default {
  ...AllComponentSelectors,
  addInfoLoc: '#additional-info',
  angular: 'syn-option[value=angular]',
  birth: '#input-date',
  donations: '#donations',
  emailLoc: '#input-email',
  formLoc: 'form',
  frontend: 'syn-option[value=frontend]',
  genderLoc: '#radiogroup-gender',
  happinessLoc: '#happiness',
  nameLoc: '#input-text',
  nationalityLoc: '#input-nationality',
  newsLocBeta: '#checkbox-newsletter-beta',
  newsLocSyn: '#checkbox-newsletter-default',
  newsLocSynNg: '#checkbox-newsletter-angular',
  newsLocSynReact: '#checkbox-newsletter-react',
  newsLocSynVue: '#checkbox-newsletter-vue',
  newsLocVanilla: '#checkbox-newsletter-vanilla',
  passLoc: '#input-password',
  passRecoveryLoc: '#input-number',
  phoneLoc: '#input-phone',
  reset: '.syn-submit-buttons > syn-button:nth-child(1)',
  roleLoc: '#select-role',
  sizeToggleLarge: '.meta-navigation syn-icon-button[data-size=large]',
  sizeToggleMedium: '.meta-navigation syn-icon-button[data-size=medium]',
  sizeToggleSmall: '.meta-navigation syn-icon-button[data-size=small]',
  submit: '.syn-submit-buttons > syn-button:nth-child(2)',
  themeSwitch: '.meta-navigation syn-switch',
  topicLoc: '#topics',
};
