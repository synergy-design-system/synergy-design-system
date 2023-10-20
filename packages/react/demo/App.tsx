import { SynButton, SynInput } from '../dist';

export const App = () => (
  <main>
    hello world
    <form
      onSubmit={e => {
        e.preventDefault();
        const fd = new FormData(e.target as HTMLFormElement);
        // eslint-disable-next-line no-console
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
        Submit
      </SynButton>
    </form>
  </main>
);
