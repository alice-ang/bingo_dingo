import React from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const navigation = [
  {
    name: 'Facebook',
    href: '#',
    icon: FaFacebook,
  },
  {
    name: 'Instagram',
    href: '#',
    icon: FaInstagram,
  },
  {
    name: 'Twitter',
    href: '#',
    icon: FaTwitter,
  },

  {
    name: 'YouTube',
    href: '#',
    icon: FaYoutube,
  },
];

export const Footer = () => {
  return (
    <footer className='border-t border-black bg-white'>
      <div className='mx-auto max-w-7xl py-12 px-6 md:flex md:items-center md:justify-between lg:px-8'>
        <div className='flex justify-center space-x-6 md:order-2'>
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className='text-gray-400 hover:text-yellow-500'
            >
              <span className='sr-only'>{item.name}</span>
              <item.icon className='h-6 w-6 text-black' aria-hidden='true' />
            </a>
          ))}
        </div>
        <div className='mt-4 md:order-1 md:mt-0 '>
          <span className='flex items-center text-center text-sm leading-5 text-zinc-600 dark:text-zinc-400'>
            &copy; {new Date().getFullYear()} | Utvecklad med
            <AiFillHeart
              size={16}
              className='mx-1 text-palette-pink dark:text-palette-yellow'
            />{' '}
            av
            <a
              href='https://www.linkedin.com/in/alice-anglesj%C3%B6-9503121a7/'
              target='_blank'
              className='ml-1 hover:text-palette-green'
            >
              Alice Anglesjö
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};
