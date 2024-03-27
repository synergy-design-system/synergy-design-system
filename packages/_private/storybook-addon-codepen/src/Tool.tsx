import type { API_LeafEntry } from "@storybook/types";
import * as prettier from "prettier";
import htmlParser from 'prettier/parser-html';
import parserBabel from "prettier/plugins/babel";
import * as prettierPluginEstree from "prettier/plugins/estree";
import React, { memo } from "react";
import { IconButton } from "@storybook/components";
import { useAddonState, useStorybookApi, useChannel } from "@storybook/manager-api";
import { styled } from "@storybook/theming";
import { STORY_CHANGED, STORY_ARGS_UPDATED } from '@storybook/core-events';
import { CodepenIcon } from './components/CodepenIcon';
import { type CodepenData, emptyState } from './withCodepenData';
import {
  ADDON_ID,
  CODEPEN_URL,
  TOOL_ID,
} from "./constants";

const Form = styled.form({
  height:"100%",
  left: 0,
  position: "absolute",
  top: 0,
  width: "100%",
  zIndex: 1,
});

const InputSubmit = styled.input({
  cursor: "pointer",
  height: "100%",
  left: 0,
  opacity: 0,
  position: "absolute",
  top: 0,
  transform: "translateX(0)",
  width: "100%",
  zIndex: 2,
});

const formatData = (data: CodepenData) => JSON
  .stringify(data)
  .replace(/"/g, "&quot;").replace(/'/g, "&apos;");

const format = async (data: string, parser?: string) => prettier.format(data, {
  parser: parser || 'html',
  plugins: [
    htmlParser,
    parserBabel,
    prettierPluginEstree,
  ],
});

const getData = async (story: API_LeafEntry): CodepenData => {
  const rootElement: HTMLIFrameElement = document.querySelector('#storybook-preview-iframe');
  const rootBody = rootElement.contentDocument || rootElement.contentWindow.document;
  const storyRoot = rootBody.querySelector('#storybook-root');
  const innerRoot = storyRoot?.querySelector('#root-inner');
  const scriptRoot = rootBody.querySelector('#scripts-root');

  const html = await format([
    '<link rel="stylesheet" href="https://unpkg.com/@synergy-design-system/tokens/dist/themes/light.css" />',
    '<link rel="stylesheet" href="https://unpkg.com/@synergy-design-system/components/dist/themes/utility.css" />',
    '',
    innerRoot
      ? innerRoot.innerHTML
      : storyRoot
        ? storyRoot.innerHTML
        : '',
    scriptRoot ? scriptRoot.innerHTML : '',
  ].join('\n'));

  const title = `${story.title}/${story.name}`;
  const js = await format([`
  import * as syn from "https://esm.sh/@synergy-design-system/components/dist/synergy.js";

  import * as icons from 'https://esm.sh/@synergy-design-system/assets';
  
  syn.registerIconLibrary('default', {
    resolver: (name) => {
      if (name in icons.defaultIcons) {
        return \`data:image/svg+xml,\${encodeURIComponent(icons.defaultIcons[name])}\`;
      }
      return '';
    },
    mutator: svg => svg.setAttribute('fill', 'currentColor'),
  }); 
  `.trim()].join('\n'), 'babel');

  return {
    html,
    title,
    js,
  };
}

export const Tool = memo(function MyAddonSelector() {
  const api = useStorybookApi();
  const [codepenData, setCodePenData] = useAddonState(ADDON_ID, emptyState);

  useChannel({
    [STORY_CHANGED]: async () => {
      const data = await getData(api.getCurrentStoryData());
      setCodePenData(data);
    },
    [STORY_ARGS_UPDATED]: async () => {
      const data = await getData(api.getCurrentStoryData());
      setCodePenData(data);
    },
  });

  return (
    <IconButton
      key={TOOL_ID}
      title="Open story as a Pen in CodePen"
      style={{
        padding: 0,
        position: "relative",
        width: 28,
      }}
    >
      <CodepenIcon />
      <Form action={CODEPEN_URL} method="POST" target="_blank">
        <input type="hidden" name="data" value={formatData(codepenData)} />
        <InputSubmit type="submit" aria-label="Open story as a Pen on Codepen" />
      </Form>
    </IconButton>
  );
});
