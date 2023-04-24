import Image, { StaticImageData } from 'next/image';

import { classNames } from '@/lib';

type Props = {
  src: string | StaticImageData;
  className: string;
};
export const Browser = ({ src, className }: Props) => {
  return (
    <div
      className={classNames(
        className,
        'overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10'
      )}
    >
      <div className='flex items-center border-b bg-slate-50 p-4'>
        <div className='mr-1 h-2 w-2 rounded-full bg-red-400' />
        <div className='mr-1 h-2 w-2 rounded-full bg-yellow-400' />
        <div className='mr-1 h-2 w-2 rounded-full bg-green-400' />
      </div>
      <Image className='w-full' src={src} alt='' />
    </div>
  );
};
