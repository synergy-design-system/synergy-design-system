/* eslint-disable */
import '../../../dist/synergy.js';
import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';

import { longPress } from './longpress.js';

describe('longpress directive', () => {

  it('should call start and end callback once on single click', async () => {
    const startCallback = sinon.spy();
    const endCallback = sinon.spy();
    const button =  await fixture(html`
      <button
        ${longPress({ start: startCallback, end: endCallback })}
      >
        my button
      </button>
    `);
    button.dispatchEvent(new PointerEvent('pointerdown', { button: 0 }));
    document.dispatchEvent(new PointerEvent('pointerup', { button: 0 }));
    expect(startCallback.callCount).to.equal(1);
    expect(endCallback.callCount).to.equal(1);
  });

  it('should call start callback repeatedly on long press', async () => {
    const startCallback = sinon.spy();
    const endCallback = sinon.spy();
    const button =  await fixture(html`
      <button
        ${longPress({ start: startCallback, end: endCallback })}
      >
        my button
      </button>
    `);
    button.dispatchEvent(new PointerEvent('pointerdown', { button: 0 }));
    await aTimeout(700); // wait for long press duration
    document.dispatchEvent(new PointerEvent('pointerup', { button: 0 }));

    expect(startCallback.callCount).to.be.greaterThan(1);
    expect(endCallback.callCount).to.equal(1);
  });


  it('should not call callbacks if button is disabled', async () => {
    const startCallback = sinon.spy();
    const endCallback = sinon.spy();
    const button =  await fixture(html`
      <button
        disabled
        ${longPress({ start: startCallback, end: endCallback })}
      >
        my button
      </button>
    `);
    button.dispatchEvent(new PointerEvent('pointerdown', { button: 0 }));
    document.dispatchEvent(new PointerEvent('pointerup', { button: 0 }));

    expect(startCallback.callCount).to.equal(0);
    expect(endCallback.callCount).to.equal(0);
  });

  it('should stop calling start callback if button is disabled during long press', async () => {
    const startCallback = sinon.spy();
    const endCallback = sinon.spy();
    const button = await fixture(html`
      <button
        ${longPress({ start: startCallback, end: endCallback })}
      >
        my button
      </button>
    `) as HTMLButtonElement;
    button.dispatchEvent(new PointerEvent('pointerdown', { button: 0 }));
    await aTimeout(700); // wait for long press duration
    const currentCallCount = startCallback.callCount;
    button.disabled = true; // disable the button during long press
    await aTimeout(100); // wait a bit more to ensure no more calls are made
    document.dispatchEvent(new PointerEvent('pointerup', { button: 0 }));
    expect(startCallback.callCount).to.equal(currentCallCount);
    expect(endCallback.callCount).to.equal(1);
  });

});
