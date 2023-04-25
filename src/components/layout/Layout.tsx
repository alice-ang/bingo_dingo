import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { BsBell, BsChevronDown } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { IoMdSettings } from 'react-icons/io';
import {
  MdArrowDropDown,
  MdBarChart,
  MdClose,
  MdFlag,
  MdMode,
  MdOutlineDashboard,
  MdOutlineQuiz,
  MdPostAdd,
} from 'react-icons/md';

import { classNames, logOut, signInWithGoogle } from '@/lib';

import { AdBanner, BackToTop, Logo, NextImage } from '@/components';
import { Footer } from '@/components/layout/Footer';

import { useAuth } from '@/context/auth';

const navigation = [
  { name: 'Översikt', icon: MdOutlineDashboard, href: '/', current: true },
  {
    name: 'Quiz',
    icon: MdOutlineQuiz,
    href: null,
    count: 12,
    current: false,
    children: [
      { name: 'Skapa', href: '/create', icon: MdPostAdd },
      { name: 'Mina quiz', href: '/quizzes', icon: MdMode },
    ],
  },
  {
    name: 'Checkpoints',
    icon: MdFlag,
    href: '/',
    count: 12,
    current: false,
  },
  { name: 'Statistik', icon: MdBarChart, href: '/stats', current: false },
];

