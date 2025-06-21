'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const CategoryCard = ({ item, shape = 'square', totalCategories }) => {
  const router = useRouter();
  const isCircle = shape === 'circle';

  const wrapperSize = isCircle ? 150 : 203;
  const containerSize = isCircle ? 120 : 203;
  const imageSize = isCircle ? 80 : 150;

  const handleClick = () => {
    // Navigates to /design with the selected category as a query param
    router.push(`/design?category=${encodeURIComponent(item.name)}`);
  };

  const imageSrc = '/assets/butterflyimg.png'; // ✅ Replace with dynamic if needed

  return (
    <div
      className="text-center mx-3 cursor-pointer"
      style={{ width: wrapperSize }}
      onClick={handleClick}
    >
      {/* Image Container */}
      <div
        className={`mx-auto bg-[var(--secondary)] flex items-center justify-center ${
          isCircle ? 'rounded-full border-2 border-[var(--primary)]' : 'rounded-md'
        }`}
        style={{
          width: containerSize,
          height: containerSize,
        }}
      >
        <Image
          src={imageSrc}
          alt={item.description || 'Category image'}
          width={imageSize}
          height={imageSize}
          className="object-contain p-2"
        />
      </div>

      {/* Category Name */}
      <p className="mt-2 font-semibold text-md text-wrap text-[var(--secondary)]">
        {item.name}
      </p>

      {/* Product Count */}
      <p className="mb-3 text-md font-bold">
        <span className="gradient-text">{item.product_count} designs</span>
      </p>
    </div>
  );
};

export default CategoryCard;
