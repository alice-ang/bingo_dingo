import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
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
    name: 'Positiva',
    stat: '71.87%',
    icon: RiEmotionHappyFill,
    color: 'bg-green-500',
    change: '12%',
    changeType: 'increase',
  },
  {
    id: 2,
    name: 'Neutrala',
    stat: '19.16%',
    icon: RiEmotionNormalFill,
    color: 'bg-yellow-500',
    change: '5.4%',
    changeType: 'increase',
  },
  {
    id: 3,
    name: 'Negativa',
    stat: '9.57%',
    icon: RiEmotionUnhappyFill,
    color: 'bg-red-500',
    change: '3.2%',
    changeType: 'decrease',
  },
];

export const Stats = () => {
  return (
    <div>
      <h3 className='text-base font-semibold leading-6 text-gray-900'>
        Omdömen senaste 30 dagarna
      </h3>

      <dl className='mt-5 grid grid-cols-2 gap-5 md:grid-cols-3'>
        {stats.map((item) => (
          <DashboardCard
            key={item.id}
            className='relative cursor-pointer hover:bg-gray-50'
          >
            <dt>
              <div
                className={classNames(item.color, 'absolute rounded-md  p-3')}
              >
                <item.icon className='h-6 w-6 text-white' aria-hidden='true' />
              </div>
              <p className='ml-16 truncate text-sm font-medium text-gray-500'>
                {item.name}
              </p>
            </dt>
            <dd className='ml-16 flex flex-wrap items-baseline'>
              <p className='text-xl font-semibold text-gray-900 md:text-2xl'>
                {item.stat}
              </p>
              <p
                className={classNames(
                  item.changeType === 'increase'
                    ? 'text-green-600'
                    : 'text-red-600',
                  'ml-2 flex items-baseline text-sm font-semibold'
                )}
              >
                {item.changeType === 'increase' ? (
                  <AiOutlineArrowUp
                    className='h-5 w-5 flex-shrink-0 self-center text-green-500'
                    aria-hidden='true'
                  />
                ) : (
                  <AiOutlineArrowDown
                    className='h-5 w-5 flex-shrink-0 self-center text-red-500'
                    aria-hidden='true'
                  />
                )}

                <span className='sr-only'>
                  {' '}
                  {item.changeType === 'increase'
                    ? 'Increased'
                    : 'Decreased'}{' '}
                  by{' '}
                </span>
                {item.change}
              </p>
            </dd>
          </DashboardCard>
        ))}
      </dl>
    </div>
  );
};
