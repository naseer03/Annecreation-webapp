'use client'
import React, { useEffect } from 'react'
import CategoryCard from '@/components/categoryCard/CategeroyCard'
import BreadCrum from '@/components/BreadCrum/BreadCrum'
import { Container } from '@mui/material'
import { usecategoryStore } from '@/Store/categoryStore'
import Loading from '@/components/categoryCard/Loading'

const Page = () => {
  const { category, fetchCategories, isCategoriesLoading, error } = usecategoryStore()

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  let content

  if (isCategoriesLoading) {
    content = (
      <div className="flex justify-center">
        <Loading count={10} />
      </div>
    )
  } else if (error) {
    content = <p className="text-center text-red-600">{error}</p>
  } else if (category.length > 0) {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-6">
        {category.map((item) => (
          <div key={item.category_id} className="flex justify-center items-center">
            <CategoryCard item={item} />
          </div>
        ))}
      </div>
    )
  } else {
    content = <p className="text-center">No categories found.</p>
  }

  return (
    <>
      <BreadCrum
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Category', href: '/Category' },
        ]}
      />

      <Container className="px-0 my-20" sx={{ px: '0 !important' }}>
        <h1 className="text-center text-2xl my-10 font-bold text-[#311807]">
          Shop By Categories
        </h1>

        {content}
      </Container>
    </>
  )
}

export default Page
