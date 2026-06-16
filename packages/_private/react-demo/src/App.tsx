import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './Layout.js';
import { DemoForm } from './DemoForm.js';
import { DemoFormValidate } from './DemoFormValidate.js';
import { Home } from './Home.js';
import { DemosTemplate } from './DemosTemplate.js';
import * as AllComponents from './AllComponentParts/index.js';
import * as FrameworkSpecifics from './FrameworkSpecificParts/index.js';
import * as ComplexBugs from './ComplexBugs/index.js';

const allComponentsDemo = Object.entries(AllComponents);
const frameworkSpecificDemo = Object.entries(FrameworkSpecifics);
const complexBugsDemo = Object.entries(ComplexBugs);

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="contact-form" element={<DemoForm />} />
        <Route path="contact-form-validate" element={<DemoFormValidate />} />
        <Route path="all-components" element={<DemosTemplate demos={allComponentsDemo} />} />
        <Route path="complex-bugs" element={<DemosTemplate demos={complexBugsDemo} />} />
        <Route path="framework-specific" element={<DemosTemplate demos={frameworkSpecificDemo} />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
