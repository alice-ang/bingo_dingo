import { Tab } from '@headlessui/react';

import { classNames } from '@/lib';

type Props = {
  tabs: {
    title: string;
    tab: JSX.Element;
  }[];
};

export const Tabs = ({ tabs }: Props) => {
  return (
    <Tab.Group>
      <Tab.List className='my-3 flex rounded-lg border border-black bg-white py-2 '>
        {tabs.map((tab, i) => (
          <Tab
            key={i}
            className={({ selected }) =>
              classNames(
                selected ? 'bg-black text-white' : 'bg-white text-black',
                'text mx-2 flex-1 rounded-lg px-4 py-2 text-center md:text-lg'
              )
            }
          >
            {tab.title}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className='mt-2'>
        {tabs.map((item, idx) => (
          <Tab.Panel
            key={idx}
            className={classNames(
              'rounded-xl',
              'ring-offset-2focus:outline-none ring-white ring-opacity-60 focus:ring-2'
            )}
          >
            {item.tab}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};
