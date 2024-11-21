import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { DemoForm } from './DemoForm';
import { DemoFormValidate } from './DemoFormValidate';
import { Home } from './Home';

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="contact-form" element={<DemoForm />} />
        <Route path="contact-form-validate" element={<DemoFormValidate />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
