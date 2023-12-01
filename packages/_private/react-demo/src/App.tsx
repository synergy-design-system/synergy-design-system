import {
  SynButton,
  SynCheckbox,
  SynInput,
  SynRadio,
  SynRadioGroup,
} from '@synergy-design-system/react';

export const App = () => (
  <main>
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

      <div>
        <SynCheckbox name="agree" required>
          Agree to ToS
        </SynCheckbox>
      </div>

      <SynRadioGroup
        name="radio"
        required
      >
        <SynRadio value="1">
          Option One
        </SynRadio>
        <SynRadio value="2">
          Option Two
        </SynRadio>
      </SynRadioGroup>

      <SynButton
        type="submit"
        variant="filled"
      >
        Submit
      </SynButton>
    </form>
  </main>
);
