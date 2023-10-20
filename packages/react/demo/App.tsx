import * as React from 'react';
import { SynButton, SynInput } from '../src';

export const App = () => (
  <main>
    hello world
    <form
      onSubmit={e => {
        e.preventDefault();
        const fd = new FormData(e.target as HTMLFormElement);
        console.log(...fd);
      }}
    >
      <SynInput
        value="test"
        name="checkme"
      >
        <div slot="label">
          Here is the label
        </div>
      </SynInput>
      <SynInput
        label="here"
        value="other"
        name="checkme2"
      />
      <SynButton
        type="submit"
        variant="primary"
      >
        Hello World
      </SynButton>
    </form>
  </main>
);
