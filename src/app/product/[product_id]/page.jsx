'use client';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useproductStore } from '@/Store/productStore';
import BreadCrum from '@/components/BreadCrum/BreadCrum';
import ProductCard from '@/components/ProductCard/ProductCard';
import { Container } from '@mui/material';
import ArrivalCard from '@/components/Cards/Card';
import ProductSkeleton from '@/components/ProductCard/ProductSkeleton';


const ProductPage = () => {
  const { product_id } = useParams();
  const productId = Array.isArray(product_id) ? product_id[0] : product_id;

  const {
    productDetail,
    fetchProductById,
    isProductDetailLoading,
    error,
  } = useproductStore();

  useEffect(() => {
    if (productId) {
      fetchProductById(productId);
    }
  }, [productId]);

  if (isProductDetailLoading) return <Container className='my-20'><ProductSkeleton /></Container>;
  if (error) return <div>Error: {error}</div>;
  if (!productDetail) return <Container className='my-20'><ProductSkeleton /></Container>;

  const RelatedProducts = productDetail?.related_products;
  console.log(productDetail)
  return (
    <div>
      <BreadCrum
        crumbs={[
          { label: 'Home', href: '/' },
          { label: productDetail.model, href: `/products/${productDetail.id}` },
        ]}
      />
      
      <Container className='my-20'>
        <ProductCard item={productDetail} />
      </Container>

      <Container className='my-20'>
        <h3 className='text-center text-2xl font-semibold text-[var(--secondary)] my-16'>
          Related Products
        </h3>
       
        {RelatedProducts && RelatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8 place-items-center">
            {RelatedProducts.map((item) => (
              <ArrivalCard item={item} key={item.product_id} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 italic">No related products available.</p>
        )}
      </Container>
    </div>
  );
};

export default ProductPage;
