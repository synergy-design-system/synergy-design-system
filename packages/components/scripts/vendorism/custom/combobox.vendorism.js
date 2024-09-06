import fs from 'fs';
import { removeSection, removeSections } from '../remove-section.js';
import { getPath } from '../../jobs/shared.js';
import { replaceSection, replaceSections } from '../replace-section.js';

const mergeSelectStyles = (selectContent, selectCustomContent) => {
  // remove the header part of the custom style
  const updatedCustomContent = removeSection(selectCustomContent, 'import {', 'default css`');

  // remove the closing of the select style
  const updatedContent = replaceSection(['`;', ''], selectContent);

  // append the custom style to the select style
  const mergedContent = updatedContent.concat(updatedCustomContent);
  return mergedContent;
};

/**
 * Transform the components styles
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformStyles = (selectContent) => {
  let content = replaceSections([
    // Rename class name `select__combobox` to `combobox__inputs`
    [
      'select__combobox',
      'combobox__inputs',
    ],
    // Rename `select` to `combobox`
    [
      'select',
      'combobox',
    ],
  ], selectContent);

  content = removeSections([
    // remove all multiple styles
    ['/* Visually hide the display', '}'],
    ['.combobox--small.combobox--multiple', '}'],
    ['.combobox--medium.combobox--multiple', '}'],
    ['.combobox--medium.combobox--multiple:not(.combobox--placeholder-visible)', '}'],
    ['.combobox--large.combobox--multiple:not(.combobox--placeholder-visible)', '}'],
    // remove the tags styles
    ['.combobox__tags', `cursor: not-allowed !important;
  }`],
    ['.combobox--small .combobox__tags', '}'],
    ['.combobox--medium .combobox__tags', '}'],
    ['.combobox--large .combobox__tags', '}'],
    ['/* Multi Select */', '}'],
    // remove unneeded stylelint disable line, as the whole stylelint is disabled
    ['/* stylelint-disable-next-line no-descending-specificity', '*/'],

  ], content);

  return content;
};

export const vendorCombobox = () => {
  console.log('🖊️  Creating combobox styles from select styles');
  const comboboxDir = getPath('../src/components/combobox/combobox.styles.ts');
  // remove the old file and create a new combobox.styles.ts file
  if (fs.existsSync(comboboxDir)) {
    fs.unlinkSync(comboboxDir);
  }

  // select style is copied as nearly the whole styling of the select is used
  const selectStylesPath = getPath('../src/components/select/select.styles.ts');
  const selectCustomStylesPath = getPath('../src/components/select/select.custom.styles.ts');

  if (fs.existsSync(selectStylesPath) && fs.existsSync(selectCustomStylesPath)) {
    const selectContent = fs.readFileSync(selectStylesPath, 'utf8');
    const selectCustomContent = fs.readFileSync(selectCustomStylesPath, 'utf8');

    const mergedSelect = mergeSelectStyles(selectContent, selectCustomContent);

    const comboboxContent = transformStyles(mergedSelect);

    fs.writeFileSync(comboboxDir, comboboxContent, 'utf8');
  } else {
    console.error('⚠️ select.styles.ts and / or select.custom.styles.ts does not exist');
  }
};
