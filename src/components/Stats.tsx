import {
  RiEmotionHappyFill,
  RiEmotionNormalFill,
  RiEmotionUnhappyFill,
} from 'react-icons/ri';

import { classNames } from '@/lib';

import { DashboardCard } from '@/components';

const stats = [
  {
    id: 1,
    type: 'Positiva',
    stat: '71.87%',
    icon: RiEmotionHappyFill,
    color: 'bg-palette-green',
    change: '12%',
    changeType: 'increase',
  },
  {
    id: 2,
    type: 'Neutrala',
    stat: '19.16%',
    icon: RiEmotionNormalFill,
    color: 'bg-palatte-yellow',
    change: '5.4%',
    changeType: 'increase',
  },
  {
    id: 3,
    type: 'Negativa',
    stat: '9.57%',
    icon: RiEmotionUnhappyFill,
    color: 'bg-palette-pink',
    change: '3.2%',
    changeType: 'decrease',
  },
];

export const Stats = () => {
  return (
    <div>
      <h3 className='my-3 text-base font-semibold text-gray-900'>Reaktioner</h3>

      <dl className=' grid grid-cols-2 gap-4 md:grid-cols-3'>
        {stats.map((item, i) => (
          <DashboardCard
            key={i}
            className='relative cursor-pointer hover:bg-gray-50'
          >
            <dt className='flex-col '>
              <div
                className={classNames(
                  item.color,
                  'absolute flex-col rounded-md border border-black p-3'
                )}
              >
                <item.icon className='h-6 w-6 text-black' aria-hidden='true' />
              </div>
              <p className='ml-16 truncate text-sm font-medium text-gray-500'>
                {item.type}
              </p>
            </dt>
            <dd className='ml-16 flex flex-wrap items-baseline'>
              <p className='text-xl font-semibold text-gray-900 md:text-2xl'>
                {item.stat}
              </p>
            </dd>
          </DashboardCard>
        ))}
      </dl>
    </div>
  );
};
