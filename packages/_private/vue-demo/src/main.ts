// Load webfonts
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/400-italic.css';
import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/600-italic.css';
import '@fontsource/open-sans/700.css';
import '@fontsource/open-sans/700-italic.css';

import { enableExperimentalSettingEmitEvents } from '@synergy-design-system/components';
import '@synergy-design-system/tokens/themes/brand25-dark.css';
import '@synergy-design-system/tokens/themes/brand25-light.css';
import '@synergy-design-system/tokens/default-dark.css';
import '@synergy-design-system/tokens/default.css';
import '@synergy-design-system/components/index.css';
import '@synergy-design-system/styles';
import './app.css';

import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router'
import AllComponents from './AllComponents.vue';
import App from './App.vue';
import DemoForm from './DemoForm.vue';
import DemoFormValidate from './DemoFormValidate.vue';
import HomeView from './HomeView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/all-components', component: AllComponents },
  { path: '/contact-form', component: DemoForm },
  { path: '/contact-form-validate', component: DemoFormValidate },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

enableExperimentalSettingEmitEvents();

createApp(App)
  .use(router)
  .mount('#root');
