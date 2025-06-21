'use client';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';



import Banner_img1 from '../../../public/assets/Banner_images/img1.png';

const Banner = () => {
  const list = [
    {
      id: 1,
      image: Banner_img1,
      alt: 'Banner image 1',
    },
    {
      id: 2,
      image: Banner_img1,
      alt: 'Banner image 2',
    },
  ];

  return (
    <div className="w-full">
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        interval={2000}
        transitionTime={600}
        swipeable
        emulateTouch
        stopOnHover
      >
        {list.map((item) => (
          <div key={item.id} className="relative w-full  ">
            <Image
              src={item.image}
              alt={item.alt}
            
              className="object-cover"
              priority
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
