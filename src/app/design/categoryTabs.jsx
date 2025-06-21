'use client';
import React from 'react';
import { Tabs, Tab, CircularProgress } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';

const CategoryTabs = ({ categories, activeTab, onChange, isLoading }) => {
  const router = useRouter();
  const pathname = usePathname();

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <CircularProgress color="warning" />
      </div>
    );
  }

  const handleTabChange = (event, newIndex) => {
    const selectedCategory = categories[newIndex];
    onChange(newIndex); // Updates activeTab in parent
    router.push(`${pathname}?category=${encodeURIComponent(selectedCategory)}`);
  };

  return (
    <Tabs
      orientation="vertical"
      variant="scrollable"
      value={activeTab}
      onChange={handleTabChange}
      sx={{
        '& .MuiTabs-indicator': { left: 0, backgroundColor: '#f59e0b' },
        '& .MuiTab-root': {
          alignItems: 'flex-start',
          textAlign: 'left',
          color: '#000',
          fontSize: '0.9rem',
          textTransform: 'none',
          paddingLeft: '12px',
          '&.Mui-selected': {
            color: '#fff',
            fontWeight: 600,
            backgroundColor: '#f59e0b',
          },
        },
      }}
    >
      {categories.map((name, idx) => (
        <Tab key={idx} label={name} />
      ))}
    </Tabs>
  );
};

export default CategoryTabs;
