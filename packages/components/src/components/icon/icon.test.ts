/* eslint-disable */
import { aTimeout, elementUpdated, expect, fixture, html, oneEvent } from '@open-wc/testing';
import { getBasePath, setBasePath } from '../../../dist/synergy.js';
import { getIconLibrary } from '../../../dist/components/icon/library.js';
import { getIconDataURL, registerIconLibrary, unregisterIconLibrary } from '../../../dist/utilities/icon-library.js';
import sinon from 'sinon';
import type { SynErrorEvent } from '../../events/syn-error.js';
import type { SynLoadEvent } from '../../events/syn-load.js';
import type SynIcon from './icon.js';

const testLibraryIcons = {
  'test-icon1': `
    <svg id="test-icon1">
      <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"></path>
    </svg>
  `,
  'test-icon2': `
    <svg id="test-icon2">
    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"></path>
    </svg>
  `,
  'bad-icon': `<div></div>`
};

describe('<syn-icon>', () => {
  before(() => {
    registerIconLibrary('test-library', {
      resolver: (name: keyof typeof testLibraryIcons) => {
        // only for testing a bad request
        if (name === ('bad-request' as keyof typeof testLibraryIcons)) {
          return `data:image/svg+xml`;
        }

        if (name in testLibraryIcons) {
          return `data:image/svg+xml,${encodeURIComponent(testLibraryIcons[name])}`;
        }
        return '';
      },
      mutator: (svg: SVGElement) => svg.setAttribute('fill', 'currentColor')
    });
  });

  describe('defaults ', () => {
    it('default properties', async () => {
      const el = await fixture<SynIcon>(html` <syn-icon></syn-icon> `);

      expect(el.name).to.be.undefined;
      expect(el.src).to.be.undefined;
      expect(el.label).to.equal('');
      expect(el.library).to.equal('default');
    });

    it('renders pre-loaded system icons and emits syn-load event', async () => {
      const el = await fixture<SynIcon>(html` <syn-icon library="system"></syn-icon> `);
      const listener = oneEvent(el, 'syn-load') as Promise<SynLoadEvent>;

      el.name = 'check';
      const ev = await listener;
      await elementUpdated(el);

      expect(el.shadowRoot?.querySelector('svg')).to.exist;
      expect(ev).to.exist;
    });

    it('the icon is accessible', async () => {
      const el = await fixture<SynIcon>(html` <syn-icon library="system" name="check"></syn-icon> `);
      await expect(el).to.be.accessible();
    });

    it('the icon has the correct default aria attributes', async () => {
      const el = await fixture<SynIcon>(html` <syn-icon library="system" name="check"></syn-icon> `);

      expect(el.getAttribute('role')).to.be.null;
      expect(el.getAttribute('aria-label')).to.be.null;
      expect(el.getAttribute('aria-hidden')).to.equal('true');
    });
  });

  describe('when a label is provided', () => {
    it('the icon has the correct default aria attributes', async () => {
      const fakeLabel = 'a label';
      const el = await fixture<SynIcon>(html` <syn-icon label="${fakeLabel}" library="system" name="check"></syn-icon> `);

      expect(el.getAttribute('role')).to.equal('img');
      expect(el.getAttribute('aria-label')).to.equal(fakeLabel);
      expect(el.getAttribute('aria-hidden')).to.be.null;
    });
  });

  describe('when a valid src is provided', () => {
    it('the svg is rendered', async () => {
      const fakeId = 'test-src';
      const el = await fixture<SynIcon>(html` <syn-icon></syn-icon> `);

      const listener = oneEvent(el, 'syn-load');
      el.src = `data:image/svg+xml,${encodeURIComponent(`<svg id="${fakeId}"></svg>`)}`;

      await listener;
      await elementUpdated(el);

      expect(el.shadowRoot?.querySelector('svg')).to.exist;
      expect(el.shadowRoot?.querySelector('svg')?.part.contains('svg')).to.be.true;
      expect(el.shadowRoot?.querySelector('svg')?.getAttribute('id')).to.equal(fakeId);
    });
  });

  describe('new library', () => {
    it('renders icons from the new library and emits syn-load event', async () => {
      const el = await fixture<SynIcon>(html` <syn-icon library="test-library"></syn-icon> `);
      const listener = oneEvent(el, 'syn-load') as Promise<SynLoadEvent>;

      el.name = 'test-icon1';
      const ev = await listener;
      await elementUpdated(el);

      expect(el.shadowRoot?.querySelector('svg')).to.exist;
      expect(ev.isTrusted).to.exist;
    });

    describe('getIconDataURL', () => {
      let source: string;
      let sequence = 0;

      beforeEach(() => {
        source = `/helper-icon-${sequence++}.svg`;
        registerIconLibrary('helper', { resolver: () => source });
      });

      afterEach(() => {
        sinon.restore();
        unregisterIconLibrary('helper');
        unregisterIconLibrary('helper-other');
      });

      const decode = (dataURL: string) => new TextDecoder().decode(
        Uint8Array.from(atob(dataURL.split(',')[1]), character => character.charCodeAt(0))
      );

      const expectFailure = async (icon: string, library: string, message: string) => {
        await getIconDataURL(icon, library).then(
          () => expect.fail('Expected the icon load to reject'),
          (error: unknown) => {
            expect(error).to.be.instanceOf(Error);
            if (error instanceof Error) expect(error.message).to.include(message);
          }
        );
      };

      it('uses the default syn-icon resolver and configured base path', async () => {
        const originalLibrary = getIconLibrary('default')!;
        const originalBasePath = getBasePath();
        const fetchStub = sinon.stub(window, 'fetch').resolves(new Response('<svg></svg>'));

        try {
          setBasePath('/helper-base');
          const dataURL = await getIconDataURL('thermometer_fill');
          expect(fetchStub).to.have.been.calledOnceWithExactly(
            '/helper-base/assets/icons/thermometer_fill.svg',
            { mode: 'cors' }
          );
          expect(dataURL).to.match(/^data:image\/svg\+xml;base64,/);
          expect(decode(dataURL)).to.include('xmlns="http://www.w3.org/2000/svg"');
        } finally {
          setBasePath(originalBasePath);
          registerIconLibrary('default', originalLibrary);
        }
      });

      it('shares concurrent and successful loads with syn-icon', async () => {
        const fetchStub = sinon.stub(window, 'fetch').resolves(new Response('<svg id="shared"></svg>'));
        const el = await fixture<SynIcon>(html`<syn-icon library="helper"></syn-icon>`);
        const loaded = oneEvent(el, 'syn-load');
        el.name = 'custom-icon';

        const [first, second] = await Promise.all([
          getIconDataURL('custom-icon', 'helper'),
          getIconDataURL('custom-icon', 'helper'),
          loaded,
        ]);
        await elementUpdated(el);
        await getIconDataURL('custom-icon', 'helper');

        expect(first).to.equal(second);
        expect(el.shadowRoot?.querySelector('svg')?.id).to.equal('shared');
        expect(fetchStub).to.have.been.calledOnce;
      });

      it('applies mutators to independent clones and preserves UTF-8 SVG content', async () => {
        const fetchStub = sinon.stub(window, 'fetch').resolves(
          new Response('<svg><title>\u00fc</title></svg>')
        );
        registerIconLibrary('helper', {
          resolver: () => source,
          mutator: svg => svg.setAttribute('data-count', String(Number(svg.getAttribute('data-count')) + 1)),
        });
        registerIconLibrary('helper-other', {
          resolver: () => source,
          mutator: svg => svg.setAttribute('fill', 'pink'),
        });

        const first = await getIconDataURL('custom-icon', 'helper');
        const second = await getIconDataURL('custom-icon', 'helper');
        const other = await getIconDataURL('custom-icon', 'helper-other');
        const el = await fixture<SynIcon>(html`<syn-icon library="helper"></syn-icon>`);
        const loaded = oneEvent(el, 'syn-load');
        el.name = 'custom-icon';
        await loaded;
        await elementUpdated(el);

        expect(first).to.equal(second);
        expect(decode(first)).to.include('data-count="1"');
        expect(decode(first)).to.include('<title>\u00fc</title>');
        expect(decode(other)).to.include('fill="pink"').and.not.include('data-count');
        expect(el.shadowRoot?.querySelector('svg')?.getAttribute('data-count')).to.equal('1');
        expect(el.shadowRoot?.querySelector('svg')?.getAttribute('fill')).to.be.null;
        expect(fetchStub).to.have.been.calledOnce;
      });

      it('caches unchanged data URLs while running the current mutator for every call', async () => {
        sinon.stub(window, 'fetch').resolves(new Response('<svg><path d="M0 0h1v1z"/></svg>'));
        const encode = sinon.spy(window, 'btoa');
        let color = 'pink';
        const mutator = sinon.spy((svg: SVGElement) => svg.setAttribute('fill', color));
        registerIconLibrary('helper', { resolver: () => source, mutator });

        const [first, concurrent] = await Promise.all([
          getIconDataURL('custom-icon', 'helper'),
          getIconDataURL('custom-icon', 'helper'),
        ]);
        expect(first).to.equal(concurrent);
        expect(encode).to.have.been.calledOnce;
        expect(mutator).to.have.been.calledTwice;

        color = 'blue';
        const changed = await getIconDataURL('custom-icon', 'helper');
        expect(decode(changed)).to.include('fill="blue"');
        expect(changed).not.to.equal(first);
        expect(encode).to.have.been.calledTwice;
        expect(mutator).to.have.been.calledThrice;

        registerIconLibrary('helper', {
          resolver: () => source,
          mutator: svg => svg.setAttribute('fill', 'green'),
        });
        const replaced = await getIconDataURL('custom-icon', 'helper');
        expect(decode(replaced)).to.include('fill="green"');
        expect(encode).to.have.been.calledThrice;
      });

      it('caches encoded spritesheet icons without sharing their mutator changes', async () => {
        sinon.stub(window, 'fetch').resolves(new Response(
          '<svg><symbol id="icon" viewBox="0 0 24 24"><path d="M0 0h1v1z"/></symbol></svg>'
        ));
        const encode = sinon.spy(window, 'btoa');
        const mutator = sinon.spy((svg: SVGElement) => svg.setAttribute('fill', 'pink'));
        registerIconLibrary('helper', {
          resolver: () => `${source}#icon`,
          spriteSheet: true,
          mutator,
        });
        const first = await getIconDataURL('icon', 'helper');
        const second = await getIconDataURL('icon', 'helper');
        expect(first).to.equal(second);
        expect(encode).to.have.been.calledOnce;
        expect(mutator).to.have.been.calledTwice;
        expect(decode(second)).to.include('fill="pink"');
      });

      it('loads bundled system icons without fetching', async () => {
        const fetchStub = sinon.stub(window, 'fetch');
        const dataURL = await getIconDataURL('check', 'system');
        expect(decode(dataURL)).to.include('<svg');
        expect(fetchStub).not.to.have.been.called;
      });

      it('rejects unknown libraries and missing sources without fetching or logging', async () => {
        const fetchStub = sinon.stub(window, 'fetch');
        const log = sinon.spy(console, 'error');
        const warn = sinon.spy(console, 'warn');
        await expectFailure('custom-icon', 'missing-library', 'not registered');
        registerIconLibrary('helper', { resolver: () => '' });
        await expectFailure('custom-icon', 'helper', 'no source');
        expect(fetchStub).not.to.have.been.called;
        expect(log).not.to.have.been.called;
        expect(warn).not.to.have.been.called;
      });

      it('rejects resolver and mutator exceptions', async () => {
        const resolverError = new Error('resolver failed');
        registerIconLibrary('helper', { resolver: () => { throw resolverError; } });
        await getIconDataURL('custom-icon', 'helper').then(
          () => expect.fail('Expected the resolver to reject'),
          error => expect(error).to.equal(resolverError)
        );

        sinon.stub(window, 'fetch').resolves(new Response('<svg></svg>'));
        registerIconLibrary('helper', {
          resolver: () => source,
          mutator: () => { throw new Error('mutator failed'); },
        });
        await expectFailure('custom-icon', 'helper', 'mutator failed');
      });

      it('extracts sprite symbols with their dimensions and mutators while caching the sheet', async () => {
        const fetchStub = sinon.stub(window, 'fetch').resolves(new Response(`
          <svg style="display:none" width="0" height="0">
            <symbol id="first icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path id="first-path" d="M0 0h24v24H0z"/>
            </symbol>
            <symbol id="second" viewBox="0 0 16 16"><circle id="second-path" r="8"/></symbol>
          </svg>
        `));
        registerIconLibrary('helper', {
          resolver: name => `${source}#${encodeURIComponent(name)}`,
          spriteSheet: true,
          mutator: svg => {
            svg.setAttribute('fill', 'pink');
            svg.setAttribute('data-count', String(Number(svg.getAttribute('data-count')) + 1));
          },
        });
        const [first, second] = await Promise.all([
          getIconDataURL('first icon', 'helper'),
          getIconDataURL('second', 'helper'),
        ]);
        const repeated = await getIconDataURL('first icon', 'helper');
        const firstSVG = new DOMParser().parseFromString(decode(first), 'image/svg+xml').documentElement;
        const secondSVG = new DOMParser().parseFromString(decode(second), 'image/svg+xml').documentElement;

        expect(first).to.equal(repeated);
        expect(firstSVG.getAttribute('viewBox')).to.equal('0 0 24 24');
        expect(firstSVG.getAttribute('width')).to.equal('24');
        expect(firstSVG.getAttribute('height')).to.equal('24');
        expect(firstSVG.getAttribute('fill')).to.equal('pink');
        expect(firstSVG.getAttribute('data-count')).to.equal('1');
        expect(firstSVG.hasAttribute('style')).to.be.false;
        expect(firstSVG.querySelector('#first-path')).to.exist;
        expect(firstSVG.querySelector('#second-path')).not.to.exist;
        expect(secondSVG.getAttribute('viewBox')).to.equal('0 0 16 16');
        expect(secondSVG.querySelector('#first-path')).not.to.exist;
        expect(secondSVG.querySelector('#second-path')).to.exist;
        expect(fetchStub).to.have.been.calledOnceWithExactly(
          source,
          { mode: 'cors' }
        );
      });

      it('preserves definitions and references within a self-contained sprite symbol', async () => {
        sinon.stub(window, 'fetch').resolves(new Response(`
          <svg>
            <symbol id="main" viewBox="0 0 24 24">
              <defs><linearGradient id="color"><stop offset="0" stop-color="red"/></linearGradient></defs>
              <path id="geometry" fill="url(#color)" d="M0 0h24v24H0z"/>
            </symbol>
          </svg>
        `));
        registerIconLibrary('helper', { resolver: () => `${source}#main`, spriteSheet: true });
        const dataURL = await getIconDataURL('main', 'helper');
        const svg = new DOMParser().parseFromString(decode(dataURL), 'image/svg+xml').documentElement;
        expect(svg.querySelector('linearGradient#color')).to.exist;
        expect(svg.querySelector('path#geometry')?.getAttribute('fill')).to.equal('url(#color)');
        expect(svg.querySelectorAll('#geometry')).to.have.lengthOf(1);
        expect(svg.querySelector('parsererror')).not.to.exist;
      });

      it('copies symbol attributes without copying its ID or sheet attributes', async () => {
        sinon.stub(window, 'fetch').resolves(new Response(`
          <svg viewBox="0 0 24 24" fill="red" style="display:none;width:0;stroke:blue">
            <symbol id="icon" viewBox="0 0 16 16" fill="green" style="display:none">
              <path d="M0 0h16v16H0z"/>
            </symbol>
          </svg>
        `));
        registerIconLibrary('helper', { resolver: () => `${source}#icon`, spriteSheet: true });

        const svg = new DOMParser().parseFromString(
          decode(await getIconDataURL('icon', 'helper')), 'image/svg+xml'
        ).documentElement;
        expect(svg.namespaceURI).to.equal('http://www.w3.org/2000/svg');
        expect(svg.getAttribute('viewBox')).to.equal('0 0 16 16');
        expect(svg.getAttribute('fill')).to.equal('green');
        expect(svg.getAttribute('style')).to.include('display:none');
        expect(svg.getAttribute('style')).not.to.include('stroke').and.not.to.include('width');
        expect(svg.hasAttribute('id')).to.be.false;
      });

      it('rejects missing fragments, missing symbols and IDs belonging to other elements', async () => {
        const fetchStub = sinon.stub(window, 'fetch').callsFake(async () => new Response(`
          <svg>
            <defs><path id="shared" d="M0 0h1v1z"/></defs>
          </svg>
        `));
        registerIconLibrary('helper', { resolver: () => source, spriteSheet: true });
        await expectFailure('icon', 'helper', 'symbol fragment');
        expect(fetchStub).not.to.have.been.called;
        registerIconLibrary('helper', { resolver: name => `${source}#${name}`, spriteSheet: true });
        await expectFailure('absent', 'helper', 'was not found');
        await expectFailure('shared', 'helper', 'was not found');
      });

      it('rejects malformed encoded symbol IDs before fetching the spritesheet', async () => {
        const fetchStub = sinon.stub(window, 'fetch');
        registerIconLibrary('helper', {
          resolver: () => `${source}#%`,
          spriteSheet: true,
        });

        await getIconDataURL('icon', 'helper').then(
          () => expect.fail('Expected the malformed symbol ID to reject'),
          () => undefined
        );
        expect(fetchStub).not.to.have.been.called;
      });

      it('preserves references to shared definitions and external resources', async () => {
        sinon.stub(window, 'fetch').callsFake(async () => new Response(`
          <svg>
            <defs><path id="shared" d="M0 0h1v1z"/></defs>
            <symbol id="broken"><use href="#shared"/></symbol>
            <symbol id="external"><use href="https://example.com/other.svg#icon"/></symbol>
          </svg>
        `));
        registerIconLibrary('helper', { resolver: () => `${source}#broken`, spriteSheet: true });
        expect(decode(await getIconDataURL('broken', 'helper'))).to.include('href="#shared"');
        registerIconLibrary('helper', { resolver: () => `${source}#external`, spriteSheet: true });
        expect(decode(await getIconDataURL('external', 'helper')))
          .to.include('href="https://example.com/other.svg#icon"');
      });

      it('retries failed sprite sheet requests', async () => {
        const fetchStub = sinon.stub(window, 'fetch');
        fetchStub.onFirstCall().resolves(new Response('', { status: 503 }));
        fetchStub.onSecondCall().resolves(new Response('<svg><symbol id="icon"><path d="M0 0h1v1z"/></symbol></svg>'));
        registerIconLibrary('helper', { resolver: () => `${source}#icon`, spriteSheet: true });
        await expectFailure('icon', 'helper', 'Failed to load');
        expect(decode(await getIconDataURL('icon', 'helper'))).to.include('<path');
        expect(fetchStub).to.have.been.calledTwice;
      });

      it('supports a bundled library whose resolver returns data URLs', async () => {
        const dataURL = `data:image/svg+xml,${encodeURIComponent(`<svg id="bundled-${sequence}"><path d="M0 0h1v1z"/></svg>`)}`;
        const fetchSpy = sinon.spy(window, 'fetch');
        registerIconLibrary('helper', {
          resolver: () => dataURL,
          mutator: svg => svg.setAttribute('fill', 'pink'),
        });
        const first = await getIconDataURL('bundled', 'helper');
        const second = await getIconDataURL('bundled', 'helper');
        expect(first).to.equal(second);
        expect(decode(first)).to.include('fill="pink"');
        expect(fetchSpy).to.have.been.calledOnceWithExactly(dataURL, { mode: 'cors' });
      });

      it('preserves syn-error and retries HTTP and network failures across consumers', async () => {
        const fetchStub = sinon.stub(window, 'fetch');
        fetchStub.onFirstCall().resolves(new Response('', { status: 503 }));
        fetchStub.onSecondCall().rejects(new TypeError('network unavailable'));
        fetchStub.onThirdCall().resolves(new Response('<svg id="retried"></svg>'));
        const el = await fixture<SynIcon>(html`<syn-icon library="helper"></syn-icon>`);
        const failed = oneEvent(el, 'syn-error');
        el.name = 'custom-icon';
        await failed;
        await expectFailure('custom-icon', 'helper', 'Failed to load');
        await getIconDataURL('custom-icon', 'helper');
        const loaded = oneEvent(el, 'syn-load');
        void el.setIcon();
        await loaded;
        await elementUpdated(el);
        expect(el.shadowRoot?.querySelector('svg')?.id).to.equal('retried');
        expect(fetchStub).to.have.been.calledThrice;
      });

      for (const [description, response] of [
        ['HTTP 410', () => new Response('', { status: 410 })],
        ['invalid SVG', () => new Response('<div></div>')],
      ] as const) {
        it(`caches ${description} failures as syn-icon does`, async () => {
          const fetchStub = sinon.stub(window, 'fetch').resolves(response());
          await expectFailure('custom-icon', 'helper', 'Failed to load');
          await expectFailure('custom-icon', 'helper', 'Failed to load');
          expect(fetchStub).to.have.been.calledOnce;
        });
      }

      it('ignores a stale load when the syn-icon source changes', async () => {
        let finishFirst!: (response: Response) => void;
        const fetchStub = sinon.stub(window, 'fetch');
        fetchStub.onFirstCall().returns(new Promise(resolve => { finishFirst = resolve; }));
        fetchStub.onSecondCall().resolves(new Response('<svg id="latest"></svg>'));
        const el = await fixture<SynIcon>(html`<syn-icon library="helper"></syn-icon>`);
        const oldSource = source;
        const first = getIconDataURL('custom-icon', 'helper');
        el.name = 'custom-icon';
        await elementUpdated(el);

        source = `${oldSource}?latest`;
        const loaded = oneEvent(el, 'syn-load');
        void el.setIcon();
        await loaded;
        finishFirst(new Response('<svg id="stale"></svg>'));
        await first;
        await elementUpdated(el);
        expect(el.shadowRoot?.querySelector('svg')?.id).to.equal('latest');
      });
    });

    it('runs mutator from new library', async () => {
      const el = await fixture<SynIcon>(html` <syn-icon library="test-library" name="test-icon1"></syn-icon> `);
      await elementUpdated(el);

      const svg = el.shadowRoot?.querySelector('svg');
      expect(svg?.getAttribute('fill')).to.equal('currentColor');
    });

    it('updates rendered icons when their library is re-registered', async () => {
      const libraryName = 'replaceable';
      const fetchStub = sinon.stub(window, 'fetch');
      fetchStub.onFirstCall().resolves(new Response('<svg id="before"></svg>'));
      fetchStub.onSecondCall().resolves(new Response('<svg id="after"></svg>'));
      registerIconLibrary(libraryName, { resolver: () => '/replaceable-before.svg' });

      const el = await fixture<SynIcon>(html`<syn-icon library="replaceable"></syn-icon>`);
      try {
        const firstLoad = oneEvent(el, 'syn-load');
        el.name = 'icon';
        await firstLoad;
        await elementUpdated(el);
        expect(el.shadowRoot?.querySelector('svg')?.id).to.equal('before');

        const secondLoad = oneEvent(el, 'syn-load');
        registerIconLibrary(libraryName, { resolver: () => '/replaceable-after.svg' });
        await secondLoad;
        await elementUpdated(el);
        expect(el.shadowRoot?.querySelector('svg')?.id).to.equal('after');
        expect(fetchStub).to.have.been.calledTwice;
      } finally {
        el.remove();
        unregisterIconLibrary(libraryName);
        sinon.restore();
      }
    });
  });

  describe('negative cases', () => {
    // using new library so we can test for malformed icons when registered
    it("svg not rendered with an icon that doesn't exist in the library", async () => {
      const el = await fixture<SynIcon>(html` <syn-icon library="test-library" name="does-not-exist"></syn-icon> `);

      expect(el.shadowRoot?.querySelector('svg')).to.be.null;
    });

    it('emits syn-error when the file cant be retrieved', async () => {
      const el = await fixture<SynIcon>(html` <syn-icon library="test-library"></syn-icon> `);
      const listener = oneEvent(el, 'syn-error') as Promise<SynErrorEvent>;

      el.name = 'bad-request';
      const ev = await listener;
      await elementUpdated(el);

      expect(el.shadowRoot?.querySelector('svg')).to.be.null;
      expect(ev).to.exist;
    });

    it("emits syn-error when there isn't an svg element in the registered icon", async () => {
      const el = await fixture<SynIcon>(html` <syn-icon library="test-library"></syn-icon> `);
      const listener = oneEvent(el, 'syn-error') as Promise<SynErrorEvent>;

      el.name = 'bad-icon';
      const ev = await listener;
      await elementUpdated(el);

      expect(el.shadowRoot?.querySelector('svg')).to.be.null;
      expect(ev).to.exist;
    });
  });

  describe('svg sprite sheets', () => {
    //  For some reason ESLint wants to fail in CI here, but works locally.
    /* eslint-disable */
    it('Should properly grab an SVG and render it from bootstrap icons', async () => {
      registerIconLibrary('sprite', {
        resolver: name => `/public/sprite.svg#${name}`,
        mutator: svg => svg.setAttribute('fill', 'currentColor'),
        spriteSheet: true
      });

      const el = await fixture<SynIcon>(html`<syn-icon name="refresh" library="sprite"></syn-icon>`);

      await elementUpdated(el);

      const svg = el.shadowRoot?.querySelector("svg[part='svg']");
      const use = svg?.querySelector(`use[href='/public/sprite.svg#refresh']`);

      expect(svg).to.be.instanceof(SVGElement);
      expect(use).to.be.instanceof(SVGUseElement);

      // This is kind of hacky...but with no way to check "load", we just use a timeout
      await aTimeout(1000);

      // Theres no way to really test that the icon rendered properly. We just gotta trust the browser to do it's thing :)
      // However, we can check the <use> size. It should be greater than 0x0 if loaded properly.
      const rect = use?.getBoundingClientRect();
      expect(rect?.width).to.be.greaterThan(0);
      expect(rect?.height).to.be.greaterThan(0);
    });

    // https://github.com/shoelace-style/shoelace/issues/2161
    it('Should apply mutator to multiple identical spritesheet icons', async () => {
      registerIconLibrary('sprite', {
        resolver: name => `/public/sprite.svg#${name}`,
        mutator: svg => svg.setAttribute('fill', 'pink'),
        spriteSheet: true
      });

      const el = await fixture<HTMLDivElement>(html`
        <div>
          <syn-icon name="refresh" library="sprite"></syn-icon>
          <syn-icon name="refresh" library="sprite"></syn-icon>
        </div>
      `);

      const icons = [...el.querySelectorAll<SynIcon>('syn-icon')];

      await Promise.allSettled(icons.map(el => elementUpdated(el)));

      // This is kind of hacky...but with no way to check "load", we just use a timeout
      await aTimeout(1000);
      const icon1 = icons[0];
      const icon2 = icons[1];

      expect(icon1.shadowRoot?.querySelector('svg')?.getAttribute('fill')).to.equal('pink');
      expect(icon2.shadowRoot?.querySelector('svg')?.getAttribute('fill')).to.equal('pink');
    });

    it('Should render nothing if the sprite hash is wrong', async () => {
      registerIconLibrary('sprite', {
        resolver: name => `/public/sprite.svg#${name}`,
        mutator: svg => svg.setAttribute('fill', 'currentColor'),
        spriteSheet: true
      });

      const el = await fixture<SynIcon>(html`<syn-icon name="non-existent" library="sprite"></syn-icon>`);

      await elementUpdated(el);

      const svg = el.shadowRoot?.querySelector("svg[part='svg']");
      const use = svg?.querySelector('use');

      // TODO: Theres no way to really test that the icon rendered properly. We just gotta trust the browser to do it's thing :)
      // However, we can check the <use> size. If it never loaded, it should be 0x0. Ideally, we could have error tracking...
      const rect = use?.getBoundingClientRect();
      expect(rect?.width).to.equal(0);
      expect(rect?.height).to.equal(0);

      // Make sure the mutator is applied.
      // https://github.com/shoelace-style/shoelace/issues/1925
      expect(svg?.getAttribute('fill')).to.equal('currentColor');
    });

  });
  
});
