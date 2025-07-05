'use client';
import React from 'react';
import Banner from '../components/Banner/Banner';
import { FaStar } from 'react-icons/fa';
import Categorysection from './Category/Categorysection';
import Arrivalsection from './Arrival/Arrivalsection';
import Image from 'next/image';
import img1 from '../../public/assets/home-img.png';
import img2 from '../../public/assets/home-img1.png';
import { Container } from '@mui/material';

const Page = () => {
  const list = [
    { id: 1, text: 'Exclusive Embroidery Designs: Special offer!' },
    { id: 2, text: 'Multi Needle Embroidery Machines' },
    { id: 3, text: 'Get 25% OFF your first order!' },
    { id: 4, text: 'Exclusive Embroidery Designs: Special offer!' },
  ];

  const topdesigns = [img1, img2, img1];

  return (
    <>
    
  
      {/* Hero Banner */}
      <Banner />

      {/* Announcement Bar with smooth infinite scroll */}
      <section className="bg-[var(--primary)] py-3 overflow-hidden relative">
        <div
          className="flex whitespace-nowrap text-[var(--secondary)] font-semibold gap-8"
          style={{
            animation: 'scroll-left 20s linear infinite',
          }}
        >
          {[...list, ...list].map((item, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-2 text-md min-w-max"
            >
              <FaStar color="var(--secondary)" size={16} />
              {item.text}
            </span>
          ))}
        </div>

        {/* Keyframes animation */}
        <style jsx>{`
          @keyframes scroll-left {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </section>

      {/* Category Section */}
      <Container className="py-10">
        <Categorysection />
      </Container>

      {/* Arrival Section */}
      <Container className="pb-10">
        <Arrivalsection />
      </Container>

      {/* Top Designs Section */}
      <Container className="my-10 py-8">
        <div className="flex flex-wrap justify-center gap-4">
          {topdesigns.map((item, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex justify-center"
            >
              <Image
                src={item}
                alt="Special most selected design"
                className="object-cover rounded"
              />
            </div>
          ))}
        </div>
      </Container>

    </>
  );
};

export default Page;
