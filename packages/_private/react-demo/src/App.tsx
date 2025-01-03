import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { DemoForm } from './DemoForm';
import { DemoFormValidate } from './DemoFormValidate';
import { Home } from './Home';
import { setGlobalSize } from './shared';

export const App = () => {
  // Use this to set the global size to medium
  // for the whole application
  useEffect(() => {
    setGlobalSize('large');
  }, []);
  return (
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
};
