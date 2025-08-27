// Load fonts
import '@synergy-design-system/demo-utilities/styles/font.css';

import { enableExperimentalSettingEmitEvents } from '@synergy-design-system/components';
import '@synergy-design-system/tokens/themes/sick2025_dark.css';
import '@synergy-design-system/tokens/themes/sick2025_light.css';
import '@synergy-design-system/tokens/themes/sick2018_dark.css';
import '@synergy-design-system/tokens/themes/sick2018_light.css';
import '@synergy-design-system/components/index.css';
import '@synergy-design-system/styles';
import './app.css';

import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router'
import App from './App.vue';
import DemoForm from './DemoForm.vue';
import DemoFormValidate from './DemoFormValidate.vue';
import HomeView from './HomeView.vue';
import DemosTemplate from './DemosTemplate.vue';
import * as AllComponents from './AllComponentParts/index.js';
import * as FrameworkSpecifics from './FrameworkSpecificParts/index.js';

const allComponentsDemo = Object
  .entries(AllComponents)
  .map(([name, Component]) => [name.replace('Demo', ''), Component]);

const frameworkSpecificDemo = Object
  .entries(FrameworkSpecifics)
  .map(([name, Component]) => [name.replace('Demo', ''), Component]);

const routes = [
  { path: '/', component: HomeView },
  { path: '/all-components', component: DemosTemplate, props: { demos: allComponentsDemo } },
  { path: '/contact-form', component: DemoForm },
  { path: '/contact-form-validate', component: DemoFormValidate },
  { path: '/framework-specific', component: DemosTemplate, props: { demos: frameworkSpecificDemo } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

enableExperimentalSettingEmitEvents();

createApp(App)
  .use(router)
  .mount('#root');
