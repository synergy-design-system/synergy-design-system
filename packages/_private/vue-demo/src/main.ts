// Load webfonts
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/400-italic.css';
import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/600-italic.css';
import '@fontsource/open-sans/700.css';
import '@fontsource/open-sans/700-italic.css';

import '@synergy-design-system/tokens/themes/dark.css';
import '@synergy-design-system/tokens/themes/light.css';
import '@synergy-design-system/components/index.css';
import '@synergy-design-system/styles';
import './app.css';

import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router'
import App from './App.vue';
import DemoForm from './DemoForm.vue';
import DemoFormValidate from './DemoFormValidate.vue';
import HomeView from './HomeView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/contact-form', component: DemoForm },
  { path: '/contact-form-validate', component: DemoFormValidate },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App)
  .use(router)
  .mount('#root');
