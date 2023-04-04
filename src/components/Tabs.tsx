import { useState } from 'react';

import { classNames } from '@/lib';

type Props = {
  tabs: string[];
  onSelect: (idx: number) => void;
  defaultIdx?: number;
};

export const Tabs = ({ tabs, onSelect, defaultIdx }: Props) => {
  const [currentIdx, setCurrentIdx] = useState(defaultIdx ?? 0);

  return (
    <div className='my-3 flex rounded-lg border border-black bg-white py-2 '>
      {tabs.map((tab, i) => (
        <div
          className={classNames(
            currentIdx == tabs.indexOf(tab)
              ? 'bg-black text-white'
              : 'bg-white text-black',
            'text mx-2 flex-1 rounded-lg px-4 py-2 text-center md:text-lg'
          )}
          key={i}
          onClick={() => {
            onSelect(tabs.indexOf(tab));
            setCurrentIdx(tabs.indexOf(tab));
          }}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};
