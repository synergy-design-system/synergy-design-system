import { Form } from './Form';
import { ThemeSwitch } from './ThemeSwitch';

export const App = () => (
  <>
    <header>
      <h1>@synergy-design-system/react Form Demo</h1>
      <ThemeSwitch />
    </header>
    <main>
      <Form />
    </main>
  </>
);
