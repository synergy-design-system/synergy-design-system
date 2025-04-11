import { Fragment, useState } from 'react';

export const TabGroup = () => {
  const initialItems = [
    {
      description: 'This is the custom tab panel.', disabled: false, id: 'general', name: 'General',
    },
    {
      description: 'This is the disabled tab panel.', disabled: true, id: 'disabled', name: 'Disabled',
    },
    {
      description: 'This is the custom tab panel.', disabled: false, id: 'custom', name: 'Custom',
    },
    {
      description: 'This is the advanced tab panel.', disabled: false, id: 'advanced', name: 'Advanced',
    }];

  const [items, setItems] = useState(initialItems);

  const createNewActiveTab = () => {
    setItems((prevItems) => [...prevItems, {
      description: `This is the new tab panel ${prevItems.length + 1}.`,
      disabled: false,
      id: `new-tab-${prevItems.length + 1}`,
      name: `New Tab ${prevItems.length + 1}`,
    }]);
  };
  return (
    <>
      <syn-tab-group contained>
        {items.map((item, index) => (
          <Fragment key={item.id}>
            <syn-tab-panel name={item.id}>
              {item.description}
            </syn-tab-panel>
            <syn-tab
              slot="nav"
              panel={item.id}
              disabled={item.disabled}
              active={index === items.length - 1}
            >
              {item.name}
            </syn-tab>
          </Fragment>
        ))}
      </syn-tab-group>
      <syn-button onClick={createNewActiveTab}>Add Tab</syn-button>
    </>
  );
};
