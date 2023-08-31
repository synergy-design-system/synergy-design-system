import type { Meta, StoryObj } from '@storybook/html';
import { provideSDSDesignSystem } from '../../system';

provideSDSDesignSystem();

export default {
  title: 'Components/Logo',
} as Meta;

export const Primary: StoryObj = {
  render: () => '<sds-logo></sds-logo>',
};
