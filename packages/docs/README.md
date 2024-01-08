# @synergy-design-system/docs


## Description

This package provides interactive demos for each of the offered component in form of a [Storybook](https://storybook.js.org/) story.


## Usage

After installing all dependencies and building the project, execute `pnpm start`. A browser window will open on http://localhost:6006/ and show the Storybook instance.

## Development
Storybook stories are not only used for documentation, but also for visual regression tests via Chromatic screenshots.
The amount of screenshots in Chromatic is limited. To avoid running into this limit, we need to minimize the amount of screenshots.

This is achieved via bundling all non interactive stories of one component into a single story, which will then be used as screenshot. There is a helper function _generateScreenshotStory_ under _src/helpers/component.ts_ to create a bundled story out of multiple ones.
All interactive stories, this are stories with the _play_ functionality (e.g. focus stories or validation stories), need to remain as unique story.

In order to ensure that stories are not accidentally taken as screenshot, the chromatic screenshot ability is disabled globally and needs to be explicitly allowed for each story. If the helper function is used it is not necessary, because it does this by itself.

To make the helper function work correctly, all stories need to set the _name_ property with the story name, although it would not be necessary for storybook itself. The function needs this information, to be able to print the name of the story above each as headline.
