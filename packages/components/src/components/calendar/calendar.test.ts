import {
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import sinon from 'sinon';
import '../../../dist/synergy.js';
import type SynCalendar from './calendar.js';

describe('<syn-calendar>', () => {
  const getItem = (calendar: SynCalendar, kind: string, value: string) => (
    calendar.shadowRoot!.querySelector<HTMLButtonElement>(`[data-kind="${kind}"][data-value="${value}"]`)
  );

  const clickItem = async (calendar: SynCalendar, kind: string, value: string) => {
    const item = getItem(calendar, kind, value);
    expect(item, `Expected ${kind} item ${value} to be rendered`).to.exist;
    item!.click();
    await elementUpdated(calendar);
  };

  it('should expose the documented default properties', async () => {
    const calendar = await fixture<SynCalendar>(html`<syn-calendar></syn-calendar>`);

    expect(calendar.disabled).to.be.false;
    expect(calendar.disabledDates).to.deep.equal([]);
    expect(calendar.disabledWeekdays).to.deep.equal([]);
    expect(calendar.isDateDisabled).to.be.undefined;
    expect(calendar.min).to.equal('');
    expect(calendar.max).to.equal('');
    expect(calendar.minRange).to.be.undefined;
    expect(calendar.maxRange).to.be.undefined;
    expect(calendar.mode).to.equal('single');
    expect(calendar.readonly).to.be.false;
    expect(calendar.value).to.deep.equal([]);
    expect(calendar.size).to.equal('medium');
  });

  describe('value and mode normalization', () => {
    it('should parse date and weekday attributes, ignoring invalid values and duplicates', async () => {
      const calendar = await fixture<SynCalendar>(html`
        <syn-calendar
          disabled-dates="2026-10-15 invalid 2026-10-15"
          disabled-weekdays="SUN mon sun invalid"
          mode="unknown"
          value="2026-10-20 2026-10-15 2026-10-20"
        ></syn-calendar>
      `);

      expect(calendar.disabledDates).to.deep.equal(['2026-10-15']);
      expect(calendar.disabledWeekdays).to.deep.equal(['sun', 'mon']);
      expect(calendar.mode).to.equal('single');
      expect(calendar.value).to.deep.equal(['2026-10-15']);
    });

    it('should reject the whole attribute-derived selection when any date is malformed', async () => {
      const calendar = await fixture<SynCalendar>(html`
        <syn-calendar value="2026-10-15 2026-02-31"></syn-calendar>
      `);

      expect(calendar.value).to.deep.equal([]);
    });

    it('should normalize assigned values without applying selection constraints or emitting user events', async () => {
      const calendar = await fixture<SynCalendar>(html`
        <syn-calendar mode="multiple" min="2026-10-20"></syn-calendar>
      `);
      const input = sinon.spy();
      const change = sinon.spy();
      calendar.addEventListener('syn-input', input);
      calendar.addEventListener('syn-change', change);

      calendar.value = ['2026-10-25', '2026-10-15', '2026-10-25'];
      await elementUpdated(calendar);

      expect(calendar.value).to.deep.equal(['2026-10-15', '2026-10-25']);
      expect(input).to.not.have.been.called;
      expect(change).to.not.have.been.called;
    });

    it('should convert range endpoints to distinct multiple values without expanding interior dates', async () => {
      const calendar = await fixture<SynCalendar>(html`
        <syn-calendar mode="range" value="2026-10-05 2026-10-10"></syn-calendar>
      `);
      calendar.mode = 'multiple';
      await elementUpdated(calendar);

      expect(calendar.value).to.deep.equal(['2026-10-05', '2026-10-10']);
    });

    it('should keep only the earliest date when changing to single mode', async () => {
      const calendar = await fixture<SynCalendar>(html`
        <syn-calendar mode="multiple" value="2026-10-15 2026-10-20"></syn-calendar>
      `);
      calendar.mode = 'single';
      await elementUpdated(calendar);

      expect(calendar.value).to.deep.equal(['2026-10-15']);
    });

    it('should expose valueAsDates as UTC date-only values and ignore invalid dates on assignment', async () => {
      const calendar = await fixture<SynCalendar>(html`<syn-calendar></syn-calendar>`);
      const localDate = new Date('2026-10-15T23:30:00-02:00');
      calendar.valueAsDates = [localDate, new Date(Number.NaN)];
      await elementUpdated(calendar);

      expect(calendar.value).to.deep.equal(['2026-10-16']);
      expect(calendar.valueAsDates[0].toISOString()).to.equal('2026-10-16T00:00:00.000Z');
      calendar.valueAsDates = null;
      await elementUpdated(calendar);
      expect(calendar.value).to.deep.equal([]);
    });
  });

  describe('selection modes and events', () => {
    it('should replace the selection in single mode and emit cancelable change events', async () => {
      const calendar = await fixture<SynCalendar>(html`
        <syn-calendar mode="single" value="2026-10-01"></syn-calendar>
      `);
      const before = sinon.spy();
      const input = sinon.spy();
      const change = sinon.spy();
      calendar.addEventListener('syn-before-change', before);
      calendar.addEventListener('syn-input', input);
      calendar.addEventListener('syn-change', change);

      await clickItem(calendar, 'day', '2026-10-15');

      expect(calendar.value).to.deep.equal(['2026-10-15']);
      expect(before).to.have.been.calledOnce;
      expect((before.firstCall.args[0] as CustomEvent).cancelable).to.be.true;
      expect(((before.firstCall.args[0] as CustomEvent).target as SynCalendar).value).to.deep.equal(['2026-10-15']);
      expect(input).to.have.been.calledOnce;
      expect(change).to.have.been.calledOnce;
    });

    it('should restore the previous single selection when syn-before-change is canceled', async () => {
      const calendar = await fixture<SynCalendar>(html`
        <syn-calendar mode="single" value="2026-10-01"></syn-calendar>
      `);
      const input = sinon.spy();
      const change = sinon.spy();
      calendar.addEventListener('syn-before-change', (event: Event) => event.preventDefault());
      calendar.addEventListener('syn-input', input);
      calendar.addEventListener('syn-change', change);

      await clickItem(calendar, 'day', '2026-10-15');

      expect(calendar.value).to.deep.equal(['2026-10-01']);
      expect(input).to.not.have.been.called;
      expect(change).to.not.have.been.called;
    });

    it('should keep the first range endpoint pending until a valid second endpoint is chosen', async () => {
      const calendar = await fixture<SynCalendar>(html`<syn-calendar mode="range"></syn-calendar>`);
      const before = sinon.spy();
      const input = sinon.spy();
      const change = sinon.spy();
      calendar.addEventListener('syn-before-change', before);
      calendar.addEventListener('syn-input', input);
      calendar.addEventListener('syn-change', change);

      await clickItem(calendar, 'day', '2026-10-05');
      expect(calendar.value).to.deep.equal(['2026-10-05']);
      expect(before).to.not.have.been.called;
      expect(input).to.have.been.calledOnce;
      expect(change).to.not.have.been.called;

      await clickItem(calendar, 'day', '2026-10-10');
      expect(calendar.value).to.deep.equal(['2026-10-05', '2026-10-10']);
      expect(before).to.have.been.calledOnce;
      expect(input).to.have.been.calledTwice;
      expect(change).to.have.been.calledOnce;
    });

    it('should restart a pending range when a new range anchor is chosen', async () => {
      const calendar = await fixture<SynCalendar>(html`
        <syn-calendar mode="range" value="2026-10-05"></syn-calendar>
      `);

      await clickItem(calendar, 'day', '2026-10-10');
      expect(calendar.value).to.deep.equal(['2026-10-05', '2026-10-10']);
      await clickItem(calendar, 'day', '2026-10-15');
      expect(calendar.value).to.deep.equal(['2026-10-15']);
    });

    it('should snap a range endpoint to max-range in either direction', async () => {
      const forward = await fixture<SynCalendar>(html`
        <syn-calendar mode="range" max-range="3" value="2026-10-05"></syn-calendar>
      `);
      await clickItem(forward, 'day', '2026-10-10');
      expect(forward.value).to.deep.equal(['2026-10-05', '2026-10-07']);

      const reverse = await fixture<SynCalendar>(html`
        <syn-calendar mode="range" max-range="3" value="2026-10-10"></syn-calendar>
      `);
      await clickItem(reverse, 'day', '2026-10-05');
      expect(reverse.value).to.deep.equal(['2026-10-08', '2026-10-10']);
    });

    it('should not commit a range whose adjusted endpoint is disabled', async () => {
      const calendar = await fixture<SynCalendar>(html`
        <syn-calendar mode="range" max-range="3" disabled-dates="2026-10-07" value="2026-10-05"></syn-calendar>
      `);
      const change = sinon.spy();
      calendar.addEventListener('syn-change', change);

      await clickItem(calendar, 'day', '2026-10-10');

      expect(calendar.value).to.deep.equal(['2026-10-05']);
      expect(change).to.not.have.been.called;
    });

    it('should expand a too-short min-range endpoint and emit a committed range', async () => {
      const calendar = await fixture<SynCalendar>(html`
        <syn-calendar mode="range" min-range="3" value="2026-10-05"></syn-calendar>
      `);
      const before = sinon.spy();
      const change = sinon.spy();
      calendar.addEventListener('syn-before-change', before);
      calendar.addEventListener('syn-change', change);

      await clickItem(calendar, 'day', '2026-10-06');

      expect(calendar.value).to.deep.equal(['2026-10-05', '2026-10-07']);
      expect(before).to.have.been.calledOnce;
      expect(change).to.have.been.calledOnce;
    });

    it('should restore the pending range when its completion is canceled', async () => {
      const calendar = await fixture<SynCalendar>(html`
        <syn-calendar mode="range" value="2026-10-05"></syn-calendar>
      `);
      await elementUpdated(calendar);
      const input = sinon.spy();
      const change = sinon.spy();
      calendar.addEventListener('syn-before-change', (event: Event) => event.preventDefault());
      calendar.addEventListener('syn-input', input);
      calendar.addEventListener('syn-change', change);

      await clickItem(calendar, 'day', '2026-10-10');

      expect(calendar.value).to.deep.equal(['2026-10-05']);
      expect(input).to.not.have.been.called;
      expect(change).to.not.have.been.called;
    });

    it('should suppress custom value and focus events when disabled or readonly', async () => {
      const calendar = await fixture<SynCalendar>(html`<syn-calendar value="2026-10-15"></syn-calendar>`);
      const focus = sinon.spy();
      const blur = sinon.spy();
      const input = sinon.spy();
      const change = sinon.spy();
      calendar.addEventListener('syn-focus', focus);
      calendar.addEventListener('syn-blur', blur);
      calendar.addEventListener('syn-input', input);
      calendar.addEventListener('syn-change', change);

      calendar.disabled = true;
      await elementUpdated(calendar);
      calendar.focus();
      expect(focus).to.not.have.been.called;

      calendar.disabled = false;
      calendar.readonly = true;
      await elementUpdated(calendar);
      calendar.shadowRoot!.querySelector<HTMLButtonElement>('[data-kind="day"][tabindex="0"]')!.focus();
      await clickItem(calendar, 'day', '2026-10-16');
      calendar.shadowRoot!.querySelector<HTMLButtonElement>('[data-kind="day"][tabindex="0"]')!.blur();

      expect(calendar.value).to.deep.equal(['2026-10-15']);
      expect(focus).to.not.have.been.called;
      expect(blur).to.not.have.been.called;
      expect(input).to.not.have.been.called;
      expect(change).to.not.have.been.called;
    });

    it('should toggle and sort dates in multiple mode', async () => {
      const calendar = await fixture<SynCalendar>(html`<syn-calendar mode="multiple"></syn-calendar>`);
      await clickItem(calendar, 'day', '2026-10-20');
      await clickItem(calendar, 'day', '2026-10-15');
      expect(calendar.value).to.deep.equal(['2026-10-15', '2026-10-20']);

      await clickItem(calendar, 'day', '2026-10-20');
      expect(calendar.value).to.deep.equal(['2026-10-15']);
    });

    it('should clear through the same cancelable user-change pipeline', async () => {
      const calendar = await fixture<SynCalendar>(html`
        <syn-calendar mode="multiple" value="2026-10-15 2026-10-20"></syn-calendar>
      `);
      const before = sinon.spy();
      const clear = sinon.spy();
      const input = sinon.spy();
      const change = sinon.spy();
      calendar.addEventListener('syn-before-change', before);
      calendar.addEventListener('syn-clear', clear);
      calendar.addEventListener('syn-input', input);
      calendar.addEventListener('syn-change', change);

      calendar.shadowRoot!.querySelector<HTMLElement>('[part~="clear-button"]')!.click();
      await elementUpdated(calendar);

      expect(calendar.value).to.deep.equal([]);
      expect(before).to.have.been.calledOnce;
      expect(clear).to.have.been.calledOnce;
      expect(input).to.have.been.calledOnce;
      expect(change).to.have.been.calledOnce;
    });
  });

  describe('constraints and rendered item states', () => {
    it('should disable dates outside inclusive min/max bounds and explicit disabled dates/weekdays', async () => {
      const calendar = await fixture<SynCalendar>(html`
        <syn-calendar
          disabled-dates="2026-10-15"
          disabled-weekdays="sun"
          max="2026-10-20"
          min="2026-10-10"
          value="2026-10-15"
        ></syn-calendar>
      `);

      expect(getItem(calendar, 'day', '2026-10-09')!.disabled).to.be.true;
      expect(getItem(calendar, 'day', '2026-10-15')!.disabled).to.be.true;
      expect(getItem(calendar, 'day', '2026-10-18')!.disabled).to.be.true;
      expect(getItem(calendar, 'day', '2026-10-20')!.disabled).to.be.false;
      expect(getItem(calendar, 'day', '2026-10-21')!.disabled).to.be.true;
    });

    it('should preserve programmatically assigned dates even when they are unavailable', async () => {
      const calendar = await fixture<SynCalendar>(html`
        <syn-calendar min="2026-10-20" value="2026-10-15"></syn-calendar>
      `);
      expect(calendar.value).to.deep.equal(['2026-10-15']);
      expect(getItem(calendar, 'day', '2026-10-15')!.disabled).to.be.true;
    });

    it('should pass UTC date-only Date values to the custom disabled predicate', async () => {
      const predicate = sinon.spy((date: Date) => date.getUTCDate() === 15);
      const calendar = await fixture<SynCalendar>(html`<syn-calendar></syn-calendar>`);
      calendar.isDateDisabled = predicate;
      await elementUpdated(calendar);

      expect(getItem(calendar, 'day', '2026-10-15')!.disabled).to.be.true;
      expect(predicate).to.have.been.called;
      expect(predicate.firstCall.args[0].getUTCHours()).to.equal(0);
    });

    it('should fail closed when a custom predicate throws without breaking rendering', async () => {
      const predicate = () => { throw new Error('test predicate failure'); };
      const warning = sinon.stub(console, 'warn');
      try {
        const calendar = await fixture<SynCalendar>(html`<syn-calendar></syn-calendar>`);
        calendar.isDateDisabled = predicate;
        await elementUpdated(calendar);

        expect(getItem(calendar, 'day', '2026-10-15')!.disabled).to.be.true;
        expect(getItem(calendar, 'day', '2026-10-16')!.disabled).to.be.true;
        expect(warning).to.have.been.calledOnce;
      } finally {
        warning.restore();
      }
    });

    it('should apply disabled and readonly states without clearing the assigned selection', async () => {
      const calendar = await fixture<SynCalendar>(html`
        <syn-calendar mode="multiple" value="2026-10-15 2026-10-20"></syn-calendar>
      `);
      calendar.disabled = true;
      await elementUpdated(calendar);
      expect(calendar.value).to.deep.equal(['2026-10-15', '2026-10-20']);
      expect(calendar.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!.hasAttribute('inert')).to.be.true;
      expect(calendar.shadowRoot!.querySelectorAll<HTMLButtonElement>('[data-kind="day"]:disabled').length).to.be.greaterThan(0);

      calendar.disabled = false;
      calendar.readonly = true;
      await elementUpdated(calendar);
      expect(calendar.value).to.deep.equal(['2026-10-15', '2026-10-20']);
      expect(calendar.shadowRoot!.querySelectorAll<HTMLButtonElement>('[data-kind="day"]:disabled').length).to.equal(0);
    });
  });

  describe('keyboard navigation and focus', () => {
    it('should move by a day horizontally and a week vertically, skipping unavailable dates', async () => {
      const calendar = await fixture<SynCalendar>(html`
        <syn-calendar disabled-dates="2026-10-14" value="2026-10-15"></syn-calendar>
      `);
      const start = getItem(calendar, 'day', '2026-10-15')!;
      start.focus();
      start.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowLeft' }));
      await elementUpdated(calendar);
      expect(calendar.shadowRoot!.activeElement?.getAttribute('data-value')).to.equal('2026-10-13');

      calendar.shadowRoot!.activeElement!.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowDown' }));
      await elementUpdated(calendar);
      expect(calendar.shadowRoot!.activeElement?.getAttribute('data-value')).to.equal('2026-10-20');
    });

    it('should follow visual horizontal direction in RTL', async () => {
      const calendar = await fixture<SynCalendar>(html`<syn-calendar dir="rtl" value="2026-10-15"></syn-calendar>`);
      getItem(calendar, 'day', '2026-10-15')!.focus();
      calendar.shadowRoot!.activeElement!.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowRight' }));
      await elementUpdated(calendar);

      expect(calendar.shadowRoot!.activeElement?.getAttribute('data-value')).to.equal('2026-10-14');
    });

    it('should focus the active view grid item and blur the actual nested control', async () => {
      const calendar = await fixture<SynCalendar>(html`<syn-calendar value="2026-10-15"></syn-calendar>`);
      expect(calendar.shadowRoot!.activeElement).to.be.null;
      calendar.focus();
      expect(calendar.shadowRoot!.activeElement?.getAttribute('data-kind')).to.equal('day');
      calendar.blur();
      expect(calendar.shadowRoot!.activeElement).to.be.null;
    });

    it('should restore the last focused header control when focus() is called again', async () => {
      const calendar = await fixture<SynCalendar>(html`<syn-calendar value="2026-10-15"></syn-calendar>`);
      const next = calendar.shadowRoot!.querySelector<HTMLElement>('[part~="next-button"]')!;
      next.focus();
      calendar.blur();
      calendar.focus();

      expect(calendar.shadowRoot!.activeElement).to.equal(next);
    });

    it('should not steal focus on initial render or when a header control is focused during normalization', async () => {
      const calendar = await fixture<SynCalendar>(html`<syn-calendar value="2026-10-15"></syn-calendar>`);
      expect(calendar.shadowRoot!.activeElement).to.be.null;

      const next = calendar.shadowRoot!.querySelector<HTMLElement>('[part~="next-button"]')!;
      next.focus();
      calendar.min = '2026-10-01';
      await elementUpdated(calendar);
      expect(calendar.shadowRoot!.activeElement).to.equal(next);
    });

    it('should restore the remembered grid item when tabbing forward back into the calendar', async () => {
      const calendar = await fixture<SynCalendar>(html`<syn-calendar value="2026-10-15"></syn-calendar>`);
      const day = getItem(calendar, 'day', '2026-10-12')!;
      day.focus();
      calendar.blur();
      const keydown = new KeyboardEvent('keydown', { bubbles: true, cancelable: true, key: 'Tab' });
      document.dispatchEvent(keydown);
      day.focus();

      expect(calendar.shadowRoot!.activeElement?.getAttribute('data-value')).to.equal('2026-10-12');
    });

    it('should not focus a disabled calendar when focus() is called', async () => {
      const calendar = await fixture<SynCalendar>(html`<syn-calendar disabled></syn-calendar>`);
      calendar.focus();
      expect(calendar.shadowRoot!.activeElement).to.be.null;
    });
  });

  describe('locale, slots, and public parts', () => {
    it('should render locale-specific weekday labels and update when lang changes', async () => {
      const calendar = await fixture<SynCalendar>(html`<syn-calendar lang="en-US"></syn-calendar>`);
      const getWeekdays = () => Array.from(calendar.shadowRoot!.querySelectorAll('[part~="weekday"]'))
        .map(element => element.textContent?.trim());
      const english = getWeekdays();

      calendar.lang = 'de-DE';
      await elementUpdated(calendar);
      const german = getWeekdays();

      expect(english).to.not.deep.equal(german);
      expect(calendar.value).to.deep.equal([]);
    });

    it('should fall back to English formatting for a malformed locale without throwing', async () => {
      const calendar = await fixture<SynCalendar>(html`<syn-calendar lang="invalid_locale_tag"></syn-calendar>`);
      await elementUpdated(calendar);

      expect(calendar.shadowRoot!.querySelectorAll('[part~="weekday"]')).to.have.length(7);
      expect(calendar.value).to.deep.equal([]);
    });

    it('should preserve locale-sensitive RTL direction when changing locale at runtime', async () => {
      const calendar = await fixture<SynCalendar>(html`<syn-calendar value="2026-10-15"></syn-calendar>`);
      calendar.dir = 'rtl';
      calendar.lang = 'ar';
      await elementUpdated(calendar);

      expect(calendar.shadowRoot!.querySelector('[part~="base"]')!.classList.contains('calendar--rtl')).to.be.true;
      expect(calendar.value).to.deep.equal(['2026-10-15']);
    });

    it('should forward dynamic day content to its rendered calendar item', async () => {
      const calendar = await fixture<SynCalendar>(html`
        <syn-calendar value="2026-10-15">
          <span slot="day-2026-10-15">Holiday</span>
        </syn-calendar>
      `);
      const slot = calendar.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="day-2026-10-15"]')!;
      expect(slot.assignedElements()[0]).to.equal(calendar.querySelector('[slot="day-2026-10-15"]'));
    });

    it('should forward month and year slots in their respective views', async () => {
      const calendar = await fixture<SynCalendar>(html`
        <syn-calendar value="2026-10-15">
          <span slot="month-9">October label</span>
          <span slot="year-2026">Year label</span>
        </syn-calendar>
      `);

      calendar.shadowRoot!.querySelector<HTMLElement>('[part~="month-navigation"] syn-button')!.click();
      await elementUpdated(calendar);
      expect(calendar.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="month-9"]')!.assignedElements()[0])
        .to.equal(calendar.querySelector('[slot="month-9"]'));

      calendar.shadowRoot!.querySelector<HTMLElement>('[part~="year-navigation"] syn-button')!.click();
      await elementUpdated(calendar);
      expect(calendar.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="year-2026"]')!.assignedElements()[0])
        .to.equal(calendar.querySelector('[slot="year-2026"]'));
    });

    it('should expose the documented range boundary parts and accessible selection states', async () => {
      const calendar = await fixture<SynCalendar>(html`
        <syn-calendar mode="range" value="2026-10-05 2026-10-10"></syn-calendar>
      `);
      const start = getItem(calendar, 'day', '2026-10-05')!;
      const interior = getItem(calendar, 'day', '2026-10-06')!;
      const end = getItem(calendar, 'day', '2026-10-10')!;

      expect(start.getAttribute('part')).to.include('calendar-item-range-start');
      expect(interior.getAttribute('part')).to.include('calendar-item-range-interior');
      expect(end.getAttribute('part')).to.include('calendar-item-range-end');
      expect(start.getAttribute('aria-pressed')).to.equal('true');
    });
  });
});
