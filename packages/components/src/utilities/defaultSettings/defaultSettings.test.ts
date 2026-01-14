import sinon from 'sinon';
import { expect, fixture, html } from '@open-wc/testing';
import { INITIAL_DEFAULT_SETTINGS } from './base.js';
import {
  type ComponentNamesWithDefaultValues,
  type SynButton,
  enableExperimentalSettingEmitEvents,
  resetGlobalDefaultSettings,
  setDefaultSettingsForElement,
  setGlobalDefaultSettings,
} from '../../../dist/synergy.js';
import { sortComponentsForUpdate } from './sort.js';

describe('GlobalSettings', () => {
  // Make sure to reset the defaults for each test
  beforeEach(() => {
    enableExperimentalSettingEmitEvents(false);
    setGlobalDefaultSettings(INITIAL_DEFAULT_SETTINGS);
  });

  afterEach(() => {
    enableExperimentalSettingEmitEvents(false);
  });

  describe('when rendering a syn-button without global settings', () => {
    it('should render the button with a default size of "medium"', async () => {
      const button = await fixture<SynButton>(html`<syn-button>Button</syn-button>`);
      expect(button.size).to.equal('medium');
    });
  });

  describe('setDefaultSettingsForElement', () => {
    it('should render the button with a size of "large" when no size property is provided', async () => {
      setDefaultSettingsForElement<SynButton>('SynButton', { size: 'large' });
      const button = await fixture<SynButton>(html`<syn-button>Button</syn-button>`);
      expect(button.size).to.equal('large');
    });

    it('should render the button with its original size when a size property is provided', async () => {
      setDefaultSettingsForElement<SynButton>('SynButton', { size: 'large' });
      const button = await fixture<SynButton>(html`<syn-button size="small">Button</syn-button>`);
      expect(button.size).to.equal('small');
    });

    it('should render the button with its original size when a size=medium property is provided', async () => {
      setDefaultSettingsForElement<SynButton>('SynButton', { size: 'large' });
      const button = await fixture<SynButton>(html`<syn-button size="medium">Button</syn-button>`);
      expect(button.size).to.equal('medium');
    });

    it('should return the changed settings when called', () => {
      const newSettings = setDefaultSettingsForElement<SynButton>('SynButton', { size: 'large' });
      expect(newSettings).to.deep.equal({
        ...INITIAL_DEFAULT_SETTINGS,
        size: {
          ...INITIAL_DEFAULT_SETTINGS.size,
          SynButton: 'large',
        },
      });
    });

    describe('when using the experimental event support', () => {
      it('should not dispatch the global settings event when the setting is disabled', () => {
        const spy = sinon.spy();
        window.addEventListener('syn-default-settings-changed', spy, {
          capture: true,
          once: true,
        });

        enableExperimentalSettingEmitEvents(false);
        setDefaultSettingsForElement<SynButton>('SynButton', { size: 'large' });

        expect(spy.callCount).to.equal(0);
      });

      it('should dispatch the global settings event when the setting is enabled', () => {
        const spy = sinon.spy();
        window.addEventListener('syn-default-settings-changed', spy, {
          capture: true,
          once: true,
        });

        enableExperimentalSettingEmitEvents(true);
        setDefaultSettingsForElement<SynButton>('SynButton', { size: 'large' });

        expect(spy.callCount).to.equal(1);
        expect((spy.firstCall.args[0] as CustomEvent).detail).to.deep.equal({
          SynButton: [{
            attribute: 'size',
            newValue: 'large',
            oldValue: 'medium',
          }],
        });
      });

      it('should update the props of all buttons that where rendered before the default settings were changed', async () => {
        enableExperimentalSettingEmitEvents(true);

        const buttonList = await fixture<HTMLDivElement>(html`
          <div>
            <syn-button>Button 1</syn-button>
            <syn-button>Button 2</syn-button>
            <syn-button>Button 3</syn-button>
            <syn-button size="small"></syn-button>
            <syn-tag>Tag with default</syn-tag>
          </div>
        `);

        const buttons = Array.from(buttonList.querySelectorAll('syn-button'));
        const tag = Array.from(buttonList.querySelectorAll('syn-tag')).at(0);

        expect(buttons.filter(btn => btn.size === 'medium').length).to.equal(3);
        expect(buttons.filter(btn => btn.size === 'small').length).to.equal(1);
        expect(tag).to.have.property('size', 'medium');

        setDefaultSettingsForElement<SynButton>('SynButton', { size: 'large' });

        await buttons[0].updateComplete;

        expect(buttons.filter(btn => btn.size === 'large').length).to.equal(3);
        expect(buttons.filter(btn => btn.size === 'small').length).to.equal(1);
        expect(tag).to.have.property('size', 'medium');
      });
    });
  });

  describe('setGlobalDefaultSettings', () => {
    it('should render the button with a size of "large" when no size property is provided', async () => {
      setGlobalDefaultSettings({
        size: {
          SynButton: 'large',
        },
      });
      const button = await fixture<SynButton>(html`<syn-button>Button</syn-button>`);
      expect(button.size).to.equal('large');
    });

    it('should render the button with its original size when a size property is provided', async () => {
      setGlobalDefaultSettings({
        size: {
          SynButton: 'large',
        },
      });
      const button = await fixture<SynButton>(html`<syn-button size="small">Button</syn-button>`);
      expect(button.size).to.equal('small');
    });

    it('should return the changed settings when called', () => {
      const newSettings = setGlobalDefaultSettings({
        size: {
          SynButton: 'large',
        },
      });

      expect(newSettings).to.deep.equal({
        ...INITIAL_DEFAULT_SETTINGS,
        size: {
          ...INITIAL_DEFAULT_SETTINGS.size,
          SynButton: 'large',
        },
      });
    });

    describe('when using the experimental event support', () => {
      it('should not dispatch the global settings event when the setting is disabled', () => {
        const spy = sinon.spy();
        window.addEventListener('syn-default-settings-changed', spy, {
          capture: true,
          once: true,
        });

        enableExperimentalSettingEmitEvents(false);
        setGlobalDefaultSettings({
          size: {
            SynButton: 'large',
          },
        });
        expect(spy.callCount).to.equal(0);
      });

      it('should dispatch the global settings event when the setting is enabled', () => {
        const spy = sinon.spy();
        window.addEventListener('syn-default-settings-changed', spy, {
          capture: true,
          once: true,
        });

        enableExperimentalSettingEmitEvents(true);
        setGlobalDefaultSettings({
          size: {
            SynButton: 'large',
          },
        });

        expect(spy.callCount).to.equal(1);
        expect((spy.firstCall.args[0] as CustomEvent).detail).to.deep.equal({
          SynButton: [{
            attribute: 'size',
            newValue: 'large',
            oldValue: 'medium',
          }],
        });
      });

      it('should update the props of all buttons that where rendered before the default settings were changed', async () => {
        enableExperimentalSettingEmitEvents(true);

        const buttonList = await fixture<HTMLDivElement>(html`
          <div>
            <syn-button>Button 1</syn-button>
            <syn-button>Button 2</syn-button>
            <syn-button>Button 3</syn-button>
            <syn-button size="small"></syn-button>
            <syn-tag>Tag with default</syn-tag>
          </div>
        `);

        const buttons = Array.from(buttonList.querySelectorAll('syn-button'));
        const tag = Array.from(buttonList.querySelectorAll('syn-tag')).at(0);

        expect(buttons.filter(btn => btn.size === 'medium').length).to.equal(3);
        expect(buttons.filter(btn => btn.size === 'small').length).to.equal(1);
        expect(tag).to.have.property('size', 'medium');

        setGlobalDefaultSettings({
          size: {
            SynButton: 'large',
          },
        });

        await buttons[0].updateComplete;

        expect(buttons.filter(btn => btn.size === 'large').length).to.equal(3);
        expect(buttons.filter(btn => btn.size === 'small').length).to.equal(1);
        expect(tag).to.have.property('size', 'medium');

        setGlobalDefaultSettings({
          size: {
            SynTag: 'small',
          },
        });

        await tag!.updateComplete;
        expect(tag).to.have.property('size', 'small');
      });
    });
  });

  describe('resetGlobalDefaultSettings', () => {
    it('should reset all system settings to their original default when called', async () => {
      setGlobalDefaultSettings({
        size: {
          SynButton: 'large',
        },
      });
      const buttonBeforeReset = await fixture<SynButton>(html`<syn-button>Button</syn-button>`);
      expect(buttonBeforeReset.size).to.equal('large');

      const result = resetGlobalDefaultSettings();
      expect(result).to.deep.equal(INITIAL_DEFAULT_SETTINGS);

      const buttonAfterReset = await fixture<SynButton>(html`<syn-button>Button</syn-button>`);
      expect(buttonAfterReset.size).to.equal('medium');
    });
  });

  describe('dependency sorting', () => {
    it('should sort components in dependency order', () => {
      const components = ['SynButtonGroup', 'SynButton', 'SynRadioGroup', 'SynRadio'];
      const sorted = sortComponentsForUpdate(components as ComponentNamesWithDefaultValues[]);

      // Verify dependencies come before their dependents
      expect(sorted.indexOf('SynButton')).to.be.lessThan(sorted.indexOf('SynButtonGroup'));
      expect(sorted.indexOf('SynRadio')).to.be.lessThan(sorted.indexOf('SynRadioGroup'));
    });

    it('should ensure button-group overrides button sizes when both change globally', async () => {
      enableExperimentalSettingEmitEvents(true); // Start simple without events

      const container = await fixture<HTMLDivElement>(html`
        <div>
          <syn-button-group>
            <syn-button>Button 1</syn-button>
            <syn-button>Button 2</syn-button>
          </syn-button-group>
        </div>
      `);

      const buttonGroup = container.querySelector('syn-button-group')!;
      const buttons = Array.from(container.querySelectorAll('syn-button'));

      // Wait for initial setup
      await Promise.all([
        buttonGroup.updateComplete,
        ...buttons.map(btn => btn.updateComplete),
      ]);

      // Set initial button group size
      buttonGroup.size = 'large';
      await buttonGroup.updateComplete;

      // Verify buttons inherit from button group
      expect(buttons[0].size).to.equal('large');
      expect(buttons[1].size).to.equal('large');

      // Now change both components globally
      setGlobalDefaultSettings({
        size: {
          SynButton: 'small', // Without sorting, buttons would get this
          SynButtonGroup: 'medium', // With sorting, this should win
        },
      });

      // Wait for updates to process
      await Promise.all([
        buttonGroup.updateComplete,
        ...buttons.map(btn => btn.updateComplete),
      ]);

      // Button group should have won due to dependency sorting
      expect(buttonGroup.size).to.equal('medium');
      expect(buttons[0].size).to.equal('medium');
      expect(buttons[1].size).to.equal('medium');
    });
  });
});
