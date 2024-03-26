import type { API_LeafEntry } from "@storybook/types";
import React, { memo } from "react";
import { IconButton } from "@storybook/components";
import { useGlobals, useAddonState, useStorybookApi, useChannel } from "@storybook/manager-api";
import { styled } from "@storybook/theming";
import { STORY_CHANGED, STORY_ARGS_UPDATED } from '@storybook/core-events';
import { CodepenIcon } from './components/CodepenIcon';
import { type CodepenData, emptyState } from './withCodepenData';
import {
  ADDON_ID,
  CODEPEN_URL,
  PARAM_KEY,
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

const getData = (story: API_LeafEntry): CodepenData => {
  const rootElement: HTMLIFrameElement = document.querySelector('#storybook-preview-iframe');
  const rootBody = rootElement.contentDocument || rootElement.contentWindow.document;
  const storyRoot = rootBody.querySelector('#storybook-root');

  const html = [
    '<link rel="stylesheet" href="https://unpkg.com/@synergy-design-system/tokens/dist/themes/light.css"></link>',
    '<link rel="stylesheet" href="https://unpkg.com/@synergy-design-system/components/dist/themes/utility.css"></link>',
    '',
    storyRoot.innerHTML
  ].join('\n');

  const title = `${story.title}/${story.name}`;
  const js = [
    'import * as syn from "https://esm.sh/@synergy-design-system/components/dist/synergy.js";',
  ].join('\n');

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
    [STORY_CHANGED]: () => {
      console.log('story changed');
      setCodePenData(getData(api.getCurrentStoryData()));
    },
    [STORY_ARGS_UPDATED]: () => {
      console.log('story updated');
      setCodePenData(getData(api.getCurrentStoryData()));
    },
  });
  const [globals, updateGlobals] = useGlobals();
  const isActive = [true, 'true'].includes(globals[PARAM_KEY]);

  // const toggleMyTool = useCallback(() => {
  //   updateGlobals({
  //     [PARAM_KEY]: !isActive,
  //   });
  // }, [isActive]);

  // useEffect(() => {
  //   api.setAddonShortcut(ADDON_ID, {
  //     label: 'Toggle Measure [O]',
  //     defaultShortcut: ['O'],
  //     actionName: 'outline',
  //     showInMenu: false,
  //     action: toggleMyTool,
  //   });
  // }, [toggleMyTool, api]);

  console.log(codepenData, formatData(codepenData));

  return (
    <IconButton
      key={TOOL_ID}
      active={isActive}
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
