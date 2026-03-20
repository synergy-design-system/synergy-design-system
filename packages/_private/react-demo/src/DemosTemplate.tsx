import * as React from 'react';

export type DemosTemplateProps = {
  demos: Array<[string, () => React.JSX.Element]>;
};

export const DemosTemplate = ({ demos }: DemosTemplateProps) => {
  const activeDemo = demos[0]?.[0] || '';

  if (demos.length === 0) {
    return (
      <span>There are no demos available.</span>
    );
  }

  return (
    <syn-tab-group
      className="demo-tab-group"
      onsyn-tab-show={(e) => {
        const { name } = e.detail;
        (e.target as HTMLElement).parentElement?.scrollTo(0, 0);

        const dialog = document.querySelector('syn-dialog');
        if (dialog) {
          dialog.open = name === 'Dialog';
        }
      }}
      placement='end'
    >
      {demos.map(([name, Component]) => (
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
            <div id={`tab-content-${name}`}>
              <h1 className="syn-heading--3x-large">{name}</h1>
              <syn-divider />
              <Component />
            </div>
          </syn-tab-panel>
        </React.Fragment>
      ))}
    </syn-tab-group>
  );
};
