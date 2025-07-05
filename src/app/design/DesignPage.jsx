'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Container } from '@mui/material';
import BreadCrum from '@/components/BreadCrum/BreadCrum';
import { usecategoryStore } from '@/Store/categoryStore';
import { useproductStore } from '@/Store/productStore';
import CategoryTabs from './categoryTabs';
import SortSelect from './sortSelect';
import DesignList from './DesginlIst';
import { useSearchParams } from 'next/navigation';

export default function DesignPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [sortOption, setSortOption] = useState('price_asc');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(null);

  const fetchingRef = useRef(false); 

  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get('category');

  const {
    fetchCategories,
    fetchCategoryProducts,
    category,
    products,
    isCategoriesLoading,
    isProductsLoading,
    error,
  } = usecategoryStore();

  const {
    fetchProductWithPriceById,
    productsWithPrice,
    resetProductsWithPrice,
  } = useproductStore();

  const handleScrollCheck = () => {
      if (isCategoriesLoading || fetchingRef.current) return;

      // If we have total and already loaded all records, stop
      if (total !== null && productsWithPrice.length >= total) return;

      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      const scrollPosition = scrollTop + windowHeight;
      const threshold = fullHeight * 0.5;

      if (scrollPosition >= threshold) {
        fetchingRef.current = true;
        setPage(prev => prev + 1);
      }
    };

  // Fetch categories once
  useEffect(() => {
    resetProductsWithPrice();
    fetchCategories();
  }, []);

  // Memoized category names for tabs
  const categoryNames = useMemo(() => category.map((cat) => cat.name), [category]);

  // Sync selected category based on URL or default
  useEffect(() => {
    if (category.length > 0) {
      let index = activeTab;
      if (categoryFromUrl) {
        const foundIndex = category.findIndex((cat) => cat.name === categoryFromUrl);
        if (foundIndex !== -1) index = foundIndex;
      }

      setActiveTab(index);
      setSelectedCategory(category[index]?.name || '');
      setSelectedCategoryId(category[index]?.category_id || null);
    }
  }, [categoryFromUrl, category]);


  // Fetch category products when ID/page/sort changes
  useEffect(() => {
    if (selectedCategoryId) {
      fetchCategoryProducts(selectedCategoryId, page, sortOption);
    }
  }, [selectedCategoryId, page, sortOption]);

  // Enrich fetched products with price
  useEffect(() => {
    const enrichProducts = async () => {
      if (products?.products?.length) {
        for (const item of products.products) {
          await fetchProductWithPriceById(item.product_id);
        }
        fetchingRef.current = false;
        handleScrollCheck()
      }
    };
    setTotal(products?.pagination?.total)
    enrichProducts();
  }, [products]);

  // Handlers
  const handleTabChange = (index) => {
    setActiveTab(index);
    setSelectedCategory(category[index].name);
    setSelectedCategoryId(category[index].category_id);
    setPage(1);
    resetProductsWithPrice();
  };


  useEffect(() => {
    const handleScroll = () => {
      handleScrollCheck()
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isCategoriesLoading, productsWithPrice.length, total]);

  const currentCategoryName = products?.category?.name || selectedCategory;
 
  return (
    <>
      <BreadCrum
        crumbs={[
          { label: 'Category', href: '/Category' },
          { label: currentCategoryName, href: '/design' },
        ]}
      />

      <Container className="my-20">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Tabs */}
          <aside className="w-full md:w-1/4 border border-[var(--primary)] bg-white rounded-lg max-h-[150vh] overflow-y-auto">
            <div className="sticky top-0 z-30 bg-white text-center py-3 font-bold border-b border-[var(--primary)]">
              <span className="gradient-text">All Categories</span>
            </div>

            <CategoryTabs
              categories={categoryNames}
              activeTab={activeTab}
              onChange={handleTabChange}
              isLoading={isCategoriesLoading}
            />
          </aside>

          {/* Main Section */}
          <section className="w-full md:w-3/4 bg-white/10 rounded-lg ">
            <div className="flex flex-col sm:flex-row justify-between mb-6 gap-3">
              <p className="text-sm text-gray-700">
                Showing {total} designs
              </p>
              <SortSelect sortOption={sortOption} onChange={setSortOption} />
            </div>

            <h2 className="text-lg sm:text-2xl font-bold text-black mb-6">
              {currentCategoryName}
            </h2>

            {/* Product Grid */}
            <DesignList
              products={productsWithPrice}
              isLoading={isProductsLoading}
              error={error}
            />

       
          </section>
        </div>
      </Container>
    </>
  );
}
