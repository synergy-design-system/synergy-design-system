/* eslint-disable @typescript-eslint/no-floating-promises */
import sinon from 'sinon';
import { expect, fixture, html } from '@open-wc/testing';
import {
  INITIAL_DEFAULT_SETTINGS,
  enableExperimentalSettingEmitEvents,
  setDefaultSettingsForElement,
  setGlobalDefaultSettings,
} from '../../../dist/synergy.js';
import type { SynButton } from '../../../dist/synergy.js';

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
});
