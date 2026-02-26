import '../../../dist/synergy.js';
import { expect, fixture, html } from '@open-wc/testing';
import type SynTagGroup from './tag-group.js';

describe('<syn-tag-group>', () => {
  describe('accessibility', () => {
    it('should be accessible', async () => {
      const tagGroup = await fixture<SynTagGroup>(html`
        <syn-tag-group label="Tag Group Label">
          <syn-tag>Tag 1</syn-tag>
          <syn-tag>Tag 2</syn-tag>
        </syn-tag-group>
      `);
      await expect(tagGroup).to.be.accessible();
    });
  });

  it('defaults', async () => {
    const tagGroup = await fixture<SynTagGroup>(html`<syn-tag-group></syn-tag-group>`);
    expect(tagGroup.label).to.equal('');
    expect(tagGroup.labelPosition).to.equal('top');
    expect(tagGroup.size).to.equal('medium');
  });

  describe('when setting the size property', () => {
    it('should default to "medium"', async () => {
      const tagGroup = await fixture<SynTagGroup>(html`<syn-tag-group></syn-tag-group>`);
      expect(tagGroup.size).to.equal('medium');
    });

    ['small', 'medium', 'large'].forEach((size: 'small' | 'medium' | 'large') => {
      it(`should set size to ${size} for all syn-tags`, async () => {
        const tagGroup = await fixture<SynTagGroup>(html`
          <syn-tag-group size=${size}>
            <syn-tag>Tag 1</syn-tag>
            <syn-tag>Tag 2</syn-tag>
          </syn-tag-group>
        `);

        expect(tagGroup.size).to.equal(size);
        tagGroup.tagsInDefaultSlot.forEach((tag) => {
          expect(tag.size).to.equal(size);
        });
      });

      it('should update the slotted syn-tags items size when the size prop of the syn-tag-group is changed', async () => {
        const tagGroup = await fixture<SynTagGroup>(html`
          <syn-tag-group size="medium">
            <syn-tag>Tag 1</syn-tag>
            <syn-tag>Tag 2</syn-tag>
          </syn-tag-group>
        `);

        tagGroup.tagsInDefaultSlot.forEach((tag) => {
          expect(tag.size).to.equal('medium');
        });

        tagGroup.size = 'large';
        await tagGroup.updateComplete;

        tagGroup.tagsInDefaultSlot.forEach((tag) => {
          expect(tag.size).to.equal('large');
        });
      });

      it('should override the size attribute for all syn-tags that are slotted after initial render', async () => {
        const tagGroup = await fixture<SynTagGroup>(html`
          <syn-tag-group size="medium">
            <syn-tag>Tag 1</syn-tag>
            <syn-tag>Tag 2</syn-tag>
          </syn-tag-group>
        `);

        tagGroup.tagsInDefaultSlot.forEach((tag) => {
          expect(tag.size).to.equal('medium');
        });

        const newTag = document.createElement('syn-tag');
        newTag.size = 'large';

        tagGroup.appendChild(newTag);
        await tagGroup.updateComplete;

        tagGroup.tagsInDefaultSlot.forEach((tag) => {
          expect(tag.size).to.equal('medium');
        });
      });
    });
  });
});
