# [@synergy-design-system/components-v1.17.0](https://github.com/synergy-design-system/synergy-design-system/compare/components/1.16.0...components/1.17.0) (2024-04-19)


### Features

* ✨ Angular: Allow two way data binding component wrappers ([#420](https://github.com/synergy-design-system/synergy-design-system/issues/420)) ([7c9c6a6](https://github.com/synergy-design-system/synergy-design-system/commit/7c9c6a6aab568c868c337c1c117c66cca141b694))

# [@synergy-design-system/components-v1.16.0](https://github.com/synergy-design-system/synergy-design-system/compare/components/1.15.0...components/1.16.0) (2024-04-12)


### Features

* ✨ upgrade shoelace to 2.15.0 ([#411](https://github.com/synergy-design-system/synergy-design-system/issues/411)) ([6d4eba7](https://github.com/synergy-design-system/synergy-design-system/commit/6d4eba7ca73a8959cb25e6d9d3a8d33468be61d3))
  * See detailed changelog at https://shoelace.style/resources/changelog#id_2_15_0.
  * Added the sync property to `<syn-dropdown>` so the menu can easily sync sizes with the trigger element
  * Fixed a bug in `<syn-icon>` that did not properly apply mutators to spritesheets
  * Fixed a bug in .syn-scroll-lock causing layout shifts
  * Fixed a bug in `<syn-select>` that caused the menu to not close when rendered in a shadow root
  * Fixed a bug in the submenu controller that allowed two submenus to be open at the same time
  * Fixed a bug in `<syn-select>` where the tag size wouldn’t update with the control’s size
  * Fixed a bug in `<syn-checkbox>` and `<syn-switch>` where the color of the required content wasn’t applying correctly
  * Fixed a bug in `<syn-checkbox>` where help text was incorrectly styled
  * Fixed a bug in `<syn-input>` that prevented the control from receiving focus when clicking over the clear button

# [@synergy-design-system/components-v1.15.0](https://github.com/synergy-design-system/synergy-design-system/compare/components/1.14.0...components/1.15.0) (2024-04-08)


### Features

* ✨ add syn-side-nav, syn-nav-item, syn-prio-nav ([#364](https://github.com/synergy-design-system/synergy-design-system/issues/364)) ([fd9b821](https://github.com/synergy-design-system/synergy-design-system/commit/fd9b82138385f2708003ce18d9c118b7a8fb7925))

# [@synergy-design-system/components-v1.14.0](https://github.com/synergy-design-system/synergy-design-system/compare/components/1.13.0...components/1.14.0) (2024-03-28)


### Features

* ✨ syn-badge ([#390](https://github.com/synergy-design-system/synergy-design-system/issues/390)) ([a44d683](https://github.com/synergy-design-system/synergy-design-system/commit/a44d683b35e984bfbdac093dba5abd04c74f33c0))

# [@synergy-design-system/components-v1.13.0](https://github.com/synergy-design-system/synergy-design-system/compare/components/1.12.0...components/1.13.0) (2024-03-25)


### Features

* ✨ syn-divider in syn-dropdown should have a color syn-color-neutral-200 ([#386](https://github.com/synergy-design-system/synergy-design-system/issues/386)) ([b9fc00b](https://github.com/synergy-design-system/synergy-design-system/commit/b9fc00bba664b5e3a550df3d8bcca544ad6e04ed))

# [@synergy-design-system/components-v1.12.0](https://github.com/synergy-design-system/synergy-design-system/compare/components/1.11.0...components/1.12.0) (2024-03-18)


### Features

* ✨ drop-down ([#367](https://github.com/synergy-design-system/synergy-design-system/issues/367)) ([562daf8](https://github.com/synergy-design-system/synergy-design-system/commit/562daf8b06627b7d44a3f06210b3202c7eee9540))

# [@synergy-design-system/components-v1.11.0](https://github.com/synergy-design-system/synergy-design-system/compare/components/1.10.1...components/1.11.0) (2024-03-07)


### Features

* ✨ add border-radius and roundings to syn-tag ([#357](https://github.com/synergy-design-system/synergy-design-system/issues/357)) ([72ca994](https://github.com/synergy-design-system/synergy-design-system/commit/72ca994be047a04c07c49873578d74ed6adbe548))

# [@synergy-design-system/components-v1.10.1](https://github.com/synergy-design-system/synergy-design-system/compare/components/1.10.0...components/1.10.1) (2024-03-07)


### Bug Fixes

* 🤔 syn-icon-button has a border-radius ([#358](https://github.com/synergy-design-system/synergy-design-system/issues/358)) ([fc59185](https://github.com/synergy-design-system/synergy-design-system/commit/fc591858578f2a7f64a38548e98a14abee4621ac))

# [@synergy-design-system/components-v1.10.0](https://github.com/synergy-design-system/synergy-design-system/compare/components/1.9.0...components/1.10.0) (2024-02-28)


### Features

* ✨ Create syn-header ([#331](https://github.com/synergy-design-system/synergy-design-system/issues/331)) ([acde61d](https://github.com/synergy-design-system/synergy-design-system/commit/acde61d762dd4123aae553227f3af2015e824208))

# [@synergy-design-system/components-v1.9.0](https://github.com/synergy-design-system/synergy-design-system/compare/components/1.8.0...components/1.9.0) (2024-02-28)


### Features

* ✨ upgrade shoelace to 2.14.0 ([#348](https://github.com/synergy-design-system/synergy-design-system/issues/348)) ([a00dcb9](https://github.com/synergy-design-system/synergy-design-system/commit/a00dcb9fd85e7271c8923d8256a6fea3ecdcb5d6))
  * See detailed changelog at https://shoelace.style/resources/changelog#id_2_14_0.
  * Added help text to `<syn-checkbox>`
  * Added help text to `<syn-switch>`
  * Fixed a bug in `<syn-option>` that caused HTML tags to be included in getTextLabel()
  * Fixed a bug in `<syn-option>` that caused slotted content to show up when calling getTextLabel()
  * Fixed a bug in `<syn-input>` and `<syn-textarea>` that made it work differently from `<input>` and `<textarea>` when using defaults
  * Fixed a bug in `<syn-select>` that prevented it from closing when tabbing to another select inside a shadow root
  * Fixed a bug that caused form controls to submit even after they were removed from the DOM
  * Fixed a bug that caused empty `<syn-radio-group>` elements to log an error in the console
  * Improved “close” behavior of multiple components in supportive browsers using the CloseWatcher API
  
# [@synergy-design-system/components-v1.8.0](https://github.com/synergy-design-system/synergy-design-system/compare/components/1.7.0...components/1.8.0) (2024-02-27)


### Features

* ✨ syn-drawer ([#320](https://github.com/synergy-design-system/synergy-design-system/issues/320)) ([ce20a42](https://github.com/synergy-design-system/synergy-design-system/commit/ce20a42f9f90eb5b38c0ae84f99d4a8db2e08613))

# [@synergy-design-system/components-v1.7.0](https://github.com/synergy-design-system/synergy-design-system/compare/components/1.6.1...components/1.7.0) (2024-02-09)


### Features

* ✨ Improve events export in framework wrapper ([#307](https://github.com/synergy-design-system/synergy-design-system/issues/307)) ([fc33867](https://github.com/synergy-design-system/synergy-design-system/commit/fc33867dcbb3e602479b67999f76234d51ff31aa))

# [@synergy-design-system/components-v1.6.1](https://github.com/synergy-design-system/synergy-design-system/compare/components/1.6.0...components/1.6.1) (2024-02-07)


### Bug Fixes

* 🤔 Vue two way data binding does not honor the provided default value ([#308](https://github.com/synergy-design-system/synergy-design-system/issues/308)) ([507f0ca](https://github.com/synergy-design-system/synergy-design-system/commit/507f0ca31d8bfb301edc47582aefbece6decab40))

# [@synergy-design-system/components-v1.6.0](https://github.com/synergy-design-system/synergy-design-system/compare/components/1.5.1...components/1.6.0) (2024-02-01)


### Features

* ✨ update number input ([#287](https://github.com/synergy-design-system/synergy-design-system/issues/287)) ([123bffd](https://github.com/synergy-design-system/synergy-design-system/commit/123bffd3ec2d915e9fde84ed987da9e97d407563))

# [@synergy-design-system/components-v1.5.1](https://github.com/synergy-design-system/synergy-design-system/compare/components/1.5.0...components/1.5.1) (2024-01-31)


### Bug Fixes

* 🤔 disabled button uses wrong color ([#284](https://github.com/synergy-design-system/synergy-design-system/issues/284)) ([028fbd1](https://github.com/synergy-design-system/synergy-design-system/commit/028fbd158f0e8e36c908054fdc672d267ad3503e))

# [@synergy-design-system/components-v1.5.0](https://github.com/synergy-design-system/synergy-design-system/compare/components/1.4.1...components/1.5.0) (2024-01-30)


### Features

* ✨ syn-select / syn-option / syn-optgroup ([#274](https://github.com/synergy-design-system/synergy-design-system/issues/274)) ([25c6788](https://github.com/synergy-design-system/synergy-design-system/commit/25c678829e58a173c0fc23005a4f724b6d792dd7))

# [@synergy-design-system/components-v1.4.1](https://github.com/synergy-design-system/synergy-design-system/compare/components/1.4.0...components/1.4.1) (2024-01-24)


### Bug Fixes

* 🤔 Update project dependencies ([#276](https://github.com/synergy-design-system/synergy-design-system/issues/276)) ([9aa94be](https://github.com/synergy-design-system/synergy-design-system/commit/9aa94beb8f1191862d7cf48617af2d1994a6df9c))

# [@synergy-design-system/components-v1.4.0](https://github.com/synergy-design-system/synergy-design-system/compare/components/1.3.0...components/1.4.0) (2024-01-22)


### Features

* ✨ add syn-divider ([#271](https://github.com/synergy-design-system/synergy-design-system/issues/271)) ([2848dea](https://github.com/synergy-design-system/synergy-design-system/commit/2848dea5fb5c976909b18fd20d66f5d7015724be))

# [@synergy-design-system/components-v1.3.0](https://github.com/synergy-design-system/synergy-design-system/compare/components/1.2.2...components/1.3.0) (2024-01-19)


### Features

* ✨update icons ([#273](https://github.com/synergy-design-system/synergy-design-system/issues/273)) ([8677925](https://github.com/synergy-design-system/synergy-design-system/commit/8677925421d09f65c3aa8e056013b0cba8354f9a))

# [@synergy-design-system/components-v1.2.2](https://github.com/synergy-design-system/synergy-design-system/compare/components/1.2.1...components/1.2.2) (2024-01-15)


### Bug Fixes

* 🤔 Update to shoelace 2.12.0 ([#257](https://github.com/synergy-design-system/synergy-design-system/issues/257)) ([42b1c26](https://github.com/synergy-design-system/synergy-design-system/commit/42b1c268688a32290ab67795c758c96b5a382aff))
  * See detailed changelog at https://shoelace.style/resources/changelog#id_2_12_0.
  * Added the ability to call form.checkValidity() and it will use Shoelace’s custom checkValidity() handler.
  * Fixed a bug with form controls removing the custom validity handlers from the form
  * Fixed a bug in form control components that used a form property, but not an attribute

# [@synergy-design-system/components-v1.2.1](https://github.com/synergy-design-system/synergy-design-system/compare/components/1.2.0...components/1.2.1) (2024-01-15)


### Bug Fixes

* 🤔 Syn-Button Spacing ([#254](https://github.com/synergy-design-system/synergy-design-system/issues/254)) ([808db09](https://github.com/synergy-design-system/synergy-design-system/commit/808db09668e0bd1871d894cfaf3433d39ce41637))

# [@synergy-design-system/components-v1.2.0](https://github.com/synergy-design-system/synergy-design-system/compare/components/1.1.0...components/1.2.0) (2024-01-12)


### Features

* ✨ add syn-tag ([#217](https://github.com/synergy-design-system/synergy-design-system/issues/217)) ([da91945](https://github.com/synergy-design-system/synergy-design-system/commit/da91945d1e7f4e5bb5cc2efd36e70f790c5663ad))

# [@synergy-design-system/components-v1.1.0](https://github.com/synergy-design-system/synergy-design-system/compare/components/1.0.2...components/1.1.0) (2024-01-11)


### Features

* ✨ add syn-icon-button ([#211](https://github.com/synergy-design-system/synergy-design-system/issues/211)) ([2a460be](https://github.com/synergy-design-system/synergy-design-system/commit/2a460be6bdad09c3a7b0fb211e92b26d71d5408e))

# [@synergy-design-system/components-v1.0.2](https://github.com/synergy-design-system/synergy-design-system/compare/components/1.0.1...components/1.0.2) (2023-12-14)


### Bug Fixes

* 📚 improve links in documentation ([#224](https://github.com/synergy-design-system/synergy-design-system/issues/224)) ([f55934c](https://github.com/synergy-design-system/synergy-design-system/commit/f55934c34c6c53b0f7c9a5afa8d91bc520df4fdf))

# [@synergy-design-system/components-v1.0.1](https://github.com/synergy-design-system/synergy-design-system/compare/components/1.0.0...components/1.0.1) (2023-12-06)


### Bug Fixes

* improve changelogs ([#213](https://github.com/synergy-design-system/synergy-design-system/issues/213)) ([3674aed](https://github.com/synergy-design-system/synergy-design-system/commit/3674aed156b3f604a220be23957ca2da05717472))

# @synergy-design-system/components-v1.0.0 (2023-12-06)


### Features

* init first release ([#210](https://github.com/synergy-design-system/synergy-design-system/issues/210)) ([55fe07e](https://github.com/synergy-design-system/synergy-design-system/commit/55fe07e9454ec159506f24223222786f315e800c))
* ✨ add syn-button, syn-checkbox, syn-icon, syn-input, syn-radio, syn-radio-group, syn-switch, syn-textarea
* ✨ add Angular, React and Vue wrappers
