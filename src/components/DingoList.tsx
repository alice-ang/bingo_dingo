import { Disclosure } from '@headlessui/react';
import Image from 'next/image';
import { MdArrowDropDown, MdDelete } from 'react-icons/md';

import { deleteItem, Dingo } from '@/lib';

import { DashboardCard } from '@/components/DashboardCard';

import { useAuth } from '@/context/auth';

type Props = {
  dingos: Dingo[];
};
const DingoList = ({ dingos }: Props) => {
  const { user } = useAuth();

  return (
    <dl className='space-y-6 divide-y divide-gray-900/10'>
      {dingos.length > 0 &&
        dingos.map((dingo) => (
          <Disclosure as='div' key={dingo.id} className='my-2'>
            {({ open }) => (
              <>
                <dt>
                  <Disclosure.Button className='flex w-full items-start justify-between rounded-lg bg-black p-4 text-left'>
                    <span className='flex w-full items-center justify-between text-base font-semibold text-white'>
                      <span>{dingo.name}</span>
                      <span className='text-sm'>
                        {dingo?.rules.length ?? 0} regler
                      </span>
                    </span>
                    <span className='ml-6 flex h-7 items-center'>
                      {open ? (
                        <MdArrowDropDown
                          className='h-6 w-6 text-white'
                          aria-hidden='true'
                        />
                      ) : (
                        <MdArrowDropDown
                          className='h-6 w-6 -rotate-90 text-white'
                          aria-hidden='true'
                        />
                      )}
                    </span>
                  </Disclosure.Button>
                </dt>
                <Disclosure.Panel
                  as='dd'
                  className='bg-white p-4 shadow md:p-6'
                >
                  <div className='grid grid-cols-6 gap-4'>
                    <DashboardCard className='relative col-span-6 min-h-fit md:col-span-3'>
                      {dingo.media && (
                        <Image
                          src={dingo.media}
                          alt={dingo.name}
                          width='0'
                          height='0'
                          sizes='100vw'
                          className='h-auto w-full object-cover'
                        />
                      )}
                    </DashboardCard>
                    <p className='col-span-6 text-base leading-7 text-gray-600 md:col-span-3'>
                      {dingo.description}
                    </p>
                    <div className='col-span-6'>
                      <table className='min-w-full divide-y divide-gray-300'>
                        <thead>
                          <tr>
                            <th
                              scope='col'
                              className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8'
                            >
                              Regel
                            </th>
                            <th
                              scope='col'
                              className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                            >
                              Mängd
                            </th>
                            <th
                              scope='col'
                              className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                            >
                              Typ
                            </th>
                            <th
                              scope='col'
                              className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                            >
                              Tilldela
                            </th>
                            <th
                              scope='col'
                              className='relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8'
                            >
                              <span className='sr-only'>Edit</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200 bg-white'>
                          {dingo.rules.map((rule) => (
                            <tr key={rule.id}>
                              <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6 lg:pl-8'>
                                {rule.title}
                              </td>
                              <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                {rule.amount}
                              </td>
                              <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                {rule.type}
                              </td>
                              <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                {rule.assign ?? '-'}
                              </td>
                              {user?.uid == dingo.userId && (
                                <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8'>
                                  <p className='text-black hover:text-palette-yellow'>
                                    Redigera
                                    <span className='sr-only'>
                                      , {rule.title}
                                    </span>
                                  </p>
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className='col-span-8 flex justify-center md:justify-end'>
                      {user?.uid == dingo.userId && (
                        <button
                          className='flex items-center rounded-md border border-black bg-red-500 px-4 py-2 hover:bg-red-600'
                          onClick={() => deleteItem('dingos', dingo.id)}
                        >
                          <p className='mr-2 text-sm font-semibold'>Ta bort</p>
                          <MdDelete className='text-black ' size={22} />
                        </button>
                      )}
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      {dingos.length == 0 && (
        <h3 className='py-4 text-base font-semibold leading-6 text-gray-900'>
          Inga dingos skapade
        </h3>
      )}
    </dl>
  );
};

export default DingoList;
