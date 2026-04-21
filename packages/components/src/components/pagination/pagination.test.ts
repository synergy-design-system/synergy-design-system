/* eslint-disable @typescript-eslint/no-floating-promises */
import '../../../dist/synergy.js';
import { expect, fixture, html } from '@open-wc/testing';

import type SynPagination from './pagination.js';
import {
  calculatePageItemIndices,
  calculateTotalPages,
  clampPage,
  getMaxOptionCharCount,
  getPreviousOrDefault,
  getTotalPages,
  getTotalPagesCharCount,
  isValidNonNegativeInteger,
  isValidPositiveInteger,
  sanitizePageSizeOptions,
} from './utility.js';

const getNavigationButton = (el: SynPagination, name: string) => el
  .shadowRoot
  ?.querySelector(`syn-icon-button[name="${name}"]`) as HTMLElement;

const getPageInput = (el: SynPagination) => el
  .shadowRoot
  ?.querySelector('syn-input[part="page-input"]') as HTMLElement & { value: string };

const getPageSizeSelect = (el: SynPagination) => el
  .shadowRoot
  ?.querySelector('syn-select[part="page-size-select"]') as HTMLElement & { value: string };

describe('<syn-pagination>', () => {
  describe('utility helpers', () => {
    it('should calculate total pages based on items and page size', () => {
      expect(calculateTotalPages(100, 25)).to.equal(4);
      expect(calculateTotalPages(0, 25)).to.equal(0);
      expect(calculateTotalPages(101, 25)).to.equal(5);
    });

    it('should return zero-based summary indices when there are no items', () => {
      expect(calculatePageItemIndices(0, 25, 1)).to.deep.equal({
        endIndex: 0,
        startIndex: 0,
      });
    });

    it('should clamp page item summary indices to valid page bounds', () => {
      expect(calculatePageItemIndices(100, 25, 0)).to.deep.equal({
        endIndex: 25,
        startIndex: 1,
      });

      expect(calculatePageItemIndices(100, 25, 99)).to.deep.equal({
        endIndex: 100,
        startIndex: 76,
      });
    });

    it('should clamp invalid page numbers', () => {
      expect(clampPage(Number.NaN, 5)).to.equal(1);
      expect(clampPage(-5, 5)).to.equal(1);
      expect(clampPage(99, 5)).to.equal(5);
      expect(clampPage(2, 0)).to.equal(1);
    });

    it('should validate positive integers', () => {
      expect(isValidPositiveInteger(1)).to.equal(true);
      expect(isValidPositiveInteger(0)).to.equal(false);
      expect(isValidPositiveInteger(-1)).to.equal(false);
      expect(isValidPositiveInteger(25)).to.equal(true);
      expect(isValidPositiveInteger(Number.NaN)).to.equal(false);
      expect(isValidPositiveInteger(1.5)).to.equal(false);
      expect(isValidPositiveInteger('1')).to.equal(false);
      expect(isValidPositiveInteger(null)).to.equal(false);
      expect(isValidPositiveInteger(undefined)).to.equal(false);
    });

    it('should validate non-negative integers', () => {
      expect(isValidNonNegativeInteger(0)).to.equal(true);
      expect(isValidNonNegativeInteger(1)).to.equal(true);
      expect(isValidNonNegativeInteger(-1)).to.equal(false);
      expect(isValidNonNegativeInteger(100)).to.equal(true);
      expect(isValidNonNegativeInteger(Number.NaN)).to.equal(false);
      expect(isValidNonNegativeInteger(1.5)).to.equal(false);
      expect(isValidNonNegativeInteger('0')).to.equal(false);
      expect(isValidNonNegativeInteger(null)).to.equal(false);
      expect(isValidNonNegativeInteger(undefined)).to.equal(false);
    });

    it('should return previous value when valid, otherwise fallback', () => {
      const changed = new Map<PropertyKey, unknown>([
        ['pageSize', 50],
        ['currentPage', 5],
        ['totalItems', 200],
      ]);

      // Valid previous values should be returned
      expect(getPreviousOrDefault(changed, 'pageSize', 25, isValidPositiveInteger)).to.equal(50);
      expect(getPreviousOrDefault(changed, 'currentPage', 1, isValidPositiveInteger)).to.equal(5);
      expect(getPreviousOrDefault(changed, 'totalItems', 0, isValidNonNegativeInteger)).to.equal(200);

      // Invalid previous values should use fallback
      const invalidChanged = new Map<PropertyKey, unknown>([
        ['pageSize', Number.NaN],
        ['currentPage', -5],
        ['totalItems', -1],
      ]);

      expect(getPreviousOrDefault(invalidChanged, 'pageSize', 25, isValidPositiveInteger)).to.equal(25);
      expect(getPreviousOrDefault(invalidChanged, 'currentPage', 1, isValidPositiveInteger)).to.equal(1);
      expect(getPreviousOrDefault(invalidChanged, 'totalItems', 0, isValidNonNegativeInteger)).to.equal(0);

      // Missing keys should use fallback
      const emptyChanged = new Map<PropertyKey, unknown>();
      expect(getPreviousOrDefault(emptyChanged, 'pageSize', 25, isValidPositiveInteger)).to.equal(25);
      expect(getPreviousOrDefault(emptyChanged, 'currentPage', 1, isValidPositiveInteger)).to.equal(1);
    });

    it('should return safe total pages for non-positive page sizes and item counts', () => {
      expect(getTotalPages(25, 100)).to.equal(4);
      expect(getTotalPages(0, 100)).to.equal(100);
      expect(getTotalPages(-10, 100)).to.equal(100);
      expect(getTotalPages(25, 0)).to.equal(1);
    });

    it('should sanitize page size options and fallback to defaults', () => {
      expect(sanitizePageSizeOptions([5, 10, 20])).to.deep.equal([5, 10, 20]);
      expect(sanitizePageSizeOptions([0, -1, '25', 'foo'])).to.deep.equal([25]);
      expect(sanitizePageSizeOptions('not-an-array')).to.deep.equal([10, 25, 50, 100]);
      expect(sanitizePageSizeOptions([])).to.deep.equal([10, 25, 50, 100]);
    });

    it('should calculate max option char count from sanitized options', () => {
      expect(getMaxOptionCharCount([10, 250, 5])).to.equal(3);
      expect(getMaxOptionCharCount([])).to.equal(3);
      expect(getMaxOptionCharCount([0, -1])).to.equal(3);
    });

    it('should calculate total pages char count from safe total pages', () => {
      expect(getTotalPagesCharCount(25, 100)).to.equal(1);
      expect(getTotalPagesCharCount(10, 1000)).to.equal(3);
      expect(getTotalPagesCharCount(0, 100)).to.equal(3);
    });
  });

  describe('localization', () => {
    it('should use localized pagination labels and summary text', async () => {
      const pagination = await fixture<SynPagination>(html`
        <syn-pagination current-page="2" page-size="25" total-items="100"></syn-pagination>
      `);

      const pageSizeSelect = getPageSizeSelect(pagination);
      const pageSizeSelectLabelSlot = pageSizeSelect
        ?.shadowRoot
        ?.querySelector('slot[name="label"]') as HTMLSlotElement;
      const pageSizeSelectLabel = pageSizeSelectLabelSlot
        ?.assignedNodes({ flatten: true })
        .map(node => node.textContent ?? '')
        .join('')
        .trim();
      const pageSummary = pagination.shadowRoot?.querySelector('[part="page-item-summary"]');
      const firstPageButton = getNavigationButton(pagination, 'first-page');

      expect(pageSizeSelectLabel).to.equal('Items per page');
      expect(pageSummary?.textContent?.trim()).to.equal('26-50 of 100 items');
      expect(firstPageButton?.getAttribute('label')).to.equal('First page');
    });
  });

  describe('accessibility', () => {
    it('should be accessible', async () => {
      const pagination = await fixture<SynPagination>(html`
        <syn-pagination total-items="100"></syn-pagination>
      `);
      await expect(pagination).to.be.accessible();
    });
  });

  describe('component behavior', () => {
    it('should render full variant controls by default', async () => {
      const pagination = await fixture<SynPagination>(html`
        <syn-pagination total-items="100"></syn-pagination>
      `);

      expect(getPageSizeSelect(pagination)).to.exist;
      expect(pagination.shadowRoot?.querySelector('[part="page-item-summary"]')).to.exist;
    });

    it('should hide page size controls in compact variant', async () => {
      const pagination = await fixture<SynPagination>(html`
        <syn-pagination variant="compact" total-items="100"></syn-pagination>
      `);

      expect(getPageSizeSelect(pagination)).to.not.exist;
      expect(pagination.shadowRoot?.querySelector('[part="page-item-summary"]')).to.not.exist;
    });

    it('should render divider when divider is enabled', async () => {
      const pagination = await fixture<SynPagination>(html`
        <syn-pagination divider></syn-pagination>
      `);

      expect(pagination.shadowRoot?.querySelector('syn-divider[part="divider"]')).to.exist;
    });

    it('should disable controls when there are no pages', async () => {
      const pagination = await fixture<SynPagination>(html`
        <syn-pagination total-items="0"></syn-pagination>
      `);

      expect(getNavigationButton(pagination, 'first-page').hasAttribute('disabled')).to.equal(true);
      expect(getNavigationButton(pagination, 'last-page').hasAttribute('disabled')).to.equal(true);
      expect(getPageInput(pagination).hasAttribute('disabled')).to.equal(true);
    });

    it('should emit page change event and update current page when next is clicked', async () => {
      const pagination = await fixture<SynPagination>(html`
        <syn-pagination current-page="2" page-size="25" total-items="100"></syn-pagination>
      `);

      let eventDetail: { currentPage: number; previousPage: number } | undefined;
      pagination.addEventListener('syn-pagination-page-changed', (event: Event) => {
        eventDetail = (event as CustomEvent<typeof eventDetail>).detail;
      });

      getNavigationButton(pagination, 'next-page').click();
      await pagination.updateComplete;

      expect(pagination.currentPage).to.equal(3);
      expect(eventDetail).to.deep.equal({
        currentPage: 3,
        previousPage: 2,
      });
    });

    it('should emit page and page-size events when page size changes and current page shifts', async () => {
      const pagination = await fixture<SynPagination>(html`
        <syn-pagination current-page="3" page-size="25" total-items="100" .pageSizeOptions=${[25,50]}></syn-pagination>
      `);

      let pageSizeEventDetail: { currentPageSize: number; previousPageSize: number } | undefined;
      let pageEventDetail: { currentPage: number; previousPage: number } | undefined;

      pagination.addEventListener('syn-pagination-page-size-changed', (event: Event) => {
        pageSizeEventDetail = (event as CustomEvent<typeof pageSizeEventDetail>).detail;
      });

      pagination.addEventListener('syn-pagination-page-changed', (event: Event) => {
        pageEventDetail = (event as CustomEvent<typeof pageEventDetail>).detail;
      });

      (pagination as unknown as { pageSizeChanged: (e: Event) => void }).pageSizeChanged({
        target: {
          value: '50',
        },
      } as unknown as Event);
      await pagination.updateComplete;

      expect(pagination.pageSize).to.equal(50);
      expect(pagination.currentPage).to.equal(2);
      expect(pageSizeEventDetail).to.deep.equal({
        currentPageSize: 50,
        previousPageSize: 25,
      });
      expect(pageEventDetail).to.deep.equal({
        currentPage: 2,
        previousPage: 3,
      });
    });

    it('should update current page via manual page input and emit page change', async () => {
      const pagination = await fixture<SynPagination>(html`
        <syn-pagination current-page="1" page-size="25" total-items="100"></syn-pagination>
      `);

      let pageEventDetail: { currentPage: number; previousPage: number } | undefined;
      pagination.addEventListener('syn-pagination-page-changed', (event: Event) => {
        pageEventDetail = (event as CustomEvent<typeof pageEventDetail>).detail;
      });

      (pagination as unknown as { pageChangedViaUserInput: (e: Event) => void }).pageChangedViaUserInput({
        target: {
          valueAsNumber: 4,
        },
      } as unknown as Event);
      await pagination.updateComplete;

      expect(pagination.currentPage).to.equal(4);
      expect(pageEventDetail).to.deep.equal({
        currentPage: 4,
        previousPage: 1,
      });
    });

    it('should clamp current page when total pages shrink', async () => {
      const pagination = await fixture<SynPagination>(html`
        <syn-pagination current-page="10" page-size="25" total-items="100"></syn-pagination>
      `);

      pagination.totalItems = 30;
      await pagination.updateComplete;

      expect(pagination.currentPage).to.equal(2);
    });

    it('should recover from invalid numeric attributes set dynamically', async () => {
      const pagination = await fixture<SynPagination>(html`
        <syn-pagination current-page="2" page-size="20" total-items="100"></syn-pagination>
      `);

      pagination.setAttribute('page-size', 'abc');
      pagination.setAttribute('current-page', 'foo');
      pagination.setAttribute('total-items', 'bar');
      await pagination.updateComplete;

      expect(pagination.pageSize).to.equal(20);
      expect(pagination.currentPage).to.equal(2);
      expect(pagination.totalItems).to.equal(100);
      expect(getPageInput(pagination).getAttribute('value')).to.equal('2');
    });

    it('should ignore invalid page input values', async () => {
      const pagination = await fixture<SynPagination>(html`
        <syn-pagination current-page="3" page-size="25" total-items="100"></syn-pagination>
      `);

      let eventFired = false;
      pagination.addEventListener('syn-pagination-page-changed', () => {
        eventFired = true;
      });

      (pagination as unknown as { pageChangedViaUserInput: (e: Event) => void }).pageChangedViaUserInput({
        target: {
          valueAsNumber: Number.NaN,
        },
      } as unknown as Event);
      await pagination.updateComplete;

      expect(eventFired).to.equal(false);
      expect(pagination.currentPage).to.equal(3);
    });
  });
});
