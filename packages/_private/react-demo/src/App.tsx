import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './Layout.js';
import { DemoForm } from './DemoForm.js';
import { DemoFormValidate } from './DemoFormValidate.js';
import { Home } from './Home.js';
import { DemosTemplate } from './DemosTemplate.js';
import * as AllComponents from './AllComponentParts/index.js';
import * as FrameworkSpecifics from './FrameworkSpecificParts/index.js';

const allComponentsDemo = Object.entries(AllComponents);
const frameworkSpecificDemo = Object.entries(FrameworkSpecifics);

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="contact-form" element={<DemoForm />} />
        <Route path="contact-form-validate" element={<DemoFormValidate />} />
        <Route path="all-components" element={<DemosTemplate demos={allComponentsDemo} />} />
        <Route path="framework-specific" element={<DemosTemplate demos={frameworkSpecificDemo} />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
