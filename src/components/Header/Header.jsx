'use client';
import React from 'react';
import { IoCall } from 'react-icons/io5';
import { FaFacebook, FaInstagram, FaPinterest } from 'react-icons/fa';

import Container from '@mui/material/Container';
import dynamic from 'next/dynamic';
import { FiMail } from "react-icons/fi";
const HeaderLinks = dynamic(() => import('./Header_links'), { ssr: true });
export const socialIcons = [
  {
    id:1,
    icon: <FaFacebook color="var(--secondary)" size={22} />,
    href: 'https://facebook.com',
  },
  {
    id:2,
    icon: <FaInstagram color="var(--secondary)" size={22} />,
    href: 'https://instagram.com',
  },
  {
    id:3,
    icon: <FaPinterest color="var(--secondary)" size={22} />,
    href: 'https://pinterest.com',
  },
];

const Header = () => {
  const contacts = [
    {
      id:4,
      icon: <IoCall color="var(--secondary)" />,
      text: '+91 9951916767',
      href: 'tel:+91 9951916767',
    },
    {
      id:5,
      icon: <FiMail color="var(--secondary)" size={20} />,
      text: 'support@annecreationshb.com',
      href: 'mailto:support@annecreationshb.com',
    },
  ];

  return (
    <>
     
      <div className="bg-[var(--primary)] hidden shadow-xl lg:block overflow-hidden">
   <Container className='py-3 px-0 '>
          <div className="flex justify-between items-center">
            {/* Contacts */}
            <ul className="flex gap-6">
              {contacts.map((item) => (
                <li key={item.id} className="flex items-center gap-2 text-md">
                  {item.icon}
                  <a href={item.href} className="text-[var(--secondary)] font-[600]">
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social Icons */}
            <div className="flex gap-4 items-center">
              {socialIcons.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 text-[var(--secondary)] font-semibold"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
          </Container>
        </div>
     

      {/* Main Nav (can include a mobile hamburger menu in Header_links) */}
      <div className='w-full sticky py-2 shadow-2xl bg-white top-0 z-50'>
      <Container >
        <HeaderLinks/>
        </Container>
      </div>
      
    </>
  );
};

export default Header;
