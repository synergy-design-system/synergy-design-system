import * as React from 'react';
import * as DemoImports from './AllComponentParts';

const Demos = Object.entries(DemoImports);
const activeDemo = Demos.at(0)?.at(0);

export const AllComponents = () => (
  <syn-tab-group
    onsyn-tab-show={(e) => {
      (e.target as HTMLElement).parentElement?.scrollTo(0, 0);
    }}
  >
    {Demos.map(([name, Component]) => (
      <React.Fragment key={name}>
        <syn-tab
          active={name === activeDemo}
          id={`tab-${name}`}
          panel={name}
          slot="nav"
        >
          {name}
        </syn-tab>
        <syn-tab-panel
          active={name === activeDemo}
          name={name}
        >
          <div id={`tab-content-${name}`} style={{ display: 'contents' }}>
            <Component />
          </div>
        </syn-tab-panel>
      </React.Fragment>
    ))}
  </syn-tab-group>
);
