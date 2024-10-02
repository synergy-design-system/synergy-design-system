import { removeSections } from '../remove-section.js';
import { addSectionsBefore } from '../replace-section.js';

const FILES_TO_TRANSFORM = [
  'radio-group.component.ts',
  'radio-group.test.ts',
];

const transformTests = (path, content) => {
  const final = addSectionsBefore([
    [
      'describe(\'when the value changes\', () => {',
      `describe('when handling focus', () => {
  const doAction = async (instance: SynRadioGroup, type: string) => {
    if (type === 'focus') {
      instance.focus();
      await instance.updateComplete;
      return;
    }

    const label = instance.shadowRoot!.querySelector<HTMLLabelElement>('#label')!;
    label.click();
    await instance.updateComplete;
  };

  // Tests for focus and label actions with radio buttons
  ['focus', 'label'].forEach(actionType => {
    describe(\`when using \${actionType}\`, () => {
      it('should do nothing if all elements are disabled', async () => {
        const el = await fixture<SynRadioGroup>(html\`
          <syn-radio-group>
            <syn-radio id="radio-0" value="0" disabled></syn-radio>
            <syn-radio id="radio-1" value="1" disabled></syn-radio>
            <syn-radio id="radio-2" value="2" disabled></syn-radio>
            <syn-radio id="radio-3" value="3" disabled></syn-radio>
          </syn-radio-group>
        \`);

        const validFocusHandler = sinon.spy();

        Array.from(el.querySelectorAll<SynRadio>('syn-radio')).forEach(radio =>
          radio.addEventListener('syn-focus', validFocusHandler)
        );

        expect(validFocusHandler).to.not.have.been.called;
        await doAction(el, actionType);
        expect(validFocusHandler).to.not.have.been.called;
      });

      it('should focus the first radio that is enabled when the group receives focus', async () => {
        const el = await fixture<SynRadioGroup>(html\`
          <syn-radio-group>
            <syn-radio id="radio-0" value="0" disabled></syn-radio>
            <syn-radio id="radio-1" value="1"></syn-radio>
            <syn-radio id="radio-2" value="2"></syn-radio>
            <syn-radio id="radio-3" value="3"></syn-radio>
          </syn-radio-group>
        \`);

        const invalidFocusHandler = sinon.spy();
        const validFocusHandler = sinon.spy();

        const disabledRadio = el.querySelector('#radio-0')!;
        const validRadio = el.querySelector('#radio-1')!;

        disabledRadio.addEventListener('syn-focus', invalidFocusHandler);
        validRadio.addEventListener('syn-focus', validFocusHandler);

        expect(invalidFocusHandler).to.not.have.been.called;
        expect(validFocusHandler).to.not.have.been.called;

        await doAction(el, actionType);

        expect(invalidFocusHandler).to.not.have.been.called;
        expect(validFocusHandler).to.have.been.called;
      });

      it('should focus the currently enabled radio when the group receives focus', async () => {
        const el = await fixture<SynRadioGroup>(html\`
          <syn-radio-group value="2">
            <syn-radio id="radio-0" value="0" disabled></syn-radio>
            <syn-radio id="radio-1" value="1"></syn-radio>
            <syn-radio id="radio-2" value="2" checked></syn-radio>
            <syn-radio id="radio-3" value="3"></syn-radio>
          </syn-radio-group>
        \`);

        const invalidFocusHandler = sinon.spy();
        const validFocusHandler = sinon.spy();

        const disabledRadio = el.querySelector('#radio-0')!;
        const validRadio = el.querySelector('#radio-2')!;

        disabledRadio.addEventListener('syn-focus', invalidFocusHandler);
        validRadio.addEventListener('syn-focus', validFocusHandler);

        expect(invalidFocusHandler).to.not.have.been.called;
        expect(validFocusHandler).to.not.have.been.called;

        await doAction(el, actionType);

        expect(invalidFocusHandler).to.not.have.been.called;
        expect(validFocusHandler).to.have.been.called;
      });
    });
  });
});      
`,
    ],
  ], content);

  return {
    content: final,
    path,
  };
};

const transformComponent = (path, content) => {
  const withLabelRemoved = removeSections([
    ['private handleLabelClick() {', '    }\n  }'],
  ], content);

  const final = addSectionsBefore([
    [
      'private handleInvalid(event: Event) {',
      `private handleLabelClick() {
    this.focus();
  }
      `,
    ],
    [
      'render() {',
      `/** Sets focus on the radio-group. */
  public focus(options?: FocusOptions) {
    const radios = this.getAllRadios();
    const checked = radios.find(radio => radio.checked);
    const firstEnabledRadio = radios.find(radio => !radio.disabled);
    const radioToFocus = checked || firstEnabledRadio;

    // Call focus for the checked radio
    // If no radio is checked, focus the first one that is not disabled
    if (radioToFocus) {
      radioToFocus.focus(options);
    }
  }
      `,
    ],
  ], withLabelRemoved);

  return {
    content: final,
    path,
  };
};

export const vendorRadioGroup = (path, content) => {
  const output = { content, path };

  // Skip for non radio-group
  const isValidFile = !!FILES_TO_TRANSFORM.find(p => path.includes(p));

  if (!isValidFile) {
    return output;
  }

  if (path.endsWith('radio-group.component.ts')) {
    return transformComponent(path, content);
  }

  if (path.endsWith('radio-group.test.ts')) {
    return transformTests(path, content);
  }

  return output;
};
