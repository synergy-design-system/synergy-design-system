import '../../../dist/synergy.js';
import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import type SynCheckbox from '../checkbox/checkbox.js';
import type SynSwitch from '../switch/switch.js';
import type SynCheckboxGroup from './checkbox-group.js';

describe('<syn-checkbox-group>', () => {
  describe('defaults and rendering', () => {
    it('should pass accessibility tests', async () => {
      const checkboxGroup = await fixture<SynCheckboxGroup>(html`
        <syn-checkbox-group label="Select options">
          <syn-checkbox>Option 1</syn-checkbox>
          <syn-checkbox>Option 2</syn-checkbox>
        </syn-checkbox-group>
      `);

      await expect(checkboxGroup).to.be.accessible();
    });

    it('should have expected default properties', async () => {
      const checkboxGroup = await fixture<SynCheckboxGroup>(html`
        <syn-checkbox-group>
          <syn-checkbox>Option 1</syn-checkbox>
        </syn-checkbox-group>
      `);

      expect(checkboxGroup.label).to.equal('');
      expect(checkboxGroup.helpText).to.equal('');
      expect(checkboxGroup.layout).to.equal('vertical');
      expect(checkboxGroup.size).to.equal('medium');
      expect(checkboxGroup.form).to.equal('');
    });

    it('should render label and help text from attributes', async () => {
      const checkboxGroup = await fixture<SynCheckboxGroup>(html`
        <syn-checkbox-group label="My label" help-text="My help text">
          <syn-checkbox>Option 1</syn-checkbox>
        </syn-checkbox-group>
      `);
      const label = checkboxGroup.shadowRoot!.querySelector<HTMLLabelElement>('#label')!;
      const helpText = checkboxGroup.shadowRoot!.querySelector<HTMLDivElement>('#help-text')!;

      expect(label.textContent?.trim()).to.equal('My label');
      expect(helpText.textContent?.trim()).to.equal('My help text');
    });
  });

  describe('layout behavior', () => {
    it('should not apply horizontal class by default', async () => {
      const checkboxGroup = await fixture<SynCheckboxGroup>(html`
        <syn-checkbox-group>
          <syn-checkbox>Option 1</syn-checkbox>
          <syn-checkbox>Option 2</syn-checkbox>
        </syn-checkbox-group>
      `);
      const fieldset = checkboxGroup.shadowRoot!.querySelector('fieldset.form-control')!;

      expect(fieldset.classList.contains('form-control--is-horizontal')).to.equal(false);
    });

    it('should apply horizontal class when layout is horizontal', async () => {
      const checkboxGroup = await fixture<SynCheckboxGroup>(html`
        <syn-checkbox-group layout="horizontal">
          <syn-checkbox>Option 1</syn-checkbox>
          <syn-checkbox>Option 2</syn-checkbox>
        </syn-checkbox-group>
      `);
      const fieldset = checkboxGroup.shadowRoot!.querySelector('fieldset.form-control')!;

      expect(fieldset.classList.contains('form-control--is-horizontal')).to.equal(true);
    });

    it('should toggle horizontal class when layout changes at runtime', async () => {
      const checkboxGroup = await fixture<SynCheckboxGroup>(html`
        <syn-checkbox-group>
          <syn-checkbox>Option 1</syn-checkbox>
          <syn-checkbox>Option 2</syn-checkbox>
        </syn-checkbox-group>
      `);
      const fieldset = checkboxGroup.shadowRoot!.querySelector('fieldset.form-control')!;

      expect(fieldset.classList.contains('form-control--is-horizontal')).to.equal(false);

      checkboxGroup.layout = 'horizontal';
      await checkboxGroup.updateComplete;

      expect(fieldset.classList.contains('form-control--is-horizontal')).to.equal(true);

      checkboxGroup.layout = 'vertical';
      await checkboxGroup.updateComplete;

      expect(fieldset.classList.contains('form-control--is-horizontal')).to.equal(false);
    });
  });

  describe('focus behavior', () => {
    it('should focus the checked control when group receives focus', async () => {
      const checkboxGroup = await fixture<SynCheckboxGroup>(html`
        <syn-checkbox-group>
          <syn-checkbox>Option 1</syn-checkbox>
          <syn-checkbox checked>Option 2</syn-checkbox>
        </syn-checkbox-group>
      `);
      const checkboxes = [...checkboxGroup.querySelectorAll<SynCheckbox>('syn-checkbox')];

      await checkboxGroup.updateComplete;
      await Promise.all(checkboxes.map(checkbox => checkbox.updateComplete));

      checkboxGroup.focus();

      expect(checkboxes[1].shadowRoot?.activeElement).to.equal(checkboxes[1].input);
    });

    it('should focus first enabled control when none are checked', async () => {
      const checkboxGroup = await fixture<SynCheckboxGroup>(html`
        <syn-checkbox-group>
          <syn-checkbox disabled>Option 1</syn-checkbox>
          <syn-checkbox>Option 2</syn-checkbox>
          <syn-checkbox>Option 3</syn-checkbox>
        </syn-checkbox-group>
      `);
      const checkboxes = [...checkboxGroup.querySelectorAll<SynCheckbox>('syn-checkbox')];

      await checkboxGroup.updateComplete;
      await Promise.all(checkboxes.map(checkbox => checkbox.updateComplete));

      checkboxGroup.focus();

      expect(checkboxes[1].shadowRoot?.activeElement).to.equal(checkboxes[1].input);
    });

    it('should focus group controls when label is clicked', async () => {
      const checkboxGroup = await fixture<SynCheckboxGroup>(html`
        <syn-checkbox-group label="Click me">
          <syn-checkbox>Option 1</syn-checkbox>
          <syn-checkbox>Option 2</syn-checkbox>
        </syn-checkbox-group>
      `);
      const label = checkboxGroup.shadowRoot!.querySelector<HTMLLabelElement>('#label')!;
      const firstCheckbox = checkboxGroup.querySelector<SynCheckbox>('syn-checkbox')!;

      await checkboxGroup.updateComplete;
      await firstCheckbox.updateComplete;

      label.click();

      expect(firstCheckbox.shadowRoot?.activeElement).to.equal(firstCheckbox.input);
    });
  });

  describe('keyboard navigation', () => {
    it('should move focus to next available control with ArrowRight', async () => {
      const checkboxGroup = await fixture<SynCheckboxGroup>(html`
        <syn-checkbox-group>
          <syn-checkbox>Option 1</syn-checkbox>
          <syn-checkbox>Option 2</syn-checkbox>
        </syn-checkbox-group>
      `);
      const [first, second] = [...checkboxGroup.querySelectorAll<SynCheckbox>('syn-checkbox')];

      await checkboxGroup.updateComplete;
      await first.updateComplete;
      await second.updateComplete;

      first.focus();
      await sendKeys({ press: 'ArrowRight' });

      expect(second.shadowRoot?.activeElement).to.equal(second.input);
    });

    it('should wrap focus to first control from last with ArrowRight', async () => {
      const checkboxGroup = await fixture<SynCheckboxGroup>(html`
        <syn-checkbox-group>
          <syn-checkbox>Option 1</syn-checkbox>
          <syn-checkbox>Option 2</syn-checkbox>
        </syn-checkbox-group>
      `);
      const [first, second] = [...checkboxGroup.querySelectorAll<SynCheckbox>('syn-checkbox')];

      await checkboxGroup.updateComplete;
      await first.updateComplete;
      await second.updateComplete;

      second.focus();
      await sendKeys({ press: 'ArrowRight' });

      expect(first.shadowRoot?.activeElement).to.equal(first.input);
    });

    it('should skip disabled and readonly controls when navigating', async () => {
      const checkboxGroup = await fixture<SynCheckboxGroup>(html`
        <syn-checkbox-group>
          <syn-checkbox>Option 1</syn-checkbox>
          <syn-checkbox disabled>Option 2</syn-checkbox>
          <syn-checkbox readonly>Option 3</syn-checkbox>
          <syn-checkbox>Option 4</syn-checkbox>
        </syn-checkbox-group>
      `);
      const [first, , , fourth] = [...checkboxGroup.querySelectorAll<SynCheckbox>('syn-checkbox')];

      await checkboxGroup.updateComplete;
      await Promise.all(
        [...checkboxGroup.querySelectorAll<SynCheckbox>('syn-checkbox')].map(checkbox => checkbox.updateComplete),
      );

      first.focus();
      await sendKeys({ press: 'ArrowRight' });

      expect(fourth.shadowRoot?.activeElement).to.equal(fourth.input);
    });
  });

  describe('syncing with syn-checkbox children', () => {
    it('should sync size to all syn-checkbox children', async () => {
      const checkboxGroup = await fixture<SynCheckboxGroup>(html`
        <syn-checkbox-group size="small">
          <syn-checkbox>Option 1</syn-checkbox>
          <syn-checkbox>Option 2</syn-checkbox>
        </syn-checkbox-group>
      `);
      const checkboxes = [...checkboxGroup.querySelectorAll<SynCheckbox>('syn-checkbox')];

      await checkboxGroup.updateComplete;
      await Promise.all(checkboxes.map(checkbox => checkbox.updateComplete));

      expect(checkboxes.map(checkbox => checkbox.size)).to.deep.equal(['small', 'small']);

      checkboxGroup.size = 'large';
      await checkboxGroup.updateComplete;
      await Promise.all(checkboxes.map(checkbox => checkbox.updateComplete));

      expect(checkboxes.map(checkbox => checkbox.size)).to.deep.equal(['large', 'large']);
    });

    it('should sync form to all syn-checkbox children', async () => {
      const checkboxGroup = await fixture<SynCheckboxGroup>(html`
        <syn-checkbox-group form="form-a">
          <syn-checkbox>Option 1</syn-checkbox>
          <syn-checkbox>Option 2</syn-checkbox>
        </syn-checkbox-group>
      `);
      const checkboxes = [...checkboxGroup.querySelectorAll<SynCheckbox>('syn-checkbox')];

      await checkboxGroup.updateComplete;
      await Promise.all(checkboxes.map(checkbox => checkbox.updateComplete));

      expect(checkboxes.map(checkbox => checkbox.form)).to.deep.equal(['form-a', 'form-a']);

      checkboxGroup.form = 'form-b';
      await checkboxGroup.updateComplete;
      await Promise.all(checkboxes.map(checkbox => checkbox.updateComplete));

      expect(checkboxes.map(checkbox => checkbox.form)).to.deep.equal(['form-b', 'form-b']);
    });
  });

  describe('syncing with syn-switch support', () => {
    it('should sync size to syn-checkbox and syn-switch children', async () => {
      const checkboxGroup = await fixture<SynCheckboxGroup>(html`
        <syn-checkbox-group size="small">
          <syn-checkbox>Checkbox</syn-checkbox>
          <syn-switch>Switch</syn-switch>
        </syn-checkbox-group>
      `);
      const checkbox = checkboxGroup.querySelector<SynCheckbox>('syn-checkbox')!;
      const switchEl = checkboxGroup.querySelector<SynSwitch>('syn-switch')!;

      await checkboxGroup.updateComplete;
      await checkbox.updateComplete;
      await switchEl.updateComplete;

      expect(checkbox.size).to.equal('small');
      expect(switchEl.size).to.equal('small');

      checkboxGroup.size = 'large';
      await checkboxGroup.updateComplete;
      await checkbox.updateComplete;
      await switchEl.updateComplete;

      expect(checkbox.size).to.equal('large');
      expect(switchEl.size).to.equal('large');
    });

    it('should sync form attribute to syn-checkbox and syn-switch children', async () => {
      const checkboxGroup = await fixture<SynCheckboxGroup>(html`
        <syn-checkbox-group form="form-a">
          <syn-checkbox>Checkbox</syn-checkbox>
          <syn-switch>Switch</syn-switch>
        </syn-checkbox-group>
      `);
      const checkbox = checkboxGroup.querySelector<SynCheckbox>('syn-checkbox')!;
      const switchEl = checkboxGroup.querySelector<SynSwitch>('syn-switch')!;

      await checkboxGroup.updateComplete;
      await checkbox.updateComplete;
      await switchEl.updateComplete;

      expect(checkbox.form).to.equal('form-a');
      expect(switchEl.form).to.equal('form-a');

      checkboxGroup.form = 'form-b';
      await checkboxGroup.updateComplete;
      await checkbox.updateComplete;
      await switchEl.updateComplete;

      expect(checkbox.form).to.equal('form-b');
      expect(switchEl.form).to.equal('form-b');
    });

    it('should sync size and form when only syn-switch children are used', async () => {
      const checkboxGroup = await fixture<SynCheckboxGroup>(html`
        <syn-checkbox-group size="small" form="form-a">
          <syn-switch>Switch one</syn-switch>
          <syn-switch>Switch two</syn-switch>
        </syn-checkbox-group>
      `);
      const switches = [...checkboxGroup.querySelectorAll<SynSwitch>('syn-switch')];

      await checkboxGroup.updateComplete;
      await Promise.all(switches.map(switchEl => switchEl.updateComplete));

      expect(switches.map(switchEl => switchEl.size)).to.deep.equal(['small', 'small']);
      expect(switches.map(switchEl => switchEl.form)).to.deep.equal(['form-a', 'form-a']);

      checkboxGroup.size = 'large';
      checkboxGroup.form = 'form-b';
      await checkboxGroup.updateComplete;
      await Promise.all(switches.map(switchEl => switchEl.updateComplete));

      expect(switches.map(switchEl => switchEl.size)).to.deep.equal(['large', 'large']);
      expect(switches.map(switchEl => switchEl.form)).to.deep.equal(['form-b', 'form-b']);
    });

    it('should move focus with arrow keys between switch and checkbox children', async () => {
      const checkboxGroup = await fixture<SynCheckboxGroup>(html`
        <syn-checkbox-group>
          <syn-switch>Switch one</syn-switch>
          <syn-checkbox>Checkbox two</syn-checkbox>
        </syn-checkbox-group>
      `);
      const switchEl = checkboxGroup.querySelector<SynSwitch>('syn-switch')!;
      const checkbox = checkboxGroup.querySelector<SynCheckbox>('syn-checkbox')!;

      await checkboxGroup.updateComplete;
      await switchEl.updateComplete;
      await checkbox.updateComplete;

      switchEl.focus();
      await sendKeys({ press: 'ArrowRight' });

      expect(checkbox.shadowRoot?.activeElement).to.equal(checkbox.input);

      checkbox.focus();
      await sendKeys({ press: 'ArrowLeft' });

      expect(switchEl.shadowRoot?.activeElement).to.equal(switchEl.input);
    });
  });
});
