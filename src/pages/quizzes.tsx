/* eslint-disable no-console */
import { Disclosure } from '@headlessui/react';
import { getDocs } from 'firebase/firestore';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MdArrowDropDown, MdDelete, MdModeEdit } from 'react-icons/md';

import { Quiz, quizzesCollectionRef } from '@/lib';
import useModal from '@/lib/useModal';

import { Badges, DashboardCard, Modal, Seo, Stats } from '@/components';

export default function QuizzesPage() {
  const { isOpen, toggle } = useModal();
  const [quizList, setQuizList] = useState<Quiz[]>([]);

  const getQuizList = async () => {
    try {
      const data = await getDocs(quizzesCollectionRef);
      const filteredData = data.docs.map(
        (doc) =>
          ({
            ...doc.data(),
            id: doc.id,
          } as Quiz)
      );
      setQuizList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getQuizList();
  }, []);

  return (
    <>
      <Seo templateTitle='Mina quiz' />

      <section>
        <h2 className='text-4xl font-normal text-gray-900'>Mina quiz</h2>
        <h3 className='py-4 text-base font-semibold leading-6 text-gray-900'>
          Lorem ipsum dolor
        </h3>
        <Badges items={['Aktiva', 'Arkiverade', 'Längst runda', 'A-Ö']} />
        <dl className='mt-6 space-y-6 divide-y divide-gray-900/10'>
          {quizList.map((quiz) => (
            <Disclosure as='div' key={quiz.name} className='my-2'>
              {({ open }) => (
                <>
                  <dt>
                    <Disclosure.Button className='flex w-full items-start justify-between rounded-lg bg-black p-4 text-left'>
                      <span className='flex w-full items-center justify-between text-base font-semibold text-white'>
                        <span>{quiz.name}</span>
                        <span className='text-sm'>
                          {quiz.distance}km | {quiz.questions.length + 1} frågor
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
                      {/* <div className='col-span-6 md:col-span-2'>
                        <MdOutlineQrCode2
                          className='h-48 w-full'
                          aria-hidden='true'
                        />

                      </div> */}
                      <DashboardCard className='relative col-span-6 md:col-span-3'>
                        <Image
                          src='https://source.unsplash.com/1920x1080/?nature,water'
                          alt='bild'
                          fill
                          className='object-cover p-4'
                        />
                      </DashboardCard>

                      <p className='col-span-6 text-base leading-7 text-gray-600 md:col-span-3'>
                        {quiz.description}
                      </p>
                      <div className='col-span-6'>
                        <h3 className='my-3 text-base font-semibold text-gray-900'>
                          Frågor
                        </h3>
                        <div className='grid grid-cols-4 gap-4 text-center'>
                          {quiz.questions.map((question, i) => (
                            <DashboardCard
                              key={i}
                              className='col-span-2 cursor-pointer hover:bg-yellow md:col-span-1'
                              onClick={toggle}
                            >
                              <p className='font-semibold'>{`Fråga ${
                                i + 1
                              }`}</p>
                              <p className='py-2 text-sm text-gray-700'>
                                {question.question}
                              </p>
                            </DashboardCard>
                          ))}
                          {/* <DashboardCard className='col-span-2 cursor-pointer hover:bg-yellow md:col-span-1'>
                            <p className='font-semibold'>Utslagningsfråga</p>
                            <p className='py-2 text-sm text-gray-700'>
                              {quiz.elimination.question}
                            </p>
                          </DashboardCard> */}
                        </div>
                      </div>
                      <div className='col-span-6'>
                        <Stats />
                      </div>
                      <div className='col-span-6 flex justify-end'>
                        <MdModeEdit
                          className='mx-4 h-6 w-6 hover:text-green'
                          aria-hidden='false'
                        />
                        <MdDelete
                          className='h-6 w-6 hover:text-red-500'
                          aria-hidden='false'
                        />
                      </div>
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </dl>
      </section>
      <Modal isOpen={isOpen} toggle={toggle}>
        <h2>hej</h2>
      </Modal>
    </>
  );
}
