import { SynHeader } from '@synergy-design-system/react';
import { DemoForm } from './DemoForm';
import { ThemeSwitch } from './ThemeSwitch';

export const App = () => (
  <>
    <SynHeader>
      @synergy-design-system/react Form Demo
      {/* React does not support automatic slotting, so we have to create a slot element :( */}
      <div slot="meta-navigation" style={{ display: 'contents' }}>
        <ThemeSwitch />
      </div>
    </SynHeader>
    <main>
      <DemoForm />
    </main>
  </>
);
