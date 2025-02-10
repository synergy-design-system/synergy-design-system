const AllComponentSelectors = {
  // Accordion
  accordionContent: '#tab-content-Accordion',
  accordionDetails: '#tab-content-Accordion syn-details',
  accordionLink: '#tab-Accordion',

  // Alert
  alertAll: '#tab-content-Alert syn-alert',
  alertContent: '#tab-content-Alert',
  alertLink: '#tab-Alert',

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
  submit: '.syn-submit-buttons > syn-button:nth-child(2)',
  topicLoc: '#topics',
};
