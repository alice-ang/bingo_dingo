import React from 'react';
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
              className='hover:text-yellow-500 text-gray-400'
            >
              <span className='sr-only'>{item.name}</span>
              <item.icon className='h-6 w-6 text-black' aria-hidden='true' />
            </a>
          ))}
        </div>
        <div className='mt-8 md:order-1 md:mt-0'>
          <p className='text-center text-sm leading-5 text-gray-500'>
            &copy; {new Date().getFullYear()} quizzly.se | Alla rättigheter
            förbehållna
          </p>
        </div>
      </div>
    </footer>
  );
};
