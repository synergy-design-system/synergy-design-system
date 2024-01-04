/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/no-relative-packages */

import '../../../components/src/components/icon/icon.js';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { defaultIcons } from '../../../assets/src/default-icons.js';

const meta: Meta = {
  component: 'icon',
  title: 'Components/syn-icon/Default Icons',
};
export default meta;

type Story = StoryObj;

const createIconPage = (letter: string): Story => ({
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: () => {
    const regex = new RegExp(`^${letter}`);
    const iconKeys = Object.keys(defaultIcons);
    const iconContainer = iconKeys.filter((key) => key.match(regex)).map((key) => (html`
      <div style="display: flex; flex-direction: column; align-items: center; cursor: pointer"  >
        <span style="font-size: var(--syn-font-size-x-small)">${key}</span>
        <syn-icon style="font-size: var(--syn-font-size-2x-large)" name="${key}"></syn-icon>
      </div>
      `));
    return html`<div 
      style="display: grid; grid-template-columns: repeat(auto-fill, 150px); column-gap: var(--syn-spacing-small); row-gap: var(--syn-spacing-x-large);">
  ${iconContainer}
</div>`;
  },
});

export const Number_Icons = createIconPage('[0-9]');
export const A_Icons = createIconPage('a');
export const B_Icons = createIconPage('b');
export const C_Icons = createIconPage('c');
export const D_Icons = createIconPage('d');
export const E_Icons = createIconPage('e');
export const F_Icons = createIconPage('f');
export const G_Icons = createIconPage('g');
export const H_Icons = createIconPage('h');
export const I_Icons = createIconPage('i');
export const J_Icons = createIconPage('j');
export const K_Icons = createIconPage('k');
export const L_Icons = createIconPage('l');
export const M_Icons = createIconPage('m');
export const N_Icons = createIconPage('n');
export const O_Icons = createIconPage('o');
export const P_Icons = createIconPage('p');
export const Q_Icons = createIconPage('q');
export const R_Icons = createIconPage('r');
export const S_Icons = createIconPage('s');
export const T_Icons = createIconPage('t');
export const U_Icons = createIconPage('u');
export const V_Icons = createIconPage('v');
export const W_Icons = createIconPage('w');
export const X_Icons = createIconPage('x');
export const Y_Icons = createIconPage('y');
export const Z_Icons = createIconPage('z');
