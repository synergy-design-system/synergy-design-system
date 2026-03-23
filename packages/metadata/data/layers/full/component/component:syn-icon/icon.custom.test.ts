import {
  aTimeout, elementUpdated, expect, fixture, html,
} from '@open-wc/testing';
import { registerIconLibrary } from '../../../dist/synergy.js';
import type SynIcon from './icon.js';

describe('<syn-icon>', () => {
  describe('svg sprite sheets', () => {
    it('Should change size of icon even if "width" and "height" on an sprite svg was set', async () => {
      registerIconLibrary('sprite', {
        mutator: svg => svg.setAttribute('fill', 'currentColor'),
        resolver: name => `/public/sprite.svg#${name}`,
        spriteSheet: true,
      });

      const el = await fixture<SynIcon>(html`
        <div style="font-size: 24px">
          <syn-icon name="refresh" library="sprite"></syn-icon>
        </div>
      `);
      const icon = el.querySelector('syn-icon')!;

      await elementUpdated(icon);

      const svg = icon.shadowRoot!.querySelector("svg[part='svg']")!;
      const use = svg.querySelector("use[href='/public/sprite.svg#refresh']")!;

      expect(svg).to.be.instanceof(SVGElement);
      expect(use).to.be.instanceof(SVGUseElement);

      // This is kind of hacky...but with no way to check "load", we just use a timeout
      await aTimeout(1000);

      const initialRect = use.getBoundingClientRect();

      const initialWidth = initialRect.width;
      const initialHeight = initialRect.height;

      el.style.fontSize = '48px';
      await elementUpdated(icon);

      const changedRect = use.getBoundingClientRect();

      expect(initialHeight).to.be.greaterThan(0);
      expect(initialWidth).to.be.greaterThan(0);
      expect(changedRect.width).to.be.greaterThan(initialWidth);
      expect(changedRect.height).to.be.greaterThan(initialHeight);
    });

    it('Should change size of icon without "width" and "height" set on an sprite svg', async () => {
      registerIconLibrary('sprite', {
        mutator: svg => svg.setAttribute('fill', 'currentColor'),
        resolver: name => `/public/sprite.svg#${name}`,
        spriteSheet: true,
      });

      const el = await fixture<SynIcon>(html`
        <div style="font-size: 24px">
          <syn-icon name="refreshWithoutWidth" library="sprite"></syn-icon>
        </div>
      `);
      const icon = el.querySelector('syn-icon')!;

      await elementUpdated(icon);

      const svg = icon.shadowRoot!.querySelector("svg[part='svg']")!;
      const use = svg.querySelector("use[href='/public/sprite.svg#refreshWithoutWidth']")!;

      expect(svg).to.be.instanceof(SVGElement);
      expect(use).to.be.instanceof(SVGUseElement);

      // This is kind of hacky...but with no way to check "load", we just use a timeout
      await aTimeout(1000);

      const initialRect = use.getBoundingClientRect();

      const initialWidth = initialRect.width;
      const initialHeight = initialRect.height;

      el.style.fontSize = '48px';
      await elementUpdated(icon);

      const changedRect = use.getBoundingClientRect();

      expect(initialHeight).to.be.greaterThan(0);
      expect(initialWidth).to.be.greaterThan(0);
      expect(changedRect.width).to.be.greaterThan(initialWidth);
      expect(changedRect.height).to.be.greaterThan(initialHeight);
    });
  });
});
