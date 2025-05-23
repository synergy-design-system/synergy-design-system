import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { DemoForm } from './DemoForm';
import { DemoFormValidate } from './DemoFormValidate';
import { Home } from './Home';
import { DemosTemplate } from './DemosTemplate';
import * as AllComponents from './AllComponentParts';
import * as FrameworkSpecifics from './FrameworkSpecificParts';

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