const userNavigation = [
  { name: 'Användarprofil', href: '#' },
  { name: 'Logga ut', href: '#', clicked: logOut },
];

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  return (
    <>
      <div className='bg-zinc-50 '>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as='div'
            className='relative z-0 lg:hidden'
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-gray-900/80' />
            </Transition.Child>

            <div className='fixed inset-0 flex'>
              <Transition.Child
                as={Fragment}
                enter='transition ease-in-out duration-300 transform'
                enterFrom='-translate-x-full'
                enterTo='translate-x-0'
                leave='transition ease-in-out duration-300 transform'
                leaveFrom='translate-x-0'
                leaveTo='-translate-x-full'
              >
                <Dialog.Panel className='relative mr-16 flex w-full max-w-xs flex-1'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-in-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in-out duration-300'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    <div className='absolute top-0 left-full flex w-16 justify-center pt-5'>
                      <button
                        type='button'
                        className='-m-2.5 p-2.5'
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className='sr-only'>Close sidebar</span>
                        <MdClose
                          className='h-6 w-6 text-white'
                          aria-hidden='true'
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className='flex min-h-0 flex-1 flex-col border-r border-black bg-white px-4'>
                    <div className='flex flex-1 flex-col overflow-y-auto pt-5 pb-4'>
                      <Link href='/' passHref>
                        <div className='flex flex-shrink-0 items-center '>
                          <Logo />
                        </div>
                      </Link>
                      <nav className='mt-5 flex-1 space-y-1 bg-white'>
                        {navigation.map((item) =>
                          !item.children ? (
                            <div key={item.name}>
                              <Link
                                key={item.name}
                                href={item.href}
                                passHref
                                className={classNames(
                                  item.current
                                    ? 'border border-black bg-palette-yellow text-black'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                  'group flex items-center rounded-md px-2 py-2 text-sm font-medium'
                                )}
                              >
                                <item.icon
                                  className={classNames(
                                    item.current
                                      ? 'text-yellow-500'
                                      : 'text-gray-400 group-hover:text-gray-500',
                                    'mr-3 h-6 w-6 flex-shrink-0'
                                  )}
                                  aria-hidden='true'
                                />
                                {item.name}
                              </Link>
                            </div>
                          ) : (
                            <Disclosure
                              as='div'
                              key={item.name}
                              className='space-y-1'
                            >
                              {({ open }) => (
                                <>
                                  <Disclosure.Button
                                    className={classNames(
                                      item.current
                                        ? 'border border-black bg-palette-yellow text-black'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                      'group flex w-full items-center rounded-md py-2 pl-2 pr-1 text-left text-sm font-medium focus:outline-none '
                                    )}
                                  >
                                    <item.icon
                                      className={classNames(
                                        item.current
                                          ? 'text-black'
                                          : 'text-gray-400 group-hover:text-gray-500',
                                        'mr-3 h-6 w-6 flex-shrink-0'
                                      )}
                                    />
                                    <span className='flex-1'>{item.name}</span>
                                    <MdArrowDropDown
                                      className={classNames(
                                        open ? '' : '-rotate-90',
                                        'ml-3 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out '
                                      )}
                                    />
                                  </Disclosure.Button>
                                  <Disclosure.Panel className='space-y-1'>
                                    {item.children.map((subItem) => (
                                      <Disclosure.Button
                                        key={subItem.name}
                                        as='a'
                                        href={subItem.href}
                                        className='group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                      >
                                        <subItem.icon
                                          className={classNames(
                                            item.current
                                              ? 'text-black'
                                              : 'text-gray-400 group-hover:text-gray-500',
                                            'mr-3 h-6 w-6 flex-shrink-0'
                                          )}
                                        />
                                        {subItem.name}
                                      </Disclosure.Button>
                                    ))}
                                  </Disclosure.Panel>
                                </>
                              )}
                            </Disclosure>
                          )
                        )}
                      </nav>
                      {/* Ad banner */}
                      <AdBanner />
                    </div>
                    <div className='flex flex-shrink-0 border-t border-gray-200 p-4'>
                      <div className='flex items-center'>
                        <Link
                          passHref
                          href='#'
                          className='group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        >
                          <IoMdSettings
                            className='group-hover:text-grey-600 h-6 w-6 shrink-0 text-black'
                            aria-hidden='true'
                          />
                          Inställningar
                        </Link>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className='hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col'>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className='flex min-h-0 flex-1 flex-col border-r border-black bg-white px-4'>
            <div className='flex flex-1 flex-col overflow-y-auto pt-5 pb-4'>
              <Link href='/' passHref>
                <div className='flex flex-shrink-0 items-center '>
                  <Logo />
                </div>
              </Link>
              <nav className='mt-5 flex-1 space-y-1 bg-white'>
                {navigation.map((item) =>
                  !item.children ? (
                    <div key={item.name}>
                      <Link
                        passHref
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'border border-black bg-palette-yellow text-black'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                          'group flex items-center rounded-md px-2 py-2 text-sm font-medium'
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? 'text-black'
                              : 'text-gray-400 group-hover:text-gray-500',
                            'mr-3 h-6 w-6 flex-shrink-0'
                          )}
                          aria-hidden='true'
                        />
                        {item.name}
                      </Link>
                    </div>
                  ) : (
                    <Disclosure as='div' key={item.name} className='space-y-1'>
                      {({ open }) => (
                        <>
                          <Disclosure.Button
                            className={classNames(
                              item.current
                                ? 'border border-black bg-palette-yellow text-black'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                              'group flex w-full items-center rounded-md py-2 pl-2 pr-1 text-left text-sm font-medium focus:outline-none '
                            )}
                          >
                            <item.icon
                              className={classNames(
                                item.current
                                  ? 'text-yellow-500'
                                  : 'text-gray-400 group-hover:text-gray-500',
                                'mr-3 h-6 w-6 flex-shrink-0'
                              )}
                            />
                            <span className='flex-1'>{item.name}</span>
                            <MdArrowDropDown
                              className={classNames(
                                open ? '' : '-rotate-90',
                                'ml-3 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out '
                              )}
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className='space-y-1'>
                            {item.children.map((subItem, i) => (
                              <span key={i}>
                                <Disclosure.Button
                                  key={subItem.name}
                                  as='a'
                                  href={subItem.href}
                                  className='group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                >
                                  <subItem.icon
                                    className={classNames(
                                      item.current
                                        ? 'text-yellow-500'
                                        : 'text-gray-400 group-hover:text-gray-500',
                                      'mr-3 h-6 w-6 flex-shrink-0'
                                    )}
                                    aria-hidden='true'
                                  />
                                  {subItem.name}
                                </Disclosure.Button>
                              </span>
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  )
                )}
              </nav>
              {/* Ad banner */}
              <AdBanner />
            </div>
            <div className='flex flex-shrink-0 border-t border-gray-200 p-4'>
              <Link
                passHref
                href='#'
                className='group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              >
                <IoMdSettings
                  className='group-hover:text-grey-600 h-6 w-6 shrink-0 text-black'
                  aria-hidden='true'
                />
                Inställningar
              </Link>
            </div>
          </div>
        </div>

        <div className='lg:pl-72'>
          <div className='sticky top-0 z-10 flex h-16 shrink-0 items-center gap-x-4 border-b border-black bg-white px-4 sm:gap-x-6 sm:px-6 lg:px-8'>
            <button
              type='button'
              className='-m-2.5 p-2.5 text-gray-700 lg:hidden'
              onClick={() => setSidebarOpen(true)}
            >
              <span className='sr-only'>Open sidebar</span>
              <GiHamburgerMenu className='h-6 w-6' aria-hidden='true' />
            </button>

            {/* Separator */}
            <div
              className='h-6 w-px bg-gray-200 lg:hidden'
              aria-hidden='true'
            />
            <div className='flex flex-1 gap-x-4 self-stretch lg:gap-x-6'>
              <form className='relative flex flex-1' action='#' method='GET'>
                <label htmlFor='search-field' className='sr-only'>
                  Sök
                </label>
                <HiOutlineMagnifyingGlass
                  className='pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-black'
                  aria-hidden='true'
                />
                <input
                  id='search-field'
                  className='block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm'
                  placeholder='Sök'
                  type='search'
                  name='search'
                />
              </form>
              <div className='flex items-center gap-x-4 lg:gap-x-6'>
                <button
                  type='button'
                  className='-m-2.5 p-2.5 text-gray-400 hover:text-gray-500'
                >
                  <span className='sr-only'>View notifications</span>
                  <BsBell className='h-6 w-6 text-black' aria-hidden='true' />
                </button>
                {/* Separator */}
                <div
                  className='hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200'
                  aria-hidden='true'
                />
                {/* Profile dropdown */}
                {user ? (
                  <Menu as='div' className='relative'>
                    <Menu.Button className='-m-1.5 flex items-center p-1.5'>
                      <span className='sr-only'>Open user menu</span>
                      <NextImage
                        height={40}
                        width={40}
                        imgClassName='h-8 w-8 rounded-full bg-gray-50 border border-black'
                        src={
                          user?.photoURL ??
                          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                        }
                        alt=''
                      />
                      <span className='hidden lg:flex lg:items-center'>
                        <span className='flex-col text-left'>
                          <span
                            className=' text-sm font-semibold leading-6 text-gray-900'
                            aria-hidden='true'
                          >
                            {user?.displayName ?? user?.email}
                          </span>
                          <p
                            className='text-xs text-gray-700'
                            aria-hidden='true'
                          >
                            Quizmaster
                          </p>
                        </span>

                        <BsChevronDown
                          className='ml-2 text-gray-400'
                          aria-hidden='true'
                          size={14}
                        />
                      </span>
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-100'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'
                    >
                      <Menu.Items className='absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md border border-black bg-white py-2 ring-1 ring-gray-900/5 focus:outline-none'>
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <>
                                {item.clicked ? (
                                  <div
                                    onClick={item.clicked}
                                    className={classNames(
                                      active ? 'bg-gray-50' : '',
                                      'block cursor-pointer px-3 py-1 text-sm leading-6 text-gray-900'
                                    )}
                                  >
                                    {item.name}
                                  </div>
                                ) : (
                                  <Link
                                    passHref
                                    href={item.href}
                                    className={classNames(
                                      active ? 'bg-gray-50' : '',
                                      'block px-3 py-1 text-sm leading-6 text-gray-900'
                                    )}
                                  >
                                    {item.name}
                                  </Link>
                                )}
                              </>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <button
                    onClick={() => signInWithGoogle()}
                    className='hover:text-green font-semibold '
                  >
                    Logga in
                  </button>
                )}
              </div>
            </div>
          </div>
          <main className='mx-auto min-h-screen max-w-7xl py-6 px-6 sm:px-6 md:px-16 md:py-12'>
            {children}
          </main>

          <Footer />
        </div>
      </div>
      <BackToTop />
    </>
  );
};
