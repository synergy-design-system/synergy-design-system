import {
  elementUpdated,
  expect,
  fixture,
  html,
  waitUntil,
} from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import '../../../dist/synergy.js';
import type SynCalendar from '../calendar/calendar.js';
import type SynDatePicker from './date-picker.js';

describe('<syn-date-picker>', () => {
  const getSegment = (picker: SynDatePicker, field: string, group = 0) => (
    picker.shadowRoot!.querySelector<HTMLElement>(`[data-group="${group}"][data-segment="${field}"]`)!
  );

  const pressKey = async (picker: SynDatePicker, field: string, key: string, group = 0) => {
    const segment = getSegment(picker, field, group);
    segment.focus();
    segment.dispatchEvent(new KeyboardEvent('keydown', {
      bubbles: true, cancelable: true, composed: true, key,
    }));
    await elementUpdated(picker);
  };

  const enterField = async (picker: SynDatePicker, field: string, digits: string, group = 0) => {
    await pressKey(picker, field, 'Delete', group);
    await Array.from(digits).reduce(async (previous, digit) => {
      await previous;
      await pressKey(picker, field, digit, group);
    }, Promise.resolve());
  };

  const paste = async (picker: SynDatePicker, text: string, group = 0) => {
    const segment = getSegment(picker, 'month', group);
    segment.focus();
    const clipboardData = new DataTransfer();
    clipboardData.setData('text', text);
    const event = new ClipboardEvent('paste', { bubbles: true, cancelable: true, composed: true });
    // Firefox discards clipboard data supplied through the synthetic event constructor.
    Object.defineProperty(event, 'clipboardData', { value: clipboardData });
    segment.dispatchEvent(event);
    await elementUpdated(picker);
  };

  const getCalendar = (picker: SynDatePicker) => picker.shadowRoot!.querySelector<SynCalendar>('syn-calendar')!;

  const selectDay = async (picker: SynDatePicker, value: string) => {
    const calendar = getCalendar(picker);
    await elementUpdated(calendar);
    const day = calendar.shadowRoot!.querySelector<HTMLButtonElement>(`[data-kind="day"][data-value="${value}"]`);
    expect(day, `Expected ${value} to be rendered`).to.exist;
    day!.click();
    await elementUpdated(calendar);
    await elementUpdated(picker);
  };

  const clear = async (picker: SynDatePicker) => {
    picker.shadowRoot!.querySelector<HTMLButtonElement>('[part="clear-button"]')!.click();
    await elementUpdated(picker);
  };

  it('should expose the documented defaults', async () => {
    const picker = await fixture<SynDatePicker>(html`<syn-date-picker></syn-date-picker>`);

    expect(picker.value).to.equal('');
    expect(picker.defaultValue).to.equal('');
    expect(picker.name).to.equal('');
    expect(picker.mode).to.equal('single');
    expect(picker.size).to.equal('medium');
    expect(picker.open).to.be.false;
    expect(picker.disabled).to.be.false;
    expect(picker.readonly).to.be.false;
    expect(picker.required).to.be.false;
    expect(picker.clearable).to.be.false;
    expect(picker.min).to.equal('');
    expect(picker.max).to.equal('');
    expect(picker.minRange).to.be.undefined;
    expect(picker.maxRange).to.be.undefined;
    expect(picker.disabledDates).to.deep.equal([]);
    expect(picker.disabledWeekdays).to.deep.equal([]);
    expect(picker.isDateDisabled).to.be.undefined;
    expect(picker.valueAsDate).to.be.null;
    expect(picker.valueAsDates).to.deep.equal([]);
    expect(picker.checkValidity()).to.be.true;
    expect(picker.getForm()).to.be.null;
  });

  describe('programmatic values', () => {
    it('should sort and deduplicate multiple values without emitting user events', async () => {
      const picker = await fixture<SynDatePicker>(html`<syn-date-picker mode="multiple"></syn-date-picker>`);
      const input = sinon.spy();
      const change = sinon.spy();
      picker.addEventListener('syn-input', input);
      picker.addEventListener('syn-change', change);

      picker.value = '2026-10-20 2026-10-05 2026-10-20';
      await elementUpdated(picker);

      expect(picker.value).to.equal('2026-10-05 2026-10-20');
      expect(input).to.not.have.been.called;
      expect(change).to.not.have.been.called;
      expect(picker.shadowRoot!.querySelectorAll('[data-segment="year"]')).to.have.length(3);
    });

    it('should reject the whole selection when an assigned date is malformed', async () => {
      const picker = await fixture<SynDatePicker>(html`
        <syn-date-picker mode="multiple" value="2026-10-05 2026-02-31"></syn-date-picker>
      `);

      expect(picker.value).to.equal('');
    });

    it('should convert range endpoints to multiple mode without expanding interior dates', async () => {
      const picker = await fixture<SynDatePicker>(html`
        <syn-date-picker mode="range" value="2026-10-05 2026-10-10"></syn-date-picker>
      `);
      picker.mode = 'multiple';
      await elementUpdated(picker);
      expect(picker.value).to.equal('2026-10-05 2026-10-10');

      picker.mode = 'single';
      await elementUpdated(picker);
      expect(picker.value).to.equal('2026-10-05');
      expect(picker.shadowRoot!.querySelectorAll('[data-segment="year"]')).to.have.length(1);
    });

    it('should use UTC date-only conversion and ignore invalid Date instances', async () => {
      const picker = await fixture<SynDatePicker>(html`<syn-date-picker></syn-date-picker>`);
      picker.valueAsDates = [new Date('2026-10-15T23:30:00-02:00'), new Date(Number.NaN)];
      await elementUpdated(picker);

      expect(picker.value).to.equal('2026-10-16');
      expect(picker.valueAsDate!.toISOString()).to.equal('2026-10-16T00:00:00.000Z');
      expect(picker.valueAsDates[0].toISOString()).to.equal('2026-10-16T00:00:00.000Z');

      picker.mode = 'range';
      await elementUpdated(picker);
      expect(picker.valueAsDate).to.be.null;
      picker.valueAsDates = null;
      await elementUpdated(picker);
      expect(picker.value).to.equal('');
    });

    it('should preserve a draft on a controlled value echo but discard it for a new external value', async () => {
      const picker = await fixture<SynDatePicker>(html`
        <syn-date-picker lang="en-US" value="2026-10-15"></syn-date-picker>
      `);
      await enterField(picker, 'year', '2');
      const committed = picker.value;
      picker.value = committed;
      await elementUpdated(picker);
      expect(getSegment(picker, 'year').textContent).to.equal('2');
      expect(picker.checkValidity()).to.be.false;

      picker.value = '2027-03-12';
      await elementUpdated(picker);
      expect(getSegment(picker, 'year').textContent).to.equal('2027');
      expect(picker.checkValidity()).to.be.true;
    });
  });

  describe('segment drafts and commits', () => {
    it('should retain the committed value while a year is incomplete, including on Tab', async () => {
      const picker = await fixture<SynDatePicker>(html`
        <syn-date-picker lang="en-US" value="2026-10-15"></syn-date-picker>
      `);
      const change = sinon.spy();
      picker.addEventListener('syn-change', change);

      await enterField(picker, 'year', '2');
      await pressKey(picker, 'year', 'Tab');

      expect(picker.value).to.equal('2026-10-15');
      expect(getSegment(picker, 'year').textContent).to.equal('2');
      expect(picker.valueAsDates[0].getUTCFullYear()).to.equal(2026);
      expect(picker.checkValidity()).to.be.false;
      expect(change).to.not.have.been.called;
    });

    it('should keep an explicitly impossible day as an invalid draft rather than clamping it', async () => {
      const picker = await fixture<SynDatePicker>(html`
        <syn-date-picker lang="en-US" value="2026-02-15"></syn-date-picker>
      `);
      await enterField(picker, 'day', '31');

      expect(picker.value).to.equal('2026-02-15');
      expect(getSegment(picker, 'day').textContent).to.equal('31');
      expect(getSegment(picker, 'day').hasAttribute('aria-valuenow')).to.be.false;
      expect(picker.checkValidity()).to.be.false;
    });

    it('should clamp an unedited day when a month change shortens the month', async () => {
      const picker = await fixture<SynDatePicker>(html`
        <syn-date-picker lang="en-US" value="2026-01-31"></syn-date-picker>
      `);
      await enterField(picker, 'month', '02');

      expect(picker.value).to.equal('2026-02-28');
      expect(getSegment(picker, 'day').textContent).to.equal('28');
      expect(picker.checkValidity()).to.be.true;
    });

    it('should clamp leap day only after all four year digits are entered', async () => {
      const picker = await fixture<SynDatePicker>(html`
        <syn-date-picker lang="en-US" value="2024-02-29"></syn-date-picker>
      `);
      await enterField(picker, 'year', '202');
      expect(picker.value).to.equal('2024-02-29');
      await pressKey(picker, 'year', '5');

      expect(picker.value).to.equal('2025-02-28');
      expect(picker.checkValidity()).to.be.true;
    });

    it('should publish complete edits in before-change, input, change order', async () => {
      const picker = await fixture<SynDatePicker>(html`
        <syn-date-picker lang="en-US" value="2026-10-15"></syn-date-picker>
      `);
      const events: string[] = [];
      const proposals: string[] = [];
      picker.addEventListener('syn-before-change', event => {
        expect(event.cancelable).to.be.true;
        proposals.push(picker.value);
        events.push(event.type);
      });
      picker.addEventListener('syn-input', event => events.push(event.type));
      picker.addEventListener('syn-change', event => events.push(event.type));

      await pressKey(picker, 'day', 'ArrowUp');

      expect(picker.value).to.equal('2026-10-16');
      expect(proposals).to.deep.equal(['2026-10-16']);
      expect(events).to.deep.equal(['syn-before-change', 'syn-input', 'syn-change']);
    });

    it('should restore the previous selection and fields when a commit is canceled', async () => {
      const picker = await fixture<SynDatePicker>(html`
        <syn-date-picker lang="en-US" value="2026-10-15"></syn-date-picker>
      `);
      const change = sinon.spy();
      picker.addEventListener('syn-before-change', event => event.preventDefault());
      picker.addEventListener('syn-change', change);
      await pressKey(picker, 'day', 'ArrowUp');

      expect(picker.value).to.equal('2026-10-15');
      expect(getSegment(picker, 'day').textContent).to.equal('15');
      expect(picker.checkValidity()).to.be.true;
      expect(change).to.not.have.been.called;
    });

    it('should let an application replacement supersede a user proposal without rollback', async () => {
      const picker = await fixture<SynDatePicker>(html`
        <syn-date-picker lang="en-US" value="2026-10-15"></syn-date-picker>
      `);
      const change = sinon.spy();
      picker.addEventListener('syn-before-change', () => { picker.value = '2027-03-12'; });
      picker.addEventListener('syn-change', change);
      await pressKey(picker, 'day', 'ArrowUp');

      expect(picker.value).to.equal('2027-03-12');
      expect(getSegment(picker, 'year').textContent).to.equal('2027');
      expect(getSegment(picker, 'day').textContent).to.equal('12');
      expect(change).to.not.have.been.called;
    });

    it('should reject a proposal when a controlled listener writes back the committed baseline', async () => {
      const picker = await fixture<SynDatePicker>(html`
        <syn-date-picker lang="en-US" value="2026-10-15"></syn-date-picker>
      `);
      picker.addEventListener('syn-before-change', () => { picker.value = '2026-10-15'; });
      await pressKey(picker, 'day', 'ArrowUp');

      expect(picker.value).to.equal('2026-10-15');
      expect(getSegment(picker, 'day').textContent).to.equal('15');
    });

    it('should cancel a closed-popup draft with Escape without emitting change', async () => {
      const picker = await fixture<SynDatePicker>(html`
        <syn-date-picker lang="en-US" value="2026-10-15"></syn-date-picker>
      `);
      const change = sinon.spy();
      picker.addEventListener('syn-change', change);
      await enterField(picker, 'year', '2');
      await pressKey(picker, 'year', 'Escape');

      expect(getSegment(picker, 'year').textContent).to.equal('2026');
      expect(picker.checkValidity()).to.be.true;
      expect(change).to.not.have.been.called;
    });
  });

  describe('paste and multiple selection', () => {
    it('should accept a locale-ordered numeric date', async () => {
      const picker = await fixture<SynDatePicker>(html`<syn-date-picker lang="de-DE"></syn-date-picker>`);
      await paste(picker, '15.10.2026');

      expect(picker.value).to.equal('2026-10-15');
      expect(picker.checkValidity()).to.be.true;
    });

    it('should ignore unrecognized paste text without changing the existing selection', async () => {
      const picker = await fixture<SynDatePicker>(html`
        <syn-date-picker value="2026-10-15"></syn-date-picker>
      `);
      const input = sinon.spy();
      picker.addEventListener('syn-input', input);
      await paste(picker, 'not a date');

      expect(picker.value).to.equal('2026-10-15');
      expect(picker.checkValidity()).to.be.true;
      expect(input).to.not.have.been.called;
    });

    it('should retain an impossible pasted date as a repairable draft', async () => {
      const picker = await fixture<SynDatePicker>(html`
        <syn-date-picker lang="en-US" value="2026-10-15"></syn-date-picker>
      `);
      await paste(picker, '2026-02-31');

      expect(picker.value).to.equal('2026-10-15');
      expect(getSegment(picker, 'day').textContent).to.equal('31');
      expect(picker.checkValidity()).to.be.false;

      await enterField(picker, 'day', '28');
      expect(picker.value).to.equal('2026-02-28');
      expect(picker.checkValidity()).to.be.true;
    });

    it('should commit a reversed pasted range atomically in chronological order', async () => {
      const picker = await fixture<SynDatePicker>(html`
        <syn-date-picker mode="range" lang="en-US"></syn-date-picker>
      `);
      const change = sinon.spy();
      picker.addEventListener('syn-change', change);
      await paste(picker, '2026-10-20 2026-10-05');

      expect(picker.value).to.equal('2026-10-05 2026-10-20');
      expect(change).to.have.been.calledOnce;
    });

    it('should not partially publish a pasted list while one date is invalid', async () => {
      const picker = await fixture<SynDatePicker>(html`
        <syn-date-picker mode="multiple" lang="en-US" value="2026-10-01"></syn-date-picker>
      `);
      const change = sinon.spy();
      picker.addEventListener('syn-change', change);
      await paste(picker, '2026-10-05 2026-02-31');

      expect(picker.value).to.equal('2026-10-01');
      expect(picker.checkValidity()).to.be.false;
      expect(change).to.not.have.been.called;

      await enterField(picker, 'day', '28', 1);
      expect(picker.value).to.equal('2026-02-28 2026-10-05');
      expect(picker.checkValidity()).to.be.true;
      expect(change).to.have.been.calledOnce;
    });

    it('should preserve unrelated multiple-date drafts when another group commits', async () => {
      const picker = await fixture<SynDatePicker>(html`
        <syn-date-picker mode="multiple" lang="en-US" value="2026-10-01 2026-10-15"></syn-date-picker>
      `);
      await enterField(picker, 'year', '2', 0);
      await pressKey(picker, 'day', 'ArrowUp', 1);

      expect(picker.value).to.equal('2026-10-01 2026-10-16');
      expect(getSegment(picker, 'year', 0).textContent).to.equal('2');
      expect(picker.checkValidity()).to.be.false;
    });

    it('should remove only the chosen multiple date while preserving an unrelated draft', async () => {
      const picker = await fixture<SynDatePicker>(html`
        <syn-date-picker mode="multiple" lang="en-US" value="2026-10-01 2026-10-15"></syn-date-picker>
      `);
      await enterField(picker, 'year', '2', 1);
      picker.shadowRoot!.querySelector<HTMLButtonElement>('[part="remove-date-button"]')!.click();
      await elementUpdated(picker);

      expect(picker.value).to.equal('2026-10-15');
      expect(getSegment(picker, 'year').textContent).to.equal('2');
      expect(picker.checkValidity()).to.be.false;
    });
  });

  describe('calendar integration and popup lifecycle', () => {
    it('should publish calendar selection once and close a single-date popup', async () => {
      const picker = await fixture<SynDatePicker>(html`
        <syn-date-picker value="2026-10-01"></syn-date-picker>
      `);
      const input = sinon.spy();
      const change = sinon.spy();
      picker.addEventListener('syn-input', input);
      picker.addEventListener('syn-change', change);
      await picker.show();
      await selectDay(picker, '2026-10-15');
      await waitUntil(() => !picker.open);

      expect(picker.value).to.equal('2026-10-15');
      expect(input).to.have.been.calledOnce;
      expect(change).to.have.been.calledOnce;
    });

    it('should keep a pending range anchor out of form value until the second calendar click', async () => {
      const picker = await fixture<SynDatePicker>(html`
        <syn-date-picker mode="range" value="2026-10-01 2026-10-02"></syn-date-picker>
      `);
      const change = sinon.spy();
      picker.addEventListener('syn-change', change);
      await picker.show();
      await selectDay(picker, '2026-10-05');

      expect(picker.value).to.equal('2026-10-01 2026-10-02');
      expect(picker.open).to.be.true;
      expect(picker.checkValidity()).to.be.false;
      expect(change).to.not.have.been.called;

      await selectDay(picker, '2026-10-10');
      expect(picker.value).to.equal('2026-10-05 2026-10-10');
      expect(picker.checkValidity()).to.be.true;
      expect(change).to.have.been.calledOnce;
    });

    it('should let picker listeners veto a calendar selection', async () => {
      const picker = await fixture<SynDatePicker>(html`
        <syn-date-picker value="2026-10-01"></syn-date-picker>
      `);
      const change = sinon.spy();
      picker.addEventListener('syn-before-change', event => event.preventDefault());
      picker.addEventListener('syn-change', change);
      await selectDay(picker, '2026-10-15');

      expect(picker.value).to.equal('2026-10-01');
      expect(getCalendar(picker).value).to.deep.equal(['2026-10-01']);
      expect(change).to.not.have.been.called;
    });

    it('should preserve typed drafts and remain open when adding a multiple date from the calendar', async () => {
      const picker = await fixture<SynDatePicker>(html`
        <syn-date-picker mode="multiple" lang="en-US" value="2026-10-01"></syn-date-picker>
      `);
      await enterField(picker, 'year', '2');
      const draft = getSegment(picker, 'year');
      await picker.show();
      await selectDay(picker, '2026-10-15');

      expect(picker.value).to.equal('2026-10-01 2026-10-15');
      expect(draft.isConnected).to.be.true;
      expect(draft.textContent).to.equal('2');
      expect(picker.open).to.be.true;
      expect(picker.checkValidity()).to.be.false;
    });

    it('should emit ordered popup lifecycle events and update expanded state', async () => {
      const picker = await fixture<SynDatePicker>(html`<syn-date-picker></syn-date-picker>`);
      const events: string[] = [];
      ['syn-show', 'syn-after-show', 'syn-hide', 'syn-after-hide'].forEach(name => {
        picker.addEventListener(name, event => events.push(event.type));
      });
      await picker.show();
      expect(picker.popup.active).to.be.true;
      expect(picker.shadowRoot!.querySelector('[part="expand-button"]')!.getAttribute('aria-expanded')).to.equal('true');
      await picker.hide();

      expect(picker.popup.active).to.be.false;
      expect(events).to.deep.equal(['syn-show', 'syn-after-show', 'syn-hide', 'syn-after-hide']);
    });

    it('should settle an opening request superseded by hide', async () => {
      const picker = await fixture<SynDatePicker>(html`<syn-date-picker></syn-date-picker>`);
      const lifecycle = sinon.spy();
      ['syn-show', 'syn-after-show', 'syn-hide', 'syn-after-hide'].forEach(name => {
        picker.addEventListener(name, lifecycle);
      });
      const opening = picker.show();
      await Promise.resolve();
      expect(picker.open).to.be.true;
      const closing = picker.hide();
      await Promise.all([opening, closing]);

      expect(picker.open).to.be.false;
      expect(picker.popup.active).to.be.false;
      expect(lifecycle).to.not.have.been.called;
    });

    it('should settle a closing request when reopened before rendering', async () => {
      const picker = await fixture<SynDatePicker>(html`<syn-date-picker></syn-date-picker>`);
      await picker.show();
      const lifecycle = sinon.spy();
      ['syn-show', 'syn-after-show', 'syn-hide', 'syn-after-hide'].forEach(name => {
        picker.addEventListener(name, lifecycle);
      });

      const closing = picker.hide();
      picker.open = true;
      await Promise.all([closing, picker.show()]);

      expect(picker.open).to.be.true;
      expect(picker.popup.active).to.be.true;
      expect(lifecycle).to.not.have.been.called;
    });

    it('should close on an outside pointerdown', async () => {
      const picker = await fixture<SynDatePicker>(html`<syn-date-picker></syn-date-picker>`);
      await picker.show();
      document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
      await elementUpdated(picker);

      expect(picker.open).to.be.false;
    });
  });

  describe('clear and interaction state', () => {
    it('should emit clear, input and change exactly once when clearing a committed selection', async () => {
      const picker = await fixture<SynDatePicker>(html`
        <syn-date-picker clearable value="2026-10-15"></syn-date-picker>
      `);
      const events: string[] = [];
      ['syn-before-change', 'syn-clear', 'syn-input', 'syn-change'].forEach(name => {
        picker.addEventListener(name, event => events.push(event.type));
      });
      await clear(picker);

      expect(picker.value).to.equal('');
      expect(events).to.deep.equal(['syn-before-change', 'syn-clear', 'syn-input', 'syn-change']);
    });

    it('should allow canceling Clear', async () => {
      const picker = await fixture<SynDatePicker>(html`
        <syn-date-picker clearable value="2026-10-15"></syn-date-picker>
      `);
      const cleared = sinon.spy();
      picker.addEventListener('syn-before-change', event => event.preventDefault());
      picker.addEventListener('syn-clear', cleared);
      await clear(picker);

      expect(picker.value).to.equal('2026-10-15');
      expect(cleared).to.not.have.been.called;
    });

    it('should clear a draft-only selection without emitting change', async () => {
      const picker = await fixture<SynDatePicker>(html`<syn-date-picker clearable lang="en-US"></syn-date-picker>`);
      const change = sinon.spy();
      picker.addEventListener('syn-change', change);
      await enterField(picker, 'year', '2');
      await clear(picker);

      expect(picker.value).to.equal('');
      expect(picker.checkValidity()).to.be.true;
      expect(change).to.not.have.been.called;
    });

    ['disabled', 'readonly'].forEach(state => {
      it(`should cancel drafts, close the popup and prevent editing when ${state}`, async () => {
        const picker = await fixture<SynDatePicker>(html`
          <syn-date-picker lang="en-US" value="2026-10-15"></syn-date-picker>
        `);
        await enterField(picker, 'year', '2');
        await picker.show();
        if (state === 'disabled') {
          picker.disabled = true;
        } else {
          picker.readonly = true;
        }
        await elementUpdated(picker);
        await pressKey(picker, 'day', 'ArrowUp');
        await picker.show();

        expect(picker.value).to.equal('2026-10-15');
        expect(getSegment(picker, 'year').textContent).to.equal('2026');
        expect(picker.open).to.be.false;
        expect(picker.checkValidity()).to.be.true;
      });
    });
  });

  describe('keyboard, focus and localization', () => {
    it('should ignore focus events from a date group replaced by a mode change', async () => {
      const picker = await fixture<SynDatePicker>(html`
        <syn-date-picker mode="multiple" lang="en-US" value="2026-10-01 2026-10-15"></syn-date-picker>
      `);
      const previous = getSegment(picker, 'year', 2);
      previous.focus();
      await elementUpdated(picker);

      picker.mode = 'single';
      await elementUpdated(picker);
      previous.dispatchEvent(new FocusEvent('focus'));
      picker.focus();
      await elementUpdated(picker);

      expect(picker.shadowRoot!.activeElement).to.equal(getSegment(picker, 'year'));
      expect(picker.value).to.equal('2026-10-01');
    });

    it('should cancel queued whole-control blur work when disconnected', async () => {
      const picker = await fixture<SynDatePicker>(html`
        <syn-date-picker lang="en-US" value="2026-10-15"></syn-date-picker>
      `);
      picker.focus();
      await elementUpdated(picker);
      const blur = sinon.spy();
      picker.addEventListener('syn-blur', blur);

      picker.blur();
      picker.remove();
      await Promise.resolve();

      expect(blur).to.not.have.been.called;
    });

    it('should finish a field without canceling Tab or Shift+Tab', async () => {
      const picker = await fixture<SynDatePicker>(html`
        <syn-date-picker lang="en-US" value="2026-10-15"></syn-date-picker>
      `);
      await enterField(picker, 'month', '1');
      const tab = new KeyboardEvent('keydown', {
        bubbles: true, cancelable: true, composed: true, key: 'Tab',
      });
      getSegment(picker, 'month').dispatchEvent(tab);
      await elementUpdated(picker);
      expect(tab.defaultPrevented).to.be.false;
      expect(picker.value).to.equal('2026-01-15');

      const reverseTab = new KeyboardEvent('keydown', {
        bubbles: true, cancelable: true, composed: true, key: 'Tab', shiftKey: true,
      });
      getSegment(picker, 'month').dispatchEvent(reverseTab);
      expect(reverseTab.defaultPrevented).to.be.false;
    });

    it('should move horizontal focus in visual RTL direction', async () => {
      const picker = await fixture<SynDatePicker>(html`<syn-date-picker lang="en-US" dir="rtl"></syn-date-picker>`);
      await pressKey(picker, 'day', 'ArrowRight');
      expect(picker.shadowRoot!.activeElement).to.equal(getSegment(picker, 'month'));
      await pressKey(picker, 'day', 'ArrowLeft');
      expect(picker.shadowRoot!.activeElement).to.equal(getSegment(picker, 'year'));
    });

    it('should not bubble digits consumed by a segment to enclosing keyboard shortcuts', async () => {
      const picker = await fixture<SynDatePicker>(html`<syn-date-picker lang="en-US"></syn-date-picker>`);
      const keydown = sinon.spy();
      picker.addEventListener('keydown', keydown);
      picker.focus();
      await elementUpdated(picker);
      await sendKeys({ press: '1' });
      await elementUpdated(picker);

      expect(getSegment(picker, 'month').textContent).to.equal('1');
      expect(keydown).to.not.have.been.called;
    });

    it('should keep logical field focus when a locale change reorders segments', async () => {
      const picker = await fixture<SynDatePicker>(html`
        <syn-date-picker lang="en-US" value="2026-10-15"></syn-date-picker>
      `);
      getSegment(picker, 'month').focus();
      await elementUpdated(picker);
      picker.lang = 'de-DE';
      await elementUpdated(picker);

      const order = Array.from(picker.shadowRoot!.querySelectorAll<HTMLElement>('[data-segment]'))
        .map(segment => segment.dataset.segment);
      expect(order).to.deep.equal(['day', 'month', 'year']);
      expect(picker.shadowRoot!.activeElement).to.equal(getSegment(picker, 'month'));
      expect(getCalendar(picker).lang).to.equal('de-DE');
    });

    it('should clamp year stepping at the supported domain instead of wrapping', async () => {
      const picker = await fixture<SynDatePicker>(html`
        <syn-date-picker lang="en-US" value="9999-10-15"></syn-date-picker>
      `);
      await pressKey(picker, 'year', 'ArrowUp');
      expect(picker.value).to.equal('9999-10-15');
      await pressKey(picker, 'year', 'Home');
      expect(picker.value).to.equal('0000-10-15');
      await pressKey(picker, 'year', 'ArrowDown');
      expect(picker.value).to.equal('0000-10-15');
    });
  });

  describe('forms and validation', () => {
    [
      { mode: 'single', value: '2026-10-15' },
      { mode: 'range', value: '2026-10-05 2026-10-15' },
      { mode: 'multiple', value: '2026-10-05 2026-10-10 2026-10-15' },
    ].forEach(({ mode, value }) => {
      it(`should submit one canonical named entry in ${mode} mode`, async () => {
        const form = await fixture<HTMLFormElement>(html`
          <form><syn-date-picker name="dates" mode=${mode} value=${value}></syn-date-picker></form>
        `);
        const picker = form.querySelector<SynDatePicker>('syn-date-picker')!;
        await elementUpdated(picker);

        expect(picker.getForm()).to.equal(form);
        expect(new FormData(form).getAll('dates')).to.deep.equal([value]);
      });
    });

    it('should associate with an external form by id', async () => {
      const container = await fixture<HTMLDivElement>(html`
        <div>
          <form id="date-picker-test-form"></form>
          <syn-date-picker form="date-picker-test-form" name="date" value="2026-10-15"></syn-date-picker>
        </div>
      `);
      const form = container.querySelector('form')!;
      const picker = container.querySelector<SynDatePicker>('syn-date-picker')!;
      await elementUpdated(picker);

      expect(picker.getForm()).to.equal(form);
      expect(new FormData(form).getAll('date')).to.deep.equal(['2026-10-15']);
    });

    it('should block normal submission for an invalid draft while retaining the committed form value', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form><syn-date-picker lang="en-US" name="date" value="2026-10-15"></syn-date-picker></form>
      `);
      const picker = form.querySelector<SynDatePicker>('syn-date-picker')!;
      const submit = sinon.spy((event: Event) => event.preventDefault());
      form.addEventListener('submit', submit);
      await enterField(picker, 'year', '2');
      form.requestSubmit();

      expect(submit).to.not.have.been.called;
      expect(new FormData(form).get('date')).to.equal('2026-10-15');
    });

    it('should restore the default value and discard drafts on form reset', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form><syn-date-picker lang="en-US" name="date" value="2026-10-15"></syn-date-picker></form>
      `);
      const picker = form.querySelector<SynDatePicker>('syn-date-picker')!;
      picker.value = '2027-03-12';
      await elementUpdated(picker);
      await enterField(picker, 'year', '2');
      form.reset();
      await elementUpdated(picker);

      expect(picker.value).to.equal('2026-10-15');
      expect(getSegment(picker, 'year').textContent).to.equal('2026');
      expect(picker.checkValidity()).to.be.true;
    });

    it('should omit disabled and unnamed controls from form data', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <syn-date-picker disabled name="disabled" value="2026-10-15"></syn-date-picker>
          <syn-date-picker value="2026-10-15"></syn-date-picker>
        </form>
      `);
      await Promise.all(Array.from(form.querySelectorAll<SynDatePicker>('syn-date-picker'))
        .map(picker => elementUpdated(picker)));

      expect(Array.from(new FormData(form).entries())).to.deep.equal([]);
    });

    it('should expose required and custom validity and emit syn-invalid', async () => {
      const picker = await fixture<SynDatePicker>(html`<syn-date-picker required></syn-date-picker>`);
      const invalid = sinon.spy();
      picker.addEventListener('syn-invalid', invalid);
      expect(picker.checkValidity()).to.be.false;
      expect(picker.validity.valueMissing).to.be.true;
      expect(invalid).to.have.been.calledOnce;

      picker.value = '2026-10-15';
      await elementUpdated(picker);
      expect(picker.checkValidity()).to.be.true;
      picker.setCustomValidity('Unavailable');
      expect(picker.validationMessage).to.equal('Unavailable');
      expect(picker.checkValidity()).to.be.false;
      picker.setCustomValidity('');
      expect(picker.checkValidity()).to.be.true;
    });

    it('should retain out-of-bounds programmatic values but report their invalidity', async () => {
      const picker = await fixture<SynDatePicker>(html`
        <syn-date-picker min="2026-10-10" max="2026-10-20" value="2026-10-05"></syn-date-picker>
      `);
      expect(picker.value).to.equal('2026-10-05');
      expect(picker.checkValidity()).to.be.false;
      picker.value = '2026-10-15';
      await elementUpdated(picker);
      expect(picker.checkValidity()).to.be.true;
      picker.value = '2026-10-25';
      await elementUpdated(picker);
      expect(picker.checkValidity()).to.be.false;
    });

    it('should apply disabled dates, weekdays and predicates to validation', async () => {
      const picker = await fixture<SynDatePicker>(html`
        <syn-date-picker value="2026-10-15" disabled-dates="2026-10-15"></syn-date-picker>
      `);
      expect(picker.checkValidity()).to.be.false;
      picker.disabledDates = [];
      picker.disabledWeekdays = ['thu'];
      await elementUpdated(picker);
      expect(picker.checkValidity()).to.be.false;
      picker.disabledWeekdays = [];
      picker.isDateDisabled = date => date.getUTCDate() === 15;
      await elementUpdated(picker);
      expect(picker.checkValidity()).to.be.false;
      picker.isDateDisabled = undefined;
      await elementUpdated(picker);
      expect(picker.checkValidity()).to.be.true;
    });

    it('should validate inclusive range length without changing the assigned endpoints', async () => {
      const picker = await fixture<SynDatePicker>(html`
        <syn-date-picker mode="range" min-range="3" max-range="5" value="2026-10-01 2026-10-02"></syn-date-picker>
      `);
      expect(picker.checkValidity()).to.be.false;
      picker.value = '2026-10-01 2026-10-05';
      await elementUpdated(picker);
      expect(picker.checkValidity()).to.be.true;
      picker.value = '2026-10-01 2026-10-06';
      await elementUpdated(picker);
      expect(picker.checkValidity()).to.be.false;
      expect(picker.value).to.equal('2026-10-01 2026-10-06');
    });

    it('should focus a visible segment when reporting an incomplete draft', async () => {
      const picker = await fixture<SynDatePicker>(html`
        <syn-date-picker lang="en-US" value="2026-10-15"></syn-date-picker>
      `);
      await enterField(picker, 'year', '2');
      expect(picker.reportValidity()).to.be.false;
      await elementUpdated(picker);

      expect(picker.shadowRoot!.activeElement).to.equal(getSegment(picker, 'year'));
      expect(getSegment(picker, 'year').getAttribute('aria-invalid')).to.equal('true');
    });
  });
});
