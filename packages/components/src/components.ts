/* eslint-disable */
// Import all components and register them

/* PACKAGES:START */
const modules = import.meta.glob('./components/**/!(*.stories|*.spec|*.test|*.style|*.component).ts');

Object.keys(modules).forEach(module => {
  modules[module]();
});
/* PACKAGES:END */
