import React from 'react';
import { CircularProgress } from '@mui/material';
import ArrivalCard from '@/components/Cards/Card';

const DesignList = ({ products, isLoading, error }) => {

  if (error) {
    return <p className="text-red-500">Failed to load categories.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 ">
      {products.map((item) => (
        <ArrivalCard key={item.product_id} item={item} />
      ))}
      {
        isLoading && (
          <div className="flex justify-center py-10">
            <CircularProgress size={40} color="warning" />
          </div>
        )
      }
    </div>
  );
};

export default DesignList;
