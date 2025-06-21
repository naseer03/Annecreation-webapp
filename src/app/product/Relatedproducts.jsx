import React from "react";
import { Container } from "@mui/material";
import ArrivalCard from "@/components/Cards/Card";
import { usecategoryStore } from "@/Store/categoryStore";

const RelatedProductsSection = () => (
  <Container className='my-20'>
    <h3 className='text-center text-2xl font-semibold text-[var(--secondary)] my-16'>
      Related Products
    </h3>

    {products?.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8 place-items-center">
        {products.map((item) => (
          <ArrivalCard item={item} key={item.product_id} />
        ))}
      </div>
    ) : (
      <p className="text-center text-gray-500 italic">No related products available.</p>
    )}
  </Container>
);