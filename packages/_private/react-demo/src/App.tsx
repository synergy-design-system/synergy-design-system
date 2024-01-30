import {
  SynButton,
  SynCheckbox,
  SynIcon,
  SynInput,
  SynOptgroup,
  SynOption,
  SynRadio,
  SynRadioGroup,
  SynSelect,
  SynSwitch,
  SynTag,
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

      <br />

      <SynRadioGroup
        name="radio"
        label="Radio Group"
        required
      >
        <SynRadio value="1">
          Option One
        </SynRadio>
        <SynRadio value="2">
          Option Two
        </SynRadio>
      </SynRadioGroup>

      <br />

      <SynSwitch
        name="switch"
        required
      >
        Switch
      </SynSwitch>

      <br />
      <br />

      <SynTag removable>
        <SynIcon name="wallpaper" />
        Option
      </SynTag>

      <SynSelect
        label="Select"
        name="select"
        required
      >
        <SynOptgroup>
          <SynOption value="1">Option 1</SynOption>
          <SynOption value="2">Option 2</SynOption>
          <SynOption value="3">Option 3</SynOption>
        </SynOptgroup>
        <SynOptgroup>
          <SynOption value="4">Option 4</SynOption>
          <SynOption value="5">Option 5</SynOption>
          <SynOption value="6">Option 6</SynOption>
        </SynOptgroup>
      </SynSelect>

      <SynButton
        type="submit"
        variant="filled"
      >
        <SynIcon name="send" slot="prefix" />
        Submit
      </SynButton>
    </form>
  </main>
);
