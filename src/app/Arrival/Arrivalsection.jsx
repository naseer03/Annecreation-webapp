'use client';

import React, { useEffect, useState } from 'react';
import ArrivalCard from '@/components/Cards/Card';
import ArrivalCardSkeleton from '@/components/Cards/LoadingCard';
import { useproductStore } from '@/Store/productStore';

const Arrivalsection = () => {
  const {
    products,
    fetchProducts,
    fetchProductWithPriceById,
    loading,
    error,
  } = useproductStore();

  const [enrichedProducts, setEnrichedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch base product list
  useEffect(() => {
    fetchProducts();
  }, []);

  // Enrich each product with price in original order
  useEffect(() => {
    const enrichProducts = async () => {
      if (!products.length) return;

      setIsLoading(true);

      const enriched = await Promise.all(
        products.map((product) =>
          fetchProductWithPriceById(product.product_id)
        )
      );

      // Filter out null/failed fetches, but preserve order
      const filtered = enriched.filter((p) => p !== null);
      setEnrichedProducts(filtered);
      setIsLoading(false);
    };

    enrichProducts();
  }, [products]);

  return (
    <>
      <p className="w-full text-center gradient-text text-md mb-2 font-bold">
        <span className="gradient-text">New Arrivals</span>
      </p>

      <h2 className="text-center font-poppins text-2xl mb-10 text-[var(--secondary)] font-bold">
        Our New Arrivals
      </h2>

      {loading || isLoading ? <ArrivalCardSkeleton count={10} /> : null}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-8 place-items-center">
        {enrichedProducts.map((item) => (
          <ArrivalCard item={item} key={item.product_id} />
        ))}
      </div>
    </>
  );
};

export default Arrivalsection;
