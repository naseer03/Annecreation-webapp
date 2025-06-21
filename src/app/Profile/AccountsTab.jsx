'use client';

import React, { useEffect, useState } from 'react';
import { Container, Tabs, Tab } from '@mui/material';
import BreadCrum from '@/components/BreadCrum/BreadCrum';
import MyProfile from './MyProfile';
import OrderHistory from './OrderHistory';
import Downloads from './Downloads';

// Tab panel component
function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index} role="tabpanel">
      {value === index && <div className="w-full">{children}</div>}
    </div>
  );
}

// Mapping URL query to tab index
const tabMap = {
  profile: 0,
  orders: 1,
  downloads: 2,
};

// Main Account Tabs component
export default function AccountTabs() {
  const [tabIndex, setTabIndex] = useState(0);

  // Read URL param and set initial tab
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const tabParam = urlParams.get('tab');
      if (tabParam && tabMap.hasOwnProperty(tabParam)) {
        setTabIndex(tabMap[tabParam]);
      }
    }
  }, []);

  const handleChange = (_, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <>
      <BreadCrum
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Profile', href: '/Profile' },
        ]}
      />

      <Container className="my-20">
        <div className="flex flex-col lg:flex-row w-full gap-0">
          {/* Sidebar Tabs */}
          <div className="w-full h-[220px] lg:w-1/4 border-2 border-[var(--primary)] rounded-md">
            <p className="border-b-2 border-[var(--primary)] text-center text-transparent bg-clip-text bg-[linear-gradient(to_left,_#996E19_10%,_var(--primary))] font-bold py-3">
              Account
            </p>

            <Tabs
              orientation={
                typeof window !== 'undefined' && window.innerWidth < 1024
                  ? 'horizontal'
                  : 'vertical'
              }
              value={tabIndex}
              onChange={handleChange}
              variant="scrollable"
              sx={{
                '.MuiTabs-indicator': { display: 'none' },
              }}
            >
              {['My Profile', 'Order History', 'Downloads'].map((label, index) => (
                <Tab
                  key={index}
                  label={label}
                  sx={{
                    textAlign: 'left',
                    color: '#000',
                    alignItems: 'flex-start',
                    px: 2,
                    '&.Mui-selected': {
                      color: 'var(--primary)',
                      fontWeight: 'bold',
                    },
                  }}
                  id={`vertical-tab-${index}`}
                />
              ))}
            </Tabs>
          </div>

          {/* Tab Content */}
          <div className="w-full">
            <TabPanel value={tabIndex} index={0}>
              <MyProfile />
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
              <OrderHistory />
            </TabPanel>
            <TabPanel value={tabIndex} index={2}>
              <Downloads />
            </TabPanel>
          </div>
        </div>
      </Container>
    </>
  );
}
